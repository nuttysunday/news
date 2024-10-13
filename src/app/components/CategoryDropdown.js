import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import categoriesData from "@/app/Data/categories.json";
import {dropdownStyle, dropDownInputLabelStyle, menuPropsStyles} from "@/app/styles/sharedStyles";

const CategoryDropdown = ({ selectedCategory, handleCategoryChange }) => {
  return (
    <FormControl sx={dropdownStyle}>
      <InputLabel sx={dropDownInputLabelStyle}>
        Select Category
      </InputLabel>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        label="Select Category"
        MenuProps={ menuPropsStyles }
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
