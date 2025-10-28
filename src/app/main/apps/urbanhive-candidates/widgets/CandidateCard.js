import React, { useState, useEffect } from "react";
import "../style/index.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ReactSwipe from "react-swipe";
import "../style/swipe.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRealTimeConnections,
  fetchRealTimeConnections2,
  initiateConnection,
  rollOverConnections,
} from "src/redux/actions/user.action";
import { updateLastActive } from "src/redux/actions/auth.action";
import { useHistory } from "react-router";
import { saveCandidateInFocus } from "redux/reducers/user.slice";
import AddIcon from "@mui/icons-material/Add";
import { FaPencilAlt } from "react-icons/fa";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import FuseLoading from "@fuse/core/FuseLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& > *": {
      margin: theme.spacing(1),
    },
  },
  divider: {
    background: "#f4a50c",
  },
}));

function CandidateCard() {
  let reactSwipeEl;
  const dispatch = useDispatch();
  const {
    allUsers,
    filteredUsers,
    allContacts,
    filteredContacts,
    connects,
    isLoading,
    candidateInFocus,
  } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.login);
  const history = useHistory();
  const [startIndex, setStartIndex] = useState(0);

  let unsubscribe;
  const notifyInvite = () =>
    toast.success("🦄 Invited!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySkip = () =>
    toast.error("😟 Skipped!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyUndo = () =>
    toast.warn("🔃 Undo!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const canSwipe = 0;

  const classes = useStyles();

  // function inviteSkip(type, user2) {
  const inviteSkip = (type, user2) => {
    if (user.usedConnection >= 5 && type == 1) {
      alert("Sorry, You have 0 connection limit for this month");
      return;
    } else {
      if (type == 1) {
        //notifyInvite();
      } else if (type == 0) {
        /*notifySkip();*/
      } else if (type == -1) {
        /* notifyUndo();*/
      }
    }
    if (type != -1) {
      //console.log("USER BEFORE CONNECTING--->",user2)
      dispatch(initiateConnection(type, user.uid, user2, user.usedConnection));
    }
  };

  const rollOver = () => {
    // dispatch(rollOverConnections());
    let isFirstDayOfMonth = new Date().toISOString().slice(8, 10) === "01";

    isFirstDayOfMonth
      ? console.log("Yes, Today is first day of month:- " + isFirstDayOfMonth)
      : console.log("No, Today date is:- " + isFirstDayOfMonth);
  };

  useEffect(() => {
    // Use candidateInFocus if available (from table view), otherwise use filteredContacts
    const contactsToUse = (candidateInFocus && candidateInFocus.length > 0) ? candidateInFocus : filteredContacts;
    
    if (contactsToUse && contactsToUse.length > 0) {
      setOutput(
        contactsToUse.map(
          ({
            uid,
            name,
            email,
            eventsAlert,
            triggersAlert,
            touchesAlert,
            triggers,
            isTechnical,
            skills_needed,
            lookingFor,
            intro,
            notes,
            industry,
            state,
            sendDate,
            photoUrl,
            lastActive,
            skillset,
            city,
            phone,
            messageQueue,
            companyName,
            jobTitle,
            birthday,
            workAnniversary,
            interests,
            frequency,
          }) => ({
            uid,
            name,
            email,
            eventsAlert,
            triggersAlert,
            touchesAlert,
            isTechnical,
            skills_needed,
            lookingFor,
            triggers,
            intro,
            notes,
            sendDate,
            industry,
            state,
            phone,
            photoUrl,
            lastActive,
            skillset,
            city,
            companyName,
            jobTitle,
            birthday,
            messageQueue,
            workAnniversary,
            interests,
            frequency,
            ...(connectsById[uid] || {
              type: "",
              status: "",
              invited_amt: "",
              skipped_amt: "",
            }),
          })
        )
      );
    }
  }, [filteredContacts, connects, candidateInFocus]);

  useEffect(() => {
    dispatch(updateLastActive(user.uid));
  }, []);

  const [currentIndex,setCurrentIndex] = useState(0)

  

  useEffect(() => {
    //we 
    if(candidateInFocus && !candidateInFocus.name || !candidateInFocus){
    dispatch(saveCandidateInFocus(filteredContacts[0]));

    }

    if(candidateInFocus){
      dispatch(saveCandidateInFocus(filteredContacts.filter((item)=>(item.uid === candidateInFocus.uid))[0]));
    }
  }, [filteredContacts]);

  // Handle selected contact from table view
  useEffect(() => {
    const selectedContactIndex = localStorage.getItem('selectedContactIndex');
    if (selectedContactIndex && candidateInFocus && candidateInFocus.length > 0) {
      const index = parseInt(selectedContactIndex);
      setStartIndex(index);
      // Clear the stored index after using it
      localStorage.removeItem('selectedContactIndex');
      localStorage.removeItem('selectedContact');
      
      // Navigate to the selected contact after a brief delay to ensure ReactSwipe is ready
      setTimeout(() => {
        if (reactSwipeEl && reactSwipeEl.slide) {
          reactSwipeEl.slide(index, 0); // Navigate to specific index with 0ms duration
        }
      }, 100);
    }
  }, [candidateInFocus]);

  useEffect(() => {
    unsubscribe = dispatch(fetchRealTimeConnections(user.uid));
    unsubscribe = dispatch(fetchRealTimeConnections2(user.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);


  function getFutureDate(sendDate) {
    const daysToAdd = parseInt(sendDate, 10);
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysToAdd);
  
    const day = futureDate.getDate();
    const month = futureDate.toLocaleString('default', { month: 'long' });
    const year = futureDate.getFullYear();
  
    // Get ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (n) => {
      if (n >= 11 && n <= 13) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
  
    return `${month} ${dayWithSuffix} ${year}`;
  }

 
  

  const connectsById = Object.fromEntries(
    connects.map(({ user2, type, status, invited_amt, skipped_amt }) => [
      user2,
      { type, status, invited_amt, skipped_amt },
    ])
  );

  const [output, setOutput] = useState([]);
  console.log("OUTPUT IS --->",output)

  const handleSearchResults = (searchTerm) => {
    setOutput(
      filteredContacts.filter((item) => {
        if (!searchTerm) return true; // Show all items if searchTerm is empty

        try {
          const regex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive matching
          return item.name && regex.test(item.name);
        } catch (e) {
          return false; // If invalid regex, don't match anything
        }
      })
    );
  };

  // const userList = allUsers.length ? (
  const userList =
    output && output.length ? (
      // allUsers.map(users => {
      output.map((users,index) => {
        return (
          <Grid container sx={{ marginTop: "2rem",width:"100%",display:"flex",justifyContent:"flex-start",gap:"0rem" }}>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
             <Grid
      container
      sx={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "flex-start",
        justifyContent: "space-between", // ensures fixed-width box is at end
        
        width: "97.5%",
        gap: { xs: "1rem", sm: "0" },
      }}
    >
      {/* 1️⃣ LEFT SECTION - Avatar */}
      <Grid
        item
        sx={{
          flex: 1,
          mx: "0.3rem",
          marginTop: "1rem",
         
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Avatar
          alt={users.name}
          src={users.photoUrl}
          sx={{
            width: 180,
            height: 180,
            position: "relative",
            left: "0.8rem",
          }}
        />
      </Grid>

      {/* 2️⃣ MIDDLE SECTION - Info */}
      <Grid
        item
        sx={{
          flex: 1,
          mx: "0rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          
          padding: "1rem",
        }}
      >
        <Typography
          gutterBottom
          variant="subtitle5"
          component="div"
          sx={{ fontSize: "23px", fontWeight: "bold" }}
        >
          {users.name}
        </Typography>

        <Typography variant="body2" gutterBottom sx={{ fontSize: "13px" }}>
          Follow Up Date • {users.sendDate ? getFutureDate(users.sendDate) : "-"}
        </Typography>

        <Box mt={1} />

        <Typography
          variant="body2"
          gutterBottom
          sx={{ fontSize: "15px", maxWidth: "15rem", fontWeight: "bold" }}
        >
          {users?.companyName && users?.jobTitle
            ? `${users.companyName} - ${users.jobTitle}`
            : "Boeing - CFO"}
        </Typography>

        {users.email && (
          <Typography variant="body2" gutterBottom sx={{ fontSize: "13px" }}>
            {users.email}
          </Typography>
        )}

        {users.phone && (
          <Typography variant="body2" gutterBottom sx={{ fontSize: "13px" }}>
            {users.phone}
          </Typography>
        )}
      </Grid>

      {/* 3️⃣ RIGHT SECTION - Fixed-width Box */}
      <Grid
        item
        sx={{
          flexShrink: 0,
          width: { xs: 230, sm: 300, md: 350 },
          marginTop: "1rem",
        }}
      >
        <Box
          sx={{
            border: "1px solid black",
            height: 210,
            paddingTop: "30px",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: "3rem",
            }}
          >
            <Button
              onClick={() =>
                history.push({
                  pathname: "/events",
                  state: {
                    name: users.name,
                    email: users.email,
                  },
                })
              }
              style={{
                backgroundColor: "#21C9CF",
                color: "white",
                px: 2,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                "&:hover": { backgroundColor: "#1db8be" },
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add Events
            </Button>
          </Box>

          <Divider sx={{ border: "1px dotted grey", mb: 3 }} />

          <Box className={classes.root}>
            <ButtonGroup
              size="large"
              variant="contained"
              color="primary"
              aria-label="large contained primary button group"
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              {/* Prev Button */}
              <Button
                onClick={() => {
                  reactSwipeEl.prev();
                  inviteSkip(-1, users.uid);
                  const prevIndex = currentIndex - 1;
                  const prevUser =
                    output[prevIndex] || output[output.length - 1];
                  dispatch(saveCandidateInFocus(prevUser));
                  setCurrentIndex(
                    prevIndex !== -1 ? prevIndex : output.length - 1
                  );
                }}
                style={{
                  backgroundColor: !canSwipe ? "#21C9CF" : undefined,
                }}
              >
                Prev
              </Button>

              {/* Edit Button */}
              <Button
                onClick={() => {
                  dispatch(saveCandidateInFocus(users));
                  setTimeout(() => history.push("/apps/profile-update"), 700);
                }}
                style={{
                  backgroundColor: "#21C9CF",
                  color: "#fff6bd",
                }}
              >
                Edit
              </Button>

              {/* Next Button */}
              {users.uid !== user.uid ? (
                <Button
                  onClick={() => {
                    const nextIndex = currentIndex + 1;
                    const nextUser =
                      output[nextIndex] || output[0];
                    dispatch(saveCandidateInFocus(nextUser));
                    setCurrentIndex(
                      nextIndex < output.length ? nextIndex : 0
                    );
                    reactSwipeEl.next();
                    inviteSkip(0, users.uid);
                  }}
                  style={{
                    backgroundColor: !canSwipe ? "#21C9CF" : undefined,
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => alert("You cannot invite yourself")}
                  sx={{
                    backgroundColor: "#21C9CF",
                    color: "black",
                  }}
                >
                  Next
                </Button>
              )}
            </ButtonGroup>
          </Box>
        </Box>
      </Grid>
    </Grid>

            <Grid>
              <Grid item container sx={{display:"flex",justifyContent:"flex-start",width:"100%"}}>
                <Grid item xs={12} sm={12} md={12}>
                  <Box m={0} p={2} style={{display:"block",width:"28rem"}}>
                    {/* <Button onClick={rollOver} style={{ backgroundColor: 'black', color: 'white'}}>Roll Over Invite</Button> */}
                   
                    {/*users.notes && users.notes.length && 
                   <>
                   <h4 style={{display:"flex",justifyContent:"flex-start",gap:"1rem"}}>
                      <b>Notes</b>
                    </h4>
                    
                    
                    {
                      parseInt(users.notes.length) > 35 ? (
                        <p>{users.notes}</p>
                      ) : (
                        <>
                          <p>
                            {users.notes}{" "}
                            <span style={{ opacity: "0", userSelect: "none" }}>
                              {
                                " (:............................................................................................................................................................................................................................................... ................................................... :)"
                              }
                            </span>
                          </p>
                        </>
                      )
                    }
                    
                   
                    </>
                    */}

             {/*users.frequency && users.frequency !== "None" && users.frequency.length > 0 && users.frequency != " " &&*/
                    <>
                    <br />
                    <h4>
                      <b>Frequency</b>
                    </h4>
                   
                    
                    <p style={{display:"flex",justifyContent:"flex-start",gap:"1rem",marginTop:"0.5rem",marginBottom:"0.6rem"}}>
                    <p>{users.frequency}</p>   
                    </p>
                   
                    
                    </>
                     }

                     {users.triggers && users.triggers.length > 0 &&
                     <div style={{marginBottom:"0.6rem"}}>
                    <h4>
                      <b>Triggers</b>
                    </h4>
                   
                    {users.triggers ?
                   
                   users.triggers.map((item,index)=>(
                   `${item}${index !== users.triggers.length-1?',':''} `))
                   
                   
                    : "N/A"}
                    
                    <br />
                    </div>
                    }


                {users.interests && users.interests.length > 0 &&
                <> 
                    <h4>
                      <b>Interests</b>
                    </h4>
                   
                    {users.interests ?

                     users.interests.map((item,index)=>(
                 `${item}${index !== users.interests.length-1?',':''} `))


                      : "N/A"}
                    </>
                     }


                  </Box>
                </Grid>
              </Grid>
            </Grid>




      
          </Grid>
        );
      })
    ) : (
      <div className="container">
        <center>
          <p className="center" sx={{ position: "absolute", top: "10rem" }}>
            No available contacts yet
          </p>
        </center>
      </div>
    );

  return (
    <Grid style={{width:"100%"}}>
      { userList && !userList.length?(
        <center style={{position:"relative",top:"5rem",zIndex:"1000",height:"100vh"}}> {
        <div style={{marginTop:"15rem"}}>
        <FuseLoading />
        </div>
        
        }</center>
      ) : ( 
        userList.length > 0 && (
          <Box sx={{ height: {xs:"120vh",sm:"100%",display:{xs:"flex",sm:"block"},justifyContent:"center",alignItems:"center"}, width: "97%" }}>
            <ReactSwipe
              key={`${userList.length}-${startIndex}`}
              className="carousel"
              swipeOptions={{ 
                continuous: true,
                startSlide: startIndex
              }}
              ref={(el) => (reactSwipeEl = el)}
            >
              {userList}
            </ReactSwipe>
          </Box>
        )
      )}
    </Grid>
  );
}

export default CandidateCard;
