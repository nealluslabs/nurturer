import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from './store/contactsSlice';
import { sendMessage } from './store/chatSlice';
import { sendChat } from 'src/redux/actions/chat.action';
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { updateUserChat } from 'redux/actions/user.action';

import holiday from 'src/app/main/urbanhive-assets/holiday.png'
import birthday1 from 'src/app/main/urbanhive-assets/birthday1.png'

const useStyles = makeStyles((theme) => ({
  messageRow: {
    '&.contact': {
      '& .bubble': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        '& .time': {
          marginLeft: 12,
        },
      },
      '&.first-of-group': {
        '& .bubble': {
          borderTopLeftRadius: 20,
        },
      },
      '&.last-of-group': {
        '& .bubble': {
          borderBottomLeftRadius: 20,
        },
      },
    },
    '&.me': {
      paddingLeft: 40,

      '& .avatar': {
        order: 2,
        margin: '0 0 0 16px',
      },
      '& .bubble': {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        '& .time': {
          justifyContent: 'flex-end',
          right: 0,
          marginRight: 12,
        },
      },
      '&.first-of-group': {
        '& .bubble': {
          borderTopRightRadius: 20,
        },
      },

      '&.last-of-group': {
        '& .bubble': {
          borderBottomRightRadius: 20,
        },
      },
    },
    '&.contact + .me, &.me + .contact': {
      paddingTop: 20,
      marginTop: 20,
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopLeftRadius: 20,
        paddingTop: 13,
      },
    },
    '&.last-of-group': {
      '& .bubble': {
        borderBottomLeftRadius: 20,
        paddingBottom: 13,
        '& .time': {
          display: 'flex',
        },
      },
    },
  },
}));

function Inbox(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);
  const chat = useSelector(({ chatApp }) => chatApp.chat);
  // const user = useSelector(({ chatApp }) => chatApp.user);
 


  const editableRef = useRef(null);

  const handleSave = () => {
    const updatedContent = editableRef.current.innerHTML;
    console.log('Saved content:', updatedContent);
    // You can now send `updatedContent` to your backend or store it
    }

  const classes = useStyles(props);
  const chatRef = useRef(null);
  const [messageText, setMessageText] = useState('');

 //New Hooks

//  const [connectStatus, setconnectStatus] = useState('');
 const { isAuth, user } = useSelector((state) => state.login);
 const { selectedChatUser, chatMessages } = useSelector((state) => state.chat);
 const { connects } = useSelector((state) => state.user);
 let connectStatus;

 console.log("SELECTED CHAT USER IS--->",selectedChatUser)

  useEffect(() => {
    if (chatMessages) {
      scrollToBottom();
    }
  }, [chatMessages]);

  function scrollToBottom() {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }

  function shouldShowContactAvatar(item, i) {
    return (
      item.user1 === selectedChatUser.uid 
      && ((chatMessages[i + 1] && chatMessages[i + 1].user1 !== selectedChatUser.uid) || !chatMessages[i + 1])

      // item.who === selectedContactId &&
      // ((chat.dialog[i + 1] && chat.dialog[i + 1].who !== selectedContactId) || !chat.dialog[i + 1])
    );
  }

  function isFirstMessageOfGroup(item, i) {
    return i === 0 || (chatMessages[i - 1] && chatMessages[i - 1].user1 !== item.user1);
    // return i === 0 || (chat.dialog[i - 1] && chat.dialog[i - 1].who !== item.who);
  }

  function isLastMessageOfGroup(item, i) {
    return (
      i === chatMessages.length - 1 || (chatMessages[i + 1] && chatMessages[i + 1].user1 !== item.user1)
      // i === chat.dialog.length - 1 || (chat.dialog[i + 1] && chat.dialog[i + 1].who !== item.who)
    );
  }

  function onInputChange(ev) {
    setMessageText(ev.target.value);
  }

  function onMessageSubmit(ev) {
    ev.preventDefault();
    if (messageText === '') {
      return;
    }
    dispatch(
      sendChat({
        messageText,
        user1: user.uid,
        user2: selectedChatUser.uid,
      })
    ).then(() => {
      setMessageText('');
    });
  }

 
  const testMe = () => {
    console.log('Connection Status is: ', connectStatus);
  }

  const connectsById = Object.fromEntries(
   connects.map(({ user2, type, status, invited_amt, skipped_amt }) => [user2, { type, status, invited_amt, skipped_amt }])
    );
    
      const chatMessagesOutput = chatMessages.map(({ user1, user2, messageText, time, isViewed, unread }) => ({
        user1, user2, messageText, time, isViewed, unread,
        ...(connectsById[user2] || { type: '', status: '', invited_amt: '', skipped_amt: ''})
      }));

  return (
    <div className={clsx('flex flex-col relative', props.className)}>
      <FuseScrollbars ref={chatRef} className="flex flex-1 flex-col overflow-y-auto">
        {chatMessages.length || 0 && chatMessages.length > 0 ? (
        <>
          <div onClick={handleSave} className="flex flex-col pt-16 px-16 ltr:pl-56 rtl:pr-56 pb-40">
            {chatMessagesOutput.map((item, i) => {
              connectStatus = item.status;
              const contact =
                item.user1 === user.uid ? user : contacts.find((_contact) => _contact.user1 === item.user1);
              return (
                <div
                  key={item.time}
                  className={clsx(
                    classes.messageRow,
                    'flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative px-16 pb-4',
                    // { me: item.who === user.id },
                    { me: item.user1 === user.uid },
                    { contact: item.user1 !== user.uid },
                    { 'first-of-group': isFirstMessageOfGroup(item, i) },
                    { 'last-of-group': isLastMessageOfGroup(item, i) },
                    i + 1 === chatMessages.length && 'pb-96'
                  )}
                >
                  {shouldShowContactAvatar(item, i) && (
                    <Avatar
                      className="avatar absolute ltr:left-0 rtl:right-0 m-0 -mx-32"
                      // src={contact.photoUrl}
                      src={selectedChatUser.photoUrl}
                    />
                  )}
                  <div className="bubble flex relative items-center justify-center p-12 max-w-full shadow">
                    <div className="leading-tight whitespace-pre-wrap" style={{width:"50rem"}}>
                      {/*item.messageText*/}
                      
                      <div
        ref={editableRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        
      >
        



        <span>
          Hello, {selectedChatUser && selectedChatUser.name ? selectedChatUser.name:selectedChatUser && selectedChatUser.firstName  }
        </span>
        
        <br /><br /><br /><br />

       {selectedChatUser && selectedChatUser.name  === "Alice Chen"?
         <span>
      
      {/*I hope you're doing well and navigating this season with clarity. It’s been about six months
       since we last connected, and I’ve been thinking about the work you're doing at Tech Innovations
        Inc. As a Senior Data Analyst navigating the evolving tech space, I can only imagine the pace 
        and complexity of your role—especially as predictive modeling and business intelligence continue 
        to shape decision-making.*/}

        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.firstParagraph}
       </span>

        :
        selectedChatUser && selectedChatUser.name  === "Bob Johnson"?
        <span>
        
       {"Wishing you a fantastic birthday and a year ahead filled with great moments—both on and off the construction site!"}


        {/*selectedChatUser && selectedChatUser.message && selectedChatUser.message.firstParagraph*/}
        </span>

         :
         selectedChatUser && selectedChatUser.name  === "Carol Garcia"?
         <span>
         
        {/* I hope you're doing well and navigating this season with clarity.
          It’s been about three months since we last connected, and I’ve 
          been thinking about your work as Marketing Director at Global
           Connect Solutions—especially given how much the marketing landscape
            continues to shift with AI, audience behavior, and global brand
             strategies all evolving quickly.*/}


        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.firstParagraph}
         </span>
         :
         selectedChatUser && selectedChatUser.name  === "David Lee"?
         <span>
         
        { /*I hope you're doing well and navigating this season with clarity. 
         It’s been about three months since we last connected, and I’ve been 
         thinking about your role at Code Forge Labs—especially given how fast
          backend technologies and infrastructure tools are evolving. With performance 
          optimization and scalable architecture top of mind for so many teams,
           your work is likely more impactful than ever.*/}


        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.firstParagraph}
         </span>
         :
         selectedChatUser && selectedChatUser.name  === "Emily White"?
         <span>
         
       { "Wishing you and everyone at Harmony Medical Center a safe and uplifting Fourth of July!"}


        {/*selectedChatUser && selectedChatUser.message && selectedChatUser.message.firstParagraph*/}
         </span>
         

        :
        <span>
      
         { /*I hope you're doing well and navigating this season with clarity. I saw the
          recent news about the leadership restructuring at Boeing and immediately
          thought of you. I can only imagine how much is being navigated at your
          level—balancing strategic realignment while keeping day-to-day momentum. It
          must be a challenging but transformative time for your team.*/}


        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.firstParagraph}
        </span>
        }
        <br /><br /><br /><br />
        {


selectedChatUser && selectedChatUser.name  === "Alice Chen"?
         <span>
        {/*While reading through some recent insights, a couple of articles stood out to me that I thought you might enjoy. They speak to the intersection of data-driven strategy, cross-functional dashboards, and the evolving role of analytics in scaling innovation:*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.secondParagraph}
       </span>

        :
        selectedChatUser && selectedChatUser.name  === "Bob Johnson"?
        <span>
        {"Hope you get a chance to unplug today and maybe spend some time behind the lens doing what you love. If you capture any incredible shots, I’d love to see one sometime."}
        {/*selectedChatUser && selectedChatUser.message && selectedChatUser.message.secondParagraph*/}
       </span>
         :
         selectedChatUser && selectedChatUser.name  === "Carol Garcia"?
         <span>
        {/* While reading through some recent industry updates, I came across a couple of articles that I thought you might enjoy. They touch on themes related to global brand development, data-informed campaigns, and how marketers are staying agile in competitive environments:*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.secondParagraph}
         </span>
         :
         selectedChatUser && selectedChatUser.name  === "David Lee"?
         <span>
         
        {/* While reading through some recent industry updates, I came across a couple of articles that I thought you might enjoy. They touch on themes related to backend efficiency, database design, and evolving best practices in engineering teams:*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.secondParagraph}
        </span>
         :
         selectedChatUser && selectedChatUser.name  === "Emily White"?
         <span>
         {"We’re grateful for all the work you do in healthcare—especially during times that remind us of the value of service, community, and care. Hope you're able to take a well-deserved break, maybe even spend some time with your four-legged friends at the shelter this weekend."}
         {/*selectedChatUser && selectedChatUser.message && selectedChatUser.message.secondParagraph*/}
         </span>


          :
          <span>
          {/*While reading through some industry updates, I came across a couple of
          articles that I thought you might enjoy. They touch on themes that are
          relevant to leadership transition, innovation under pressure, and shifting
        talent strategies in large organizations:*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.secondParagraph}
        </span>
        }
       
        {

        <>
         {!(selectedChatUser.name === 'Emily White' || selectedChatUser.name === 'Bob Johnson') &&<> <br /><br /> </>}
         {!(selectedChatUser.name === 'Emily White' || selectedChatUser.name === 'Bob Johnson') && selectedChatUser && selectedChatUser.message && selectedChatUser.message.bulletPoints && selectedChatUser.message.bulletPoints.map((point,index)=>( 
          <>
        • <b>{point.bulletPointBold}</b>
        <br />
        <span>
          – {point.bulletPointRest}{" "}
          
        </span>
       {!(selectedChatUser.name === 'Emily White' || selectedChatUser.name === 'Bob Johnson') &&<> <br /><br /> </>}
        </>
      ))
         }

       {/*
        • <b>{selectedChatUser && selectedChatUser.message && selectedChatUser.message.bulletPointTwoBold}</b>
        <br />
        <span>
          – {selectedChatUser && selectedChatUser.message && selectedChatUser.message.bulletPointTwoRest}{" "}
         
        </span>
        */}

        </> 
      
       
        }
        <br /><br /><br /><br />


       
       {selectedChatUser && selectedChatUser.name  === "Alice Chen"?
         <span>
      
      {/*We had some great conversations in the past, and I truly appreciated your perspective on how analytics can drive smarter systems. If you're open to it, I’d love to reconnect sometime soon—just a quick check-in to hear what’s been keeping you busy (besides chess tournaments!).*/}
      {selectedChatUser && selectedChatUser.message && selectedChatUser.message.thirdParagraph}
       </span>

        :
        selectedChatUser && selectedChatUser.name  === "Bob Johnson"?
        <span>
        
        {"Here’s to continued success at Urban Developers and to finding the perfect light—on the job and in your photos."}
        {/*selectedChatUser && selectedChatUser.message && selectedChatUser.message.thirdParagraph*/}
        </span>

         :
         selectedChatUser && selectedChatUser.name  === "Carol Garcia"?
         <span>
         
        {/* We had some great conversations previously, and I really valued hearing how you approach strategy and brand voice across markets. Let me know if you’re open to a quick catch-up sometime soon—I’d love to hear what’s new on your end (and maybe which destination is next on your travel list!). Wishing you continued momentum.*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.thirdParagraph}
         </span>
         :
         selectedChatUser && selectedChatUser.name  === "David Lee"?
         <span>
         
        { /*We had some great conversations previously, and I really appreciated hearing how you approach clean architecture and performance at scale. Let me know if you’re up for a quick catch-up sometime soon—I’d love to hear what you’ve been building (and maybe even what your latest keyboard mod looks like). Wishing you continued momentum.*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.thirdParagraph}
         </span>
         :
         selectedChatUser && selectedChatUser.name  === "Emily White"?
         <span>
         
        {"Thank you again for the difference you make. Happy Independence Day!"}
        {/*selectedChatUser && selectedChatUser.message && selectedChatUser.message.thirdParagraph*/}
         </span>
         

        :
        <span>
      
      {/*We had some great conversations previously, and I really valued the opportunity to understand what you were working toward. Let me know if you have time for a brief catch-up in the coming weeks. Either way, wishing you continued momentum.*/}
      {selectedChatUser && selectedChatUser.message && selectedChatUser.message.thirdParagraph}
        </span>
        }


        <br /><br /><br /><br />



        <span>
          Regards,
        </span>
         
        <br /><br />

        <span>
          {user && user.firstName && user.lastName? user.firstName + " " + user.lastName:user && user.name && user.name !== "test user"?user.name :"Tim"}
        </span>


      </div>
                      </div>
                   
                    {/*<Typography
                      className="time absolute hidden w-full text-11 mt-8 -mb-24 ltr:left-0 rtl:I hope you're doing well and navigating this season with clarity. I saw the recent news about the leadership restructuring at Boeing and immediately thought of you. I can only imagine how much is being navigated at your level—balancing strategic realignment while keeping day-to-day momentum. It must be a challenging but transformative time for your team.



While reading through some industry updates, I came across a couple of articles that I thought you might enjoy. They touch on themes that are relevant to leadership transition, innovation under pressure, and shifting talent strategies in large organizations:

A breath of fresh air for the national aviation industry from PwC, published in March 2025. PwC Link

Deloitte Global's 2025 Airline CEO Survey from Deloitte, published on May 30, 2025. Deloitte Link



We had some great conversations previously, and I really valued the opportunity to understand what you were working toward. Let me know if you have time for a brief catch-up in the coming weeks. Either way, wishing you continued momentum..right-0 bottom-0 whitespace-nowrap"
                      color="textSecondary"
                    >
                      {formatDistanceToNow(new Date(item.time), { addSuffix: true })}
                </Typography>*/}
                  </div>
                </div>



              );
            })}
          </div>


           
{<div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",marginLeft:"7.5rem",marginTop:"-10rem",marginBottom:"10rem",backgroundColor:"#fff",borderRadius:"2rem",width:"82%",padding:"1rem",paddingTop:"3rem"}}>
  
 {!(selectedChatUser.name === 'Emily White' || selectedChatUser.name === 'Bob Johnson') ?
   

    selectedChatUser.name === 'Carol Garcia'?
    <>
                    <Typography
                     style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
                    >
                      Articles
                </Typography>
  
  <FormControl component="fieldset">
    
      <Stack spacing={2}>
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article1"
          control={<Checkbox onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"1",
              bulletPointBold:"The Future of Consumer Trust: Brand Strategy Trends in 2025",
              bulletPointRest:" Avaans Media - The Future of Consumer Trust Link",
              link:"https://avaansmedia.com/consumer-brand-trust-trends-for-2025/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://avaansmedia.com/consumer-brand-trust-trends-for-2025/" target="_blank" rel="noopener noreferrer">The Future of Consumer Trust: Brand Strategy Trends in 2025</a></Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article2"
          control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"2",
              bulletPointBold:"Redefining Brand Value: Marketing Priorities for the 2025 Economy",
              bulletPointRest:"Redefining Brand Value Link",
              link:"https://martech.org/5-essential-priorities-for-marketers-in-2025/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://martech.org/5-essential-priorities-for-marketers-in-2025/" target="_blank" rel="noopener noreferrer">Redefining Brand Value: Marketing Priorities for the 2025 Economy</a></Typography>}
        />
      
         
      </Stack>
   
  </FormControl>
 </>
    :
    selectedChatUser.name === 'Alice Chen'?
    <>
                    <Typography
                     style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
                    >
                      Articles
                </Typography>
  
  <FormControl component="fieldset">
    
      <Stack spacing={2}>
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article1"
          control={<Checkbox onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"1",
              bulletPointBold:"From Insight to Action: The Evolving Role of Data Scientists in 2025",
              bulletPointRest:"-from Bain & Company, published in April 2025",
              link:"https://ioaglobal.org/blog/essential-data-skills-data-scientists-going-2025/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://ioaglobal.org/blog/essential-data-skills-data-scientists-going-2025/" target="_blank" rel="noopener noreferrer">From Insight to Action: The Evolving Role of Data Scientists in 2025</a></Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article2"
          control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"2",
              bulletPointBold:"AI-Augmented Intelligence: Redefining Enterprise Decision-Making in 2025",
              bulletPointRest:"– from Gartner, published in April 2025",
              link:"https://martech.org/5-essential-priorities-for-marketers-in-2025/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://www.entrepreneur.com/en-in/news-and-trends/ai-agents-to-redefine-enterprise-strategy-in-2025-report/492416" target="_blank" rel="noopener noreferrer">AI-Augmented Intelligence: Redefining Enterprise Decision-Making in 2025</a></Typography>}
        />
      
         
      </Stack>
   
  </FormControl>
 </>
    :
    selectedChatUser.name === 'David Lee'?
    <>
                    <Typography
                     style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
                    >
                      Articles
                </Typography>
  
  <FormControl component="fieldset">
    
      <Stack spacing={2}>
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article1"
          control={<Checkbox onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"1",
              bulletPointBold:"The Future of Consumer Trust: Brand Strategy Trends in 2025",
              bulletPointRest:" Avaans Media - The Future of Consumer Trust Link",
              link:"https://avaansmedia.com/consumer-brand-trust-trends-for-2025/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://avaansmedia.com/consumer-brand-trust-trends-for-2025/" target="_blank" rel="noopener noreferrer">The Future of Consumer Trust: Brand Strategy Trends in 2025</a></Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article2"
          control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"2",
              bulletPointBold:"Redefining Brand Value: Marketing Priorities for the 2025 Economy",
              bulletPointRest:"Redefining Brand Value Link",
              link:"https://martech.org/5-essential-priorities-for-marketers-in-2025/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://martech.org/5-essential-priorities-for-marketers-in-2025/" target="_blank" rel="noopener noreferrer">Redefining Brand Value: Marketing Priorities for the 2025 Economy</a></Typography>}
        />
      
         
      </Stack>
   
  </FormControl>
 </>
    :
    selectedChatUser.name === 'Alice Chen'?
    <>
                    <Typography
                     style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
                    >
                      Articles
                </Typography>
  
  <FormControl component="fieldset">
    
      <Stack spacing={2}>
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article1"
          control={<Checkbox onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"1",
              bulletPointBold:"From Insight to Action: The Evolving Role of Data Scientists in 2025",
              bulletPointRest:"-from Bain & Company, published in April 2025",
              link:"https://ioaglobal.org/blog/essential-data-skills-data-scientists-going-2025/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://ioaglobal.org/blog/essential-data-skills-data-scientists-going-2025/" target="_blank" rel="noopener noreferrer">From Insight to Action: The Evolving Role of Data Scientists in 2025</a></Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article2"
          control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"2",
              bulletPointBold:"AI-Augmented Intelligence: Redefining Enterprise Decision-Making in 2025",
              bulletPointRest:"– from Gartner, published in April 2025",
              link:"https://martech.org/5-essential-priorities-for-marketers-in-2025/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://www.entrepreneur.com/en-in/news-and-trends/ai-agents-to-redefine-enterprise-strategy-in-2025-report/492416" target="_blank" rel="noopener noreferrer">AI-Augmented Intelligence: Redefining Enterprise Decision-Making in 2025</a></Typography>}
        />
      
         
      </Stack>
   
  </FormControl>
 </>
    :

    selectedChatUser.name === 'David Lee'?
    <>
                    <Typography
                     style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
                    >
                      Articles
                </Typography>
  
  <FormControl component="fieldset">
    
      <Stack spacing={2}>
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article1"
          control={<Checkbox onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"1",
              bulletPointBold:"Serverless Architectures and the Next Evolution of Cloud Backends",
              bulletPointRest:"– from InfoQ, published in May 2025",
              link:"https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-forward/cloud-20-serverless-architecture-and-the-next-wave-of-enterprise-offerings"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-forward/cloud-20-serverless-architecture-and-the-next-wave-of-enterprise-offerings/" target="_blank" rel="noopener noreferrer">Serverless Architectures and the Next Evolution of Cloud Backends</a></Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article2"
          control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"2",
              bulletPointBold:"Intelligent Load Balancing: AI Meets Infrastructure Automation",
              bulletPointRest:"– from ACM TechTalks, published in April 2025",
              link:"https://www.cio.com/article/3992298/ai-and-load-balancing.html"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://www.cio.com/article/3992298/ai-and-load-balancing.html" target="_blank" rel="noopener noreferrer">Intelligent Load Balancing: AI Meets Infrastructure Automation</a></Typography>}
        />

      <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article2"
          control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"2",
              bulletPointBold:"The Rise of Event-Driven APIs: Real-Time Systems in 2025",
              bulletPointRest:"– from IEEE Software, published in May 2025",
              link:"https://www.nucamp.co/blog/coding-bootcamp-backend-with-python-2025-eventdriven-architectures-how-backend-systems-are-changing-in-2025"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://www.nucamp.co/blog/coding-bootcamp-backend-with-python-2025-eventdriven-architectures-how-backend-systems-are-changing-in-2025" target="_blank" rel="noopener noreferrer">The Rise of Event-Driven APIs: Real-Time Systems in 2025</a></Typography>}
        />
      
         
      </Stack>
   
  </FormControl>
 </>
       :

       selectedChatUser.name === 'John Smith'?
       <>
                       <Typography
                        style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
                       >
                         Articles
                   </Typography>
     
     <FormControl component="fieldset">
       
         <Stack spacing={2}>
           <FormControlLabel
           style={{display:"flex",gap:"2rem"}}
             value="article1"
             control={<Checkbox onClick={()=>{dispatch(updateUserChat(selectedChatUser,
               {
                 id:"1",
                 bulletPointBold:"Navigating Headwinds: KPMG’s 2025 Global Aviation Outlook",
                 bulletPointRest:"– KPMG, June 10, 2025",
                 link:"https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-forward/cloud-20-serverless-architecture-and-the-next-wave-of-enterprise-offerings"
               }
             ))}}/>}
             label={<Typography fontSize="14px"><a href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-forward/cloud-20-serverless-architecture-and-the-next-wave-of-enterprise-offerings/" target="_blank" rel="noopener noreferrer">Navigating Headwinds: KPMG’s 2025 Global Aviation Outlook</a></Typography>}
           />
           <FormControlLabel
           style={{display:"flex",gap:"2rem"}}
             value="article2"
             control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
               {
                 id:"2",
                 bulletPointBold:"Reaching New Altitudes: Strategic Shifts in Air Travel Recovery",
                 bulletPointRest:"– EY, May 28, 2025",
                 link:"https://www.cio.com/article/3992298/ai-and-load-balancing.html"
               }
             ))}}/>}
             label={<Typography fontSize="14px"><a href="https://www.cio.com/article/3992298/ai-and-load-balancing.html" target="_blank" rel="noopener noreferrer">Reaching New Altitudes: Strategic Shifts in Air Travel Recovery</a></Typography>}
           />
   
         <FormControlLabel
           style={{display:"flex",gap:"2rem"}}
             value="article2"
             control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
               {
                 id:"2",
                 bulletPointBold:"Flight Path 2025: The CEO Agenda for a Resilient Aviation Future",
                 bulletPointRest:"– McKinsey & Company, June 5, 2025",
                 link:"https://www.nucamp.co/blog/coding-bootcamp-backend-with-python-2025-eventdriven-architectures-how-backend-systems-are-changing-in-2025"
               }
             ))}}/>}
             label={<Typography fontSize="14px"><a href="https://www.nucamp.co/blog/coding-bootcamp-backend-with-python-2025-eventdriven-architectures-how-backend-systems-are-changing-in-2025" target="_blank" rel="noopener noreferrer">Flight Path 2025: The CEO Agenda for a Resilient Aviation Future</a></Typography>}
           />
         
            
         </Stack>
      
     </FormControl>
    </>

     :
   <>
                    <Typography
                     style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
                    >
                      Articles
                </Typography>
  
  <FormControl component="fieldset">
    
      <Stack spacing={2}>
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article1"
          control={<Checkbox onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"1",
              bulletPointBold:"The Evolution of Electric Supercars",
              bulletPointRest:"Supercars Link",
              link:"https://radicalrally.com/driving/cars/the-evolution-of-hybrid-and-electric-supercars/"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://radicalrally.com/driving/cars/the-evolution-of-hybrid-and-electric-supercars/" target="_blank" rel="noopener noreferrer">The Evolution of Electric Supercars</a></Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article2"
          control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"2",
              bulletPointBold:"How Aerodynamics Shapes Modern Vehicles",
              bulletPointRest:"Modern Vehicle Design Link",
              link:"https://www.numberanalytics.com/blog/ultimate-guide-vehicle-aerodynamics"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://www.numberanalytics.com/blog/ultimate-guide-vehicle-aerodynamics" target="_blank" rel="noopener noreferrer">How Aerodynamics Shapes Modern Vehicles</a></Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article3"
          control={<Checkbox  onClick={()=>{dispatch(updateUserChat(selectedChatUser,
            {
              id:"3",
              bulletPointBold:"Inside Ferrari's Hybrid Powertrain",
              bulletPointRest:"Ferrari Link",
              link:"https://www.ferrari.com/en-EN/hypercar/articles/ferrari-499p-hybrid-powertrain-how-ers-and-4wd-work"
            }
          ))}}/>}
          label={<Typography fontSize="14px"><a href="https://www.ferrari.com/en-EN/hypercar/articles/ferrari-499p-hybrid-powertrain-how-ers-and-4wd-work" target="_blank" rel="noopener noreferrer">Inside Ferrari's Hybrid Powertrain</a></Typography>}
        />
         
      </Stack>
   
  </FormControl>
 </>
      

 :
 <>
 <Typography
  style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
 >
   Cards
</Typography>

<FormControl component="fieldset">
{selectedChatUser.name === 'Bob Johnson' ?
<Stack spacing={2}>
<FormControlLabel
style={{display:"flex",gap:"2rem"}}
value="article1"
control={<Checkbox/> }
/>}
label={<Typography fontSize="14px">
  <div style={{cursor:"pointer"}}  onClick={()=>{window.open('/apps/birthdayone', '_blank')}}>Happy Birthday 1</div>
  </Typography>}
/>
<FormControlLabel
style={{display:"flex",gap:"2rem"}}
value="article2"
control={<Checkbox />}
label={<Typography fontSize="14px"><div style={{cursor:"pointer"}}  onClick={()=>{window.open('/apps/birthdaytwo', '_blank')}}>Happy Birthday 2</div></Typography>}
/>


</Stack>
:

<Stack spacing={2}>
<FormControlLabel
style={{display:"flex",gap:"2rem"}}
value="article1"
control={<Checkbox style={{display:"none"}}
/>}
label={<Typography fontSize="14px">
  <div  style={{cursor:"pointer"}}  onClick={()=>{window.open('/apps/holidayone', '_blank')}}>Happy Holiday 1</div>
  </Typography>}
/>


</Stack>


}

</FormControl>
</>
  }
          </div>
          }

</>
        ) : (
          <div className="flex flex-col flex-1">
            <div className="flex flex-col flex-1 items-center justify-center">
              <Icon className="text-128" color="disabled">
                chat
              </Icon>
            </div>
            <Typography className="px-16 pb-24 text-center" color="textSecondary">
              Start a conversation by typing your message below.
            </Typography>
          </div>
        )}
      </FuseScrollbars>
       {/* <button onClick={testMe()}>Click Me</button> */}
      {chatMessages && (
        <form onSubmit={onMessageSubmit} className="absolute bottom-0 right-0 left-0 py-16 px-8">
          <Paper className="flex items-center relative  shadow" style={{height:"6rem",width:"107%",position:"relative",top:"2rem",left:"-2rem"}}>
            <TextField
             style={{height:"6rem"}}
              autoFocus={false}
              disabled={connectStatus == 'pending' ? true : false}
              id="message-input"
              className="flex-1"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: 'flex flex-grow flex-shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8',
                  input: '',
                },
                placeholder: 'Type your message',
              }}
              InputLabelProps={{
                shrink: false,
                className: classes.bootstrapFormLabel,
              }}
              onChange={onInputChange}
              value={messageText}
            />
            <IconButton className="absolute ltr:right-20 rtl:left-0 top-8" type="submit">
              <Icon className="text-24" color="action">
                send
              </Icon>
            </IconButton>
          </Paper>
        </form>
      )}
    </div>
  );
}

export default Inbox;
