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
      sx={{ marginBottom: "2rem", width: "15rem", borderRadius: "8px",
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
      },
    }}
    >
      <InputLabel id="country-dropdown-label" className="font-bold font-mono text-indigo-300 text-sm">Select Country</InputLabel>
      <Select
        labelId="country-dropdown-label"
        id="country-dropdown"
        value={selectedValue}
        onChange={handleCountryChange}
        label="Select Country"
        sx={{
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <MenuItem value="Global">
          <Typography variant="body1" className="font-bold font-mono text-indigo-300 text-base">Global</Typography>
        </MenuItem>
        {userCountry && userCountryCode && (
          <MenuItem value={userCountryCode}>
            <Box display="flex" alignItems="center">
              <FlagIcon code={userCountryCode} />
              <Typography variant="body1"  className="font-bold font-mono text-indigo-300 text-sm">{userCountry}</Typography>
            </Box>
          </MenuItem>
        )}
        {countries.map((country, index) => (
          <MenuItem key={index} value={country.code}>
            <Box display="flex" alignItems="center">
              <FlagIcon code={country.code} />
              <Typography variant="body1" className="font-bold font-mono text-indigo-300 text-sm">{country.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
