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
  } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.login);
  const history = useHistory();

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
    if (filteredContacts && filteredContacts.length > 0) {
      setOutput(
        filteredContacts.map(
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
  }, [filteredContacts, connects]);

  useEffect(() => {
    dispatch(updateLastActive(user.uid));
  }, []);

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
      output.map((users) => {
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
                    Follow Up Date • {users.sendDate? getFutureDate(users.sendDate):"August 1st 2025"}{" "}
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
                          reactSwipeEl.next();
                          inviteSkip(0, users.uid);
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
                  <Box m={0} p={2}>
                    {/* <Button onClick={rollOver} style={{ backgroundColor: 'black', color: 'white'}}>Roll Over Invite</Button> */}

                    <h4 style={{display:"flex",justifyContent:"flex-start",gap:"1rem"}}>
                    <FaPencilAlt/>   <b>Notes</b>
                    </h4>
                    {users.notes && users.notes.length && 
                    <>
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
                    
                   { /*: (
                      'N/A' 
                      
                    )*/}
                    </>
                    }

             {users.frequency &&
                    <>
                    <br />
                    <h4>
                      <b>Frequency</b>
                    </h4>
                   
                    
                    <p style={{display:"flex",justifyContent:"flex-start",gap:"1rem",marginTop:"0.5rem"}}>
                    <p>{users.frequency}</p>   <FaPencilAlt/>
                    </p>
                   
                    <br />
                    <br />
                    </>
                     }

                     {users.triggers && users.triggers.length &&
                     <>
                    <h4>
                      <b>Triggers</b>
                    </h4>
                   
                    {users.triggers ?
                   
                   users.triggers.map((item,index)=>(
                   `${item}${index !== users.triggers.length-1?',':''} `))
                   
                   
                    : "N/A"}
                    <br />
                    <br />
                    </>
                    }


                {users.interests && users.interests.length &&
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
    <>
      {isLoading ? (
        <center> {/*<LinearProgress color="secondary" />*/}</center>
      ) : (
        userList.length > 0 && (
          <div style={{ height: "100vh", width: "70vw" }}>
            <ReactSwipe
              key={userList.length}
              className="carousel"
              swipeOptions={{ continuous: true }}
              ref={(el) => (reactSwipeEl = el)}
            >
              {userList}
            </ReactSwipe>
          </div>
        )
      )}
    </>
  );
}

export default CandidateCard;
