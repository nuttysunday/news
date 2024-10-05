import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import languagesData from './languages.json'; // Assuming your languages JSON file is named languages.json

const LanguageDropdown = ({ selectedLanguage, handleLanguageChange }) => {
  return (
    <FormControl fullWidth variant="outlined" sx={{ marginBottom: '2rem', width: '10rem' }}>
      <InputLabel id="language-dropdown-label">Select Language</InputLabel>
      <Select
        labelId="language-dropdown-label"
        id="language-dropdown"
        value={selectedLanguage} 
        onChange={handleLanguageChange}
        label="Select Language"
      >
        {languagesData.map((language, index) => (
          <MenuItem key={index} value={language.code}>
            {language.name.charAt(0).toUpperCase() + language.name.slice(1)} 
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageDropdown;
