import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
// import Provider from 'react-redux/es/components/Provider';
import DateFnsUtils from '@date-io/date-fns';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
// import store from './store';

//my redux imports
import { Provider } from 'react-redux';
import store from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName({ disableGlobal: true });

const withAppProviders = (Component) => (props) => {
  const WrapperComponent = () => (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Component {...props} />
          </MuiPickersUtilsProvider>
          </PersistGate>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  );

  return WrapperComponent;
};

export default withAppProviders;