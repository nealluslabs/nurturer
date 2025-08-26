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
import { fetchChats } from 'src/redux/actions/chat.action';
import { fetchConnectedUsers, fetchConnectedUsers2, fetchRealTimeUsers } from 'src/redux/actions/user.action';
import ContactListItem from './ContactListItem';
import ContactListItem2 from './ContactListItem2';
import StatusIcon from './StatusIcon';
import { getChat } from './store/chatSlice';
import { selectContacts } from './store/contactsSlice';
import { closeMobileChatsSidebar, openUserSidebar } from './store/sidebarsSlice';
import { updateUserData } from './store/userSlice';
import { clearChats } from 'redux/actions/chat.action';
import { setCurrentChat } from 'redux/reducers/chat.slice';

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

function NewsletterSidebar(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  // const user = useSelector(({ chatApp }) => chatApp.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchText, setSearchText] = useState('');
  const [statusMenuEl, setStatusMenuEl] = useState(null);
  const [moreMenuEl, setMoreMenuEl] = useState(null);

  //New Hooks
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  const { user } = useSelector((state) => state.login);
  const { allUsers, connectedUsers, connects, connects2, isLoading } = useSelector((state) => state.user);
  let unsubscribe;


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
    console.log('All Users', allUsers);
    console.log('user isso--->', user.uid);
  }, [])
 
  useEffect(() => {

    unsubscribe = dispatch(fetchConnectedUsers(user.uid))
    unsubscribe = dispatch(fetchConnectedUsers2(user.uid))
    .then(unsubscribe => {
      return unsubscribe;
    })
    .catch(error => {
      console.log(error);
    })
  }, []);
  
  
    //componentWillUnmount
    useEffect(() => {
      return () => {
        //cleanup
        unsubscribe.then(f => f()).catch(error => console.log(error));
      }
    }, []);
  


  function handleMoreMenuClick(event) {
    setMoreMenuEl(event.currentTarget);
  }

  function handleMoreMenuClose(event) {
    setMoreMenuEl(null);
  }

  function handleStatusMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setStatusMenuEl(event.currentTarget);
  }

  function handleStatusSelect(event, status) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      updateUserData({
        ...user,
        status,
      })
    );
    setStatusMenuEl(null);
  }

  function handleStatusClose(event) {
    event.preventDefault();
    event.stopPropagation();
    setStatusMenuEl(null);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }


  const initChat = (user2, isMobile) => {
   const user1 = user.uid;
    setChatStarted(true)
    setChatUser(user2.name)
    setUserUid(user2.uid);

    dispatch(clearChats())
     dispatch(fetchChats(user1, user2))
     console.log('IsMobile: ', isMobile);
     if (isMobile) {
        dispatch(closeMobileChatsSidebar());
      }
  }

  const testConnections = () => {
    
  const connectsById = Object.fromEntries(
    connects2.map(({ user1, type, status, invited_amt, skipped_amt }) => [user1, { type, status, invited_amt, skipped_amt }])
      );
      
    const connectedUsersOutput = connectedUsers && connectedUsers.filter((item)=>(item.uid !== user.uid)).map(({ uid, name, email, city, intro, skillset, skills_needed, 
      lookingFor, lastActive, isTechnical, photoUrl, password,message},index) => ({
        uid, name, email, city, intro, skillset, skills_needed, 
        lookingFor, lastActive, isTechnical, photoUrl, password,
        message,
        daysTo:(3 +3*(index+1)).toString()+ " " + "Days" ,
      ...(connectsById[uid] || { type: '', status: '', invited_amt: '', skipped_amt: ''})
    }));

    console.log('Connected Users Mapped: ', connectedUsersOutput);
  }





  const connectsById = Object.fromEntries(
    connects2.map(({ user1, type, status, invited_amt, skipped_amt }) => [user1, { type, status, invited_amt, skipped_amt }])
      );
      
    const connectedUsersOutput = connectedUsers && connectedUsers.filter((item)=>(item.uid !== user.uid)).map(({ uid, name, email, city, intro, skillset, skills_needed, 
      lookingFor, lastActive, isTechnical, photoUrl, password,message},index) => ({
        uid, name, email, city, intro, skillset, skills_needed, 
        lookingFor, lastActive, isTechnical, photoUrl, password,message,
        daysTo:(3+ 3*(index+1)).toString()+ " " + "Days" ,
      ...(connectsById[uid] || { type: '', status: '', invited_amt: '', skipped_amt: ''})
    }));
    
    useEffect(()=>{

     dispatch(setCurrentChat(connectedUsers && connectedUsers[0]))
    },[])

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={0}>
        {useMemo(
          () => (
            <Toolbar className="px-16">
              <Paper className="flex p-4 items-center w-full px-8 py-4 shadow">
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Search or start new newsletter"
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
          ),
          [searchText]
        )}
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
                      Newsletter Recipients
                    </Typography>
                  </motion.div>
                )}

              
                {
                  connectedUsersOutput.length ? (
                    connectedUsersOutput.map((user) => {
                      return(
                        <motion.div variants={item} key={user.uid}>
                        <ContactListItem
                          user={user}
                        //   onContactClick={(contactId) => dispatch(getChat({ contactId, isMobile }))}
                          onContactClick={() => initChat(user, isMobile)}
                        />
                      </motion.div>
                      );
                      })
                    ) : (
                      <div className="container">
                          <center><p className="center">No contacts for newsletter</p></center>
                      </div>
                    )
                }
                
              </motion.div>
         
        </List>
      </FuseScrollbars>
    </div>
  );
}

export default NewsletterSidebar;
