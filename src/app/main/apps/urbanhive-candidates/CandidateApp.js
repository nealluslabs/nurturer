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
import { fetchAllContactForOneUser } from 'src/redux/actions/user.action';
import AddIcon from '@mui/icons-material/Add';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';



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
  const [testWork, setTestWork] = useState(false);
  const [viewMode, setViewMode] = useState('card'); 

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

  const switchItems = [
    { id: 1, title: 'Birthdays', enabled: false },
    { id: 2, title: 'Holiday', enabled: false },
    { id: 3, title: 'Triggers', enabled: false },
  ]


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
                    backgroundColor: viewMode === 'card' ? '#20dbe4' : 'transparent',
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
                    backgroundColor: viewMode === 'list' ? '#20dbe4' : 'transparent',
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
      }
      ref={pageLayout}
    />

    </div>
  

  );
  
}

export default withReducer('candidateApp', reducer)(CandidateApp);
