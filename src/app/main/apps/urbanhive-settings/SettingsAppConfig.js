import SettingsApp from './SettingsApp';

const SettingsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/settings',
      component: SettingsApp,
    },
  ],
};

export default SettingsAppConfig;
