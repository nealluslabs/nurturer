import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const InteractionsPage = () => {
  const getStatusColor = (status) => {
    return status === "Sent" ? "success" : "error";
  };

  const history = useHistory()

  const { allContacts = [], candidateInFocus } = useSelector(
    (state) => state.user,
  );


//  const { user } = useSelector(
//    (state) => state.auth
//  );
//
//useEffect(()=>{
//
//  if(user && !user.name){
//    history.push('/login')
//  }
//
//
//},[])


  let touchpointData = [];

  let onlyTouchpointMessagesData = [];
  let onlyEventsMessagesData = [];

  if (allContacts.length > 0) {
    let allMessages = [];
    allContacts.forEach((contact) => {
      if (Array.isArray(contact.messageQueue)) {
        allMessages = allMessages.concat(
          contact.messageQueue.map((msg) => ({
            ...msg,
            contactName: contact.name,
            contactId: contact.id || contact.uid,
            uid: contact.uid,
            email: contact.email,
          })),
        );
      }
    });

    allMessages.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    console.log("allMessages ON interaction PAGE----------->", allMessages);

    const filteredHistory = allMessages.filter(
      (item) =>
        item.messageStatus === "Cancelled" || item.messageStatus === "Sent",
    );

    onlyTouchpointMessagesData = filteredHistory
      .filter((item) => item.messageType !== "Event")
      .map((msg, idx) => ({
        id: msg.id || idx,
        title: msg.title || msg.subject || "No Title",
        email: msg.email,
        subtitle: msg.contactName
          ? `${msg.contactName}${msg.to ? " - " + msg.to : ""}`
          : msg.to || "",
        status: msg.messageStatus || "",
        messageType: msg.messageType,
        createdAt: msg.createdAt,
        iconColor: "#1976d2",
      }));

    onlyEventsMessagesData = filteredHistory
      .filter((item) => item.messageType === "Events")
      .map((msg, idx) => ({
        id: msg.id || idx,
        title: msg.title || msg.subject || "No Title",
        email: msg.email,
        subtitle: msg.contactName
          ? `${msg.contactName}${msg.to ? " - " + msg.to : ""}`
          : msg.to || "",
        status: msg.messageStatus || "",
        messageType: msg.messageType,
        createdAt: msg.createdAt,
        iconColor: "#1976d2",
      }));
  }

  const displayData = [
    ...onlyTouchpointMessagesData,
    ...onlyEventsMessagesData,
  ];
  console.log("displayData ON interaction PAGE----------->", displayData);
  console.log("allContacts ON interaction PAGE----------->", allContacts);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", fontSize: 24 }}>
        Interactions
      </Typography>

      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ borderRadius: 2, fontSize: "4rem" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5", fontSize: "4rem" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                <strong>Email</strong>
              </TableCell>
              <TableCell sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                <strong>Timestamp</strong>
              </TableCell>
              <TableCell sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                <strong>Type</strong>
              </TableCell>
              <TableCell sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                <strong>Subject</strong>
              </TableCell>
              <TableCell sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                <strong>Status</strong>
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                <strong>View</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ fontSize: 16 }}>
            {displayData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                    {row.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                    {row.createdAt && row.createdAt.seconds
                      ? new Date(row.createdAt.seconds * 1000).toLocaleString()
                      : "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: "1.2rem" }}
                  >
                    {row.messageType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                    {row.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ fontSize: "1.2rem" }}
                  >
                    {row.subtitle}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status)}
                    variant="outlined"
                    size="medium"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton sx={{ color: row.iconColor }} size="medium">
                    <VisibilityOutlinedIcon fontSize="medium" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}{" "}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InteractionsPage;
