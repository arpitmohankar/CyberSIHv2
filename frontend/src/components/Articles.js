import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import { Language } from '@mui/icons-material';

const ErrorAlert = ({ message }) => (
  <Alert severity="error" sx={{ animation: 'shake 0.3s ease-in-out' }}>
    <AlertTitle>Error</AlertTitle>
    {message}
  </Alert>
);

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/scrape');
        if (response.data && Array.isArray(response.data.data)) {
          setArticles(response.data.data);
        } else {
          setArticles([]);
        }
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching articles');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="secondary" sx={{ animation: 'spin 1s linear infinite' }} />
      </Box>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!articles || articles.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">
          No articles available.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ padding: '1rem', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
        Recent Articles
      </Typography>

      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              raised
              sx={{
                backgroundColor: '#ffffff',
                color: '#333',
                borderRadius: '10px',
                boxShadow: '0px 7px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <CardContent sx={{ padding: '1.5rem' }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2' }}>
                  {article.title || 'Untitled Article'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {article.description && article.description.length > 150
                    ? `${article.description.substring(0, 150)}...`
                    : article.description}
                </Typography>
                {article.image && (
                  <Box textAlign="center" mb={2}>
                    <IconButton
                      component="a"
                      href={article.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                        transition: 'transform 0.3s ease-in-out',
                        ':hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <img src={article.image} alt="Article" style={{ width: '100%', height: 'auto' }} />
                    </IconButton>
                  </Box>
                )}
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Chip
                    icon={<Language />}
                    label="Source"
                    color="primary"
                    component="a"
                    href={article.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    clickable
                    sx={{ color: '#ffffff', backgroundColor: '#1976d2', ':hover': { backgroundColor: '#1565c0' } }}
                  />
                  <Chip
                    label={article.category || 'Uncategorized'}
                    color="secondary"
                    variant="outlined"
                    sx={{ borderColor: '#1976d2', color: '#1976d2' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Articles;
