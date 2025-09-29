import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import {
  BoxButton,
  BoxContainer,
  BoxInput,
  BoxMain,
  BoxPage,
  TopTable,
} from "./styled";

interface TableProps {
  rows: any;
  columns: any;
}

const TableComponent = ({ columns, rows }: TableProps) => {
  return (
    // phan tong bao boc
    <BoxContainer>
      {/* phan facility list+ button create */}
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

      {/* phan than giua */}
      <BoxMain>
        {/* phan cac o input  */}
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
            <MenuItem value="Gehrmed">Gehrmed</MenuItem>
          </TextField>
        </BoxInput>

        {/* phan nut reset search */}
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

      {/* phan page */}
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
