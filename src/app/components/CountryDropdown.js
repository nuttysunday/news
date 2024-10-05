"use client";

import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, CircularProgress } from "@mui/material";
import countriesData from "./countries.json";

export default function SimpleDropdown({ selectedValue, handleCountryChange }) {
  const [countries, setCountries] = useState([]);
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Failed to fetch user country");
        const data = await response.json();
        setUserCountry(data.country_name);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      setCountries(countriesData.map((country) => country.Country).sort());
      await fetchUserCountry();
    };

    fetchData();
  }, []);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{ marginBottom: "2rem", width: "10rem" }}
    >
      <InputLabel id="country-dropdown-label">Select Country</InputLabel>
      <Select
        labelId="country-dropdown-label"
        id="country-dropdown"
        value={selectedValue}
        onChange={handleCountryChange}
        label="Select Country"
      >
        <MenuItem value="Global">Global</MenuItem>
        {userCountry && <MenuItem value={userCountry}>{userCountry}</MenuItem>}
        {countries.map((country, index) => (
          <MenuItem key={index} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
