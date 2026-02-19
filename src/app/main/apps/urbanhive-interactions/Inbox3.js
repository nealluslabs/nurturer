import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Divider, Chip } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "@material-ui/core";
import { useState } from "react";
import clsx from 'clsx';


import holiday1 from 'src/images/thanksgiving1.png'
import holiday2 from 'src/images/thanksgiving2.png'
import birthday1 from 'src/app/main/urbanhive-assets/birthday1.png'
import birthday2 from 'src/images/Birthday_2.png'


const useStyles = makeStyles((theme) => ({
  messageRow: {
    '&.contact': {
      '& .bubble': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        '& .time': {
          marginLeft: 12,
        },
      },
      '&.first-of-group': {
        '& .bubble': {
          borderTopLeftRadius: 20,
        },
      },
      '&.last-of-group': {
        '& .bubble': {
          borderBottomLeftRadius: 20,
        },
      },
    },
    '&.me': {
      paddingLeft: 40,

      '& .avatar': {
        order: 2,
        margin: '0 0 0 16px',
      },
      '& .bubble': {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        '& .time': {
          justifyContent: 'flex-end',
          right: 0,
          marginRight: 12,
        },
      },
      '&.first-of-group': {
        '& .bubble': {
          borderTopRightRadius: 20,
        },
      },

      '&.last-of-group': {
        '& .bubble': {
          borderBottomRightRadius: 20,
        },
      },
    },
    '&.contact + .me, &.me + .contact': {
      paddingTop: 20,
      marginTop: 20,
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopLeftRadius: 20,
        paddingTop: 13,
      },
    },
    '&.last-of-group': {
      '& .bubble': {
        borderBottomLeftRadius: 20,
        paddingBottom: 13,
        '& .time': {
          display: 'flex',
        },
      },
    },
  },
}));

function Inbox3(props) {
  const classes = useStyles(props);
  const { candidateInFocus, selectedInteraction } = useSelector(
    (state) => state.user || {},
  );

  const { isAuth, user } = useSelector((state) => state.login);


  

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);

  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);



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
     



<div /*onClick={handleSave}*/ className="
  flex flex-col 
  pt-16 px-16 
  pb-40 
  pl-0 -ml-10         
  pr-0   
  w-3/5 mx-auto
  sm:w-full            
  sm:pl-56 sm:ml-0    
  sm:pr-56            
" >


       {<Paper
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
              //fontSize: "1.4rem",
              lineHeight: 1,
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

          <Typography   sx={{ color: "#374151",fontSize: "1.4rem" }}>
            Hello {candidateInFocus?.name || "User"},
          </Typography>

          <br /><br />

          {selectedInteraction.firstParagraph && (
            <span style={{fontSize: "1.4rem" }}>{selectedInteraction.firstParagraph}</span>
          )}

          <br />
          <br />
         

          {selectedInteraction.secondParagraph && (
            <span style={{fontSize: "1.4rem" }}>{selectedInteraction.secondParagraph}
             <br />
             <br />
            </span>
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
                <br />
              </Box>
            ))}
               <br />
              <br />
          {selectedInteraction.thirdParagraph && (
            <span style={{ fontSize: "1.4rem" }}>
              {selectedInteraction.thirdParagraph}
              <br />
              <br />
              <br />
              <br />
            </span>

            
          )}
        </Box>
      </Paper>}
         
          </div>
    </Box>
  );
}

export default Inbox3;
