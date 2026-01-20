
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
import { Checkbox, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { generateAiMessage,sendEmailToContact,stopMessageSending, updateUserBroadcast, updateUserBroadcastWithNotif, updateUserChat } from 'redux/actions/user.action';
import { RiAiGenerate2 } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";


import { Modal, Box } from '@mui/material';


//import holiday1 from 'src/app/main/urbanhive-assets/holiday.png'
import holiday1 from 'src/images/thanksgiving1.png'
import holiday2 from 'src/images/thanksgiving2.png'
import birthday1 from 'src/app/main/urbanhive-assets/birthday1.png'
import birthday2 from 'src/images/Birthday_2.png'
import { saveEditedParagraphs } from 'redux/reducers/user.slice';
import { ToastContainer, toast } from 'react-toastify';
import { FaFileUpload, FaRegEdit, FaStop, FaStopCircle } from 'react-icons/fa';

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
  const [loading,setLoading] = useState(false)

  const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);

  const {editedParagraphs} =useSelector((state)=>state.user)
  const chat = useSelector(({ chatApp }) => chatApp.chat);
  // const user = useSelector(({ chatApp }) => chatApp.user);
 
  //const {user} =useSelector((state)=>state.auth)


  const editableRef = useRef(null);
  const menuRef = useRef(null);
  const handleSave = () => {
    const updatedContent = editableRef.current.innerHTML;
    ////console.log('Saved content:', updatedContent);
    // You can now send `updatedContent` to your backend or store it
    }

  const classes = useStyles(props);
  const chatRef = useRef(null);
  const [messageText, setMessageText] = useState('');

  const [birthdayMessage1,setBirthdayMessage1] = useState(false)
  const [birthdayMessage2,setBirthdayMessage2] = useState(false)
  const [holidayMessage1,setHolidayMessage1] = useState(true)
  const [holidayMessage2,setHolidayMessage2] = useState(false)

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);

  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);


  const notifyInvite = () => toast.success('Message Updated!', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });


    const notifyInviteCustom = (message) => toast.success(message, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });


      const notifySkipCustom = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
 //New Hooks

//  const [connectStatus, setconnectStatus] = useState('');
 const { isAuth, user } = useSelector((state) => state.login);

 const { selectedChatUser, chatMessages } = useSelector((state) => state.chat);
 
 const thisUser =user && user
 console.log("IN INBOX DAGOGO, WHO IS SELECTED CHAT USER--->",selectedChatUser)

//HOW WE DECIDE WHICH MESSAGE THE AI WILL MODEL - START 

const [aiMessageToModel,setAiMessageToModel] = useState({});

useEffect(()=>{


  setAiMessageToModel(user.queryMsg && user.queryMsg.filter((item)=>(item.messageType ==='Email')) && user.queryMsg.filter((item)=>(item.messageType ==='Email'))[0])


},[selectedChatUser])


//HOW WE DECIDE WHICH MESSAGE THE AI WILL MODEL  --END

const handleInput = () => {
  const paraData = {
    firstParagraph: editableRef.current.querySelector(".firstParagraph")?.innerText || "",
    secondParagraph: editableRef.current.querySelector(".secondParagraph")?.innerText || "",
    thirdParagraph: editableRef.current.querySelector(".thirdParagraph")?.innerText || "",
    //PERHAPS CONSIDER SETTING BULLET POINTS --AS THEY MAY DISAPPEAR WHEN YOU START TYPING.. OR NOT, WE MAY NOT NEED TO TYPE  DAGOGO -SEP 12 2025
   // messageType:'Email',
   // messageStatus:"Pending"
  };
  //console.log("HANDLE INPUTS IS WORKING",paragraphs)
  setParagraphs({...paragraphs,...paraData});
  dispatch(saveEditedParagraphs({...paragraphs,...paraData}))
};

const updateArticle = (newBulletPoint) =>{ 
let updatedBulletPoints = [...paragraphs.bulletPoints]


if(updatedBulletPoints.filter((item)=>(item.id === newBulletPoint.id)).length ){
  //console.log("ITS THERE SO WE REMOVE IT---> ARTICLE IS UPDATING")
  //console.log("WHAT IS NEW BULLET POINT ID--->",newBulletPoint.id)
  //console.log("WHAT IS UPDATED BULLET POINTS--->",updatedBulletPoints)

  updatedBulletPoints = updatedBulletPoints.filter((item)=>(item.id !== newBulletPoint.id))
}
else{
  //console.log("ITS NOT THERE,SO WE ADD IT---> ARTICLE IS UPDATING")

  updatedBulletPoints = [...updatedBulletPoints,newBulletPoint]
}


setParagraphs({...paragraphs,bulletPoints:updatedBulletPoints});
  dispatch(saveEditedParagraphs({...paragraphs,bulletPoints:updatedBulletPoints}))

}



//DO NOT DELETE, IT IS USED TO DISPLAY MESSAGES THAT HAVE NOT BEEN DISPLAYED...IN A TIMELY FASHION, THE PAGE UPDATES PROMPTLY WITH THIS CONDITION
let onlyPendingMessages = selectedChatUser.messageQueue  && selectedChatUser.messageQueue.filter((item)=>(item.messageStatus && item.messageStatus === "Pending")) 


let [paragraphs, setParagraphs] = useState(onlyPendingMessages  && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1] && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].messageStatus && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].messageStatus !== "Sent" ? onlyPendingMessages[onlyPendingMessages.length-1]
  :
  {
 /* firstParagraph:onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1]?onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].firstParagraph : " ",
  secondParagraph:onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1]? onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].secondParagraph: " ",
  thirdParagraph:onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1]?onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].thirdParagraph :" "*/
});

console.log("OKAY SO WHAT IS PARAGRAPHS --->", paragraphs )

let [bulletPointChoice, setBulletPointChoice] = useState(selectedChatUser && onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1]? onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].bulletPoints
  :
 []
);

let [defaultCards,setDefaultCards] = useState(user.cards  && user.cards)


 const { connects,chatGptAnswer,aiTrigger } = useSelector((state) => state.user);
 let connectStatus;

 //console.log("SELECTED CHAT USER IS--->",selectedChatUser)
 //console.log("PARAGRAPHS IS--->",user.message)

  useEffect(() => {
    if (chatMessages) {
      scrollToBottom();
    }
  }, [chatMessages]);

 

  useEffect(() => {


   
   if(editedParagraphs && editedParagraphs.bulletPoints && editedParagraphs.bulletPoints.length && editedParagraphs.bulletPoints[0] && editedParagraphs.bulletPoints[0].bulletPointBold !== ''){

    setParagraphs({...editedParagraphs,bulletPoints:editedParagraphs.bulletPoints && editedParagraphs.bulletPoints.slice(0,2)}); //to reflect only setting 2 bullet points after chat gpt generates them
    setBulletPointChoice(editedParagraphs.bulletPoints)
    
   }
   else{
    
    const bulletPointToBeSelected = user.queryMsg && user.queryMsg.filter((item)=>(item.messageType ==='Email')) && user.queryMsg.filter((item)=>(item.messageType ==='Email'))[0] && user.queryMsg.filter((item)=>(item.messageType ==='Email'))[0].bulletPoints && user.queryMsg.filter((item)=>(item.messageType ==='Email'))[0].bulletPoints

    setBulletPointChoice(bulletPointToBeSelected && bulletPointToBeSelected)
   


    setParagraphs(onlyPendingMessages  && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1] ? {...onlyPendingMessages[onlyPendingMessages.length-1],bulletPoints:onlyPendingMessages[onlyPendingMessages.length-1].bulletPoints && onlyPendingMessages[onlyPendingMessages.length-1].bulletPoints.slice(0,2) }
      :
      {
      firstParagraph:onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1]?onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].firstParagraph : " ",
      secondParagraph:onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1]? onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].secondParagraph: " ",
      thirdParagraph:onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1]?onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].thirdParagraph :" ",
      messageType:onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1]?onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].messageType :" "
    });


    setBulletPointChoice(selectedChatUser && onlyPendingMessages && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1] &&  onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1].bulletPoints)

   dispatch(saveEditedParagraphs(onlyPendingMessages  && onlyPendingMessages[onlyPendingMessages && onlyPendingMessages.length-1] && onlyPendingMessages[onlyPendingMessages.length-1]))

   }
    
   
  }, [selectedChatUser,selectedChatUser.messageQueue]);


console.log("WE SET PARAGRAPHS TO ---->",editedParagraphs)

  useEffect(() => {

   //THIS USE EFFECT IS FOR WHEN CHAT GPT DELIVERS A NEW MESSAGE ONLY
  
    if(editedParagraphs && editedParagraphs.bulletPoints && editedParagraphs.bulletPoints.length){
 
     setParagraphs({...editedParagraphs,bulletPoints:editedParagraphs.bulletPoints && editedParagraphs.bulletPoints.slice(0,2)}); //to reflect only setting 2 bullet points after chat gpt generates them
     setBulletPointChoice(editedParagraphs.bulletPoints)
    
    }
  
      //THIS USE EFFECT IS FOR WHEN CHAT GPT DELIVERS A NEW MESSAGE ONLY --END
    
   }, [chatGptAnswer,aiTrigger]);




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
   // dispatch(
   //   sendChat({
   //     messageText,
   //     user1: user.uid,
   //     user2: selectedChatUser.uid,
   //   })
   // )
    
   
    dispatch( 
      updateUserBroadcast(editedParagraphs,user,selectedChatUser,notifyInvite)
    ).then(() => {
      setMessageText('');
    });
  }

  const sendUpdate = ()=>{
    //console.log("Message has begun its progress--->",editedParagraphs.firstParagraph)
    dispatch( 
      updateUserBroadcastWithNotif(editedParagraphs,user,selectedChatUser,notifyInvite)
    ).then(() => {
    // notifyInvite()
    });
  }

 
  const testMe = () => {
    //console.log('Connection Status is: ', connectStatus);
  }

  const connectsById = Object.fromEntries(
   connects.map(({ user2, type, status, invited_amt, skipped_amt }) => [user2, { type, status, invited_amt, skipped_amt }])
    );
    
      const chatMessagesOutput = chatMessages.map(({ user1, user2, messageText, time, isViewed, unread }) => ({
        user1, user2, messageText, time, isViewed, unread,
        ...(connectsById[user2] || { type: '', status: '', invited_amt: '', skipped_amt: ''})
      }));
      const [showAiMenu, setShowAiMenu] = useState(false);

        useEffect(() => {
          const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
              setShowAiMenu(false);
            }
          };

          document.addEventListener("mousedown", handleClickOutside);
          
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [showAiMenu]);

      const handleAiOptionClick = (messageType) => {
        console.log('AI Option Selected=========>>>>>>>>>>>', messageType);
        setShowAiMenu(false); // Close menu after selection

        const canGenerate = selectedChatUser && onlyPendingMessages && onlyPendingMessages.length && onlyPendingMessages.every((msg) => msg.messageStatus !== "Pending" ) ||selectedChatUser && onlyPendingMessages && onlyPendingMessages.length === 0;

        if (!canGenerate) {
          notifySkipCustom("You can't generate a new message until your previous message has been sent!");
          return;
        }

        // Dispatch based on type
        if (messageType === 'Touch') {

          dispatch(generateAiMessage(
            "Touch",
            selectedChatUser.frequency,
            selectedChatUser.name,
            selectedChatUser.jobTitle,
            selectedChatUser.companyName,
            selectedChatUser.industry,
            selectedChatUser.interests,
            setLoading,
            aiMessageToModel,
            thisUser,
            notifyInvite,
            selectedChatUser
          ));

        } else if (messageType === 'Birthday') {
          dispatch(generateAiMessage(
            "Birthday", // type
            selectedChatUser.frequency,
            selectedChatUser.name,
            selectedChatUser.jobTitle,
            selectedChatUser.companyName,
            selectedChatUser.industry,
            selectedChatUser.interests,
            setLoading, 
            aiMessageToModel,
            thisUser,
            notifyInvite,
            selectedChatUser
          ));
        }else if (messageType === 'Event') {
          dispatch(generateAiMessage(
            "Event", // type
            selectedChatUser.frequency,
            selectedChatUser.name,
            selectedChatUser.jobTitle,
            selectedChatUser.companyName,
            selectedChatUser.industry,
            selectedChatUser.interests,
            setLoading,
            aiMessageToModel,
            thisUser,
            notifyInvite,
            selectedChatUser
          ));
        }
};
  return (
    <div className={clsx('flex flex-col relative', props.className)}>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      <FuseScrollbars ref={chatRef} className="flex flex-1 flex-col overflow-y-auto">
        {chatMessages &&  chatMessages.length || 0 && chatMessages && chatMessages.length > 0 ? (
        <>
          <div onClick={handleSave} className="
  flex flex-col 
  pt-16 px-16 
  pb-40 
  pl-0 -ml-10         
  pr-0   
  w-3/5 mx-auto
  sm:w-full            
  sm:pl-56 sm:ml-0    
  sm:pr-56            
" >
            {chatMessagesOutput && chatMessagesOutput.map((item, i) => {
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
                    i + 1 === chatMessages && chatMessages.length && 'pb-96'
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
                        onBlur={handleInput}
                        //onMouseLeave={handleInput}
                       
                       >     




       {/* Modal */}
       <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={birthday1} alt="Birthday Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
        </Box>
      </Modal>



      {/* Modal 2*/}
      <Modal open={open2} onClose={handleClose2}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={birthday2} alt="Birthday Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
        </Box>
      </Modal>


      {/* Modal 3*/}
      <Modal open={open3} onClose={handleClose3}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={holiday1} alt="Birthday Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
        </Box>
      </Modal>
        


       {
        <span>
          Hello, {selectedChatUser && selectedChatUser.name ? selectedChatUser.name:selectedChatUser && selectedChatUser.firstName  }
        </span>
        }


    
        <br /><br /><br /><br />

       {onlyPendingMessages && onlyPendingMessages.length > 0 &&

        <span className="firstParagraph" sx={{color:"black"}}>
      

        {paragraphs && paragraphs.firstParagraph}
        </span>
        }
        <br /><br /><br /><br />
       
        {onlyPendingMessages && onlyPendingMessages.length > 0 &&



          <span className="secondParagraph">
         
        {paragraphs && paragraphs.secondParagraph}

        {/*MASSIVE PICTURE LOGIC INCOMING*/}

        { paragraphs && paragraphs.messageType && (paragraphs.messageType === "Holiday"  ) &&
         <>
         {/*HOLIDAY MESSAGE */}
         {/*DEFAULT 1ST*/}

        {holidayMessage1 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
         <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={ defaultCards && defaultCards.thanksgivingCard} alt="Holiday Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

             {/*NON-DEFAULT 2ND*/}
           { holidayMessage2 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
            <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={ defaultCards && defaultCards.thanksgivingCard2} alt="Holiday Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

         </>
          }



{ paragraphs && paragraphs.messageType && (paragraphs.messageType === "Birthday"  ) &&
         <>
         {/*BIRTHDAY MESSAGE */}
         {/*DEFAULT 1ST*/}

        {holidayMessage1 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
         <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={defaultCards && defaultCards.birthdayCard} alt="Birthday Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

             {/*NON-DEFAULT 2ND*/}
           { holidayMessage2 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
            <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={defaultCards && defaultCards.birthdayCard2} alt="Birthday Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

         </>
          }




    { paragraphs && paragraphs.messageType && (paragraphs.messageType === "ThankYou"  ) &&
         <>
         {/*THANK YOU MESSAGE */}
         {/*DEFAULT 1ST*/}

        {holidayMessage1 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
         <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={defaultCards && defaultCards.thankYouCard} alt="Thank you Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

             {/*NON-DEFAULT 2ND*/}
           { holidayMessage2 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
            <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={defaultCards && defaultCards.thankYouCard2} alt="Thank You Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

         </>
          }




{ paragraphs && paragraphs.messageType && (paragraphs.messageType === "workAnniversay" ) &&
         <>
         {/*WORK ANNIVERSARY MESSAGE */}
         {/*DEFAULT 1ST*/}

        {holidayMessage1 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
         <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={defaultCards && defaultCards.workAnniversaryCard} alt="Work Anniversary Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

             {/*NON-DEFAULT 2ND*/}
           { holidayMessage2 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
            <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={defaultCards && defaultCards.workAnniversaryCard2} alt="Work Anniversary Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

         </>
          }


 
{ paragraphs && paragraphs.messageType && (paragraphs.messageType === "workAnniversary"  ) && //a repition of work anniversary here
         <>
         {/*THANK YOU MESSAGE */}
         {/*DEFAULT 1ST*/}

        {holidayMessage1 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
         <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={defaultCards && defaultCards.workAnniversaryCard} alt="Work Anniversary Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

             {/*NON-DEFAULT 2ND*/}
           { holidayMessage2 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
            <div
              style={{
                width: '45%',
                height: '45%',
                background: 'white',
                borderRadius: '4px',
                marginTop: '18px',
                padding: '42px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={defaultCards && defaultCards.workAnniversaryCard2} alt="Work Anniversary Card" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        }

         </>
          }



          {/*MASSIVE PICTURE LOGIC INCOMING - END*/}


        </span>
        }
       
        {onlyPendingMessages && onlyPendingMessages.length > 0 &&

        <>
         {<> <br /> </>}
         {paragraphs && !(paragraphs.messageType === 'Holiday') && !(paragraphs.messageType === 'Birthday') &&  !(paragraphs.messageType === 'Event') && paragraphs.bulletPoints && paragraphs.bulletPoints.map((point,index)=>( 
          <>
          <br /> 
        • <b>{point.bulletPointBold}</b> 
        <br />
        <span>
           – {point.bulletPointRest}{" "} 
          
        </span>
       {!(selectedChatUser.name === 'Emily Whiter' || selectedChatUser.name === 'Bob Johnsons') &&<> <br /><br /> </>}
        </>
      ))
       }

      

        </> 
      
       
        }
       


       
       {onlyPendingMessages && onlyPendingMessages.length > 0 &&
        <span className="thirdParagraph">
      
      
      {paragraphs && paragraphs.thirdParagraph}
        </span>
        }


        <br /><br /><br /><br />

      
       { 
         <>
        <span>
          Regards,
        </span>
         
        <br /><br />

        <span>
          {user && user.firstName && user.lastName? user.firstName + " " + user.lastName:user && user.name && user.name !== "test user"?user.name :"Tim"}
        </span>
        </>

            }


      </div>
                      </div>
  
                  </div>
                </div>



              );
            })}
          </div>


           
{<Box sx={{display:onlyPendingMessages && onlyPendingMessages.length > 0?"flex":"none",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",marginLeft:{xs:"-0rem", sm:"7.5rem"},marginTop:"2rem",marginBottom:"10rem",backgroundColor:"#fff",borderRadius:"2rem",width:{xs:"55%",sm:"73%",md:"53rem"},maxWidth:{xs:"60%",sm:"78.5%"},padding:"1rem",paddingTop:"3rem"}}>
  
 {paragraphs && paragraphs.messageType && !(paragraphs.messageType === "Event")  && !(paragraphs.messageType === "Birthday")  && !(paragraphs.messageType === "Holiday") && paragraphs.bulletPoints  && paragraphs.bulletPoints[0]  && paragraphs.bulletPoints[0].bulletPointBold && (paragraphs.bulletPoints[0].bulletPointBold !==' ')?
   
 onlyPendingMessages && onlyPendingMessages.length > 0 &&    //<--- this condition makes the box NOT appear when messages are yet to be sent
   <>
                    <Typography
                     style={{fontWeight:700,fontSize:"1.2rem",marginBottom:"1rem"}}
                    >
                      Articles
                </Typography>
  
  <FormControl component="fieldset">
    
      <Stack spacing={2}>
        

{paragraphs && paragraphs.bulletPoints  && bulletPointChoice && bulletPointChoice.map((point,index)=>( 
          <>
        <FormControlLabel
        style={{display:"flex",gap:"2rem"}}
          value="article1"
          control={<Radio 
            checked={paragraphs.bulletPoints.some(bp => bp.id === point.id)}
            
            onClick={()=>{updateArticle(
            {
              id:point.id,
              bulletPointBold:point.bulletPointRest && point.bulletPointBold,
              bulletPointRest:point.bulletPointRest && point.bulletPointRest,
              link:point.link && point.link
            }
          )}}/>}
          label={<Typography fontSize="14px"><a href={point.link && point.link} target="_blank" rel="noopener noreferrer">{point.bulletPointBold}</a></Typography>}
        />
       
        </>
      ))}

      
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
{selectedChatUser.name === 'Bob JohnsonOPIA' ?
<Stack spacing={2}>
<FormControlLabel
style={{display:"flex",gap:"2rem"}}
value="article1"
control={<Radio checked={birthdayMessage1} onClick={()=>{ 
                                                  
                                              
                                                    setBirthdayMessage1(true);setBirthdayMessage2(false)
                                                 
                                                  }}   /> }
label={<Typography fontSize="14px">
  <div style={{cursor:"pointer"}}  onClick={handleOpen}>Happy Birthday 1</div>
  </Typography>}
/>


<FormControlLabel
style={{display:"flex",gap:"2rem"}}
value="article2"
control={<Radio checked={birthdayMessage2} onClick={()=>{

  setBirthdayMessage2(true);setBirthdayMessage1(false)  

}}
/>}
label={<Typography fontSize="14px"><div style={{cursor:"pointer"}}  onClick={handleOpen2}>Happy Birthday 2</div></Typography>}
/>


</Stack>
:

<Stack spacing={2}>
<FormControlLabel
style={{display:"flex",gap:"2rem"}}
value="article1"
control={<Radio checked={holidayMessage1} onClick={()=>{ setHolidayMessage1(true);setHolidayMessage2(false)   }}
/>}
label={<Typography fontSize="14px">
  <div  style={{cursor:"pointer"}}  onClick={handleOpen3} >Happy Holiday 1</div>
  </Typography>}
/>

<FormControlLabel
style={{display:"flex",gap:"2rem"}}
value="article1"
control={<Radio checked={holidayMessage2} onClick={()=>{ setHolidayMessage1(false);setHolidayMessage2(true)}}
/>}
label={<Typography fontSize="14px">
  <div  style={{cursor:"pointer"}}  onClick={handleOpen3} >Happy Holiday 2</div>
  </Typography>}
/>



</Stack>


}

</FormControl>
</>
  }
          
           </Box>
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
                placeholder: '',
              }}
              InputLabelProps={{
                shrink: false,
                className: classes.bootstrapFormLabel,
              }}
              onChange={onInputChange}
              value={messageText}
            />
            {/*
            <IconButton className="absolute ltr:right-20 rtl:left-0 top-8" type="submit">
              <Icon className="text-24" color="action" onClick={(ev)=>{sendUpdate(ev)}}>
                update
              </Icon>
            </IconButton>
            */}


            
           { 
             
             <IoIosSend  onClick={()=>{
           
              if(selectedChatUser && onlyPendingMessages && onlyPendingMessages.length && onlyPendingMessages.every((msg) => msg.messageStatus === "Sent" ) ||selectedChatUser && onlyPendingMessages && onlyPendingMessages.length === 0)
            {
              //the if condition above, only pending messages are showing, so theres no way any message status can have sent, consider using a better condition
              notifySkipCustom("You can't resend a message that has already been sent!")
             
              }
              else{
                  //notifyInviteCustom("Email has been sent out!")
                dispatch(sendEmailToContact(selectedChatUser,notifyInviteCustom,notifySkipCustom))
              }
            }} 
              
              style={{position:"absolute",top:"2rem",right:"8rem",fontSize:"2.4rem",color:"grey",cursor:"pointer"}} />
             }
           

            

           { !loading && 
           <>
         
           {/* //GENERATE AI MESSAGE BELOW HAS TO HAVE AN EXTRA INPUT WHICH DEPENDS ON THE USER THE AI IS GENERATING FOR, - 28TH AUG 2025 - DAGOGO,
           
           
          
          //  <RiAiGenerate2 onClick={()=>{

          //   if(selectedChatUser && onlyPendingMessages && onlyPendingMessages.length && onlyPendingMessages.every((msg) => msg.messageStatus !== "Pending" ) ||selectedChatUser && onlyPendingMessages && onlyPendingMessages.length === 0)
          // {
          //   dispatch(generateAiMessage(selectedChatUser.frequency,selectedChatUser.name,selectedChatUser.jobTitle,selectedChatUser.companyName,selectedChatUser.industry,selectedChatUser.interests,setLoading,aiMessageToModel,thisUser,notifyInvite,selectedChatUser))
          //   }
          //   else{
          //     notifySkipCustom("You can't generate a new message until your previous message has been sent!")
          //   }
          // }} 
            
          //   style={{position:"absolute",top:"2rem",right:"20rem",fontSize:"2.4rem",color:"grey",cursor:"pointer"}} /> */}

          <RiAiGenerate2 
            onClick={(e) => {setShowAiMenu(true)
               console.log('ai button clicked============>>>>>>>>>>');
              e.stopPropagation();
            }} 
            style={{ position: "absolute", top: "2rem", right: "20rem", fontSize: "2.4rem", color: "grey", cursor: "pointer" }} 
          />

          {showAiMenu && (
            <div 
            ref={menuRef}
            style={{
              position: "absolute",
              top: "-18rem",
              right: "15rem",
              backgroundColor: "white",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              zIndex: 100,
              width: "180px",
              border: "1px solid #ddd",
              padding: "15px"
            }}>
              <div 
                onClick={() => handleAiOptionClick('Touch')}
                style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <strong>Touches</strong>
                <div style={{ fontSize: "10px", color: "grey" }}>Message & Articles</div>
              </div>

              <div 
                onClick={() => handleAiOptionClick('Birthday')}
                style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <strong>Birthday</strong>
                <div style={{ fontSize: "10px", color: "grey" }}>Message & Cards</div>
              </div>

              <div 
                onClick={() => handleAiOptionClick('Event')}
                style={{ padding: "10px", cursor: "pointer" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <strong>Events</strong>
                <div style={{ fontSize: "10px", color: "grey" }}>Events & Cards</div>
              </div>
            </div>
          )}
            </>
           }
     


            {
           
           <FaRegEdit onClick={(ev)=>{sendUpdate(ev) }}
           
            
            style={{position:"absolute",top:"1.9rem",right:"16rem",fontSize:"2.4rem",color:"grey",cursor:"pointer"}} />
           }


          {
           
           <FaStopCircle onClick={()=>{ dispatch(stopMessageSending(notifyInviteCustom,selectedChatUser))}}
            
            style={{position:"absolute",top:"1.9rem",right:"12rem",fontSize:"2.4rem",color:"grey",cursor:"pointer"}} />
           }



          { loading && 
            <CircularProgress size={20} style={{position:"absolute",top:"2rem",right:"20rem",color:"grey",cursor:"pointer"}} />
            }
           
          </Paper>
        </form>
      )}
    </div>
  );
}

export default Inbox;
