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
        
       {/* I hope you're doing well and navigating this season with clarity. It’s been about three months
         since we last connected, and I’ve been thinking about the pace and complexity of your role
          as a Project Manager at Urban Developers LLC—especially in today’s construction landscape
                where timelines, risk mitigation, and stakeholder alignment are all being pushed to evolve.*/}


        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.firstParagraph}
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
         
       { /* I hope you're doing well and navigating this season with clarity.
          It’s been about six months since we last connected, and I’ve been thinking
           about your role at Harmony Medical Center. As a Healthcare Administrator,
            balancing patient flow, compliance demands, and staff well-being is no small
             feat—especially in today’s ever-evolving regulatory and operational landscape.*/}


        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.firstParagraph}
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
        {/*While reading through some recent industry updates, I came across a couple of articles that I thought you might enjoy. They focus on themes that are especially relevant to project leadership in high-growth urban environments, including proactive risk management and tech-enabled coordination:*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.secondParagraph}
       </span>
         :
         selectedChatUser && selectedChatUser.name  === "Carol Garcia"?
         <span>
        {/* While reading through some recent industry updates, I came across a couple of articles that I thought you might enjoy. They touch on themes related to global brand development, data-informed campaigns, and how marketers are staying agile in competitive environments:*/}
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
         {/*While reading through some recent updates in the healthcare space, I came across a couple of articles that I thought you might enjoy. They focus on topics like system efficiency, quality of care, and the leadership mindset needed to guide teams through transformation:*/}
         {selectedChatUser && selectedChatUser.message && selectedChatUser.message.secondParagraph}
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
         <br /><br />
        • <b>{/*“Reimagining Urban Project Delivery”*/}{selectedChatUser && selectedChatUser.message && selectedChatUser.message.bulletPointOneBold}</b>
        <br />
        <span>
          – {/*from McKinsey, published in April 2025*/}{selectedChatUser && selectedChatUser.message && selectedChatUser.message.bulletPointOneRest}{" "}
          {/*<a
            href="https://www.pwc.com/id/en/media-centre/infrastructure-news/march-2025/a-breath-of-fresh-air-for-the-national-aviation-industry.html"
            style={{ textDecoration: "underline" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            McKinsey Link
        </a>*/}
        </span>
        <br /><br />
        • <b>{/*“Navigating Complexity in Construction Projects”*/}{selectedChatUser && selectedChatUser.message && selectedChatUser.message.bulletPointTwoBold}</b>
        <br />
        <span>
          – {/*from ENR, published in May 2025.*/}{selectedChatUser && selectedChatUser.message && selectedChatUser.message.bulletPointTwoRest}{" "}
         {/* <a
            href="https://www.deloitte.com/global/en/about/press-room/deloitte-global-airline-ceo-survey.html"
            target="_blank"
            style={{ textDecoration: "underline" }}
            rel="noopener noreferrer"
          >
            ENR Link
        </a>*/}
        </span>
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
        
        {/*We had some great conversations previously, and I really valued hearing how you manage both the strategic and human sides of development. Let me know if you’re available for a quick catch-up in the coming weeks. I’d enjoy hearing more about what you're working on—and maybe even which projects have made it into your photography portfolio lately.*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.thirdParagraph}
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
         
        {/* We had some great conversations previously, and I truly valued hearing your perspective on streamlining operations while staying patient-centered. Let me know if you’d be open to a quick catch-up sometime soon—I’d love to hear what’s new on your end (and how things are going at the animal shelter too!). Wishing you continued momentum*/}
        {selectedChatUser && selectedChatUser.message && selectedChatUser.message.thirdParagraph}
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


           
{/*<div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",marginLeft:"7.5rem",marginTop:"-10rem",marginBottom:"10rem",backgroundColor:"#fff",borderRadius:"2rem",width:"82%",padding:"1rem",paddingTop:"3rem"}}>
  

     
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
          control={<Checkbox />}
          label={<Typography fontSize="14px">The Evolution of Electric Supercars</Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article2"
          control={<Checkbox />}
          label={<Typography fontSize="14px">How Aerodynamics Shape Modern Vehicles</Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article3"
          control={<Checkbox />}
          label={<Typography fontSize="14px">Inside Ferrari's Hybrid Powertrain</Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article4"
          control={<Checkbox />}
          label={<Typography fontSize="14px">Why EVs Are Faster Off the Line</Typography>}
        />
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article5"
          control={<Checkbox />}
          label={<Typography fontSize="14px">Top Car Design Trends in 2025</Typography>}
        /> 
      </Stack>
   
  </FormControl>
          </div>
          */}

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
