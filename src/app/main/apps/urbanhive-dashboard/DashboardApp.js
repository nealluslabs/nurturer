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

const useStyles = makeStyles((theme) => ({
  content: {
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));

function DashboardApp(props) {
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
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px"
      }}>
        {statsData.map((item, key) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.id} 
              style={{ 
                background: "#ffffff", 
                padding: "16px", 
                textAlign: "center", 
                borderRadius: "6px" 
              }}
            >
              <IconComponent sx={{ width: 45, height: 45, color: item.color }} />
              <p style={{ color: "#03befc", fontSize: "21px", fontWeight: "bold" }}>{item.count}</p>
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
        margin: "26px 2px"
      }}>

        
        {eventsData.map((event) => (
          <div key={event.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: 'flex', alignItems: "center" }}>
                <event.headerIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
                <h3>{event.headerTitle}</h3>
              </div>
              <button 
                style={{ 
                  border: `2px solid ${ event.buttonColor ? event.buttonColor : "grey" }`, 
                  padding: "4px 7px", borderRadius: "6px", color: `${ event.buttonColor ? event.buttonColor : "grey" }`
                }}
              >
                {event.buttonText}
              </button>
            </div>

            <div style={{ background: "white", borderRadius: "4px", marginTop: "18px", padding: "42px 12px" }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <event.mainIcon sx={{ width: 65, height: 65 }} />
              </div>
              <h3 style={{ textAlign: "center", marginTop: "2px", fontWeight: "semibold" }}>{event.mainText}</h3>
              <p style={{ textAlign: "center", marginTop: "4px" }}>{event.subText}</p>

              <div style={{ marginTop: "21px" }}>
                {event.details.map((detail) => (
                  <div key={detail.id} style={{ display: 'flex', marginBottom: '8px' }}>
                    <detail.icon sx={{ width: 18, height: 18, marginRight: "10px", color: detail.iconColor }} />
                    <p style={{ marginRight: "7px", fontWeight: "bold" }}>{detail.title}: </p>
                    <p>{detail.description}</p>
                  </div>
                ))}
              </div>

              <button 
                style={{ 
                  border: "2px solid #0367fc", padding: "4px 7px", marginTop: "24px", borderRadius: "6px",
                  display: "block", marginLeft: "auto", marginRight: "auto", color: "#0367fc"
                }}
              >
                {event.actionKey}
              </button>

            </div>
          </div>
        ))}

        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: 'flex', alignItems: "center" }}>
                <SendIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
                <h3>Recent Touchpoints</h3>
              </div>
              <button 
                style={{ 
                  border: `2px solid grey`, 
                  padding: "4px 7px", borderRadius: "6px", color: "grey"
                }}
              >
                View All
              </button>
            </div>

            <div style={{ background: "white", borderRadius: "4px", marginTop: "18px", padding: "42px 12px" }}>
              
            {touchpointData.map((item) => {
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
                      <p style={{ fontSize: "12px" }}>{item.subtitle}</p>
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
            })}


            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: 'flex', alignItems: "center" }}>
                <PersonAddAltIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
                <h3>Recently Added Contacts</h3>
              </div>
              <button 
                style={{ 
                  border: `2px solid grey`, 
                  padding: "4px 7px", borderRadius: "6px", color: "grey"
                }}
              >
                View All
              </button>
            </div>

            <div style={{ background: "white", borderRadius: "4px", marginTop: "18px", padding: "42px 12px" }}>
              
            {users.map((user) => (
              <div 
                key={user.id} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  marginBottom: "16px" 
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div 
                    style={{ 
                      width: "32px", 
                      height: "32px", 
                      borderRadius: "50%", 
                      marginRight: "12px", 
                      //background: user.avatarBg, 
                      background:"#01bcc0",
                      color: user.textColor, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "12px"
                    }}
                  >
                    {user.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>{user.name}</p>
                    <p style={{ fontSize: "12px" }}>{user.role}</p>
                  </div>
                </div>

                <p 
                  style={{ 
                    padding: "4px 12px", 
                    borderRadius: "4px" 
                  }}
                >
                  {user.date}
                </p>
              </div>
            ))}



            </div>
          </div>

      </div>
      

    </div>
  

  );
  
}

export default withReducer('candidateApp', reducer)(DashboardApp);
