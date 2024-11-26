import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import languagesData from "@/app/Data/languages.json";

import {dropdownStyle, dropDownInputLabelStyle, menuPropsStyles} from "@/app/styles/sharedStyles";

const LanguageDropdown = ({ selectedLanguage, handleLanguageChange }) => {
  return (
    <FormControl sx={dropdownStyle}>
      <InputLabel sx={dropDownInputLabelStyle}>
        Select Language
      </InputLabel>
      <Select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        label="Select Language"
        MenuProps={menuPropsStyles}
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
