import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Divider, Chip } from "@mui/material";

function Inbox3() {
  const { candidateInFocus, selectedInteraction } = useSelector(
    (state) => state.user || {},
  );

if (!selectedInteraction) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%", // Ensures it takes full parent height
          width: "100%",
          p: 4,
        }}
      >
        <Typography color="textSecondary" variant="h5" sx={{ textAlign: "center" }}>
          Select an interaction from the list to view the message details.
        </Typography>
      </Box>
    );
  }

  return (
 <Box 
      sx={{ 
        height: "100%", 
        width: "100%", 
        display: "flex",        
        alignItems: "center", 
        justifyContent: "center", 
        overflowY: "auto", 
        p: 4 
      }}
    >
      <Paper
        elevation={0}
        sx={{ 
          p: 6, 
          border: "1px solid #e0e0e0", 
          borderRadius: 8, 
          backgroundColor: "#ffffff", 
          width: "80%",
          maxWidth: "800px",   
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          margin: "auto"     
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, color: "#111827" }}
        >
          {selectedInteraction.subject}
        </Typography>

        <Typography variant="h5" sx={{color: "#374151" }}>
          Hello {candidateInFocus?.name || "User"},
        </Typography>

        <Box
          sx={{
            "& .MuiTypography-root": {
              fontSize: "1.4rem", 
              lineHeight: 1.8,
              color: "#374151",
            },
          }}
        >
          <Typography paragraph>
            {selectedInteraction.firstParagraph}
          </Typography>

          {selectedInteraction.bulletPoints && (
            <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>
              {selectedInteraction.bulletPoints.map((bp, i) => (
                <li key={bp.id || i} style={{ marginBottom: "12px" }}>
                  <Typography>
                    <strong style={{ color: "#111827" }}>
                      {bp.bulletPointBold}
                    </strong>{" "}
                    {bp.bulletPointRest}
                  </Typography>
                </li>
              ))}
            </ul>
          )}

          <Typography paragraph>
            {selectedInteraction.secondParagraph}
          </Typography>

          <Typography paragraph sx={{ fontWeight: 500 }}>
            {selectedInteraction.thirdParagraph}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Inbox3;
