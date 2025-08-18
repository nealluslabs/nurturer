import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './components/login-form';
import Auth0LoginTab from './tabs/Auth0LoginTab';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';
import JWTLoginTab from './tabs/JWTLoginTab';
import Modal from './components/modal';
import { db, fb, auth } from '../../../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';

//import Header from '../componentsWelcome/header/Header'
// import Nav from '../componentsWelcome/nav/Nav'

// import Experience from '../componentsWelcome/experience/Experience'
import Footer from './components/footer/Footer'


// import { Helmet } from 'react-helmet-async'
import DummyAbout from './components/about-copy/About'
import DummyAbout2 from './components/about2-copy/About2'
import DummyAbout3 from './components/about3-copy/About3'
import DummyHeader from './components/header/Header'

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
  leftSection: {},
  rightSection: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const { isAuth } = useSelector((state) => state.login);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  
  
  return (
    <>
   


      <div className="welcomePage baskerville" style={{backgroundColor:"white"}}>
     
      {<DummyHeader />}
      <DummyAbout/>
      <DummyAbout2/>
      <DummyAbout3/>
      
      <Footer/>
      </div>

  </>
    )
}

export default LandingPage;
