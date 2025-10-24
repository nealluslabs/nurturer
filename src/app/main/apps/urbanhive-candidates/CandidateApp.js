import FusePageSimple from '@fuse/core/FusePageSimple';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import CandidateCard from './widgets/CandidateCard';
import CandidateCardView from './widgets/CandidateCardView';
import CandidateTableView from './widgets/CandidateTableView';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { logout } from 'src/redux/actions/auth.action';
import { fb, db, auth } from 'config/firebase';
import { Box, Button, Grid, InputAdornment, TextField, Switch, IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { saveFilteredUsers, saveFilteredContacts, saveCandidateInFocus } from 'redux/reducers/user.slice';
import { fetchAllContactForOneUser,updateCandidateNotes } from 'src/redux/actions/user.action';
import AddIcon from '@mui/icons-material/Add';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { update } from 'lodash';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FuseLoading from '@fuse/core/FuseLoading';



const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor:"white",
    width:"100%",
    
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));



function CandidateApp(props) {
  const dispatch = useDispatch();
 
  const history = useHistory();
  const { isAuth, user } = useSelector((state) => state.login);
  const { allUsers, allContacts, filteredUsers, filteredContacts,candidateInFocus, isLoading } = useSelector((state) => state.user);
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const [testWork, setTestWork] = useState(false);
  const [viewMode, setViewMode] = useState('card'); 

  const [candidateNotes, setCandidateNotes] = useState(candidateInFocus && candidateInFocus.notes && candidateInFocus.notes)

   useEffect(() => {
    setTimeout(()=>{
    setTestWork(true)
    },1200
    )


  }, [filteredContacts]);

  const notifyInvite = (message) =>
    toast.success(message, {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    



  // Fetch contacts when component mounts
  useEffect(() => {
    if (user && user.uid && !filteredUsers) {
      dispatch(fetchAllContactForOneUser(user.uid));
    }
  }, [dispatch, user]);

  // Listen for switch to card view event from table
  useEffect(() => {
    const handleSwitchToCardView = (event) => {
      if (event.detail && event.detail.contactsData) {
        // Set the contacts data in Redux so CandidateCard can use it
        dispatch(saveCandidateInFocus(event.detail.contactsData));
      }
      setViewMode('card');
    };

    window.addEventListener('switchToCardView', handleSwitchToCardView);

    return () => {
      window.removeEventListener('switchToCardView', handleSwitchToCardView);
    };
  }, [dispatch]);

  const handleSearchResults = (searchTerm)=>{

   dispatch(saveFilteredContacts(
    allContacts.filter((item) => {
    if (!searchTerm) return true; // Show all items if searchTerm is empty
    try {
    const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive matching
    return item.name && regex.test(item.name);
    } catch (e) {
    return false; // If invalid regex, don't match anything
    }
    })
  ))
  }

  const [loading, setLoading] = useState(true);

  // Force a 1-second delay before showing the actual content
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  const switchItems = [
    { id: 1, title: 'Events', enabled: false },
    { id: 2, title: 'Triggers', enabled: false },
    { id: 3, title: 'Touches', enabled: false },
    
  ]


  useEffect(()=>{

    setTouchpointData(candidateInFocus && candidateInFocus.messageQueue)

    setCandidateNotes(candidateInFocus && candidateInFocus.notes)
  },[candidateInFocus])

  const [touchpointData,setTouchpointData] = useState(candidateInFocus && candidateInFocus.messageQueue?candidateInFocus.messageQueue:[
    {
      id: 1,
      subject: 'Catch Up Email',
      subtitle: 'John Doe - johnsmith@boeing.com',
      status: 'Pending',
      statusColor: 'grey',
      statusBackground: 'yellow',
      icon: MailIcon,
      iconColor: '#1976d2'
    },
    /*   id: 2,
      title: 'Meeting Reminder',
      subtitle: 'Sarah Smith - sarah@example.com',
      status: 'Pending',
      statusColor: 'grey',
      statusBackground: 'yellow',
      icon: MailIcon,
      iconColor: '#1976d2'
    },
    {
      id: 3,
      title: 'Project Update',
      subtitle: 'Mike Johnson - mike@example.com',
      status: 'Pending',
      statusColor: 'grey',
      statusBackground: 'yellow',
      icon: MailIcon,
      iconColor: '#1976d2'
    },
    {
      id: 4,
      title: 'Thank You Note',
      subtitle: 'Emma Wilson - emma@example.com',
      status: 'Pending',
      statusColor: 'grey',
      statusBackground: 'yellow',
      icon: MailIcon,
      iconColor: '#1976d2'
    },
    {
      id: 5,
      title: 'Proposal Review',
      subtitle: 'David Brown - david@example.com',
      status: 'Pending',
      statusColor: 'grey',
      statusBackground: 'yellow',
      icon: MailIcon,
      iconColor: '#1976d2'
    }*/
  ]);


  if (!isAuth) return <Redirect to={'/login'}/>
  // If user has no contacts, redirect to profile page to add contacts
  if (allContacts && Array.isArray(allContacts) && allContacts.length === 0) {
    history.replace('/apps/profile');
    return null;
  }
  return (
    <div style={{margin: "30px"}}>
      <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
    <FusePageSimple
      classes={{
       // header:
       //   'min-h-160 h-160 lg:ltr:rounded-br-20 lg:rtl:rounded-bl-20 lg:ltr:mr-12 lg:rtl:ml-12',
        toolbar: 'min-h-56 h-56 items-end',
        //rightSidebar: 'w-288 border-0 py-12',
        content: classes.content,
      }}
      // header={<CandidateAppHeader pageLayout={pageLayout} />}
      content={

        /*loading ? (
          // When loading, return `null` or a loader placeholder
          <center>
          <FuseLoading/>
          </center>
        ) :*/ 
        <div className='p-24 lg:ltr:pr-0 lg:rtl:pl-0' >
            {/* <HomeTab /> */}
            {/* <Advanced />  */}

        



 {/*
            <Grid 
  container 
  spacing={0}
  sx={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    top: "3rem",
    left: "2.5rem",
    width: {md:"78%",sm:"85%"},
    maxWidth:{md:"78%",sm:"85%"},
    marginBottom: "1.5rem",
    zIndex: 1000,
    flexWrap: "nowrap",   // 🚀 ensures both items stay on same line
    columnGap: "1rem"     // 🚀 sets fixed 1rem gap between items
  }}
>
 
  <Grid item sx={{ flex: "0 0 85%" }}>
    <TextField
      placeholder="Search..."
      onChange={(e) => { handleSearchResults(e.target.value) }}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon 
              style={{ cursor:"pointer" }} 
              onClick={(e)=>{handleSearchResults(e.target.value)}} 
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

 
  <Grid item sx={{ flex: "0 0 20%" }}>
    <button 
      onClick={() => { history.push('/apps/profile') }}
      style={{ 
        backgroundColor: "#21C9CF",
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

*/}


            <div style={{marginTop:"0rem"}}>
            <CandidateCard /> 
            </div> 
          {/*
          testWork &&
           <Box sx={{
            display: "flex",
            flexDirection:{xs:"column",md:"row"},
            width:"95%",
            gap: "12px",
            margin:"0px 0",
            marginTop:{xs:"-0rem",sm:"-11rem"}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              marginBottom: '20px',
              marginTop: '1rem'
            }}>
              <div style={{ 
                display: 'flex', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '8px', 
                padding: '4px' 
              }}>
                <IconButton
                  onClick={() => setViewMode('card')}
                  sx={{
                    backgroundColor: viewMode === 'card' ? '#21C9CF' : 'transparent',
                    color: viewMode === 'card' ? 'white' : '#666',
                    '&:hover': {
                      backgroundColor: viewMode === 'card' ? '#18c8d0' : '#e0e0e0',
                    },
                    marginRight: '4px'
                  }}
                >
                  <ViewModuleIcon />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode('list')}
                  sx={{
                    backgroundColor: viewMode === 'list' ? '#21C9CF' : 'transparent',
                    color: viewMode === 'list' ? 'white' : '#666',
                    '&:hover': {
                      backgroundColor: viewMode === 'list' ? '#18c8d0' : '#e0e0e0',
                    }
                  }}
                >
                  <ViewListIcon />
                </IconButton>
              </div>
            </div>
            
            {viewMode === 'card' ? (
              <>
                <div style={{marginTop:"2rem"}}>
                  <CandidateCard /> 
                </div>
                <CandidateCardView />
              </>
            ) : (
              <CandidateTableView />
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
            backgroundColor: "#21C9CF",
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
          */}

{
  testWork && (
  <Box
        sx={{
          height: "3rem",
          width: "150%",
          backgroundColor: "#f3f4f6",
          marginTop: "-0rem",
          marginBottom:"2rem", // optional top and bottom space
          borderRadius: "0px", // optional, for softer corners
          position:"relative",
          left:"-10rem"
        }}
      >
        
      </Box>
  )
}

{
  testWork && (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "95%",
        gap: "12px",
        margin: "0px 0",
        marginTop: { xs: "-0rem", sm: "-0rem" },
      }}
    >

    
      
       {/**RECENT TOUCHPOINTS */}
      <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: 'flex', alignItems: "center" }}>
              <SendIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
              <h5>Recent Interactions</h5>
            </div>
            <button 
              style={{ 
                border: `2px solid grey`, 
                padding: "4px 7px", 
                borderRadius: "6px", 
                color: "grey",
                fontSize:"0.8rem"
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
            height: "20.6rem" 
          }}>
            {candidateInFocus && touchpointData &&  touchpointData.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: '16px 0' }}>
                No interactions found.
              </div>
            ) : (
              candidateInFocus && touchpointData &&  touchpointData.map((item) => {
                //const IconComponent = item.icon;
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
                      <MailIcon 
                        sx={{ 
                          width: 16, 
                          height: 16, 
                          marginRight: "6px", 
                          color: '#1976d2' 
                        }} 
                      />
                      <div>
                        <p style={{ fontSize: "11px", fontWeight: "bold" }}>{item.subject && item.subject}</p>
                        <p style={{ fontSize: "12px" }}>{" "}</p>
                      </div>
                    </div>
                    <p 
                      style={{ 
                        padding: "4px 12px", 
                        background: 'yellow', 
                        color: item.statusColor, 
                        borderRadius: "4px" 
                      }}
                    >
                      {item.messageStatus?item.messageStatus:"Pending"}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

       {/* NOTES SECTION 2*/}
       <div style={{ flex: 1.5 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SendIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
          <h5>Notes</h5>
        </div>

        <div
          style={{
            background: "white",
            height: "20.6rem",
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
            rows={6}
            placeholder="Enter your notes here..."
            variant="outlined"
            value={candidateNotes}
            onChange={(e)=>{setCandidateNotes(e.target.value)}}
            fullWidth
            sx={{
              width: "90%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#1DDDE4" },
                "&:hover fieldset": { borderColor: "#1DDDE4" },
                "&.Mui-focused fieldset": { borderColor: "#1DDDE4" },
              },
            }}
          />
          <Button
          onClick={()=>{dispatch(updateCandidateNotes(candidateInFocus.uid,candidateNotes,notifyInvite))}}
            variant="contained"
            sx={{
              backgroundColor: "#21C9CF",
              marginTop: "20px",
              fontSize: "12px",
              color: "white",
              padding: "7px 30px",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#18c8d0" },
            }}
          >
            Update
          </Button>
        </div>
      </div>

      {/* NOTES SECTION 3*/}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SendIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
          <h5>Settings</h5>
        </div>

        <div
            style={{
              background: "white",
              borderRadius: "4px",
              marginTop: "18px",
              padding: "42px 12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "20.6rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {switchItems.length === 0 ? (
              <div style={{ textAlign: "center", color: "#888", padding: "16px 0" }}>
                No Interactions.
              </div>
            ) : (
              <>
                <div style={{ flex: 1 ,border:"1px solid #F9F9F9",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                  {switchItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        padding: "7px 0",
                        height:"1.5rem",
                    
                        width:"80%"

            
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
              backgroundColor: "#21C9CF",
              marginTop: "20px",
              fontSize: "12px",
              color: "white",
              padding: "7px 30px",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
              position:"relative",
              top:"-3rem",
              "&:hover": { backgroundColor: "#18c8d0" },
            }}
          >
            Delete Contact
          </Button>
                </div>
              </>
            )}
          </div>
      </div>
    </Box>
  )
}

                  

        </div>
      }
      ref={pageLayout}
    />

    </div>
  

  );
  
}

export default  withReducer('candidateApp', reducer)(CandidateApp);
