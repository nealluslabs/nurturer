import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Chat from './InboxEventsChat';
import StatusIcon from '../urbanhive-inbox/StatusIcon';
import { fetchRealTimeConnections, fetchRealTimeConnections2, fetchRealTimeUsers } from 'src/redux/actions/user.action';
import InboxEventsSidebar from './InboxEventsSidebar';
import InboxEventsUserSidebar from './InboxEventsUserSidebar';
import reducer from '../urbanhive-inbox/store';
import { getContacts } from '../urbanhive-inbox/store/contactsSlice';
import {
  closeMobileChatsSidebar,
  closeUserSidebar,
  openMobileChatsSidebar,
  openUserSidebar,
} from '../urbanhive-inbox/store/sidebarsSlice';
import { getUserData } from '../urbanhive-inbox/store/userSlice';

const drawerWidth = 400;
const headerHeight = 200;

const useStyles = makeStyles((theme) => ({
  '@global': {
    '#fuse-main': {
      height: '100vh',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100%',
    position: 'relative',
    flex: '1 1 auto',
    height: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  topBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: headerHeight,
    backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
    backgroundColor: ' #21C9CF',
    backgroundSize: 'cover',
    pointerEvents: 'none',
  },
  contentCardWrapper: {
    position: 'relative',
    padding: 24,
    maxWidth: 1400,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    width: '100%',
    minWidth: '0',
    maxHeight: '100%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: 16,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 12,
    },
  },
  contentCard: {
    display: 'flex',
    position: 'relative',
    flex: '1 1 100%',
    flexDirection: 'row',
    backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
    backgroundColor: theme.palette.background.paper,
    minHeight: 0,
    overflow: 'hidden',
  },
  drawerPaper: {
    width: drawerWidth,
    maxWidth: '100%',
    overflow: 'hidden',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 100%',
    zIndex: 10,
  },
  background: `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 0.8)} 0,${alpha(
    theme.palette.background.paper,
    0.6
  )} 20%,${alpha(theme.palette.background.paper, 0.8)})`,
  content: {
    display: 'flex',
    flex: '1 1 100%',
    minHeight: 0,
  },
}));

function InboxEventsApp(props) {
  const dispatch = useDispatch();

  const mobileChatsSidebarOpen = useSelector(
    ({ chatApp }) => chatApp.sidebars.mobileChatsSidebarOpen
  );
  const userSidebarOpen = useSelector(({ chatApp }) => chatApp.sidebars.userSidebarOpen);
  // const { isAuth, user } = useSelector((state) => state.login);
  const { selectedChatUser } = useSelector((state) => state.chat);
  const classes = useStyles(props);

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getContacts());
  }, [dispatch]);

  // if (!isAuth) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className={clsx(classes.root)}>
      <div className={classes.topBg} />

      <div className={clsx(classes.contentCardWrapper, 'container')}>
        <div className={clsx(classes.contentCard, 'shadow rounded-20')}>
          <Hidden mdUp>
            <SwipeableDrawer
              className="h-full absolute z-20"
              variant="temporary"
              anchor="left"
              open={mobileChatsSidebarOpen}
              onOpen={(ev) => {}}
              onClose={() => dispatch(closeMobileChatsSidebar())}
              disableSwipeToOpen
              classes={{
                paper: clsx(classes.drawerPaper, 'absolute ltr:left-0 rtl:right-0'),
              }}
              style={{ position: 'absolute' }}
              ModalProps={{
                keepMounted: true,
                disablePortal: true,
                BackdropProps: {
                  classes: {
                    root: 'absolute',
                  },
                },
              }}
            >
              <InboxEventsSidebar />
            </SwipeableDrawer>
          </Hidden>
          <Hidden smDown>
            <Drawer
              className="h-full z-20"
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <InboxEventsSidebar />
            </Drawer>
          </Hidden>
          <SwipeableDrawer
            className="h-full absolute z-30"
            variant="temporary"
            anchor="left"
            open={userSidebarOpen}
            onOpen={(ev) => {}}
            onClose={() => dispatch(closeUserSidebar())}
            classes={{
              paper: clsx(classes.drawerPaper, 'absolute left-0'),
            }}
            style={{ position: 'absolute' }}
            ModalProps={{
              keepMounted: false,
              disablePortal: true,
              BackdropProps: {
                classes: {
                  root: 'absolute',
                },
              },
            }}
          >
            <InboxEventsUserSidebar />
          </SwipeableDrawer>
          <main
            className={clsx(classes.contentWrapper, 'z-10')}
            style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
              height: '100%',
              position: 'relative',
            }}
          >
            {!selectedChatUser ? (
              <div className="flex flex-col flex-1 items-center justify-center p-24">
                <Paper className="rounded-full p-48 md:p-64 shadow-xl">
                  <Icon className="block text-48 md:text-64" style={{ color: '#21C9CF' }}>
                    event
                  </Icon>
                </Paper>
                <Typography variant="h6" className="mt-24 mb-12 text-32 font-700">
                  Upcoming Events Inbox
                </Typography>
                <Typography
                  className="hidden md:flex px-16 pb-24 text-16 text-center"
                  color="textSecondary"
                >
                  Select a birthday or holiday event to review the message.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  className="flex md:hidden"
                  onClick={() => dispatch(openMobileChatsSidebar())}
                >
                  Select an event to review message..
                </Button>
              </div>
            ) : (
              <>
                <AppBar className="w-full" elevation={0} position="static">
                  <Toolbar className="px-16">
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={() => dispatch(openMobileChatsSidebar())}
                      className="flex md:hidden"
                    >
                      <Icon>event</Icon>
                    </IconButton>
                    <div
                      className="flex items-center cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={() => dispatch(openUserSidebar())}
                      onKeyDown={() => dispatch(openUserSidebar())}
                    >
                      <div className="relative mx-8">
                        <div className="absolute right-0 bottom-0 -m-4 z-10">
                          <StatusIcon status="online" />
                        </div>
                        <Avatar
                          src={selectedChatUser && selectedChatUser.photoUrl}
                          alt={selectedChatUser && selectedChatUser.name}
                        >
                          {!selectedChatUser || selectedChatUser.photoUrl === ''
                            ? selectedChatUser && selectedChatUser.name[0]
                            : ''}
                        </Avatar>
                      </div>
                      <Typography color="inherit" className="text-18 font-semibold px-4">
                        {selectedChatUser && selectedChatUser.name}
                      </Typography>
                    </div>
                  </Toolbar>
                </AppBar>

                <div className={classes.content}>
                  <Chat className="flex flex-1 z-10" />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default withReducer('chatApp', reducer)(InboxEventsApp);
