import FuseScrollbars from '@fuse/core/FuseScrollbars';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchChats, clearChats } from 'src/redux/actions/chat.action';
import { fetchAllContactForOneUser } from 'src/redux/actions/user.action';
import { saveEditedParagraphs } from 'redux/reducers/user.slice';
import { closeMobileChatsSidebar } from '../urbanhive-inbox/store/sidebarsSlice';

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const HOLIDAY_MESSAGE_TYPES = new Set([
  'Event',
  'Holiday',
  'Thanksgiving',
  'Christmas',
  'New Years',
  'Independence',
  'Labor Day',
  'Memorial Day',
]);
const ANNIVERSARY_MESSAGE_TYPES = new Set([
  'Anniversary',
  'Work Anniversary',
  'workAnniversary',
  'workAnniversay',
]);
const EVENT_TYPES = new Set(['Birthday', 'Holiday', 'Anniversary']);

const useStyles = makeStyles((theme) => ({
  eventListItem: {
    '&.active': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  eventTypeLabel: {
    color: '#21C9CF',
    fontWeight: 600,
    fontSize: '1.1rem',
    textTransform: 'uppercase',
  },
}));

function getNumericDays(value) {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return null;
}

function parseAnnualDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  const normalized = dateString.trim();
  if (!normalized) {
    return null;
  }

  const parts = normalized.split(/[/-]/).map((part) => part.trim());
  if (parts.length < 3) {
    return null;
  }

  const buildDate = (day, month, year) => {
    if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year)) {
      return null;
    }

    if (day <= 0 || day > 31 || month <= 0 || month > 12) {
      return null;
    }

    return { day, month, year };
  };

  if (parts[0].length === 4) {
    // yyyy-mm-dd or yyyy/mm/dd
    return buildDate(Number(parts[2]), Number(parts[1]), Number(parts[0]));
  }

  const first = Number(parts[0]);
  const second = Number(parts[1]);
  const year = Number(parts[2]);
  const ddMm = buildDate(first, second, year);
  const mmDd = buildDate(second, first, year);

  if (ddMm && !mmDd) {
    return ddMm;
  }

  if (mmDd && !ddMm) {
    return mmDd;
  }

  if (ddMm && mmDd) {
    // Keep existing interpretation for ambiguous values while accepting both formats.
    return ddMm;
  }

  return null;
}

function getDaysUntilNextAnnualDate(dateString) {
  const parsedDate = parseAnnualDate(dateString);
  if (!parsedDate) {
    return null;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nextDate = new Date(now.getFullYear(), parsedDate.month - 1, parsedDate.day);
  nextDate.setHours(0, 0, 0, 0);

  if (nextDate < today) {
    nextDate.setFullYear(nextDate.getFullYear() + 1);
  }

  return Math.round((nextDate - today) / MILLISECONDS_IN_DAY);
}

function hasRealBirthday(dateString) {
  const parsedDate = parseAnnualDate(dateString);
  return Boolean(parsedDate);
}

function hasRealAnniversary(dateString) {
  const parsedDate = parseAnnualDate(dateString);
  return Boolean(parsedDate);
}

function getLatestPendingEvent(queue, typeOrTypes) {
  if (!Array.isArray(queue)) {
    return null;
  }

  const messageTypes = (Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes])
    .filter(Boolean)
    .map((type) => String(type).trim().toLowerCase());
  const events = queue.filter(
    (item) => {
      if (!item || !item.messageType) {
        return false;
      }

      const status = String(item.messageStatus || 'Pending').trim().toLowerCase();
      const type = String(item.messageType).trim().toLowerCase();

      return status === 'pending' && messageTypes.includes(type);
    }
  );

  if (!events.length) {
    return null;
  }

  return events[events.length - 1];
}

function formatDaysLabel(daysUntil) {
  if (daysUntil <= 0) {
    return 'Today';
  }

  if (daysUntil === 1) {
    return '1 Day';
  }

  return `${daysUntil} Days`;
}

function buildContactEvents(contact) {
  const contactName = contact && contact.name ? contact.name : 'Unknown Contact';
  const birthdayDays = hasRealBirthday(contact && contact.birthday)
    ? getDaysUntilNextAnnualDate(contact && contact.birthday)
    : null;
  const anniversaryDays = hasRealAnniversary(contact && contact.workAnniversary)
    ? getDaysUntilNextAnnualDate(contact && contact.workAnniversary)
    : null;
  const pendingBirthday = getLatestPendingEvent(contact && contact.messageQueue, 'Birthday');
  const pendingHoliday = getLatestPendingEvent(
    contact && contact.messageQueue,
    Array.from(HOLIDAY_MESSAGE_TYPES)
  );
  const pendingAnniversary = getLatestPendingEvent(
    contact && contact.messageQueue,
    Array.from(ANNIVERSARY_MESSAGE_TYPES)
  );
  const events = [];

  if (birthdayDays !== null) {
    events.push({
      id: `${contact.uid}-birthday`,
      type: 'Birthday',
      subject:
        (pendingBirthday && pendingBirthday.subject) || `${contactName}'s birthday celebration`,
      daysUntil: birthdayDays,
      sourceMessage: pendingBirthday || null,
      contact,
    });
  }

  if (pendingHoliday) {
    events.push({
      id: `${contact.uid}-holiday`,
      type: 'Holiday',
      subject:
        (pendingHoliday && pendingHoliday.subject) ||
        `${contactName}'s holiday touchpoint`,
      daysUntil: getNumericDays(contact && contact.sendDate) || 0,
      sourceMessage: pendingHoliday || null,
      contact,
    });
  }

  if (pendingAnniversary || anniversaryDays !== null) {
    events.push({
      id: `${contact.uid}-anniversary`,
      type: 'Anniversary',
      subject:
        (pendingAnniversary && pendingAnniversary.subject) ||
        `${contactName}'s work anniversary`,
      daysUntil:
        anniversaryDays !== null ? anniversaryDays : getNumericDays(contact && contact.sendDate) || 0,
      sourceMessage: pendingAnniversary || null,
      contact,
    });
  }

  return events;
}

function InboxEventsSidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  const { user } = useSelector((state) => state.login);
  const {
    filteredContacts = [],
    aiTrigger,
    subjectChangeTriggerAfterEmailIsSent,
    candidateInFocus,
  } = useSelector(
    (state) => state.user
  );
  const { selectedChatUser } = useSelector((state) => state.chat);
  const selectedCandidateUid =
    location &&
    location.state &&
    location.state.candidateUid &&
    typeof location.state.candidateUid === 'string'
      ? location.state.candidateUid
      : null;

  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchAllContactForOneUser(user.uid));
    }
  }, [dispatch, user, aiTrigger, subjectChangeTriggerAfterEmailIsSent]);

  const selectedCandidate = useMemo(() => {
    if (!selectedCandidateUid) {
      return null;
    }

    if (
      candidateInFocus &&
      !Array.isArray(candidateInFocus) &&
      candidateInFocus.uid === selectedCandidateUid
    ) {
      return candidateInFocus;
    }

    if (!Array.isArray(filteredContacts)) {
      return null;
    }

    return filteredContacts.find((contact) => contact && contact.uid === selectedCandidateUid) || null;
  }, [selectedCandidateUid, candidateInFocus, filteredContacts]);

  const contactsForEvents = useMemo(() => {
    if (selectedCandidateUid) {
      if (selectedCandidate) {
        return [selectedCandidate];
      }

      return Array.isArray(filteredContacts) ? filteredContacts : [];
    }

    return Array.isArray(filteredContacts) ? filteredContacts : [];
  }, [selectedCandidateUid, selectedCandidate, filteredContacts]);

  const upcomingEvents = useMemo(() => {
    if (!user || !user.uid) {
      return [];
    }

    return contactsForEvents
      .filter((contact) => contact && contact.uid && contact.uid !== user.uid)
      .flatMap((contact) => buildContactEvents(contact))
      .filter((event) => event && EVENT_TYPES.has(event.type))
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [contactsForEvents, user]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();
    if (!normalizedSearch) {
      return upcomingEvents;
    }

    return upcomingEvents.filter((event) => {
      const searchableText = `${event.contact.name} ${event.subject} ${event.type}`.toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [searchText, upcomingEvents]);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  function handleEventClick(eventData) {
    if (!user || !user.uid || !eventData || !eventData.contact) {
      return;
    }

    const eventTypeMap = {
      Birthday: ['birthday'],
      Holiday: Array.from(HOLIDAY_MESSAGE_TYPES).map((type) => type.toLowerCase()),
      Anniversary: ['anniversary', 'work anniversary', 'workanniversary', 'workanniversay'],
    };

    const allowedTypes = eventTypeMap[eventData.type] || [];
    const originalQueue = Array.isArray(eventData.contact.messageQueue) ? eventData.contact.messageQueue : [];
    let filteredQueue = originalQueue.filter((item) => {
      if (!item || !item.messageType) {
        return false;
      }

      return allowedTypes.includes(String(item.messageType).trim().toLowerCase());
    });

    if (eventData.sourceMessage) {
      filteredQueue = filteredQueue.filter((item) => item !== eventData.sourceMessage);
      filteredQueue.push(eventData.sourceMessage);
    }

    const eventFocusedContact = {
      ...eventData.contact,
      messageQueue: filteredQueue,
    };

    dispatch(clearChats());
    dispatch(fetchChats(user.uid, eventFocusedContact));
    dispatch(saveEditedParagraphs(eventData.sourceMessage || {}));

    if (isMobile) {
      dispatch(closeMobileChatsSidebar());
    }
  }

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar className="px-16">
          <Paper className="flex p-4 items-center w-full px-8 py-4 shadow">
            <Icon color="action">search</Icon>

            <Input
              placeholder="Search birthdays, holidays, anniversaries"
              className="flex flex-1 px-8"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                'aria-label': 'Search events',
              }}
              onChange={handleSearchText}
            />
          </Paper>
        </Toolbar>
      </AppBar>

      <FuseScrollbars className="overflow-y-auto flex-1">
        <List className="w-full">
          <Typography className="font-medium text-20 px-16 py-24" style={{ color: '#21C9CF' }}>
           Birthdays & Holidays
          </Typography>

          {filteredEvents.length ? (
            filteredEvents.map((eventData) => (
              <ListItem
                key={eventData.id}
                button
                className={clsx(classes.eventListItem, 'px-16 py-12 min-h-92', {
                  active: selectedChatUser && selectedChatUser.uid === eventData.contact.uid,
                })}
                onClick={() => handleEventClick(eventData)}
              >
                <Avatar src={eventData.contact.photoUrl} alt={eventData.contact.name}>
                  {!eventData.contact.photoUrl ? eventData.contact.name[0] : ''}
                </Avatar>

                <ListItemText
                  classes={{
                    root: 'min-w-px px-16',
                    primary: 'font-medium text-14',
                    secondary: 'truncate',
                  }}
                  primary={eventData.contact.name}
                  secondary={`${eventData.type}: ${eventData.subject}`}
                />

                <div className="flex flex-col justify-center items-end">
                  <Typography className="whitespace-nowrap mb-8 font-medium text-12" color="textSecondary">
                    {formatDaysLabel(eventData.daysUntil)}
                  </Typography>
                  <Typography className={classes.eventTypeLabel}>{eventData.type}</Typography>
                </div>
              </ListItem>
            ))
          ) : (
            <div className="container">
              <center>
                <p className="center">No upcoming events found</p>
              </center>
            </div>
          )}
        </List>
      </FuseScrollbars>
    </div>
  );
}

export default InboxEventsSidebar;
