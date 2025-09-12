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
import { Button, Grid, InputAdornment, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { saveFilteredUsers, saveFilteredContacts } from 'redux/reducers/user.slice';
import { fetchAllContactForOneUser } from 'src/redux/actions/user.action';
import AddIcon from '@mui/icons-material/Add';



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
        <div className='p-56 lg:ltr:pr-0 lg:rtl:pl-0' >
            {/* <HomeTab /> */}
            {/* <Advanced />  */}

        




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
    width: "80%",
    maxWidth:"80%",
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

  {/* 2 */}
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


            <div style={{marginTop:"2rem",width:"150%"}}>
            <CandidateCard /> 
            </div>
        </div>
      }
      // rightSidebarContent={<CandidateAppSidebar />}
      ref={pageLayout}
    />

    </div>
  

  );
  
}

export default withReducer('candidateApp', reducer)(CandidateApp);
