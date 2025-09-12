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
import { fetchAllContactForOneUser } from 'redux/actions/user.action';
import { saveFilteredContacts } from 'redux/reducers/user.slice';
import { setCurrentChat } from 'redux/reducers/chat.slice';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor:"white",
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


  

  const { user } = useSelector((state) => state.login);
  
  useEffect(() => {
    if (user && user.uid) {
      // Fetch contacts from Firebase for inbox
      dispatch(fetchAllContactForOneUser(user.uid));
    }
  }, [user, dispatch])





  const { allContacts = [],filteredContacts } = useSelector((state) => state.user);


let touchpointData = [];

let onlyTouchpointMessagesData = [];
let onlyEventsMessagesData = [];

console.log("WHAT IS ALL CONTACTS DATA,ON DASHBOARD THAT IS-->",allContacts)
if (allContacts.length > 0) {
  let allMessages = [];
  allContacts.forEach(contact => {
    if (Array.isArray(contact.messageQueue)) {
      allMessages = allMessages.concat(
        contact.messageQueue.map(msg => ({
          ...msg,
          contactName: contact.name,
          contactId: contact.id||contact.uid,
          uid:contact.uid
        }))
      );
    }
  });
  allMessages.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return b.createdAt - a.createdAt;
    }
    return 0;
  });

onlyTouchpointMessagesData = allMessages.filter((item)=>(item.messageType === 'Email')).map((msg, idx) => ({
  id: msg.id || idx,
  title: msg.title || msg.subject || 'No Title',
  subtitle: msg.contactName ? `${msg.contactName}${msg.to ? ' - ' + msg.to : ''}` : (msg.to || ''),
  status: (msg.status && msg.status.toLowerCase() === 'pending') ? 'Pending' : (msg.messageStatus || ''),
  messageType:msg.messageType,
  statusColor: 'grey',
  statusBackground: 'yellow',
  icon: Mail,
  iconColor: '#1976d2',
  uid:msg.uid
}));




onlyEventsMessagesData = allMessages.filter((item)=>(item.messageType === 'Event')).map((msg, idx) => ({
  id: msg.id || idx,
  title: msg.title || msg.subject || 'No Title',
  subtitle: msg.contactName ? `${msg.contactName}${msg.to ? ' - ' + msg.to : ''}` : (msg.to || ''),
  status: (msg.status && msg.status.toLowerCase() === 'pending') ? 'Pending' : (msg.messageStatus || ''),
  messageType:msg.messageType,
  statusColor: 'grey',
  statusBackground: 'yellow',
  icon: Mail,
  iconColor: '#1976d2',
  uid:msg.uid
}));





  touchpointData = allMessages.slice(0, 5).map((msg, idx) => ({
    id: msg.id || idx,
    title: msg.title || msg.subject || 'No Title',
    subtitle: msg.contactName ? `${msg.contactName}${msg.to ? ' - ' + msg.to : ''}` : (msg.to || ''),
    status: (msg.status && msg.status.toLowerCase() === 'pending') ? 'Pending' : (msg.messageStatus || ''),
    statusColor: 'grey',
    statusBackground: 'yellow',
    icon: Mail,
    iconColor: '#1976d2',
    uid:msg.uid
  }));
}



let recentContacts = [];
if (allContacts.length > 0) {
  recentContacts = [...allContacts]
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt - a.createdAt;
      }
      return 0;
    })
    .slice(0, 5);
}



  const statsData = [
    {
      id: 1,
      icon: GroupsIcon,
      count: allContacts?allContacts.length:0,
      label: 'Total Contacts',
      color: '#03befc',
    },
    {
      id: 2,
      icon: WatchLaterIcon,
      count: onlyTouchpointMessagesData?onlyTouchpointMessagesData.length:0,
      label: 'Pending Touchpoints',
      color: '#ca03fc',
    },
    {
      id: 3,
      icon: CalendarMonthIcon,
      count: onlyEventsMessagesData?onlyEventsMessagesData.length:0,
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
  //current events data was mapped left to right and i want the card on the left to show when there are no events
  const eventsData = onlyEventsMessagesData && onlyEventsMessagesData.length? [
 
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
  ]
  
  :

 [
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
   ]
  
  
  ;

  const resortFilteredUsersAndPush = (userId)=>{
    
    const replica = [...filteredContacts]
   
     const index = replica.findIndex(user => user.uid === userId);
   
     if (index > -1) {
       const [matchedUser] = replica.splice(index, 1);
       replica.unshift(matchedUser);
     }
   
     
    dispatch(saveFilteredContacts(replica))
   
   setTimeout(()=>{
     history.push('/candidates')
      },300)
   
    }




  if (!isAuth) return <Redirect to={'/login'}/>
  return (
    <div style={{margin: "30px",backgroundColor:"white"}}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px"
      }}>
        {statsData.map((item, key) => {
          const IconComponent = item.icon;
          // Make Total Contacts, Pending Touchpoints, and Upcoming Events clickable
          const isTotalContacts = item.label === 'Total Contacts';
          const isPendingTouchpoints = item.label === 'Pending Touchpoints';
          const isUpcomingEvents = item.label === 'Upcoming Events';
          const handleClick = () => {
            if (isTotalContacts) {
              history.push('/candidates');
            } else if (isPendingTouchpoints || isUpcomingEvents) {
              history.push('/apps/inbox');
            }
          };
          const clickable = isTotalContacts || isPendingTouchpoints || isUpcomingEvents;
          return (
            <div 
              key={item.id} 
              style={{ 
                background: "#ffffff", 
                padding: "16px", 
                textAlign: "center", 
                borderRadius: "6px",
                cursor: clickable ? "pointer" : "default",
                boxShadow: isTotalContacts
                  ? "0 0 0 2px #03befc33"
                  : isPendingTouchpoints
                  ? "0 0 0 2px #ca03fc33"
                  : isUpcomingEvents
                  ? "0 0 0 2px #03bafc33"
                  : undefined
              }}
              onClick={clickable ? handleClick : undefined}
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



   <div >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: 'flex', alignItems: "center" }}>
                <CalendarMonthIcon sx={{ width: 25, height: 25, marginRight: "4px" }} />
                <h3>Upcoming Events (Next 7 Days)</h3>
              </div>
              <button 
                style={{ 
                  border: `2px solid grey`, 
                  padding: "4px 7px", borderRadius: "6px", color: "grey"
                }}
                onClick={() => history.push('/events')}
              >
                View All
              </button>
            </div>

            <div style={{ background: "white", borderRadius: "4px", marginTop: "18px", padding: "42px 12px" ,height:"87.5%",maxHeight:"87.5%",position:"relative"}}>
              
            {onlyEventsMessagesData.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: '16px 0' }}>No pending events found.</div>
            ) : (
              onlyEventsMessagesData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div 
                  
                  onClick={()=>{
                    console.log("FROM DASHBOARD, THE USER WE SELECTED IS -->" ,allContacts.filter((contact)=>(contact.uid === item.uid))[0])
                    
                    dispatch(setCurrentChat(
                      //we are assuming we will always get something..risky dagogo- aug -14 2025
                      allContacts.filter((contact)=>(contact.uid === item.uid))[0]
                    ))

                    setTimeout(()=>{history.push('/apps/inbox')},300)
                  }}
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                      cursor:"pointer",
                     
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
                      {item.status?item.status:"Pending"}
                    </p>
                  </div>
                );
              })
            )}


                   
              <button 
                style={{ 
                  border: "2px solid #0367fc", padding: "4px 7px", marginTop: "24px", borderRadius: "6px",
                  display: "block", marginLeft: "auto", marginRight: "auto", color: "#0367fc",position:"absolute",bottom:"13%",left:"35%",
                }}
                onClick={() => history.push('/events')}
              >
                {"Add Event To Contact"}
              </button>


            </div>
          </div>

        
     
              
{
        eventsData.map((event) => (
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
                onClick={event.headerTitle === "Upcoming Events (Next 7 Days)" ? () => history.push('/events') : undefined}
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
                onClick={event.headerTitle === "Upcoming Events (Next 7 Days)" ? () => history.push('/events') : undefined}
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
                onClick={() => history.push('/apps/inbox')}
              >
                View All
              </button>
            </div>

            <div style={{ background: "white", borderRadius: "4px", marginTop: "18px", padding: "42px 12px" }}>
              
            {onlyTouchpointMessagesData.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: '16px 0' }}>No pending touchpoints found.</div>
            ) : (
              onlyTouchpointMessagesData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div 
                  onClick={()=>{
                    console.log("FROM DASHBOARD, THE USER WE SELECTED IS -->" ,allContacts.filter((contact)=>(contact.uid === item.uid))[0])
                    dispatch(setCurrentChat(
                      //we are assuming we will always get something..risky dagogo- aug -14 2025
                      allContacts.filter((contact)=>(contact.uid === item.uid))[0]
                    ))

                    setTimeout(()=>{history.push('/apps/inbox')},300)
                  }}
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                      cursor:"pointer"
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
                      {item.status?item.status:"Pending"}
                    </p>
                  </div>
                );
              })
            )}


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
                onClick={() => history.push('/candidates')}
              >
                View All
              </button>
            </div>

            <div style={{ background: "white", borderRadius: "4px", marginTop: "18px", padding: "42px 12px",cursor:"pointer" }}>
              
            {recentContacts.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#888', padding: '16px 0' }}>No contacts found.</div>
            ) : (
              recentContacts.map((user, idx) => {
                const initials = user.initials || (user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : '?');
                const name = user.name || 'Unknown';
                const role = user.role || user.companyName || '';
                const date = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';
                const photoUrl = user.photoUrl;
                return (
                  <div
                    key={user.id || idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center"}}
                     onClick={()=>{
                     console.log("FILTERED USERS FROM DASHBOARD-->",user)
                      resortFilteredUsersAndPush(user.uid)

                     }}
                    >
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={name}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            marginRight: "12px",
                            objectFit: "cover",
                            border: "2px solid #01bcc0"
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            marginRight: "12px",
                            background: "#01bcc0",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "12px"
                          }}
                        >
                          {initials}
                        </div>
                      )}
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: "bold" }}>{name}</p>
                        <p style={{ fontSize: "12px" }}>{role}</p>
                      </div>
                    </div>
                    <p
                      style={{
                        padding: "4px 12px",
                        borderRadius: "4px"
                      }}
                    >
                      {date}
                    </p>
                  </div>
                );
              })
            )}



            </div>
          </div>

      </div>
      

    </div>
  

  );
  
}

export default withReducer('candidateApp', reducer)(DashboardApp);
