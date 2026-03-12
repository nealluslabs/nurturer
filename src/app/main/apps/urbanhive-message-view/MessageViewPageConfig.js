import { lazy } from 'react';


const MessageViewPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/message-view',
      component: lazy(() => import('./MessageViewApp')),
    },
  ],
}; 

export default MessageViewPageConfig;