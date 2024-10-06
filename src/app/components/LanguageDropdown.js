import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import languagesData from './languages.json'; // Assuming your languages JSON file is named languages.json

const LanguageDropdown = ({ selectedLanguage, handleLanguageChange }) => {
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
      <InputLabel id="language-dropdown-label" className="font-bold font-mono text-indigo-300 text-sm">
        Select Language
      </InputLabel>
      <Select
        labelId="language-dropdown-label"
        id="language-dropdown"
        value={selectedLanguage} 
        onChange={handleLanguageChange}
        label="Select Language"
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