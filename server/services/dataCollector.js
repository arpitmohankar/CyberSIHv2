const axios = require('axios');
const cheerio = require('cheerio');
const natural = require('natural');

// Initialize NLP classifier
const classifier = new natural.BayesClassifier();

// Train the classifier (you would typically do this with more data)
classifier.addDocument('fraud', 'fraud');
classifier.addDocument('scam', 'scam');
classifier.addDocument('server', 'server');
classifier.addDocument('money', 'money');
classifier.addDocument('hacked', 'hacked');
classifier.addDocument('laundering', 'laundering');
classifier.addDocument('sextortion', 'sextortion');
classifier.addDocument('threats', 'threats');
classifier.addDocument('database', 'database');
classifier.addDocument('data breach', 'data breach');
classifier.addDocument('scrapping', 'scrapping');
classifier.addDocument('ddos', 'ddos');
classifier.addDocument('steal', 'steal');
classifier.addDocument('phishing', 'phishing');
classifier.train();

// Function to scrape a website
async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url, { timeout: 15000});
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
        
        incidents.push({
          source: url,
          text: text,
          image: imageUrl || 'No image available',
          category: classifier.classify(text)
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
