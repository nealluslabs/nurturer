import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import StatusIcon from './StatusIcon';

const useStyles = makeStyles((theme) => ({
  contactListItem: {
    position: 'relative',
    padding: '12px 16px',
    borderRadius: '8px',
    margin: '4px 8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'translateX(4px)',
    },
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '& .MuiListItemText-primary': {
        color: theme.palette.primary.contrastText,
      },
      '& .MuiListItemText-secondary': {
        color: theme.palette.primary.contrastText,
        opacity: 0.8,
      },
    },
    '&.selected': {
      backgroundColor: theme.palette.primary.light,
      '& .MuiListItemText-primary': {
        fontWeight: 600,
      },
    },
  },
  checkbox: {
    marginRight: theme.spacing(1),
    padding: '6px',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing(2),
  },
  statusBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    zIndex: 10,
  },
  contactInfo: {
    flex: 1,
    minWidth: 0,
  },
  contactName: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
  },
  contactEmail: {
    fontSize: '12px',
    opacity: 0.7,
    marginTop: '2px',
  },
  statusChip: {
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '12px',
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
    textTransform: 'uppercase',
    fontWeight: 600,
  },
}));

function NewsletterContactListItem(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.login);
  const selectedContactId = props.user.uid;

  const handleCheckboxChange = (event) => {
    event.stopPropagation();
    if (props.onContactSelect) {
      props.onContactSelect(props.user.uid, event.target.checked);
    }
  };

  const handleContactClick = () => {
    if (props.onContactClick) {
      props.onContactClick(props.user.uid);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'online':
        return '#4caf50';
      case 'away':
        return '#ff9800';
      case 'busy':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <ListItem
      button
      className={clsx(classes.contactListItem, {
        active: selectedContactId === props.user.uid,
        selected: props.isSelected,
      })}
      onClick={handleContactClick}
    >
      <Checkbox
        className={classes.checkbox}
        checked={props.isSelected || false}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        color="primary"
        size="small"
      />

      <div className={classes.avatarContainer}>
        <div className={classes.statusBadge}>
          <StatusIcon status={props.user.status || 'online'} />
        </div>
        <Avatar 
          src={props.user.photoUrl} 
          alt={props.user.name}
          style={{ width: 40, height: 40 }}
        >
          {!props.user.photoUrl || props.user.photoUrl === '' ? 
            (props.user.name ? props.user.name[0].toUpperCase() : 'U') : ''
          }
        </Avatar>
      </div>

      <div className={classes.contactInfo}>
        <Typography className={classes.contactName}>
          {props.user.name || 'Unknown User'}
        </Typography>
        <Typography className={classes.contactEmail}>
          {props.user.email || 'No email provided'}
        </Typography>
      </div>

      <div className="flex flex-col items-end">
        <div 
          className={classes.statusChip}
          style={{ 
            backgroundColor: getStatusColor(props.user.status),
            color: 'white'
          }}
        >
          {props.user.status || 'Active'}
        </div>
        <Typography 
          variant="caption" 
          style={{ 
            fontSize: '10px', 
            marginTop: '4px',
            opacity: 0.6 
          }}
        >
          {props.user.lastSeen || 'Recently'}
        </Typography>
      </div>
    </ListItem>
  );
}

export default NewsletterContactListItem;
