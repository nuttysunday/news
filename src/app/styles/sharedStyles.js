export const dropdownStyle = {
  width: { xs: "100%", sm: "10rem" },
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
};

export const dropDownInputLabelStyle = {
  fontWeight: "bold",
  fontFamily: "monospace",
  color: "#a5b4fc",
  fontSize: "0.875rem",
};


export const menuPropsStyles = {
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
};