import { lazy } from 'react';


const InteractionPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/interactions',
      component: lazy(() => import('./interactionsPage')),
    },
  ],
}; 

export default InteractionPageConfig;