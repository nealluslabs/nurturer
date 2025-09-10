import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats,clearChats } from 'src/redux/actions/chat.action';
import { fetchConnectedUsers, fetchConnectedUsers2, fetchRealTimeUsers, fetchAllContactForOneUser } from 'src/redux/actions/user.action';
import ContactListItem from './ContactListItem';
import { closeMobileChatsSidebar } from './store/sidebarsSlice';
import { saveEditedParagraphs } from 'redux/reducers/user.slice';

const statusArr = [
  {
    title: 'Online',
    value: 'online',
  },
  {
    title: 'Away',
    value: 'away',
  },
  {
    title: 'Do not disturb',
    value: 'do-not-disturb',
  },
  {
    title: 'Offline',
    value: 'offline',
  },
];

function InboxSidebar(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchText, setSearchText] = useState('');

  //New Hooks
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  const { user } = useSelector((state) => state.login);
  const { allUsers, connectedUsers, filteredContacts,aiTrigger, connects, connects2, isLoading } = useSelector((state) => state.user);


  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  
  useEffect(() => {
    if (user && user.uid) {
      // Fetch contacts from Firebase for inbox
      dispatch(fetchAllContactForOneUser(user.uid));
    }
  }, [user,aiTrigger, dispatch])
 
  // Remove old connected users fetching - now using filteredContacts from Firebase
  // useEffect(() => {
  //   unsubscribe = dispatch(fetchConnectedUsers(user.uid))
  //   unsubscribe = dispatch(fetchConnectedUsers2(user.uid))
  //   .then(unsubscribe => {
  //     return unsubscribe;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }, []);
  
    //componentWillUnmount - Remove cleanup since we're no longer using unsubscribe
    // useEffect(() => {
    //   return () => {
    //     //cleanup
    //     unsubscribe.then(f => f()).catch(error => console.log(error));
    //   }
    // }, []);
  


  function handleSearchText(event) {
    setSearchText(event.target.value);
    if(event.target.value=== ""||event.target.value=== null ){
      setConnUsers(connectedUsersOutput)
    }
    else{

    setConnUsers(connUsers.filter((item)=>(item.name.toLowerCase().includes(event.target.value.toLowerCase()))))

    console.log("WHO ARE THESE USERS, WHY IS THE SEARCH FAILING--->",connUsers.filter((item)=>(item.name.toLowerCase().includes(event.target.value.toLowerCase()))))
    }
  }


  const initChat = (user2, isMobile) => {
   const user1 = user.uid;
    setChatStarted(true)
    setChatUser(user2.name)
    setUserUid(user2.uid);

    dispatch(clearChats(user1, user2))
     dispatch(fetchChats(user1, user2))
     console.log('IsMobile: ', isMobile);
     if (isMobile) {
        dispatch(closeMobileChatsSidebar());
      }
  }



  const connectsById = Object.fromEntries(
    connects2.map(({ user1, type, status, invited_amt, skipped_amt }) => [user1, { type, status, invited_amt, skipped_amt }])
      );
      


        // Use filteredContacts from Firebase instead of connectedUsers
    let connectedUsersOutput = filteredContacts && filteredContacts.filter((item) => (item.uid !== user.uid)).sort((a, b) => (a.frequencyInDays || 0) - (b.frequencyInDays || 0)).map(({ uid, name, email, city, intro, skillset, skills_needed, 
      lookingFor, lastActive, isTechnical, photoUrl, password, message, companyName, jobTitle, interests, frequency,messageQueue,sendDate},index) => ({
        uid, name, email, city, intro, skillset, skills_needed, 
        lookingFor, lastActive, isTechnical, photoUrl, password, message,messageQueue,sendDate,
        companyName, jobTitle, interests, frequency,
        daysTo:(3 +3*(index+1)).toString()+ " " + "Days" ,
      ...(connectsById[uid] || { type: '', status: '', invited_amt: '', skipped_amt: ''})
    }));

  const [connUsers,setConnUsers] = useState([...connectedUsersOutput].sort((a, b) => (a.frequencyInDays || 0) - (b.frequencyInDays || 0)) )
  console.log("CONN USERS-->",connUsers)

      useEffect(()=>{

        setConnUsers(connectedUsersOutput)

      },[])

  


  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={0}>
        
            <Toolbar className="px-16">
              <Paper className="flex p-4 items-center w-full px-8 py-4 shadow">
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Search or start new chat"
                  className="flex flex-1 px-8"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    'aria-label': 'Search',
                  }}
                  onChange={handleSearchText}
                />
              </Paper>
            </Toolbar>
        
      </AppBar>

      {/* Chats List */}
      <FuseScrollbars className="overflow-y-auto flex-1">
        <List className="w-full">
         
        
            
              <motion.div
                className="flex flex-col flex-shrink-0"
                variants={container}
                initial="hidden"
                animate="show"
              >
             {/* <button onClick={() => testConnections()}>Please Click Me😌</button> */}
             {connectedUsersOutput.length > 0 && (
                  <motion.div variants={item}>
                    <Typography className="font-medium text-20 px-16 py-24" color="secondary">
                      Touches | Events
                    </Typography>
                  </motion.div>
                )}

              
                {
                  connUsers && connUsers.length ? (
                    connUsers.map((user) => {
                      return(
                        <motion.div variants={item} key={user.uid}>
                        <ContactListItem
                          user={user}
                        //   onContactClick={(contactId) => dispatch(getChat({ contactId, isMobile }))}
                          onContactClick={() => {initChat(user, isMobile)}}
                          onClick={() => {dispatch(clearChats()) ; dispatch(saveEditedParagraphs({})) }}
                        />
                      </motion.div>
                      ); 
                      })
                    ) : (
                      <div className="container">
                          <center><p className="center">No Touches/Events available yet</p></center>
                      </div>
                    )
                }
                
              </motion.div>
         
        </List>
      </FuseScrollbars>
    </div>
  );
}

export default InboxSidebar;
