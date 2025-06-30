import FuseAnimate from '@fuse/core/FuseAnimate';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  header: {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(3),
    borderRadius: 0,
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(0),
  },
  newsletterEditor: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
  },
  previewCard: {
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
  },
  sendButton: {
    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    color: theme.palette.secondary.contrastText,
    fontWeight: 600,
    padding: theme.spacing(1.5, 3),
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
    },
    '&:disabled': {
      background: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  },
  previewButton: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  emptyState: {
    textAlign: 'center',
    padding: theme.spacing(6),
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[1],
  },
  emptyIcon: {
    fontSize: '4rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  toolsSection: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  statusChip: {
    marginLeft: theme.spacing(1),
  },
  characterCount: {
    marginTop: theme.spacing(1),
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  },
}));

function NewsletterContent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ newsletterApp }) => newsletterApp?.user);
  const { user: loginUser } = useSelector((state) => state.login);
  
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [scheduleMode, setScheduleMode] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [isDraft, setIsDraft] = useState(true);

  const currentUser = user || loginUser;

  useEffect(() => {
    // Auto-save as draft
    const timer = setTimeout(() => {
      if (subject || content) {
        setIsDraft(true);
        // You can implement auto-save functionality here
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [subject, content]);

  const handleSendNewsletter = () => {
    if (!subject.trim() || !content.trim()) {
      return;
    }

    const newsletterData = {
      subject: subject.trim(),
      content: content.trim(),
      scheduleDate: scheduleMode ? scheduleDate : null,
      isDraft: false,
      createdAt: new Date().toISOString(),
      author: {
        name: currentUser?.name || 'Unknown',
        email: currentUser?.email || '',
        photoUrl: currentUser?.photoUrl || '',
      }
    };

    console.log('Sending newsletter:', newsletterData);
    
    // You can dispatch an action here to send the newsletter
    if (props.onSendNewsletter) {
      props.onSendNewsletter(newsletterData);
    }

    // Reset form after sending
    setSubject('');
    setContent('');
    setIsDraft(false);
  };

  const handleSaveDraft = () => {
    if (!subject.trim() && !content.trim()) {
      return;
    }

    const draftData = {
      subject: subject.trim(),
      content: content.trim(),
      isDraft: true,
      lastSaved: new Date().toISOString(),
    };

    console.log('Saving draft:', draftData);
    setIsDraft(true);
  };

  const getSubjectCharacterCount = () => {
    return `${subject.length}/100`;
  };

  const getContentCharacterCount = () => {
    return `${content.length}/5000`;
  };

  if (!currentUser) {
    return (
      <div className={classes.root}>
        <FuseAnimate delay={100}>
          <div className={classes.emptyState}>
            <Icon className={classes.emptyIcon}>
              email
            </Icon>
            <Typography variant="h5" color="textSecondary" className="mb-16">
              Newsletter Center
            </Typography>
            <Typography color="textSecondary" className="max-w-288 mx-auto">
              Create and send newsletters to your selected contacts. Use the sidebar to select recipients.
            </Typography>
          </div>
        </FuseAnimate>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* Newsletter Editor Header */}
      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <Paper className={classes.header} elevation={0}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Avatar src={currentUser.photoUrl} alt={currentUser.name} style={{ marginRight: '16px' }}>
                {currentUser.name && !currentUser.photoUrl ? currentUser.name[0].toUpperCase() : ''}
              </Avatar>
              <div>
                <Typography className="text-18 font-bold">
                  Newsletter Composer
                </Typography>
                <Typography className="text-14 opacity-75">
                  Create engaging newsletters for your audience
                  {isDraft && <Chip label="Draft" size="small" className={classes.statusChip} />}
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={previewMode ? "contained" : "outlined"}
                className={previewMode ? '' : classes.previewButton}
                onClick={() => setPreviewMode(!previewMode)}
                startIcon={<Icon>{previewMode ? 'edit' : 'visibility'}</Icon>}
              >
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleSaveDraft}
                disabled={!subject && !content}
                style={{ color: 'white', borderColor: 'white' }}
                startIcon={<Icon>save</Icon>}
              >
                Save Draft
              </Button>
              <Button
                variant="contained"
                className={classes.sendButton}
                onClick={handleSendNewsletter}
                disabled={!subject.trim() || !content.trim()}
                startIcon={<Icon>send</Icon>}
              >
                {scheduleMode ? 'Schedule' : 'Send'} Newsletter
              </Button>
            </div>
          </div>
        </Paper>
      </FuseAnimate>

      {/* Tools Section */}
      <div className={classes.toolsSection}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FormControlLabel
              control={
                <Switch
                  checked={scheduleMode}
                  onChange={(e) => setScheduleMode(e.target.checked)}
                  color="primary"
                />
              }
              label="Schedule for later"
            />
            {scheduleMode && (
              <TextField
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Chip label="Rich Text" size="small" />
            <Chip label="Auto-save" size="small" color="primary" />
          </div>
        </div>
      </div>

      {/* Newsletter Editor Content */}
      <div className={classes.content}>
        {!previewMode ? (
          <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <div className={classes.newsletterEditor}>
              <TextField
                label="Newsletter Subject"
                variant="outlined"
                fullWidth
                value={subject}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setSubject(e.target.value);
                  }
                }}
                className="mb-24"
                placeholder="Enter an engaging subject line..."
                helperText={`Keep it under 100 characters for better email delivery`}
              />
              <div className={classes.characterCount}>
                Characters: {getSubjectCharacterCount()}
              </div>
              
              <Divider style={{ margin: '24px 0' }} />
              
              <TextField
                label="Newsletter Content"
                variant="outlined"
                fullWidth
                multiline
                rows={15}
                value={content}
                onChange={(e) => {
                  if (e.target.value.length <= 5000) {
                    setContent(e.target.value);
                  }
                }}
                placeholder="Write your newsletter content here...

📢 Welcome to our newsletter!

Here's what's new this week:

• Feature updates and improvements
• Community highlights and success stories  
• Upcoming events and workshops
• Special offers for subscribers

💡 Pro tip: Keep paragraphs short and use emojis to make your content more engaging!

Best regards,
Your Team"
              />
              <div className={classes.characterCount}>
                Characters: {getContentCharacterCount()}
              </div>
              
              <div className="mt-16 p-16 bg-gray-50 rounded-8">
                <Typography variant="caption" color="textSecondary">
                  <strong>Writing Tips:</strong>
                  <br />• Use clear headings and bullet points for better readability
                  <br />• Include a call-to-action to engage your audience
                  <br />• Keep the content valuable and relevant to your subscribers
                  <br />• Test your newsletter with a small group first
                </Typography>
              </div>
            </div>
          </FuseAnimate>
        ) : (
          <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Card className={classes.previewCard}>
              <CardContent style={{ padding: '32px' }}>
                <div style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '16px', marginBottom: '24px' }}>
                  <Typography variant="h4" component="h1" style={{ fontWeight: 600, marginBottom: '8px' }}>
                    {subject || 'Newsletter Subject Preview'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    From: {currentUser.name || 'Your Name'} • {new Date().toLocaleDateString()}
                  </Typography>
                </div>
                
                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {content || 'Your newsletter content will appear here...\n\nThis is how your subscribers will see your message.'}
                </Typography>
              </CardContent>
              <CardActions style={{ padding: '16px 32px', backgroundColor: '#f8f9fa' }}>
                <Typography variant="caption" color="textSecondary">
                  📧 Preview Mode - This is how your newsletter will appear to recipients
                </Typography>
              </CardActions>
            </Card>
          </FuseAnimate>
        )}
      </div>
    </div>
  );
}

export default NewsletterContent;
