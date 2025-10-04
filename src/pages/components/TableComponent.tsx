import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import {
  BoxButton,
  BoxContainer,
  BoxHeader,
  BoxInput,
  BoxMain,
  BoxPage,
  BoxSelect,
  TopTable,
} from "./styled";

interface TableProps {
  rows: any[];
  columns: any[];
}

const TableComponent = ({ columns, rows }: TableProps) => {
  const navbarMain = [
    { name: "Facility Management" },
    { name: "User Management" },
    { name: "System Configuration" },
  ];

  return (
    <BoxContainer>
      {/* Navbar Top */}
      <BoxHeader>
        <BoxSelect>
          {navbarMain.map((item) => (
            <Typography key={item.name} variant="body1" fontWeight="bold">
              {item.name}
            </Typography>
          ))}
        </BoxSelect>
        <div>
          <img
            src=""
            alt="Profile"
            style={{ width: "40px", borderRadius: "50%" }}
          />
        </div>
      </BoxHeader>

      {/* Facility Management Header */}
      <div style={{ marginBottom: "16px" }}>
        <Typography variant="h5">Facility Management</Typography>
        <Typography variant="body2">
          Manage your Facilities and their account permissions here.
        </Typography>
      </div>

      {/* Facility List + Create Button */}
      <TopTable>
        <Typography fontSize="20px" fontWeight="bold">
          Facility list (25 facilities)
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: purple[500],
            color: "white",
          }}
        >
          + Create facility
        </Button>
      </TopTable>

      {/* Main Content */}
      <BoxMain>
        {/* Input Fields */}
        <BoxInput>
          <TextField label="Facility Name" variant="outlined" size="small" />
          <TextField
            label="Address"
            variant="outlined"
            size="small"
            style={{ marginLeft: "10px" }}
          />
          <TextField
            select
            label="Status"
            variant="outlined"
            size="small"
            style={{ marginLeft: "10px", width: "150px" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          <TextField
            label="Facility Admin"
            variant="outlined"
            size="small"
            style={{ marginLeft: "10px" }}
          />
          <TextField
            select
            label="EMR"
            variant="outlined"
            size="small"
            style={{ marginLeft: "10px", width: "150px" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Point-Click-Care">Point-Click-Care</MenuItem>
            <MenuItem value="Gehimed">Gehimed</MenuItem>
          </TextField>
        </BoxInput>

        {/* Buttons */}
        <BoxButton>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              color: purple[500],
              border: `1px solid ${purple[500]}`,
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: purple[500], color: "white" }}
          >
            Search
          </Button>
        </BoxButton>
      </BoxMain>

      {/* Data Grid */}
      <BoxPage>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </BoxPage>
    </BoxContainer>
  );
};

export default TableComponent;
