"use client";

import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import countriesData from "@/app/Data/countries.json";
import { dropDownInputLabelStyle, menuPropsStyles} from "@/app/styles/sharedStyles";


const FlagIcon = ({ code }) => {
  const worldFlagImage =
    "https://images.squarespace-cdn.com/content/v1/5fa6b76b045ef433ae7b252e/1604765875569-MUAEJNXG2NL6E4VEORZ6/Flag_20x30.jpg";

  return (
    <span style={{ marginRight: "8px" }}>
      <img
        src={
          code === "wo"
            ? worldFlagImage
            : `https://flagcdn.com/${code.toLowerCase()}.svg`
        }
        alt={code === "wo" ? "World flag" : `${code} flag`}
        style={{ width: "20px", height: "15px" }}
      />
    </span>
  );
};

export default function SimpleDropdown({
  selectedValue,
  handleCountryChange,
  setSelectedValue,
}) {
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
        setUserCountryCode(data.country);
        setSelectedValue("wo");
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = () => {
      // Prepare the countries data array with country names and codes
      const formattedCountries = countriesData
        .map((country) => ({
          name: country.Country,
          code: country["Country Code"],
        }))
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort by country name
      setCountries(formattedCountries);
      fetchUserCountry(); // Fetch user country after setting countries
    };

    fetchData();
  }, []);

  return (
    <FormControl
      sx={{
        width: { xs: "100%", sm: "15rem" },
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
        },
      }}
    >
      <InputLabel
        sx={dropDownInputLabelStyle}
      >
        Select Country
      </InputLabel>
      <Select
        value={selectedValue}
        onChange={handleCountryChange}
        label="Select Country"
        MenuProps={{ ...menuPropsStyles, autoFocus: false }}
      >
        {/* World Option as the First Menu Item */}
        <MenuItem value="wo">
          <Box display="flex" alignItems="center">
            <FlagIcon code={"wo"} />
            <Typography
              variant="body1"
              className="font-bold font-mono text-indigo-300 text-sm"
            >
              World
            </Typography>
          </Box>
        </MenuItem>

        {/* User country as Option as the second Menu Item */}
        {userCountry && userCountryCode && (
          <MenuItem value={userCountryCode}>
            <Box display="flex" alignItems="center">
              <FlagIcon code={userCountryCode} />
              <Typography
                variant="body1"
                className="font-bold font-mono text-indigo-300 text-sm"
              >
                {userCountry}
              </Typography>
            </Box>
          </MenuItem>
        )}
        {countries.map((country, index) => (
          <MenuItem key={index} value={country.code}>
            <Box display="flex" alignItems="center">
              <FlagIcon code={country.code} />
              <Typography className="font-bold font-mono text-indigo-300 text-sm">
                {country.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
