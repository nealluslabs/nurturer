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
          <Grid container sx={{ marginTop: "2rem" }}>
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

            <Grid item sx={{ mx: "0.3rem", marginTop: "1rem" }}>
              {/* <ButtonBase sx={{ width: 500, height: 500 }}> */}
              <Avatar
                alt="Remy Sharp"
                src={users.photoUrl}
                style={{ width: "180px", height: "180px" }}
              />
              {/* </ButtonBase> */}
            </Grid>
            <Grid item xs={12} sm container sx={{ marginTop: "1rem" }}>
              <Grid item xs container direction="column" sx={{ mx: "2rem" }}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle5"
                    component="div"
                    style={{ fontSize: "23px" }}
                  >
                    <b>{users.name}</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                    {/* Last Active • {timeSince(users.lastActive)} ago */}
                    Follow Up Date • {users.sendDate? getFutureDate(users.sendDate):"-"}{" "}
                    {/*timeSince(parseInt(users.lastActive))*/}
                  </Typography>
                  <br />
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontSize: "15px", maxWidth: "15rem" }}
                  >
                    <b>
                      {
                        users && users.jobTitle && users.companyName
                          ? `${users.companyName} - ${users.jobTitle}`
                          : "Boeing - CFO" /*users.city*/
                      }
                    </b>
                  </Typography>
                 
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                   {users.email && users.email}
                  </Typography>
                 

                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                   {users.phone && users.phone}
                  </Typography>
                 
                </Grid>
              </Grid>

              <Box
                component="span"
                sx={{
                  p: 10,
                  mx: "1rem",
                  border: "1px solid black",
                  width: { xs: 230, sm: 300 ,md:400},
                  height: 210,
                  paddingTop: "30px",
                  marginRight: "0px",
                }}
              >
                <Grid item sx={{ flex: "0 0 20%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "3rem",
                    }}
                  >
                    <button
                      onClick={() => {
                        history.push({
                          pathname: "/events",
                          state: {
                            name: users.name,
                            email: users.email,
                          },
                        });
                      }}
                      style={{
                        backgroundColor: "#20dbe4",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        textTransform: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AddIcon sx={{ marginRight: "4px" }} />
                      Add Events
                    </button>
                  </div>
                </Grid>

                <Divider style={{ border: "1px dotted grey" }} />
                <br />
                <br />
                <div className={classes.root}>
                  <ButtonGroup
                    size="large"
                    variant="contained"
                    color="primary"
                    aria-label="large contained primary button group"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    }}
                  >
                    <Button
                      onClick={() => {
                        
                        reactSwipeEl.prev();
                        inviteSkip(-1, users.uid);

                         // find prev candidate safely
                         const prevIndex =currentIndex - 1;
                         const prevUser = output[prevIndex];
                     
                         // only dispatch if there is a prev user
                         if (prevUser) {
                           dispatch(saveCandidateInFocus(prevUser));
                         }else{
                          dispatch(saveCandidateInFocus(output[output.length-1]));
                         }
                        
                  
                       if(prevIndex !== -1){
                        setCurrentIndex(prevIndex);
                       }else{
                        setCurrentIndex(output.length-1);
                       }
                      

                      }}
                      style={{ backgroundColor: !canSwipe && "#20dbe4" }}
                    >
                      Prev
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(saveCandidateInFocus(users));
                        setTimeout(() => {
                          history.push("/apps/profile-update");
                        }, 700);
                      }}
                      style={{ backgroundColor: "#20dbe4", color: "#fff6bd" }}
                    >
                      Edit
                    </Button>
                    {users.uid != user.uid ? (
                      <Button
                        onClick={() => {


                           // find next candidate safely
                           const nextIndex = index+1/*currentIndex + 1*/;
                           const nextUser = output[nextIndex];
                       
                           // only dispatch if there is a next user
                           if (nextUser) {
                             dispatch(saveCandidateInFocus(nextUser));
                             
                           }


                           if (nextUser) {
                            dispatch(saveCandidateInFocus(nextUser));
                          }else{
                           dispatch(saveCandidateInFocus(output[0]));
                          }
                         
                   
                        if(nextIndex <= output.length){
                         setCurrentIndex(nextIndex);
                        }else{
                         setCurrentIndex(0);
                        }





                          reactSwipeEl.next();
                          //dispatch(saveCandidateInFocus());
                          inviteSkip(0, users.uid);
                         

                          setCurrentIndex(nextIndex);
                        
                        }}
                        style={{ backgroundColor: !canSwipe && "#20dbe4" }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          alert("You cannot invite yourself");
                        }}
                        style={{ backgroundColor: "#20dbe4", color: "black" }}
                      >
                        Next
                      </Button>
                    )}
                  </ButtonGroup>
                </div>
              </Box>
            </Grid>

            <Grid>
              <Grid item container>
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




       {/*
            <Box sx={{
              display: "flex",
              flexDirection:{xs:"column",md:"row"},
              gap: "12px",
              margin:"0px 0",
              //marginTop:{xs:"-15rem",sm:"-5rem"}
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
                      padding: "4px 7px", borderRadius: "6px", color: "grey"
                    }}
                    onClick={() => history.push('/apps/inbox')}
                  >
                    View All
                  </button>
                </div>

                <div style={{ background: "white", borderRadius: "4px", marginTop: "18px", padding: "42px 12px",boxShadow: '0 2px 8px rgba(0,0,0,0.1)',height:"34.6rem" }}>
                  {users.messageQueue && users.messageQueue.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#888', padding: '16px 0' }}>
                      No interactions found.
                    </div>
                  ) : (
                    users.messageQueue &&  users.messageQueue.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <div 
                          key={item.subject} 
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
                              <p style={{ fontSize: "14px", fontWeight: "bold" }}>{item.subject}</p>
                              <p style={{ fontSize: "12px" }}>{/*item.subtitle}</p>
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
                            {item.messageStatus}
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

                <div style={{ background: "white", height:"34.6rem",borderRadius: "4px", marginTop: "18px", padding: "42px 12px",boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
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
                      fontSize: "14px",
                      color: "white",
                      padding: "10px 20px",
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
                  */}
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
    <>
      <Grid 
  container 
  spacing={0}
  sx={{
    display: "flex",
    flexDirection: {xs:"column",sm:"row"},
    alignItems: "center",
    justifyContent:{sm:"flex-start",xs:"flex-start"},
    position: "relative",
    top: "3rem",
    left: {xs:"-3rem",sm:"2.5rem"},
    width: {md:"78%",sm:"85%",xs:"100%"},
    maxWidth:{md:"78%",sm:"85%",xs:"100%"},
    marginBottom: "1.5rem",
    zIndex: 1000,
    flexWrap: "nowrap",   // 🚀 ensures both items stay on same line
    columnGap: "1rem"     // 🚀 sets fixed 1rem gap between items
  }}
>
  {/* 1 */}
  <Grid item sx={{ flex: "0 0 85%" }}>
    <TextField
      placeholder="Search..."
      onChange={(e) => { /*handleSearchResults(e.target.value)*/ }}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon
              style={{ cursor:"pointer" }} 
              onClick={(e)=>{/*handleSearchResults(e.target.value)*/}} 
            />
          </InputAdornment>
        ),
        sx: {
          height: "3.8rem",
          paddingLeft:"10px",
          "& input": {
            height: "3rem",
            paddingLeft:"10px",
            padding: 0,
            fontSize: "1rem",
          },
        },
      }}
    />
  </Grid>

  {/* 2 */}
  <Grid item sx={{ flex: "0 0 20%",marginTop:{sm:"0rem",xs:"1rem"} }}>
    <button 
      onClick={() => { history.push('/apps/profile') }}
      style={{ 
        backgroundColor: "#20dbe4",
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        textTransform: 'none',
        
      }}
    >
      <AddIcon sx={{ marginRight: '4px' }} />
      New Contact
    </button>
  </Grid>
</Grid>


      { userList && !userList.length?(
        <center style={{position:"relative",top:"5rem",zIndex:"1000"}}> {
        <FuseLoading />
        
        }</center>
      ) : ( 
        userList.length > 0 && (
          <Box sx={{ height: {xs:"120vh",sm:"100%",display:{xs:"flex",sm:"block"},justifyContent:"center",alignItems:"center"}, width: "70vw" }}>
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
    </>
  );
}

export default CandidateCard;
