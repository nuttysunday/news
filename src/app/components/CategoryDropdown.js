"use client";

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import categoriesData from './categories.json';  

const CategoryDropdown = ({ selectedCategory, handleCategoryChange }) => {
  return (
    <FormControl 
      fullWidth 
      variant="outlined" 
      sx={{ 
        marginBottom: "2rem", 
        width: "10rem", 
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#a5b4fc", 
          },
          "&:hover fieldset": {
            borderColor: "white", 
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
          "& .MuiSelect-select": {
            fontFamily: "monospace", 
            color: "#a5b4fc", 
            fontWeight: "bold",
          },
        },
      }}
    >
      <InputLabel id="category-dropdown-label" className="font-bold font-mono text-indigo-300 text-sm">
        Select Category
      </InputLabel>
      <Select
        labelId="category-dropdown-label"
        id="category-dropdown"
        value={selectedCategory} 
        onChange={handleCategoryChange}
        label="Select Category"
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                fontFamily: "monospace",
                color: "#a5b4fc", 
                fontWeight: "bold",
                fontSize: "0.875rem",
              },
            },
          },
        }}
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
