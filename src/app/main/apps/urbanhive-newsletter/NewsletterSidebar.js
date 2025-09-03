import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseUtils from "@fuse/utils";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "src/redux/actions/chat.action";
import {
  fetchConnectedUsers,
  fetchConnectedUsers2,
  fetchRealTimeUsers,
  fetchAllContactForOneUser,
} from "src/redux/actions/user.action";
import ContactListItem from "./ContactListItem";
import { closeMobileChatsSidebar } from "./store/sidebarsSlice";
import { Box, TextField, Select } from "@mui/material";
import {
  setHeaderText,
  setImageText,
  setFontText,
  setLinkText,
  setParagraphText,
  setBackgroundColor,
} from "src/redux/actions/newsletter.action";

const statusArr = [
  {
    title: "Online",
    value: "online",
  },
  {
    title: "Away",
    value: "away",
  },
  {
    title: "Do not disturb",
    value: "do-not-disturb",
  },
  {
    title: "Offline",
    value: "offline",
  },
];

function NewsletterSidebar(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchText, setSearchText] = useState("");

  //New Hooks
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  const { user } = useSelector((state) => state.login);
  const {
    allUsers,
    connectedUsers,
    filteredContacts,
    connects,
    connects2,
    isLoading,
  } = useSelector((state) => state.user);

  const [selectedHeader, setSelectedHeader] = useState("First Header");
  const [selectedLink, setSelectedLink] = useState("First Link");
  const [selectedParagraph, setSelectedParagraph] = useState("First Paragraph");
  const [selectedImage, setSelectedImage] = useState("First Image");
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [selectedColor, setSelectedColor] = useState("#FF0000");

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
  }, [user, dispatch]);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  const {
    header = {},
    link = {},
    paragraph = {},
    images = {},
    selectedBackgroundColor,
  } = useSelector((state) => state.newsletter || {});
  //   const newsletter = useSelector((state) => state.newsletter);
  // const { header, link, paragraph, images, fonts } = newsletter;

  const initChat = (user2, isMobile) => {
    const user1 = user.uid;
    setChatStarted(true);
    setChatUser(user2.name);
    setUserUid(user2.uid);

    dispatch(fetchChats(user1, user2));
    console.log("IsMobile: ", isMobile);
    if (isMobile) {
      dispatch(closeMobileChatsSidebar());
    }
  };

  const testConnections = () => {
    const connectsById = Object.fromEntries(
      connects2.map(({ user1, type, status, invited_amt, skipped_amt }) => [
        user1,
        { type, status, invited_amt, skipped_amt },
      ])
    );

    const connectedUsersOutput =
      filteredContacts &&
      filteredContacts
        .filter((item) => item.uid !== user.uid)
        .map(
          (
            {
              uid,
              name,
              email,
              city,
              intro,
              skillset,
              skills_needed,
              lookingFor,
              lastActive,
              isTechnical,
              photoUrl,
              password,
              message,
            },
            index
          ) => ({
            uid,
            name,
            email,
            city,
            intro,
            skillset,
            skills_needed,
            lookingFor,
            lastActive,
            isTechnical,
            photoUrl,
            password,
            message,
            daysTo: (3 + 3 * (index + 1)).toString() + " " + "Days",
            ...(connectsById[uid] || {
              type: "",
              status: "",
              invited_amt: "",
              skipped_amt: "",
            }),
          })
        );

    console.log("Connected Users Mapped: ", connectedUsersOutput);
  };

  const connectsById = Object.fromEntries(
    connects2.map(({ user1, type, status, invited_amt, skipped_amt }) => [
      user1,
      { type, status, invited_amt, skipped_amt },
    ])
  );

  // Use filteredContacts from Firebase instead of connectedUsers
  const connectedUsersOutput =
    filteredContacts &&
    filteredContacts
      .filter((item) => item.uid !== user.uid)
      .map(
        (
          {
            uid,
            name,
            email,
            city,
            intro,
            skillset,
            skills_needed,
            lookingFor,
            lastActive,
            isTechnical,
            photoUrl,
            password,
            message,
            companyName,
            jobTitle,
            interests,
            frequency,
          },
          index
        ) => ({
          uid,
          name,
          email,
          city,
          intro,
          skillset,
          skills_needed,
          lookingFor,
          lastActive,
          isTechnical,
          photoUrl,
          password,
          message,
          companyName,
          jobTitle,
          interests,
          frequency,
          daysTo: (3 + 3 * (index + 1)).toString() + " " + "Days",
          ...(connectsById[uid] || {
            type: "",
            status: "",
            invited_amt: "",
            skipped_amt: "",
          }),
        })
      );

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
                    "aria-label": "Search",
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

      <List className="w-[100%]  overflow-y-auto mx-auto" style={{height:"50%"}}>
        <motion.div
          style={{
            paddingTop: "1rem",
            paddingBottom: "0rem",
            position: "relative",
            top: "-0.5rem",
          }}
          className="flex flex-col flex-shrink-0"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* <button onClick={() => testConnections()}>Please Click Me😌</button> */}
          {
            <motion.div variants={item}>
              <Typography
                className="font-medium text-20 px-16 py-16"
                color="secondary"
              >
                Settings
              </Typography>
            </motion.div>
          }

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ marginBottom: "1.5rem" }}
          >
            <Box
              sx={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                backgroundColor: "#D62222",
                cursor: "pointer",
                border:
                  selectedBackgroundColor === "#D62222"
                    ? "3px solid #333"
                    : "none",
              }}
              onClick={() => dispatch(setBackgroundColor("#D62222"))}
            />

            <Box
              sx={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                backgroundColor: "#128C1D",
                cursor: "pointer",
                border:
                  selectedBackgroundColor === "#128C1D"
                    ? "3px solid #333"
                    : "none",
              }}
              onClick={() => dispatch(setBackgroundColor("#128C1D"))}
            />
            <Box
              sx={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                backgroundColor: "#DBCB21",
                cursor: "pointer",
                border:
                  selectedBackgroundColor === "#DBCB21"
                    ? "3px solid #333"
                    : "none",
              }}
              onClick={() => {
                dispatch(setBackgroundColor("#DBCB21"));
              }}
            />
            <Box
              sx={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                backgroundColor: "#1E229C",
                cursor: "pointer",
                border:
                  selectedBackgroundColor === "#1E229C"
                    ? "3px solid #333"
                    : "none",
              }}
              onClick={() => {
                dispatch(setBackgroundColor("#1E229C"));
              }}
            />

            <Box
              sx={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                backgroundColor: "#000000",
                cursor: "pointer",
                border:
                  selectedBackgroundColor === "#000000"
                    ? "3px solid #fff"
                    : "none",
              }}
              onClick={() => {
                dispatch(setBackgroundColor("#000000"));
              }}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            sx={{ margin: "0 auto", paddingLeft: "1.5rem", width: "100%" }}
            gap={2}
          >
            <motion.div variants={item}>
              <Box display="flex" alignItems="center" gap={2}>
                <Select
                  value={selectedHeader}
                  onChange={(e) => setSelectedHeader(e.target.value)}
                  sx={{
                    width: "20%",
                    height: "3.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <MenuItem value="First Header">First Header</MenuItem>
                  <MenuItem value="Second Header">Second Header</MenuItem>
                  <MenuItem value="Third Header">Third Header</MenuItem>
                  <MenuItem value="Fourth Header">Fourth Header</MenuItem>
                </Select>
                <TextField
                  value={header[selectedHeader] ?? ""}
                  onChange={(e) =>
                    dispatch(setHeaderText(selectedHeader, e.target.value))
                  }
                  variant="outlined"
                  sx={{
                    width: "69%",
                    "& .MuiOutlinedInput-root": {
                      height: "3.5rem",
                      borderRadius: "0.5rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "3.5rem",
                      padding: "0 8px",
                    },
                  }}
                />
              </Box>
            </motion.div>
            <motion.div variants={item}>
              <Box display="flex" alignItems="center" gap={2}>
                <Select
                  value={selectedParagraph}
                  onChange={(e) => setSelectedParagraph(e.target.value)}
                  sx={{
                    width: "20%",
                    height: "3.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <MenuItem value="First Paragraph">First Paragraph</MenuItem>
                  <MenuItem value="Second Paragraph">Second Paragraph</MenuItem>
                  <MenuItem value="Third Paragraph">Third Paragraph</MenuItem>
                  <MenuItem value="Fourth Paragraph">Fourth Paragraph</MenuItem>
                  <MenuItem value="Fifth Paragraph">Fifth Paragraph</MenuItem>
                </Select>
                <TextField
                  value={paragraph[selectedParagraph]}
                  onChange={(e) =>
                    dispatch(
                      setParagraphText(selectedParagraph, e.target.value)
                    )
                  }
                  variant="outlined"
                  sx={{
                    width: "69%",
                    "& .MuiOutlinedInput-root": {
                      height: "3.5rem",
                      borderRadius: "0.5rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "3.5rem",
                      padding: "0 8px",
                    },
                  }}
                />
              </Box>
            </motion.div>
            <motion.div variants={item}>
              <Box display="flex" alignItems="center" gap={2}>
                <Select
                  value={selectedLink}
                  onChange={(e) => setSelectedLink(e.target.value)}
                  sx={{
                    width: "20%",
                    height: "3.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <MenuItem value="First Link">First Link</MenuItem>
                  <MenuItem value="Second Link">Second Link</MenuItem>
                  <MenuItem value="Third Link">Third Link</MenuItem>
                  <MenuItem value="Fourth Link">Fourth Link</MenuItem>
                </Select>
                <TextField
                  value={link[selectedLink]}
                  onChange={(e) =>
                    dispatch(setLinkText(selectedLink, e.target.value))
                  }
                  variant="outlined"
                  sx={{
                    width: "69%",
                    "& .MuiOutlinedInput-root": {
                      height: "3.5rem",
                      borderRadius: "0.5rem",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "3.5rem",
                      padding: "0 8px",
                    },
                  }}
                />
              </Box>
            </motion.div>

            <motion.div variants={item}>
              <Box display="flex" alignItems="center" gap={2}>
                {/* Image Selector */}
                <Select
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
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

                {/* File Picker + Preview */}
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ width: "69%" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const previewUrl = URL.createObjectURL(file);
                        dispatch(setImageText(selectedImage, previewUrl));
                      }
                    }}
                  />

                  {/* Preview */}
                  {images[selectedImage] && (
                    <img
                      src={images[selectedImage]}
                      alt={selectedImage}
                      style={{
                        marginTop: "0.5rem",
                        width: "100%",
                        maxHeight: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </motion.div>

            <motion.div variants={item}>
              <Box display="flex" alignItems="center" gap={2}>
                {/* Font Selector */}
                <Select
                  value={selectedFont}
                  onChange={(e) => {
                    const font = e.target.value;
                    setSelectedFont(font);
                    dispatch(setFontText(font));
                  }}
                  sx={{
                    width: "20%",
                    height: "3.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <MenuItem value="Poppins">Poppins</MenuItem>
                  <MenuItem value="Serif">Serif</MenuItem>
                  <MenuItem value="Roboto">Roboto</MenuItem>
                  <MenuItem value="Lato">Lato</MenuItem>
                </Select>
                <Typography>{selectedFont}</Typography>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </List>

      <div
        style={{ backgroundColor: "#FAF9F6", width: "100%", height: "3rem" }}
      >
        {/**THIS DIV IS FOR BACKGROUND COLOR, OF OFF WHITE DONT UNCOMMENT IT OUT */}
      </div>

      <List className="w-full overflow-y-auto" style={{height:"50%"}}>
        <motion.div
          className="flex flex-col flex-shrink-0"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* <button onClick={() => testConnections()}>Please Click Me😌</button> */}
          {connectedUsersOutput.length > 0 && (
            <motion.div variants={item}>
              <Typography
                className="font-medium text-20 px-16 py-24"
                color="secondary"
              >
                Recipients
              </Typography>
            </motion.div>
          )}

          {connectedUsersOutput.length ? (
            connectedUsersOutput.map((user) => {
              return (
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
              <center>
                <p className="center">No contacts for newsletter</p>
              </center>
            </div>
          )}
        </motion.div>
      </List>
      {/*</FuseScrollbars>*/}
    </div>
  );
}

export default NewsletterSidebar;
