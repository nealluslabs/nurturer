import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { closeUserSidebar } from '../urbanhive-inbox/store/sidebarsSlice';

function InboxEventsUserSidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);

  const displayName =
    (user && (user.name || user.firstName || user.email)) || 'User';
  const avatarSrc = (user && (user.photoUrl || user.avatar)) || '';
  const email = (user && user.email) || '';

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar className="flex justify-between items-center px-4">
          <Typography className="px-12" color="inherit" variant="subtitle1">
            User Info
          </Typography>
          <IconButton onClick={() => dispatch(closeUserSidebar())} color="inherit">
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
        <Toolbar className="flex flex-col justify-center items-center p-24">
          <Avatar src={avatarSrc} alt={displayName} className="w-96 h-96">
            {!avatarSrc && displayName ? displayName[0] : ''}
          </Avatar>
          <Typography color="inherit" className="mt-16" variant="h6">
            {displayName}
          </Typography>
          {email ? (
            <Typography color="inherit" className="mt-8 opacity-75" variant="body2">
              {email}
            </Typography>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default InboxEventsUserSidebar;
