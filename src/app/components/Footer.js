// This is a server side component

import * as React from "react";
import { Box, Link } from "@mui/material";
import { GitHub , LinkedIn , Email, Feed } from '@mui/icons-material';

const links = [
  { href: "https://github.com/nuttysunday", icon: GitHub },
  { href: "https://www.linkedin.com/in/shivam-ghodke/", icon: LinkedIn },
  { href: "mailto:mail@shivam.foo", icon: Email },
  { href: "https://drive.google.com/file/d/1GxlXznPrULXn76GHeQkCNfnngn9G0Sxo/view?usp=sharing", icon: Feed }
];

const Footer = ({ sx }) => (
  <Box sx={{ ...sx, display: "flex", gap: 2, justifyContent: 'center' }}>
    {links.map(({ href, icon: Icon }, index) => (
      <Link key={index} href={href} target="_blank" rel="noopener noreferrer">
        <Box sx={{ padding: 1, borderRadius: '50%', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.5)' }}}>
          <Icon sx={{ color: 'white' }} />
        </Box>
      </Link>
    ))}
  </Box>
);

export default Footer;