// src/app/components/NewsDisplay.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Link } from '@mui/material';

const NewsDisplay = ({ selectedValue, selectedCategory, selectedLanguage }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api?country=${selectedValue}&category=${selectedCategory}&lang=${selectedLanguage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.data.results); // Adjust based on the structure of your API response
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedValue, selectedCategory, selectedLanguage]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load articles: {error.message}</Typography>;

  return (
    <Box sx={{ marginTop: '2rem' }}>
      {articles.map((article) => (
        <Card key={article.article_id} sx={{ marginBottom: '1rem', display: 'flex' }}>
          {article.image_url && (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={article.image_url}
              alt={article.title}
            />
          )}
          <CardContent>
            <Typography variant="h6">{article.title}</Typography>
            <Typography variant="body2" color="text.secondary">{article.description || 'No description available.'}</Typography>
            <Link href={article.link} target="_blank" rel="noopener">
              Read more
            </Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default NewsDisplay;
