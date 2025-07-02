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
import GroupsIcon from '@mui/icons-material/Groups';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmailIcon from '@mui/icons-material/Email';
import InventoryIcon from '@mui/icons-material/Inventory';
import SendIcon from '@mui/icons-material/Send';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Mail } from '@mui/icons-material';

//images
import HolidayOneCard from 'src/images/Holiday_1.png'

const useStyles = makeStyles((theme) => ({
  content: {
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));

function HolidayOneApp(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.login);
  const { allUsers, isLoading } = useSelector((state) => state.user);
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);


 

  if (!isAuth) return <Redirect to={'/login'}/>
  return (
    <div style={{margin: "30px"}}>


      <div style={{
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
        gap: "16px",
        margin: "26px 2px"
      }}>

        
       

        
          <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
           
            <div style={{ width:"50%",height:"50%",background:"white", borderRadius: "4px", marginTop: "18px", padding: "42px 12px",display:"flex",justifyContent:"center",alignItems:"center" }}>
             
                 <img src={HolidayOneCard}/>

            </div>
          </div>

      </div>
      

    </div>
  

  );
  
}

export default withReducer('candidateApp', reducer)(HolidayOneApp);
