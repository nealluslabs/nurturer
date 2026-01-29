import React from "react";
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
import { useSelector } from "react-redux";

const CandidateInteractionsPage = () => {
  const { candidateInFocus } = useSelector((state) => state.user);

  const getStatusColor = (status) => {
    if (status === "Sent") return "success";
    if (status === "Cancelled" || status === "Canceled") return "error";
    return "default";
  };

  const data = candidateInFocus?.messageQueue || [];

  const interactions = data.filter(
    (item) => item.messageStatus === "Sent" || item.messageStatus === "Cancelled" || item.messageStatus === "Canceled"
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", fontSize: 24 }}>
        {candidateInFocus?.name ? `${candidateInFocus.name} - ` : ""} Interactions
      </Typography>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>Timestamp</TableCell>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>Subject</TableCell>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="center" sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interactions.length > 0 ? (
              interactions.map((row, idx) => (
                <TableRow key={row.id || idx} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                      {row.createdAt?.seconds
                        ? new Date(row.createdAt.seconds * 1000).toLocaleString()
                        : "N/A"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: "1.2rem" }}>
                      {row.messageType}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
                      {row.subject || "No Subject"}
                    </Typography>
                    {row.subtitle && (
                      <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>
                        {row.subtitle}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={row.messageStatus || "N/A"}
                      color={getStatusColor(row.messageStatus)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton sx={{ color: "#1976d2" }} size="small">
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3, fontSize: "1.4rem" }}>
                  <Typography color="textSecondary" sx={{fontSize: "1.4rem" }}>No completed interactions found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CandidateInteractionsPage;