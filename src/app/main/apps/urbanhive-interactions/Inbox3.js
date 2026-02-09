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
        alignItems: "left", 
        // justifyContent: "center", 
        overflowY: "auto", 
        p: 2
      }}
    >
      <Paper
        elevation={0}
        sx={{ 
          p: 3, 
          border: "1px solid #e0e0e0", 
          borderRadius: 8, 
          backgroundColor: "#ffffff", 
          width: "60%",
          maxWidth: "800px",   
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          height: "fit-content",
          // margin: "auto"     
          marginLeft: 6
        }}
      >
        <Box
          sx={{
            "& .MuiTypography-root": {
              fontSize: "1.4rem",
              lineHeight: 1.8,
              color: "#374151",
            },
            "& a": {
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            },
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        >
          {selectedInteraction.subject && (
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, mb: 3, color: "#111827",fontSize: "1.6rem", }}
            >
              {selectedInteraction.subject}
            </Typography>
          )}

          <Typography variant="h4" sx={{ color: "#374151" }}>
            Hello {candidateInFocus?.name || "User"},
          </Typography>

          <br /><br />

          {selectedInteraction.firstParagraph && (
            <Typography>{selectedInteraction.firstParagraph}</Typography>
          )}

          <br /> <br />

          {selectedInteraction.secondParagraph && (
            <Typography>{selectedInteraction.secondParagraph}</Typography>
          )}

          {selectedInteraction.bulletPoints &&
            selectedInteraction.bulletPoints.map((bp, i) => (
              <Box key={bp.id || i}>
                <br />
                •{" "}
                <strong style={{ color: "#111827" }}>
                  {bp.bulletPointBold}
                </strong>
                <br />
                <span>– {bp.bulletPointRest}</span>
                <br /><br />
              </Box>
            ))}

          {selectedInteraction.thirdParagraph && (
            <Typography sx={{ fontWeight: 500 }}>
              {selectedInteraction.thirdParagraph}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Inbox3;
