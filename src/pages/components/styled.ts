import { Box, styled } from "@mui/material";

export const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  width: "85%",
  marginLeft: "24px",
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
    border: `1px solid `,
    borderRadius: "8px",
  },

  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid `,
  },
  "& .MuiDataGrid-footer": {
    borderTop: `1px solid `,
  },
});

export const BoxHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",

  marginBottom: "16px",
});

export const BoxSelect = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "12px",
});
