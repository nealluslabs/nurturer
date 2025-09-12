import { Typography, Button, Box } from '@material-ui/core';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddIcon from '@mui/icons-material/Add';
import CakeIcon from '@mui/icons-material/Cake';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';

import BirthdayOne from "../../../../images/Birthday_1.png";
import BirthdayTwo from "../../../../images/Birthday_2.png";
import Holiday from "../../../../images/Holiday_1.png";

function CardsContent() {
  return (
    <div style={{ padding: '24px',backgroundColor:"white"}}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}
      >
        <Typography variant="h4">
            <CollectionsIcon sx={{ fontSize: 64 }} />
            Card Templates
        </Typography>

        <button 
          style={{ 
            background: '#20dbe4',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textTransform: 'none', 
            '&:hover': {
              background: 'linear-gradient(to right, #5c0fb8, #a734ff)',
            },
          }}
        >
            <AddIcon sx={{ marginRight: '4px' }} />
            Add new templates
        </button>
      </Box>

      <div style={{ marginTop: "42px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        
        <div style={{ width: "50%", backgroundColor: "white", paddin: "6px", borderRadius: "8px" }}>

          <div 
            style={{ 
              display: "flex", justifyContent: "space-between", alignItems: "center", 
              borderBottom: "1px solid grey", padding: "8px 12px", backgroundColor: "#f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CakeIcon sx={{ mr: 1.5 }} />
              <p style={{ fontSize: "18px", fontWeight: 700 }}>Birthday Cards</p>
            </div>
            <p 
              style={{ 
                color: "white", backgroundColor: "gray", padding: "4px 8px", 
                borderRadius: "8px",
              }}
            >
              2 templates
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "21px 12px", paddingBottom: "24px" }}>
            
            <div style={{ width: "47%", }}>
              <img 
                src={BirthdayOne}
                alt="No image"
                style={{ borderRadius: "4px" }} 
              />
              <p style={{ fontSize: "18px", marginTop: "12px" }}>
                Candles and Confetti
              </p>

              <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                <div
                  style={{ 
                    display: "flex", alignItems: "center", cursor: "pointer", 
                    border: "1px solid blue", padding: "8px", borderRadius: "4px",
                  }}
                >
                  <StarIcon sx={{ mr: 1.5, color: "blue" }} />
                  <p style={{ color: "blue", paddingRight: "2px" }}>Set Default</p>
                </div>

                <div
                  style={{ 
                    display: "flex", alignItems: "center", cursor: "pointer", marginLeft: "8px",
                    border: "1px solid red", padding: "8px", borderRadius: "4px", 
                  }}
                >
                  <DeleteIcon sx={{ mr: 1.5, color: "red" }} />
                </div>
              </div>
            </div>

            <div style={{ width: "47%", }}>
              <img 
                src={ BirthdayTwo }
                alt="No image"
                style={{ borderRadius: "4px" }} 
              />
              <p style={{ fontSize: "18px", marginTop: "12px" }}>
                Candles and Confetti
              </p>

              <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                <div
                  style={{ 
                    display: "flex", alignItems: "center", cursor: "pointer", 
                    border: "1px solid blue", padding: "8px", borderRadius: "4px",
                  }}
                >
                  <StarIcon sx={{ mr: 1.5, color: "blue" }} />
                  <p style={{ color: "blue", paddingRight: "2px" }}>Set Default</p>
                </div>

                <div
                  style={{ 
                    display: "flex", alignItems: "center", cursor: "pointer", marginLeft: "8px",
                    border: "1px solid red", padding: "8px", borderRadius: "4px", 
                  }}
                >
                  <DeleteIcon sx={{ mr: 1.5, color: "red" }} />
                </div>
              </div>
            </div>

          </div>

        </div>

        <div style={{ width: "45%", backgroundColor: "white", paddin: "6px", borderRadius: "8px" }}>

          <div 
            style={{ 
              display: "flex", justifyContent: "space-between", alignItems: "center", 
              borderBottom: "1px solid grey", padding: "8px 12px", backgroundColor: "#f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CakeIcon sx={{ mr: 1.5 }} />
              <p style={{ fontSize: "18px", fontWeight: 700 }}>Anniversary Cards</p>
            </div>
            <p 
              style={{ 
                color: "white", backgroundColor: "gray", padding: "4px 8px", 
                borderRadius: "8px",
              }}
            >
              2 templates
            </p>
          </div>

          <div style={{ padding: "21px 12px", paddingBottom: "24px", textAlign: "center" }}>
            
            <CollectionsIcon sx={{ fontSize: "64px", mt: 2 }} />
            
            <p style={{ fontSize: "18px", marginBottom: "12px", marginTop: "2%" }}>
              No anniversary templates yet
            </p>

            <p style={{ fontSize: "16px", color: "gray", marginBottom: "24px" }}>
              Upload your first Canva design for anniversary cards
            </p>

            <button
              style={{ 
                background: '#20dbe4',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                textTransform: 'none', 
                '&:hover': {
                  background: 'linear-gradient(to right, #5c0fb8, #a734ff)',
                },
              }}
            >
              <AddIcon sx={{ marginRight: '4px' }} />
              Add template
            </button>

          </div>

        </div>

        <div 
          style={{ 
            width: "50%", backgroundColor: "white", padding: "6px", borderRadius: "8px",  
            marginTop: "24px" 
          }}
        >

          <div 
            style={{ 
              display: "flex", justifyContent: "space-between", alignItems: "center", 
              borderBottom: "1px solid grey", padding: "8px 12px", backgroundColor: "#f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CakeIcon sx={{ mr: 1.5 }} />
              <p style={{ fontSize: "18px", fontWeight: 700 }}>Holiday Cards</p>
            </div>
            <p 
              style={{ 
                color: "white", backgroundColor: "gray", padding: "4px 8px", 
                borderRadius: "8px",
              }}
            >
              2 templates
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "21px 12px", paddingBottom: "24px" }}>

            <div style={{ width: "47%", }}>
              <img 
                src={Holiday}
                alt="No image"
                style={{ borderRadius: "4px" }} 
              />
              <p style={{ fontSize: "18px", marginTop: "12px" }}>
                
              </p>

              <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                <div
                  style={{ 
                    display: "flex", alignItems: "center", cursor: "pointer", 
                    border: "1px solid blue", padding: "8px", borderRadius: "4px",
                  }}
                >
                  <StarIcon sx={{ mr: 1.5, color: "blue" }} />
                  <p style={{ color: "blue", paddingRight: "2px" }}>Set Default</p>
                </div>

                <div
                  style={{ 
                    display: "flex", alignItems: "center", cursor: "pointer", marginLeft: "8px",
                    border: "1px solid red", padding: "8px", borderRadius: "4px", 
                  }}
                >
                  <DeleteIcon sx={{ mr: 1.5, color: "red" }} />
                </div>
              </div>
            </div>

          </div>

        </div>

        <div style={{ width: "45%", backgroundColor: "white", padding: "6px", borderRadius: "8px", marginTop: "24px" }}>

          <div 
            style={{ 
              display: "flex", justifyContent: "space-between", alignItems: "center", 
              borderBottom: "1px solid grey", padding: "8px 12px", backgroundColor: "#f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CakeIcon sx={{ mr: 1.5 }} />
              <p style={{ fontSize: "18px", fontWeight: 700 }}>Thank you Cards</p>
            </div>
            <p 
              style={{ 
                color: "white", backgroundColor: "gray", padding: "4px 8px", 
                borderRadius: "8px",
              }}
            >
              0 templates
            </p>
          </div>

          <div style={{ padding: "21px 12px", paddingBottom: "24px", textAlign: "center" }}>

            <CollectionsIcon sx={{ fontSize: "64px", mt: 2 }} />
            
            <p style={{ fontSize: "18px", marginBottom: "12px", marginTop: "2%" }}>
              No anniversary templates yet
            </p>

            <p style={{ fontSize: "16px", color: "gray", marginBottom: "24px" }}>
              Upload your first Canva design for anniversary cards
            </p>

            <button
              style={{ 
                background: '#20dbe4',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                textTransform: 'none', 
                '&:hover': {
                  background: 'linear-gradient(to right, #5c0fb8, #a734ff)',
                },
              }}
            >
              <AddIcon sx={{ marginRight: '4px' }} />
              Add template
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CardsContent;
