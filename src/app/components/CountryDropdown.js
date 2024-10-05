"use client";

import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from "@mui/material";
import countriesData from "./countries.json";

// A simple flag icon component for demonstration purposes
const FlagIcon = ({ code }) => (
  <span style={{ marginRight: "8px" }}>
    <img src={`https://flagcdn.com/${code.toLowerCase()}.svg`} alt={`${code} flag`} style={{ width: "20px", height: "15px" }} />
  </span>
);

export default function SimpleDropdown({ selectedValue, handleCountryChange }) {
  const [countries, setCountries] = useState([]);
  const [userCountry, setUserCountry] = useState("");
  const [userCountryCode, setUserCountryCode] = useState("");

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Failed to fetch user country");
        const data = await response.json();
        setUserCountry(data.country_name);
        setUserCountryCode(data.country); // Get country code from the response
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = () => {
      // Prepare the countries data array with country names and codes
      const formattedCountries = countriesData.map((country) => ({
        name: country.Country,
        code: country["Country Code"],
      })).sort((a, b) => a.name.localeCompare(b.name)); // Sort by country name
      setCountries(formattedCountries);
      fetchUserCountry(); // Fetch user country after setting countries
    };

    fetchData();
  }, []);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{ marginBottom: "2rem", width: "15rem", borderRadius: "8px", boxShadow: 1 }}
    >
      <InputLabel id="country-dropdown-label">Select Country</InputLabel>
      <Select
        labelId="country-dropdown-label"
        id="country-dropdown"
        value={selectedValue}
        onChange={handleCountryChange}
        label="Select Country"
        sx={{
          backgroundColor: "#fff",
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <MenuItem value="Global">
          <Typography variant="body1">Global</Typography>
        </MenuItem>
        {userCountry && userCountryCode && (
          <MenuItem value={userCountryCode}>
            <Box display="flex" alignItems="center">
              <FlagIcon code={userCountryCode} />
              <Typography variant="body1">{userCountry}</Typography>
            </Box>
          </MenuItem>
        )}
        {countries.map((country, index) => (
          <MenuItem key={index} value={country.code}>
            <Box display="flex" alignItems="center">
              <FlagIcon code={country.code} />
              <Typography variant="body1">{country.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
