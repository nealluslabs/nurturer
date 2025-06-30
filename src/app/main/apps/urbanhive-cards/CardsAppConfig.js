import { lazy } from 'react';

const CardsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/cards',
      component: lazy(() => import('./CardsApp')),
    },
  ],
};

export default CardsAppConfig;
