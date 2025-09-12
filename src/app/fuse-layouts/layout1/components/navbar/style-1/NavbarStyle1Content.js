import FuseScrollbars from '@fuse/core/FuseScrollbars';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';
import clsx from 'clsx';
import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: /*theme.palette.text.primary,*/'#FFF',
    '& ::-webkit-scrollbar-thumb': {
      boxShadow: `inset 0 0 0 20px ${
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
      }`,
    },
    '& ::-webkit-scrollbar-thumb:active': {
      boxShadow: `inset 0 0 0 20px ${
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
      }`,
    },
  },
  content: {
    overscrollBehavior: 'contain',
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    color: /*theme.palette.text.primary,*/'#FFF',
    background:
      'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 10px',
    backgroundAttachment: 'local, scroll',
  },
}));

function NavbarStyle1Content(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
    style={{backgroundColor:' #20dbe4',color:"#FFF"}}
      className={clsx(
        'flex flex-auto flex-col overflow-hidden h-full',
        classes.root,
        props.className
      )}
    >
      <FuseScrollbars
        className={clsx(classes.content)}
        style={{backgroundColor:' #20dbe4',color:"#FFF"}}
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <UserNavbarHeader />

        <Navigation layout="vertical"  style={{backgroundColor:' #20dbe4',color:"#FFF"}}  />
      </FuseScrollbars>
    </div>
  );
}

export default memo(NavbarStyle1Content);
