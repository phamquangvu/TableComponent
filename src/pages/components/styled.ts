import { Box, styled } from "@mui/material";

export const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  width: "100%",
  backgroundColor: "#f9f9f9",
});

export const TopTable = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

export const BoxMain = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

export const BoxInput = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export const BoxButton = styled(Box)({
  display: "flex",
  gap: "8px",
});

export const BoxPage = styled(Box)({
  "& .MuiDataGrid-root": {
    height: "400px",
    width: "100%",
    border: `1px solid #ddd`,
    borderRadius: "8px",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#f5f5f5",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid #ddd`,
  },
  "& .MuiDataGrid-footer": {
    borderTop: `1px solid #ddd`,
  },
});
