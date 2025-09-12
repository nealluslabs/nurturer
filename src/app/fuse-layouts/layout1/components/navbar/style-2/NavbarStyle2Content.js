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
   // backgroundColor: theme.palette.background.default,
   backgroundColor:'#20dbe4',
    //color: theme.palette.text.primary,
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
    backgroundColor:
      '#20dbe4',
      color: /*theme.palette.text.primary,*/'#FFF',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 10px',
    backgroundAttachment: 'local, scroll',
  },
}));

function NavbarStyle2Content(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      className={clsx(
        'flex flex-auto flex-col overflow-hidden h-full bg-[#20dbe4]',
        classes.root,
        props.className
      )}
    >
      <AppBar
        color="primary"
        position="static"
        className="flex flex-row items-center flex-shrink h-48 md:h-64 min-h-48 md:min-h-64 px-12 shadow-0 bg-[#20dbe4]"
      >
        <div className="flex flex-1 mx-4 bg-[#20dbe4]">
          <Logo />
        </div>

        <NavbarToggleButton className="w-40 h-40 p-0" />
      </AppBar>

      <FuseScrollbars
        className={clsx(classes.content)}
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <UserNavbarHeader />

        <Navigation layout="vertical" />
      </FuseScrollbars>
    </div>
  );
}

export default memo(NavbarStyle2Content);
