// app/page.js
"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import CountryDropdown from './components/CountryDropdown';
import CategoryDropdown from './components/CategoryDropdown';

export default function Page() {
  const [selectedValue, setSelectedValue] = useState('Global');
  const [selectedCategory, setSelectedCategory] = useState('Top');

  const handleCountryChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Box sx={{ marginTop: '5rem', gap: '2rem', display: 'flex', marginLeft: '2rem', flexDirection: 'row' }}>
      <CountryDropdown selectedValue={selectedValue} handleCountryChange={handleCountryChange} />
      <CategoryDropdown selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
    </Box>
  );
}
