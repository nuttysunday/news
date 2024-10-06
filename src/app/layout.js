import { Box } from '@mui/material';
import './globals.css'

export const metadata = {
  title: "Minimalistic News",
  description: "Developed by Shivam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Box>
        {children}
        </Box>
      </body>
    </html>
  );
}
