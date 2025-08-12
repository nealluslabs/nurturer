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
import { fetchConnectedUsers, fetchConnectedUsers2, fetchRealTimeUsers, fetchAllContactForOneUser } from 'src/redux/actions/user.action';
import ContactListItem from './ContactListItem';
import { closeMobileChatsSidebar } from './store/sidebarsSlice';
import { Box, TextField,Select } from '@mui/material';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchText, setSearchText] = useState('');

  //New Hooks
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  const { user } = useSelector((state) => state.login);
  const { allUsers, connectedUsers, filteredContacts, connects, connects2, isLoading } = useSelector((state) => state.user);


  const [font, setFont] = useState("Arial");
  const [image, setImage] = useState("First Image");
  const [section, setSection] = useState("First Section");

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
      // Fetch contacts from Firebase for newsletter
      dispatch(fetchAllContactForOneUser(user.uid));
    }
  }, [user, dispatch])
 
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
  }


  const initChat = (user2, isMobile) => {
   const user1 = user.uid;
    setChatStarted(true)
    setChatUser(user2.name)
    setUserUid(user2.uid);

     
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
      
    const connectedUsersOutput = filteredContacts && filteredContacts.filter((item)=>(item.uid !== user.uid)).map(({ uid, name, email, city, intro, skillset, skills_needed, 
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
      
    // Use filteredContacts from Firebase instead of connectedUsers
    const connectedUsersOutput = filteredContacts && filteredContacts.filter((item)=>(item.uid !== user.uid)).map(({ uid, name, email, city, intro, skillset, skills_needed, 
      lookingFor, lastActive, isTechnical, photoUrl, password, message, companyName, jobTitle, interests, frequency},index) => ({
        uid, name, email, city, intro, skillset, skills_needed, 
        lookingFor, lastActive, isTechnical, photoUrl, password, message,
        companyName, jobTitle, interests, frequency,
        daysTo:(3+ 3*(index+1)).toString()+ " " + "Days" ,
      ...(connectsById[uid] || { type: '', status: '', invited_amt: '', skipped_amt: ''})
    }));


  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={0}>
        {useMemo(
          () => (
            <Toolbar className="px-16">
              <Paper className="flex p-4 items-center w-full px-8 py-4 shadow">
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Search to remove newsletter recipients"
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
      {/*<FuseScrollbars className="overflow-y-auto flex-1">*/}

            <List className="w-[100%] mx-auto" >
              
               <motion.div
               style={{paddingTop:"1rem",paddingBottom:"0rem",position:"relative",top:"-0.5rem"}}
                 className="flex flex-col flex-shrink-0"
                 variants={container}
                 initial="hidden"
                 animate="show"
               >
              {/* <button onClick={() => testConnections()}>Please Click Me😌</button> */}
              {
                   <motion.div variants={item}>
                     <Typography className="font-medium text-20 px-16 py-16" color="secondary">
                       Settings
                     </Typography>
                   </motion.div>
                 }       

               

                              <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" sx={{marginBottom:"1.5rem"}}>
                                <Box
                                  sx={{
                                    width: '4rem',
                                    height: '4rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'red',
                                  }}
                                />
                                <Box
                                  sx={{
                                    width: '4rem',
                                    height: '4rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'green',
                                  }}
                                />
                                <Box
                                  sx={{
                                    width: '4rem',
                                    height: '4rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'yellow',
                                  }}
                                />
                                <Box
                                  sx={{
                                    width: '4rem',
                                    height: '4rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'blue',
                                  }}
                                />

                                 <Box
                                  sx={{
                                    width: '4rem',
                                    height: '4rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'black',
                                  }}
                                />

                                
                              </Box>

      
               
                         <Box display="flex" flexDirection="column" sx={{margin:"0 auto",paddingLeft:"1.5rem",width:"100%"}} gap={2}>
                     <motion.div variants={item}>
                     <Box display="flex" alignItems="center" gap={2}>
                          <Select
                           value={section}
                           onChange={(e) => setSection(e.target.value)}
                           sx={{
                             width: "20%",
                             height: "3.5rem",
                             borderRadius: "0.5rem",
                           }}
                         >
                           <MenuItem value="First Section">First Section</MenuItem>
                           <MenuItem value="Second Section">Second Section</MenuItem>
                           <MenuItem value="Third Section">Third Section</MenuItem>
                           <MenuItem value="Fourth Section">Fourth Section</MenuItem>
                         </Select>
                         <TextField
                           variant="outlined"
                           sx={{
                             width: '69%',
                             '& .MuiOutlinedInput-root': {
                               height: '3.5rem',
                               borderRadius: '0.5rem',
                             },
                             '& .MuiOutlinedInput-input': {
                               height: '3.5rem',
                               padding: '0 8px',
                             },
                           }}
                         />
                       </Box>
                     </motion.div>
                   
                     <motion.div variants={item}>
                     <Box display="flex" alignItems="center" gap={2}>
                          <Select
                           value={image}
                           onChange={(e) => setImage(e.target.value)}
                           sx={{
                             width: "20%",
                             height: "3.5rem",
                             borderRadius: "0.5rem",
                           }}
                         >
                           <MenuItem value="First Image">First Image</MenuItem>
                           <MenuItem value="Second Image">Second Image</MenuItem>
                           <MenuItem value="Third Image">Third Image</MenuItem>
                           <MenuItem value="Fourth Image">Fourth Image</MenuItem>
                         </Select>
                         <TextField
                           variant="outlined"
                           sx={{
                             width: '69%',
                             '& .MuiOutlinedInput-root': {
                               height: '3.5rem',
                               borderRadius: '0.5rem',
                             },
                             '& .MuiOutlinedInput-input': {
                               height: '3.5rem',
                               padding: '0 8px',
                             },
                           }}
                         />
                       </Box>
                     </motion.div>
                   
                     <motion.div variants={item}>
                       <Box display="flex" alignItems="center" gap={2}>
                          <Select
                           value={font}
                           onChange={(e) => setFont(e.target.value)}
                           sx={{
                             width: "20%",
                             height: "3.5rem",
                             borderRadius: "0.5rem",
                           }}
                         >
                           <MenuItem value="Arial">Arial</MenuItem>
                           <MenuItem value="Serif">Serif</MenuItem>
                           <MenuItem value="Calibri">Calibri</MenuItem>
                           <MenuItem value="Lato">Lato</MenuItem>
                         </Select>
                         <TextField
                           variant="outlined"
                           sx={{
                             width: '69%',
                             '& .MuiOutlinedInput-root': {
                               height: '3.5rem',
                               borderRadius: '0.5rem',
                             },
                             '& .MuiOutlinedInput-input': {
                               height: '3.5rem',
                               padding: '0 8px',
                             },
                           }}
                         />
                       </Box>
                     </motion.div>
                   
                    {/* <motion.div variants={item}>
                       <Box display="flex" alignItems="center" gap={2}>
                         <Typography sx={{ width: '10%' }}></Typography>
                         <TextField
                           variant="outlined"
                           sx={{
                             width: '90%',
                             '& .MuiOutlinedInput-root': {
                               height: '3rem',
                               borderRadius: '0.5rem',
                             },
                             '& .MuiOutlinedInput-input': {
                               height: '3rem',
                               padding: '0 8px',
                             },
                           }}
                         />
                       </Box>
                     </motion.div>
                     */}
                   </Box>

                 
               </motion.div>
          
         </List>

         <div style={{backgroundColor:"#FAF9F6",width:"100%",height:"3rem"}}>
          {/**THIS DIV IS FOR BACKGROUND COLOR, OF OFF WHITE DONT UNCOMMENT IT OUT */}
         </div>


        <List className="w-full overflow-y-auto">
         
        
            
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
                       Recipients
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
      {/*</FuseScrollbars>*/}
    </div>
  );
}

export default NewsletterSidebar;
