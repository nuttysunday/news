"use client";

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import categoriesData from './categories.json';  

const CategoryDropdown = ({ selectedCategory, handleCategoryChange }) => {
  return (
    <FormControl fullWidth variant="outlined" sx={{ marginBottom: '2rem', width: '10rem' }}>
      <InputLabel id="category-dropdown-label">Select Category</InputLabel>
      <Select
        labelId="category-dropdown-label"
        id="category-dropdown"
        value={selectedCategory} 
        onChange={handleCategoryChange}
        label="Select Category"
      >

        {categoriesData.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)} 
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
