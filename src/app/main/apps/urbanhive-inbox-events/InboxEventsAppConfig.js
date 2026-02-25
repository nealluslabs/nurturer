import { lazy } from 'react';

const InboxEventsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/inbox-events',
      exact: true,
      component: lazy(() => import('./InboxEventsApp')),
    },
  ],
};

export default InboxEventsAppConfig;
