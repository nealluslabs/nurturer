import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "./store/contactsSlice";
import { sendMessage } from "./store/chatSlice";
import { sendChat } from "src/redux/actions/chat.action";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  Box,
  Stack,
  Radio,
  Link,
} from "@mui/material";

// Images
import ImageOne from "../../../../images/1.png";
import ImageTwo from "../../../../images/2.png";
import avatar from "../../../../images/128895.jpg";
import avatar2 from "../../../../images/17841.jpg";
import avatar3 from "../../../../images/2149128382.jpg";

const useStyles = makeStyles((theme) => ({
  messageRow: {
    "&.contact": {
      "& .bubble": {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        "& .time": {
          marginLeft: 12,
        },
      },
      "&.first-of-group": {
        "& .bubble": {
          borderTopLeftRadius: 20,
        },
      },
      "&.last-of-group": {
        "& .bubble": {
          borderBottomLeftRadius: 20,
        },
      },
    },
    "&.me": {
      paddingLeft: 40,

      "& .avatar": {
        order: 2,
        margin: "0 0 0 16px",
      },
      "& .bubble": {
        marginLeft: "auto",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        "& .time": {
          justifyContent: "flex-end",
          right: 0,
          marginRight: 12,
        },
      },
      "&.first-of-group": {
        "& .bubble": {
          borderTopRightRadius: 20,
        },
      },

      "&.last-of-group": {
        "& .bubble": {
          borderBottomRightRadius: 20,
        },
      },
    },
    "&.contact + .me, &.me + .contact": {
      paddingTop: 20,
      marginTop: 20,
    },
    "&.first-of-group": {
      "& .bubble": {
        borderTopLeftRadius: 20,
        paddingTop: 13,
      },
    },
    "&.last-of-group": {
      "& .bubble": {
        borderBottomLeftRadius: 20,
        paddingBottom: 13,
        "& .time": {
          display: "flex",
        },
      },
    },
  },
}));

function Newsletter(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const selectedContactId = useSelector(
    ({ chatApp }) => chatApp.contacts.selectedContactId
  );
  const chat = useSelector(({ chatApp }) => chatApp.chat);
  // const user = useSelector(({ chatApp }) => chatApp.user);

  const editableRef = useRef(null);

  const handleSave = () => {
    const updatedContent = editableRef.current.innerHTML;
    console.log("Saved content:", updatedContent);
    // You can now send `updatedContent` to your backend or store it
  };

  const classes = useStyles(props);
  const chatRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [newsletter1Active, setNewsletter1Active] = useState(true); // Individual toggle for newsletter 1
  const [newsletter2Active, setNewsletter2Active] = useState(false); // Individual toggle for newsletter 2
  const [activeNewsletter, setActiveNewsletter] = useState("newsletter1");

  //New Hooks

  //  const [connectStatus, setconnectStatus] = useState('');
  const { isAuth, user } = useSelector((state) => state.login);
  const { selectedChatUser, chatMessages } = useSelector((state) => state.chat);
  const { connects } = useSelector((state) => state.user);
  let connectStatus;

  console.log("SELECTED CHAT USER IS--->", selectedChatUser);

  useEffect(() => {
    if (chatMessages) {
      scrollToBottom();
    }
  }, [chatMessages]);

  function scrollToBottom() {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  } 

  function shouldShowContactAvatar(item, i) {
   if(selectedChatUser){ return (
      item.user1 ===(selectedChatUser && selectedChatUser.uid) &&
      ((chatMessages[i + 1] &&
        chatMessages[i + 1].user1 !== (selectedChatUser && selectedChatUser.uid)) ||
        !chatMessages[i + 1])

      // item.who === selectedContactId &&
      // ((chat.dialog[i + 1] && chat.dialog[i + 1].who !== selectedContactId) || !chat.dialog[i + 1])
    );}
  }

  function isFirstMessageOfGroup(item, i) {
    return (
      i === 0 ||
      (chatMessages[i - 1] && chatMessages[i - 1].user1 !== item.user1)
    );
    // return i === 0 || (chat.dialog[i - 1] && chat.dialog[i - 1].who !== item.who);
  }

  function isLastMessageOfGroup(item, i) {
    return (
      i === chatMessages.length - 1 ||
      (chatMessages[i + 1] && chatMessages[i + 1].user1 !== item.user1)
      // i === chat.dialog.length - 1 || (chat.dialog[i + 1] && chat.dialog[i + 1].who !== item.who)
    );
  }

  function onInputChange(ev) {
    setMessageText(ev.target.value);
  }

  function onMessageSubmit(ev) {
    ev.preventDefault();
    if (messageText === "") {
      return;
    }
    dispatch(
      sendChat({
        messageText,
        user1: user.uid,
        user2: selectedChatUser.uid,
      })
    ).then(() => {
      setMessageText("");
    });
  }

  const testMe = () => {
    console.log("Connection Status is: ", connectStatus);
  };

  const connectsById = Object.fromEntries(
    connects.map(({ user2, type, status, invited_amt, skipped_amt }) => [
      user2,
      { type, status, invited_amt, skipped_amt },
    ])
  );

  const chatMessagesOutput = chatMessages.map(
    ({ user1, user2, messageText, time, isViewed, unread }) => ({
      user1,
      user2,
      messageText,
      time,
      isViewed,
      unread,
      ...(connectsById[user2] || {
        type: "",
        status: "",
        invited_amt: "",
        skipped_amt: "",
      }),
    })
  );
  // const { sections, images, fonts } = useSelector((state) => state.newsletter);
  const {
    header = {},
    link = {},
    paragraph = {},
    images = {},
    selectedFont = "Poppins",
    selectedBackgroundColor = "#5C62AD",
  } = useSelector((state) => state.newsletter || {});
  const [imgSrc, setImgSrc] = useState(images?.["First Image"] || avatar);
  const [imgSrc2, setImgSrc2] = useState(images?.["Second Image"] || avatar2);
  const [imgSrc3, setImgSrc3] = useState(images?.["Third Image"] || avatar3);
  console.log("selected font ============>>>>>>", selectedFont);
  useEffect(() => {
    if (images?.["First Image"]) {
      setImgSrc(images["First Image"]);
    }
  }, [images?.["First Image"]]);
  useEffect(() => {
    if (images?.["Second Image"]) {
      setImgSrc2(images["Second Image"]);
    }
  }, [images?.["Second Image"]]);
  useEffect(() => {
    if (images?.["Third Image"]) {
      setImgSrc3(images["Third Image"]);
    }
  }, [images?.["Third Image"]]);
  return (
    <>
      <div className={clsx("flex flex-col relative", props.className)}>
        <FuseScrollbars
          ref={chatRef}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          {chatMessages.length || (0 && chatMessages.length > 0) ? (
            <>
              <div
                onClick={handleSave}
                className="flex flex-col pt-16 px-16 ltr:pl-56 rtl:pr-56 pb-40"
              >
                {chatMessagesOutput.map((item, i) => {
                  connectStatus = item.status;
                  const contact =
                    item.user1 === user.uid
                      ? user
                      : contacts.find(
                          (_contact) => _contact.user1 === item.user1
                        );
                  return (
                    <div
                      key={item.time}
                      className={clsx(
                        classes.messageRow,
                        "flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative px-16 pb-4",
                        // { me: item.who === user.id },
                        { me: item.user1 === user.uid },
                        { contact: item.user1 !== user.uid },
                        { "first-of-group": isFirstMessageOfGroup(item, i) },
                        { "last-of-group": isLastMessageOfGroup(item, i) },
                        i + 1 === chatMessages.length && "pb-96"
                      )}
                    >
                      {selectedChatUser && shouldShowContactAvatar(item, i) && (
                        <Avatar
                          className="avatar absolute ltr:left-0 rtl:right-0 m-0 -mx-32"
                          // src={contact.photoUrl}
                          src={selectedChatUser && selectedChatUser.photoUrl}
                        />
                      )}
                      <div className="bubble flex relative items-center justify-center p-12 max-w-full shadow">
                        <div
                          className="leading-tight whitespace-pre-wrap"
                          style={{ width: "50rem" }}
                        >
                          {/*item.messageText*/}
                          <div
                            ref={editableRef}
                            contentEditable={false}
                            suppressContentEditableWarning={true}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              minHeight: "200px",
                              fontFamily: selectedFont || "Poppins",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                // alignItems: "center",
                                width: "100%",
                              }}
                            >
                              {/* Newsletter 1 Preview */}
                              {activeNewsletter === "newsletter1" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                    borderRadius: "1rem",
                                    overflow: "hidden",
                                    gap: "2rem",
                                    fontFamily: `${selectedFont} !important`,
                                    // boxShadow: 3,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      backgroundColor: selectedBackgroundColor,
                                      // backgroundColor: "#5C62AD",
                                      padding: "2rem",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      color: "white",
                                    }}
                                  >
                                    <Typography
                                      variant="h3"
                                      sx={{
                                        color: "white",
                                        paddingLeft: "3rem",
                                        fontWeight: 600,
                                        fontSize: "2.5rem", 
                                        fontFamily: selectedFont || "Poppins",
                                      }}
                                    >
                                      {header["First Header"] || "Summer Vibes"}
                                    </Typography>
                                    <img
                                      alt="Logo"
                                      src={imgSrc}
                                      onError={() => setImgSrc(avatar)}
                                      style={{
                                        height: "140px",
                                        width: "200px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Box>

                                  <Box
                                    sx={{
                                      padding: "2rem",
                                      textAlign: "center",
                                      gap: "1rem",
                                    }}
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        fontSize: "2rem",
                                        fontWeight: 600,
                                        fontFamily: selectedFont || "Poppins",
                                      }}
                                    >
                                      {header["Second Header"] ||
                                        "Greetings from AB Company!"}
                                    </Typography>

                                    <Typography
                                      variant="body1"
                                      sx={{
                                        display: "block",
                                        marginBottom: "1.5rem",
                                        fontSize: "1.4rem",
                                        fontFamily: selectedFont || "Poppins",
                                      }}
                                    >
                                      {paragraph["First Paragraph"] ||
                                        "We are thrilled to share some exciting developments happening at our company."}
                                    </Typography>

                                    <Typography
                                      sx={{
                                        marginBottom: "1.5rem",
                                        fontSize: "1.4rem",
                                        fontFamily: selectedFont || "Poppins",
                                      }}
                                    >
                                      {paragraph["Second Paragraph"] ||
                                        "This month, we’re proud to announce the launch of our latest product line..."}
                                    </Typography>

                                    <Link
                                      href={link["First Link"] || "#"}
                                      target="_blank"
                                      underline="always"
                                      sx={{
                                        fontWeight: "bold",
                                        fontSize: "1.25rem",
                                        marginBottom: "2rem",
                                        color: "inherit",
                                        backgroundColor:
                                          "transparent !important",
                                        textDecoration: "underline !important",
                                      }}
                                    >
                                      CHECK OUR DEMO VIDEO
                                    </Link>

                                    <Typography
                                      sx={{
                                        marginBottom: "1.5rem",
                                        fontSize: "1.4rem",
                                        fontFamily: selectedFont || "Poppins",
                                      }}
                                    >
                                      {paragraph["Third Paragraph"] ||
                                        "On a more personal note, I am eagerly anticipating a vacation..."}
                                    </Typography>

                                    {/* Decorative Divider */}

                                    <Box
                                      sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        my: 4,
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 900 40" // taller viewBox for more curve amplitude
                                        preserveAspectRatio="none"
                                        style={{ width: "70%", height: 40 }} // taller line
                                      >
                                        <path
                                          d="
                                              M0 20
                                              C50 0, 100 40, 150 20
                                              S250 0, 300 20
                                              S400 40, 450 20
                                              S550 0, 600 20
                                              S700 40, 750 20
                                              S850 0, 900 20
                                            "
                                          stroke={selectedBackgroundColor}
                                          strokeWidth="10" // thicker stroke
                                          fill="transparent"
                                        />
                                      </svg>
                                    </Box>

                                    <Typography
                                      sx={{
                                        marginBottom: "2rem",
                                        fontSize: "1.4rem",
                                        fontFamily: selectedFont || "Poppins",
                                      }}
                                    >
                                      {paragraph["Fourth Paragraph"] ||
                                        "Looking for something fun this Summer? Check out The Jimmy Extra Band..."}
                                    </Typography>
                                  </Box>

                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      gap: "1rem",
                                      // padding: "1.5rem",
                                      flexWrap: "wrap",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      alt="Logo"
                                      src={imgSrc2}
                                      onError={() => setImgSrc2(avatar2)}
                                      style={{
                                        height: "140px",
                                        width: "200px",
                                        objectFit: "cover",
                                      }}
                                    />
                                    <img
                                      alt="Logo"
                                      src={imgSrc3}
                                      onError={() => setImgSrc3(avatar3)}
                                      style={{
                                        height: "160px",
                                        width: "240px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Box>
                                </Box>
                              )}
                              {/* 
                              {newsletter2Active && (
                                <img
                                  src={ImageTwo}
                                  alt="Newsletter Content"
                                  style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    marginTop: "5rem",
                                    borderRadius: "8px",
                                  }}
                                />
                              )} */}
                              {activeNewsletter === "newsletter2" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                    borderRadius: "1rem",
                                    overflow: "hidden",
                                    gap: "1rem",
                                    padding: "2rem",
                                    position: "relative",
                                    fontFamily: `${selectedFont} !important`,
                                  }}
                                >
                                  <img
                                    alt="Logo"
                                    src={imgSrc}
                                    onError={() => setImgSrc(avatar)}
                                    style={{
                                      width: "220px",
                                      height: "220px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      boxShadow: 3,
                                    }}
                                  />

                                  <Typography
                                    variant="h3"
                                    sx={{
                                      fontWeight: 500,
                                      fontSize: "2.5rem",
                                      textAlign: "center",
                                      marginTop: "1rem",
                                      fontFamily: selectedFont || "Poppins",
                                    }}
                                  >
                                    {header["First Header"] ||
                                      "Excitedly Ready!"}
                                  </Typography>
                                  <Box
                                    aria-hidden
                                    sx={{
                                      position: "absolute",
                                      top: "calc(220px + 8rem)",
                                      right: 0,
                                      width: "210px",
                                      height: "35px",
                                      backgroundColor: selectedBackgroundColor,
                                      clipPath:
                                        "polygon(0 0, 100% 0, 100% 100%, 25% 100%)",
                                      zIndex: 0,
                                    }}
                                  />

                                  <Box
                                    aria-hidden
                                    sx={{
                                      position: "absolute",
                                      bottom: 0,
                                      left: 0,
                                      width: "140px",
                                      height: "140px",
                                      backgroundColor: selectedBackgroundColor,
                                      clipPath:
                                        "polygon(0 100%, 100% 100%, 0 0)",
                                      zIndex: 0,
                                    }}
                                  />

                                  <Typography
                                    variant="h5"
                                    sx={{
                                      fontWeight: 800,
                                      fontSize: "1.8rem",
                                      textAlign: "center",
                                      marginTop: "5.5rem",
                                      fontFamily: selectedFont || "Poppins",
                                    }}
                                  >
                                    {header["Second Header"] ||
                                      "Greetings from AB Company!"}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "1.25rem",
                                      textAlign: "center",
                                      // marginBottom: "1rem",
                                      fontFamily: selectedFont || "Poppins",
                                    }}
                                  >
                                    {paragraph["First Paragraph"] ||
                                      "We are thrilled to share some exciting developments happening at our company."}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "1.25rem",
                                      textAlign: "center",
                                      // marginTop: "1rem",
                                      marginBottom: "1rem",
                                      fontFamily: selectedFont || "Poppins",
                                    }}
                                  >
                                    {paragraph["Second Paragraph"] ||
                                      "This month, we're proud to announce the launch of our latest product line that promises to revolutionize the way you interact with your clients."}
                                  </Typography>

                                  <Link
                                    target="_blank"
                                    underline="always"
                                    href={link["First Link"] || "#"}
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: "1.25rem",
                                      marginBottom: "2rem",
                                      color: "inherit",
                                      backgroundColor: "transparent !important",
                                      textDecoration: "underline !important",
                                    }}
                                  >
                                    CHECK OUR DEMO VIDEO
                                  </Link>

                                  <Typography
                                    sx={{
                                      fontSize: "1.25rem",
                                      textAlign: "center",
                                      marginBottom: "1rem",
                                      fontFamily: selectedFont || "Poppins",
                                    }}
                                  >
                                    {paragraph["Third Paragraph"] ||
                                      "Did You Know? This June was the hottest month in over 4 decades! Yikes!"}
                                  </Typography>

                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "1.6rem",
                                      textAlign: "center",
                                      marginBottom: "1rem",
                                      fontFamily: selectedFont || "Poppins",
                                    }}
                                  >
                                    {header["Third Header"] ||
                                      "What’s Your Favorite Way to Cool Down?"}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "1.25rem",
                                      textAlign: "center",
                                      marginBottom: "1rem",
                                      fontFamily: selectedFont || "Poppins",
                                    }}
                                  >
                                    {paragraph["Fourth Paragraph"] ||
                                      "I found these nifty fans that are easy to carry and are effective! (No incentive for me to share)"}
                                  </Typography>
                                  <Box sx={{ display: "flex", gap: "0.4rem" }}>
                                    <Typography
                                      sx={{
                                        fontSize: "1.25rem",
                                        textAlign: "center",
                                        marginBottom: "1rem",
                                        marginLeft: "1rem",
                                        fontFamily: selectedFont || "Poppins",
                                      }}
                                    >
                                      {paragraph["Fifth Paragraph"] ||
                                        "Just looking to add value and some coolness:"}
                                    </Typography>

                                    <Link
                                      href={link["Second Link"] || "#"}
                                      target="_blank"
                                      underline="always"
                                      sx={{
                                        fontWeight: "bold",
                                        fontSize: "1.25rem",
                                        marginBottom: "2rem",
                                        color: "inherit",
                                        backgroundColor:
                                          "transparent !important",
                                        textDecoration: "underline !important",
                                      }}
                                    >
                                      COOL FAN PURCHASE LINK
                                    </Link>
                                  </Box>

                                  {/* Signature */}
                                  <Typography
                                    sx={{
                                      textAlign: "center",
                                      fontWeight: 700,
                                      fontFamily: selectedFont || "Poppins",
                                    }}
                                  >
                                    STAY COOL & CONNECTED,
                                    <br />
                                    Jane
                                  </Typography>
                                </Box>
                              )}

                              {/* If no newsletter selected */}
                              {!activeNewsletter && (
                                <div
                                  style={{
                                    color: "#999",
                                    fontSize: "16px",
                                    textAlign: "center",
                                  }}
                                >
                                  Select a newsletter to view content
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 items-center justify-center">
                <Icon className="text-128" color="disabled">
                  chat
                </Icon>
              </div>
              <Typography
                className="px-16 pb-24 text-center"
                color="textSecondary"
              >
                Start a conversation by typing your message below.
              </Typography>
            </div>
          )}

          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: "7.5rem",
                marginTop: "-10rem",
                marginBottom: "10rem",
                backgroundColor: "#fff",
                borderRadius: "2rem",
                width: "53rem",
                maxWidth: "78.5%",
                padding: "1rem",
                paddingTop: "3rem",
              }}
            >
              <Typography
                style={{
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                Newsletters
              </Typography>
              <FormControl component="fieldset">
                <Stack spacing={1}>
                  <FormControlLabel
                    value="newsletter1"
                    control={
                      <Radio
                        checked={activeNewsletter === "newsletter1"}
                        onClick={() =>
                          setActiveNewsletter(
                            activeNewsletter === "newsletter1"
                              ? null
                              : "newsletter1"
                          )
                        }
                      />
                    }
                    label={<Typography fontSize="14px">Newsletter 1</Typography>}
                  />

                  <FormControlLabel
                    value="newsletter2"
                    control={
                      <Radio
                        checked={activeNewsletter === "newsletter2"}
                        onClick={() =>
                          setActiveNewsletter(
                            activeNewsletter === "newsletter2"
                              ? null
                              : "newsletter2"
                          )
                        }
                      />
                    }
                    label={<Typography fontSize="14px">Newsletter 2</Typography>}
                    // label="Newsletter 2"
                  />
                </Stack>
              </FormControl>
            </div>
          </>
        </FuseScrollbars>
        {/* <button onClick={testMe()}>Click Me</button> */}
        {chatMessages && (
          <form
            onSubmit={onMessageSubmit}
            className="absolute bottom-0 right-0 left-0 py-16 px-8"
          ></form>
        )}
      </div>
    </>
  );
}
export default Newsletter;
