// app/page.js
"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import CountryDropdown from "./components/CountryDropdown";
import CategoryDropdown from "./components/CategoryDropdown";
import LanguageDropdown from "./components/LanguageDropdown";
import ArticlesList from "./components/ArticlesList";

export default function Page() {
  // default values
  const [selectedValue, setSelectedValue] = useState("Global");
  const [selectedCategory, setSelectedCategory] = useState("world");
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English

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
    <>
      <Box
        sx={{
          marginTop: "2rem",
          gap: "2rem",
          display: "flex",
          marginLeft: "2rem",
          flexDirection: "row",
        }}
      >
        <CountryDropdown
          selectedValue={selectedValue}
          handleCountryChange={handleCountryChange}
        />
        <CategoryDropdown
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <LanguageDropdown
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
        />
      </Box>
      <ArticlesList
        selectedValue={selectedValue}
        selectedCategory={selectedCategory}
        selectedLanguage={selectedLanguage}
      />{" "}
    </>
  );
}
