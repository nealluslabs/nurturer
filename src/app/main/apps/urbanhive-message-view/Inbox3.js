import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, Divider, Chip } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import clsx from 'clsx';


import holiday1 from 'src/images/thanksgiving1.png'
import holiday2 from 'src/images/thanksgiving2.png'
import birthday1 from 'src/app/main/urbanhive-assets/birthday1.png'
import birthday2 from 'src/images/Birthday_2.png'


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

function Inbox3(props) {
  const classes = useStyles(props);
  const { candidateInFocus, selectedInteraction } = useSelector(
    (state) => state.user || {},
  );


  const { messageInFocus } = useSelector(
    (state) => state.chat
  );

  console.log("ON THE INBOX PAGE, WHATS OUR MESSAGE IN FOCUS?--->",messageInFocus)

  const { isAuth, user } = useSelector((state) => state.login);
  const selectedChatUser = messageInFocus || {};

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [holidayMessage1, setHolidayMessage1] = useState(true);
  const [holidayMessage2, setHolidayMessage2] = useState(false);
  const [birthdayMessage1, setBirthdayMessage1] = useState(true);
  const [birthdayMessage2, setBirthdayMessage2] = useState(false);

  const [defaultCards, setDefaultCards] = useState(user && user.cards ? user.cards : {});
  const [paragraphs, setParagraphs] = useState(messageInFocus && messageInFocus[0] && messageInFocus[0].messageQueue?messageInFocus[0].messageQueue[0]:{} );

  const editableRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);

  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);

const [chatMessages,setChatMessages] = useState(messageInFocus && messageInFocus/*[0] &&  messageInFocus[0].messageQueue?messageInFocus[0].messageQueue[0] : []*/)
  const chatMessagesOutput = chatMessages;
  const contacts = [];
  let connectStatus;

  let onlyPendingMessages = selectedInteraction ? [messageInFocus && messageInFocus.messageQueue?messageInFocus.messageQueue[0]:{}] : [];

  useEffect(() => {
    setParagraphs(messageInFocus && messageInFocus[0] && messageInFocus[0].messageQueue?messageInFocus[0].messageQueue[0]:{});

    setChatMessages(messageInFocus && messageInFocus)
  
    
  
  }, [messageInFocus]);

  useEffect(() => {
    setDefaultCards(user && user.cards ? user.cards : {});
  }, [user]);

  const handleSave = () => {
    if (!editableRef.current) {
      return;
    }
  };

  const handleInput = () => {
    if (!editableRef.current) {
      return;
    }

    const paraData = {
      firstParagraph: editableRef.current.querySelector(".firstParagraph")?.innerText || "",
      secondParagraph: editableRef.current.querySelector(".secondParagraph")?.innerText || "",
      thirdParagraph: editableRef.current.querySelector(".thirdParagraph")?.innerText || "",
    };

    setParagraphs((prev) => ({ ...prev, ...paraData }));
  };

  function shouldShowContactAvatar(item, i) {
    if (!selectedChatUser || !selectedChatUser.uid) {
      return false;
    }

    return (
      item.user1 === selectedChatUser.uid
      && ((chatMessages[i + 1] && chatMessages[i + 1].user1 !== selectedChatUser.uid) || !chatMessages[i + 1])
    );
  }

  function isFirstMessageOfGroup(item, i) {
    return i === 0 || (chatMessages[i - 1] && chatMessages[i - 1].user1 !== item.user1);
  }

  function isLastMessageOfGroup(item, i) {
    return (
      i === chatMessages.length - 1 || (chatMessages[i + 1] && chatMessages[i + 1].user1 !== item.user1)
    );
  }

  if (!messageInFocus) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          p: 4,
        }}
      >
        <Typography color="textSecondary" variant="h5" sx={{ textAlign: "center" }}>
          Select a Message from the list to view the message details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "left",
        overflowY: "auto",
        p: 2
      }}
    >
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
              key={item.time || item.id || i}
              className={clsx(
                classes.messageRow,
                'flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative px-16 pb-4',
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
                  src={selectedChatUser.photoUrl}
                />
              )}
              <div className="bubble flex relative items-center justify-center p-12 max-w-full shadow">
                <div className="leading-tight whitespace-pre-wrap" style={{width:"50rem"}}>
                  <div
                    ref={editableRef}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={handleInput}
                  >

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
                        Hello, {messageInFocus && messageInFocus.name ? messageInFocus.name:messageInFocus && messageInFocus.firstName}
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

                        { paragraphs && paragraphs.messageType && (paragraphs.messageType === "Holiday"  ) &&
                          <>
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

                        { paragraphs && paragraphs.messageType && (paragraphs.messageType === "ThankYou"  ) &&
                          <>
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

                        { paragraphs && paragraphs.messageType && (paragraphs.messageType === "workAnniversary"  ) &&
                          <>
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
                      </span>
                    }

                    {onlyPendingMessages && onlyPendingMessages.length > 0 &&
                      <>
                        <><br /></>
                        {paragraphs && !(paragraphs.messageType === 'Holiday') && !(paragraphs.messageType === 'Birthday') && !(paragraphs.messageType === 'Event') && paragraphs.sentBulletPoints && paragraphs.sentBulletPoints.map((point,index)=>(
                          <div key={point.id || index}>
                            <br />
                            • <b>{point.bulletPointBold}</b>
                            <br />
                            <span>
                              – {point.bulletPointRest}{" "}
                            </span>
                            {<><br /><br /></>}
                          </div>
                        ))}
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

                    { paragraphs && paragraphs.messageType && (paragraphs.messageType === "Birthday"  ) &&
                      <>
                        {birthdayMessage1 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
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

                        { birthdayMessage2 && (paragraphs.firstParagraph||paragraphs.secondParagraph||paragraphs.thirdParagraph) &&
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
}

export default Inbox3;
