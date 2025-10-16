import React from 'react';
import { Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { Switch } from '@mui/material';
import { TextField } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

function CandidateCardView() {
  const history = useHistory();
  
  const switchItems = [
    { id: 1, title: 'Birthdays', enabled: false },
    { id: 2, title: 'Holiday', enabled: false },
    { id: 3, title: 'Triggers', enabled: false },
  ];

  const touchpointData = [
    {
      id: 1,
      title: 'Catch Up Email',
      subtitle: 'John Doe - johnsmith@boeing.com',
      status: 'Pending',
      statusColor: 'grey',
      statusBackground: 'yellow',
      icon: MailIcon,
      iconColor: '#1976d2'
    },
  ];

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "95%",
        gap: "12px",
        margin: "0px 0",
        marginTop: { xs: "-0rem", sm: "-25rem" }
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: 'flex', alignItems: "center" }}>
              <SendIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
              <h3>Recent Interactions</h3>
            </div>
            <button 
              style={{ 
                border: `2px solid grey`, 
                padding: "4px 7px", 
                borderRadius: "6px", 
                color: "grey"
              }}
              onClick={() => history.push('/apps/inbox')}
            >
              View All
            </button>
          </div>
          
          <div style={{ 
            background: "white", 
            borderRadius: "4px", 
            marginTop: "18px", 
            padding: "42px 12px",
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            height: "34.6rem" 
          }}>
            {touchpointData.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: '16px 0' }}>
                No interactions found.
              </div>
            ) : (
              touchpointData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={item.id} 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      marginBottom: "16px" 
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconComponent 
                        sx={{ 
                          width: 16, 
                          height: 16, 
                          marginRight: "6px", 
                          color: item.iconColor 
                        }} 
                      />
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: "bold" }}>{item.title}</p>
                        <p style={{ fontSize: "12px" }}>{" "}</p>
                      </div>
                    </div>
                    <p 
                      style={{ 
                        padding: "4px 12px", 
                        background: item.statusBackground, 
                        color: item.statusColor, 
                        borderRadius: "4px" 
                      }}
                    >
                      {item.status}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: "center" }}>
            <SendIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
            <h3>Notes</h3>
          </div>
          
          <div style={{ 
            background: "white", 
            height: "34.6rem",
            borderRadius: "4px", 
            marginTop: "18px", 
            padding: "42px 12px",
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center" 
          }}>
            <TextField
              multiline
              rows={12}
              placeholder="Enter your notes here..."
              variant="outlined"
              fullWidth
              sx={{
                width: '90%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#1DDDE4',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1DDDE4',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1DDDE4',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: "#20dbe4",
                marginTop: "20px",
                fontSize: "12px",
                color: "white",
                padding: "7px 30px",
                borderRadius: "8px",
                textTransform: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                '&:hover': {
                  backgroundColor: "#18c8d0",
                },
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </Box>
                
      <div
        style={{
          display: "flex",
          gap: "12px",
          margin: "26px 0",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SendIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
              <h3>Recent Touchpoints</h3>
            </div>
            <button
              style={{
                border: `2px solid grey`,
                padding: "4px 7px",
                borderRadius: "6px",
                color: "grey",
              }}
              onClick={() => history.push("/apps/inbox")}
            >
              View All
            </button>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "4px",
              marginTop: "18px",
              padding: "42px 12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "34.6rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {switchItems.length === 0 ? (
              <div style={{ textAlign: "center", color: "#888", padding: "16px 0" }}>
                No touchpoints found.
              </div>
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  {switchItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        padding: "7px 0",
                        
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: "500" }}>{item.title}</span>
                      <Switch
                        checked={item.enabled}
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            color: "#1DDDE4",
                            "&:hover": {
                              backgroundColor: "rgba(29, 221, 228, 0.08)",
                            },
                          },
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#1DDDE4",
                            "&:hover": {
                              backgroundColor: "rgba(29, 221, 228, 0.08)",
                            },
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#1DDDE4",
                          },
                          "& .MuiSwitch-track": {
                            backgroundColor: "rgba(29, 221, 228, 0.3)",
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1DDDE4",
                      color: "white",
                      padding: "12px 35px",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#18c8d0",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>


        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <h3>Others</h3>
          </div>

          <div
            style={{
              background: "white",
              height: "34.6rem",
              borderRadius: "4px",
              marginTop: "18px",
              padding: "42px 12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              multiline
              rows={12}
              placeholder=""
              variant="outlined"
              fullWidth
              sx={{
                width: "90%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1DDDE4",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1DDDE4",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1DDDE4",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: "#1DDDE4",
                color: "white",
                padding: "12px 35px",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#18c8d0",
                },
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateCardView;