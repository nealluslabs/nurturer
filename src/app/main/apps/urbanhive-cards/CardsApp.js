import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import CardsHeader from './CardsHeader';
import CardsContent from './CardsContent';

const useStyles = makeStyles((theme) => ({
  content: {
    '& canvas': {
      maxHeight: '100%',
    },
  },
  selectedProject: {
     //background: theme.palette.primary.main,
    backgroundColor:'#FFF', /*theme.palette.primary.main*/
    color: theme.palette.primary.contrastText,
    borderRadius: '8px 0 0 0',
  },
  projectMenuButton: {
    //background: theme.palette.primary.main,
    backgroundColor:'#FFF', /*theme.palette.primary.main*/
    color: theme.palette.primary.contrastText,
    borderRadius: '0 8px 0 0',
    marginLeft: 1,
  },
}));

function CardsApp(props) {
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize any data needed for the cards
  }, [dispatch]);

  return (
    <FusePageSimple
      classes={{
        contentWrapper: 'p-0 h-full',
        content: classes.content,
        leftSidebar: 'w-256 border-0',
        header: 'min-h-auto',
         backgroundColor: '#FFF',
      }}
    //   header={<CardsHeader />}
      content={<CardsContent />}
      sidebarInner
      ref={pageLayout}
      innerScroll
    />
  );
}

export default withReducer('cardsApp', reducer)(CardsApp);
