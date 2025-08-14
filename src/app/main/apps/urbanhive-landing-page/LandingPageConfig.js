import { authRoles } from 'app/auth';
import LandingPage from './LandingPage';

const LandingPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      //path: '/landing-page',
      path: '/',
      component: LandingPage,
    },
  ],
};

export default LandingPageConfig;
