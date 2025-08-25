import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from 'src/redux/reducers/auth.slice';
import profileReducer from 'src/redux/reducers/profile.slice';
import createDevReducer from 'src/redux/reducers/createDev.slice';
import userReducer from 'src/redux/reducers/user.slice';
import adminUserReducer from 'src/redux/reducers/adminUser.slice';
import developerReducer from 'src/redux/reducers/developer.slice';
import appointmentsReducer from 'src/redux/reducers/appointments.slice';
import bootcampReducer from 'src/redux/reducers/bootcamp.slice';
import chatReducer from 'src/redux/reducers/chat.slice';
import newsletterReducer from 'src/redux/reducers/newsLetter.slice';
import fuse from '../app/store/fuse';
import i18n from '../app/store/i18nSlice';
import chatApp from 'app/main/apps/urbanhive-inbox/store';
import { persistReducer } from 'redux-persist';
import storage from './storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  createDev:createDevReducer,
  user: userReducer,
  adminUser: adminUserReducer,
  developer:developerReducer,
  appointments:appointmentsReducer,
  bootcamp: bootcampReducer, 
  chat: chatReducer,
  newsletter: newsletterReducer,
  fuse,
  i18n,
  chatApp,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
