"use client";

import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, Card, CardContent } from '@mui/material';

export default function SimpleDropdown() {
  const [selectedValue, setSelectedValue] = useState('Global'); // Default to 'Global'
  const [countries, setCountries] = useState([]);
  const [userCountry, setUserCountry] = useState(''); // State for user's country
  const [selectedCategory, setSelectedCategory] = useState('top'); // Default to 'top'
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // State for selected language
  const [articles, setArticles] = useState([]); // State for news articles, initialize as an empty array

  const categories = [
    'business', 'crime', 'domestic', 'education', 'entertainment', 'environment',
    'food', 'health', 'lifestyle', 'other', 'politics', 'science', 'sports',
    'technology', 'top', 'tourism', 'world'
  ]; // Static list of categories

  // Static list of languages
  const languages = [
    { name: "Afrikaans", code: "af" },
    { name: "English", code: "en" },
    { name: "Vietnamese", code: "vi" },
    { name: "Welsh", code: "cy" },
    { name: "Zulu", code: "zu" }
  ];

  useEffect(() => {
    // Fetch countries data using fetch API
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames.sort()); // Sort alphabetically
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    // Fetch the user's country based on IP
    const fetchUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/'); // API to get user's location info
        const data = await response.json();
        setUserCountry(data.country_name);
      } catch (error) {
        console.error('Error fetching user country:', error);
      }
    };

    // Fetch news articles from the API
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_5535960bbd07cc4fa76d59bd5b32cda638ea8`);
        print(response.data)
        // Set the fetched articles in the state, default to an empty array if undefined
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchCountries();
    fetchUserCountry(); // Get user's country
    fetchArticles(); // Get articles on mount
  }, [selectedCategory, selectedLanguage]); // Run fetchArticles whenever category or language changes

  const handleCountryChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <Box sx={{ marginTop: '5rem', gap: '2rem', display: 'flex', marginLeft: '2rem', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', gap: '2rem' }}>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '2rem', width: '10rem' }}>
          <InputLabel id="country-dropdown-label">Select Country</InputLabel>
          <Select
            labelId="country-dropdown-label"
            id="country-dropdown"
            value={selectedValue}
            onChange={handleCountryChange}
            label="Select Country"
          >
            <MenuItem value="Global">Global</MenuItem> {/* Default option */}
            {userCountry && <MenuItem value={userCountry}>{userCountry}</MenuItem>} {/* User's country option */}
            {countries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '2rem', width: '10rem' }}>
          <InputLabel id="category-dropdown-label">Select Category</InputLabel>
          <Select
            labelId="category-dropdown-label"
            id="category-dropdown"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Select Category"
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '2rem', width: '10rem' }}>
          <InputLabel id="language-dropdown-label">Select Language</InputLabel>
          <Select
            labelId="language-dropdown-label"
            id="language-dropdown"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            label="Select Language"
          >
            {languages.map((language, index) => (
              <MenuItem key={index} value={language.code}>
                {language.name} {/* Display language name */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ marginTop: '2rem' }}>
  <Typography variant="h6">Latest Articles:</Typography>
  {articles.length > 0 ? (
    <pre>{JSON.stringify(articles, null, 2)}</pre> // Display articles in raw JSON format
  ) : (
    <pre>{JSON.stringify(articles, null, 2)}</pre>
  )}
</Box>
    </Box>
  );
}
