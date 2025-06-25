import { lazy } from 'react';

const ProfileUpdateConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/profile-update',
      component: lazy(() => import('./ProfileUpdateApp')),
    },
  ],
};

export default ProfileUpdateConfig;


