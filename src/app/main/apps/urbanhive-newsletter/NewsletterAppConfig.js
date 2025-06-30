import { lazy } from 'react';

const NewsletterAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/newsletter',
      component: lazy(() => import('./NewsletterApp')),
    },
  ],
};

export default NewsletterAppConfig;
