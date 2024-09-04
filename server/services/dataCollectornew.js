const axios = require('axios');
const cheerio = require('cheerio');
const natural = require('natural');

// Initialize NLP classifier for states
const stateClassifier = new natural.BayesClassifier();

// Define Indian states with abbreviations and full names
const INDIAN_STATES = {
  "AP": "Andhra Pradesh",
  "AR": "Arunachal Pradesh",
  "AS": "Assam",
  "BR": "Bihar",
  "CT": "Chhattisgarh",
  "DL": "Delhi",
  "GA": "Goa",
  "GJ": "Gujarat",
  "HR": "Haryana",
  "HP": "Himachal Pradesh",
  "JK": "Jammu and Kashmir",
  "JH": "Jharkhand",
  "KA": "Karnataka",
  "KL": "Kerala",
  "MP": "Madhya Pradesh",
  "MH": "Maharashtra",
  "MN": "Manipur",
  "ML": "Meghalaya",
  "MZ": "Mizoram",
  "NL": "Nagaland",
  "OR": "Odisha",
  "PB": "Punjab",
  "RJ": "Rajasthan",
  "SK": "Sikkim",
  "TN": "Tamil Nadu",
  "TR": "Tripura",
  "UT": "Uttarakhand",
  "UP": "Uttar Pradesh",
  "WB": "West Bengal"
};

// Dummy training data for state categorization
Object.entries(INDIAN_STATES).forEach(([code, state]) => {
  stateClassifier.addDocument(state.toLowerCase(), code);
});
stateClassifier.train();

// Function to scrape a website
async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url, { timeout: 15000 });
    const $ = cheerio.load(response.data);
    const incidents = [];

    // Example: Extract incident information and images
    $('p').each((index, element) => {
      const text = $(element).text();
      if (text.toLowerCase().includes('cyber') || text.toLowerCase().includes('hack')) {
        let imageUrl = $(element).closest('article').find('img').attr('src');
        
        // If no image is found in the article, try finding one in the parent div
        if (!imageUrl) {
          imageUrl = $(element).closest('div').find('img').attr('src');
        }
        
        // Determine state from the text (this is a simplified example)
        const stateCode = stateClassifier.classify(text.toLowerCase());
        const state = INDIAN_STATES[stateCode] || 'Unknown';

        incidents.push({
          source: url,
          text: text,
          image: imageUrl || 'No image available',
          state: state
        });
      }
    });

    return incidents;
  } catch (error) {
    console.error('Error scraping website:', error);
    return [];
  }
}

// Function to collect data from multiple websites
async function collectData() {
  const websites = [
    'https://www.the420.in/',
    'https://www.hindustantimes.com/topic/cyber-crime/news',
    'https://cio.economictimes.indiatimes.com/tag/cyber+security',
    'https://www.moneycontrol.com/news/tags/cyber-attack.html',
    'https://timesofindia.indiatimes.com/topic/cyber-attacks',
    'https://economictimes.indiatimes.com/prime/tag/cybersecurity',
    'https://indianexpress.com/about/cyber-attack/',
    'https://www.infosecurity-magazine.com'
  ];
  
  let allIncidents = [];

  // Scrape websites
  for (const site of websites) {
    const incidents = await scrapeWebsite(site);
    allIncidents = allIncidents.concat(incidents);
  }

  return allIncidents;
}

// Export the collectData function
module.exports = { collectData };
