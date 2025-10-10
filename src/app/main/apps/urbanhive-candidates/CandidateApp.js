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
import { Link, useHistory, Redirect } from 'react-router-dom';
import { logout } from 'src/redux/actions/auth.action';
import { fb, db, auth } from 'config/firebase';
import { Box, Button, Grid, InputAdornment, TextField, Switch } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { saveFilteredUsers, saveFilteredContacts } from 'redux/reducers/user.slice';
import { fetchAllContactForOneUser } from 'src/redux/actions/user.action';
import AddIcon from '@mui/icons-material/Add';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';



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
  const { allUsers, allContacts, filteredUsers, filteredContacts, isLoading } = useSelector((state) => state.user);
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const [testWork, setTestWork] = useState(false)

   // Fetch contacts when component mounts
   useEffect(() => {
    setTimeout(()=>{
    setTestWork(true)
    },1200
    )


  }, [filteredContacts]);



  // Fetch contacts when component mounts
  useEffect(() => {
    if (user && user.uid && !filteredUsers) {
      dispatch(fetchAllContactForOneUser(user.uid));
    }
  }, [dispatch, user]);

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
  ];


  if (!isAuth) return <Redirect to={'/login'}/>
  // If user has no contacts, redirect to profile page to add contacts
  if (allContacts && Array.isArray(allContacts) && allContacts.length === 0) {
    history.replace('/apps/profile');
    return null;
  }
  return (
    <div style={{margin: "30px"}}>
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

*/}


            <div style={{marginTop:"2rem"}}>
            <CandidateCard /> 
            </div>
          {testWork &&
           <Box sx={{
            display: "flex",
            flexDirection:{xs:"column",md:"row"},
            width:"95%",
            gap: "12px",
            margin:"0px 0",
            marginTop:{xs:"-0rem",sm:"-11rem"}
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
            }
                  
        </div>
      }
      ref={pageLayout}
    />

    </div>
  

  );
  
}

export default withReducer('candidateApp', reducer)(CandidateApp);
