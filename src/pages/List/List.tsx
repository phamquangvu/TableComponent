import {
  Box,
  Button,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import ForumIcon from "@mui/icons-material/Forum";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { BoxContainer } from "./styled";
import TableComponent from "../components/TableComponent";

const rows = [
  {
    id: 1,
    facilityName: "whitefish864",
    address: "3880 Poplar C",
    emrConfig: "Point-Click-Care",
    facilityAdmin: "michael.mi...",
    creator: "michael.mit",
    updatedDate: "Oct 30, 2024",
    updatedBy: "michael.mit",
    status: "Active",
  },
  {
    id: 2,
    facilityName: "yellowmouse21",
    address: "8080 Railroad",
    emrConfig: "Gehrmed",
    facilityAdmin: "bill.sander...",
    creator: "bill.sanders",
    updatedDate: "Aug 2, 2024",
    updatedBy: "bill.sanders",
    status: "Active",
  },
  {
    id: 3,
    facilityName: "silverlion355",
    address: "7529 E. Pecan",
    emrConfig: "Point-Click-Care",
    facilityAdmin: "nathan.robe...",
    creator: "nathan.robe",
    updatedDate: "Nov 7, 2024",
    updatedBy: "nathan.robe",
    status: "Inactive",
  },
  {
    id: 4,
    facilityName: "bluebear234",
    address: "3605 Parker R",
    emrConfig: "Point-Click-Care",
    facilityAdmin: "dolores.cha...",
    creator: "dolores.cha",
    updatedDate: "Nov 16, 2024",
    updatedBy: "dolores.cha",
    status: "Active",
  },
  {
    id: 5,
    facilityName: "bluadybug46",
    address: "8558 Green R",
    emrConfig: "Gehrmed",
    facilityAdmin: "debra.holt@...",
    creator: "debra.holt",
    updatedDate: "Nov 28, 2024",
    updatedBy: "debra.holt",
    status: "Inactive",
  },
];

const columns = [
  { field: "facilityName", headerName: "Facility Name", width: 150 },
  { field: "address", headerName: "Address/Location", width: 150 },
  { field: "emrConfig", headerName: "EMR Config", width: 150 },
  { field: "facilityAdmin", headerName: "Facility Admin", width: 150 },
  { field: "creator", headerName: "Creator", width: 150 },
  { field: "updatedDate", headerName: "Updated Date", width: 120 },
  { field: "updatedBy", headerName: "Updated By", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params: any) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {params.value === "Active" ? (
          <>
            <span style={{ color: "green" }}>{params.value}</span>
            <span
              role="img"
              aria-label="delete"
              style={{ color: "red", cursor: "pointer" }}
            >
              X
            </span>
            <span
              role="img"
              aria-label="edit"
              style={{ color: "gray", cursor: "pointer" }}
            >
              Edit
            </span>
          </>
        ) : (
          <>
            <span style={{ color: "red" }}>{params.value}</span>
            <span
              role="img"
              aria-label="check"
              style={{ color: "green", cursor: "pointer" }}
            >
              V
            </span>
          </>
        )}
      </Box>
    ),
  },
];

const List = () => {
  const navbarItems = [
    { text: "Administration", icon: <SettingsSuggestIcon /> },
    { text: "Clinical Protocol", icon: <DescriptionIcon /> },
    { text: "Notifications", icon: <NotificationsIcon /> },
    { text: "Reminders", icon: <AccessAlarmIcon /> },
    { text: "Reporting", icon: <AssessmentIcon /> },
    { text: "Patient List", icon: <PeopleIcon /> },
    { text: "Communication Threads", icon: <ForumIcon /> },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <BoxContainer>
      <Box>
        <Drawer
          variant="permanent"
          sx={{
            width: open ? 240 : 60,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? 240 : 60,
              boxSizing: "border-box",
              transition: "width 0.3s",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: open ? "flex-end" : "center",
              p: 1,
            }}
          >
            <Button onClick={handleOpen}>
              {open ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </Box>
          {navbarItems.map((item) => (
            <ListItem key={item.text} sx={{ display: "block" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0 }}>
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </Box>
            </ListItem>
          ))}
        </Drawer>
      </Box>
      <TableComponent columns={columns} rows={rows} />
    </BoxContainer>
  );
};

export default List;
