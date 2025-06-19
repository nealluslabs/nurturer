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
import { InputAdornment, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { saveFilteredUsers } from 'redux/reducers/user.slice';



const useStyles = makeStyles((theme) => ({
  content: {
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));

function CandidateApp(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.login);
  const { allUsers,filteredUsers, isLoading } = useSelector((state) => state.user);
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);


  const handleSearchResults = (searchTerm)=>{

   dispatch(saveFilteredUsers(
    allUsers.filter((item) => {
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
  return (
    <div style={{margin: "30px"}}>
    <FusePageSimple
      classes={{
        header:
          'min-h-160 h-160 lg:ltr:rounded-br-20 lg:rtl:rounded-bl-20 lg:ltr:mr-12 lg:rtl:ml-12',
        toolbar: 'min-h-56 h-56 items-end',
        rightSidebar: 'w-288 border-0 py-12',
        content: classes.content,
      }}
      // header={<CandidateAppHeader pageLayout={pageLayout} />}
      content={
        <div className="p-12 lg:ltr:pr-0 lg:rtl:pl-0">
            {/* <HomeTab /> */}
            {/* <Advanced />  */}

            <TextField
             placeholder="Search..."
             onChange={(e)=>{handleSearchResults(e.target.value)}}
             sx={{ width: "15rem",position:"absolute",right:"60px",top:"3px",zIndex:"1000"}}
             InputProps={{
             
             endAdornment: (
             <InputAdornment position="end">
             <SearchIcon  style={{cursor:"pointer"}} onClick={(e)=>{handleSearchResults(e.target.value)}} />
             </InputAdornment>
             ),
             sx: {
              height: "3rem", 
              paddingLeft:"10px",             // sets the height of the root input wrapper
              "& input": {
                height: "3rem", 
                paddingLeft:"10px",           // sets the height of the input field itself
                padding: 0,                // remove default padding
                fontSize: "1rem",       // optional: shrink font to fit small height
              },
            },
             }}
            />


            <div style={{marginTop:"2rem"}}>
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
