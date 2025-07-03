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

import { Modal, Box } from '@mui/material';

//images
import birthdayOneCard from 'src/images/Birthday_1.png'

const useStyles = makeStyles((theme) => ({
  content: {
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));

function BirthdayOneApp(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.login);
  const { allUsers, isLoading } = useSelector((state) => state.user);
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);


  const statsData = [
    {
      id: 1,
      icon: GroupsIcon,
      count: 3,
      label: 'Total Contacts',
      color: '#03befc',
    },
    {
      id: 2,
      icon: WatchLaterIcon,
      count: 10,
      label: 'Pending Touchpoints',
      color: '#ca03fc',
    },
    {
      id: 3,
      icon: CalendarMonthIcon,
      count: 5,
      label: 'Upcoming Events',
      color: '#03bafc',
    },
    {
      id: 4,
      icon: LightbulbIcon,
      count: 5,
      label: 'Smart Suggestions',
      color: '#03fc5a',
    },
  ];
  
  // The whole card (so you can scale if you want to have multiple cards)
  const eventsData = [
    {
      id: 1,
      headerIcon: CalendarMonthIcon,
      headerTitle: "Upcoming Events (Next 7 Days)",
      buttonText: "View All",
      buttonColor: "#0367fc",
      mainIcon: EventAvailableIcon,
      mainText: "No upcoming events in the next 7 days",
      subText: "Events help you stay connected with meaningful touchpoints",
      actionKey: "Add Event to Contacts",
      details: [
        {
          id: 1,
          icon: CakeIcon,
          iconColor: "#fce703",
          title: "Birthdays",
          description: "Personal connection opportunities",
        },
        {
          id: 2,
          icon: FavoriteIcon,
          iconColor: "#fc0b03",
          title: "Anniversaries",
          description: "Celebrate meaningful milestones",
        },
        {
          id: 3,
          icon: CardGiftcardIcon,
          iconColor: "#03c6fc",
          title: "Custom Event",
          description: "Company launches, conferences, or special dates",
        },
      ], 
    },
    {
      id: 2,
      headerIcon: LightbulbIcon,
      headerTitle: "Smart Suggestion",
      buttonText: "View All",
      buttonColor: "#26b502",
      mainIcon: LightbulbIcon,
      mainText: "No suggestion at the moment",
      subText: "Smart suggestion help you stay proactive with client relationships",
      actionKey: "View Automation Settings",
      details: [
        {
          id: 1,
          icon: EmailIcon,
          iconColor: "#0335fc",
          title: "Email Suggestions",
          description: "Based on contact history and timing",
        },
        {
          id: 2,
          icon: CardGiftcardIcon,
          iconColor: "#03fc5e",
          title: "Card Suggestions",
          description: "For birthday, holidays, and special occassions",
        },
        {
          id: 3,
          icon: InventoryIcon,
          iconColor: "#03c6fc",
          title: "Follow-up Reminders",
          description: "Automated timing based on your settings",
        },
      ], 
    },
  ];


const touchpointData = [
  {
    id: 1,
    title: "Special card for Kala",
    subtitle: "Karla G - 06/02/2025",
    status: "Pending",
    statusColor: "grey",
    statusBackground: "yellow",
    icon: CardGiftcardIcon,
    iconColor: "#26b502",
  },
  {
    id: 2,
    title: "Happy Birthday, Tyler!",
    subtitle: "Tyler Walker - 06/01/2025",
    status: "Failed",
    statusColor: "white",
    statusBackground: "grey",
    icon: Mail,
    iconColor: "blue",
  },
  {
    id: 3,
    title: "Special card for Kala",
    subtitle: "Karla G - 06/02/2025",
    status: "Sent",
    statusColor: "white",
    statusBackground: "green",
    icon: CardGiftcardIcon,
    iconColor: "#26b502",
  },
  {
    id: 4,
    title: "Happy Birthday, Tina!",
    subtitle: "Tina S. - 06/01/2025",
    status: "Failed",
    statusColor: "white",
    statusBackground: "grey",
    icon: Mail,
    iconColor: "blue",
  },
  {
    id: 5,
    title: "Sales is Making a Come Back",
    subtitle: "Karla G - 06/02/2025",
    status: "Pending",
    statusColor: "grey",
    statusBackground: "yellow",
    icon: CardGiftcardIcon,
    iconColor: "#26b502",
  },
];

const users = [
  {
    id: 1,
    name: "Tyler Walker",
    role: "Washup",
    initials: "TW",
    date: "06/01",
    avatarBg: "#1e7a07",
    textColor: "white"
  },
  {
    id: 2,
    name: "Tina S.",
    role: "Svibes",
    initials: "TS",
    date: "06/01",
    avatarBg: "#1e7a07",
    textColor: "white"
  },
  {
    id: 3,
    name: "Karla G",
    role: "EdZone, LLC",
    initials: "KG",
    date: "06/01",
    avatarBg: "#1e7a07",
    textColor: "white"
  },
];



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
             
                 <img src={birthdayOneCard}/>

            </div>
          </div>

      </div>
      

    </div>
  

  );
  
}

export default withReducer('candidateApp', reducer)(BirthdayOneApp);
