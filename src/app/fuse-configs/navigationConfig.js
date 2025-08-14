import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
// import { IoMdCard } from "react-icons/io";
// import { FaNewspaper } from "react-icons/fa";


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);


const navigationConfig = [
 
  /*{
    id: 'learn',
    title: 'LEARN',
    type: 'group',
    icon: 'web',
    children: [
      {
        id: 'sessions',
        title: 'Sessions',
        type: 'item',
        icon: 'photo',
        url: '/apps/sessions',
        // url: '/apps/coming-soon2',
      },
      {
        id: 'everybody is looking wawy',
        title: 'Book Tutor',
        type: 'item',
        icon: 'event_available',
        url: '/apps/bookdev',
        // url: '/apps/coming-soon3',
      },
      {
        id: 'bootcamp',
        title: 'Lessons',
        type: 'item',
        icon: 'group',
         url: '#',
        // url: '/apps/coming-soon2',
      },
    ],
  },*/
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/apps/dashboard',
  },
 
  {
    id: 'inbox',
    title: 'Touches',
    type: 'item',
    icon: 'chat',
    url: '/apps/inbox',
  },
  {
    id: 'candidates',
    title: 'Contacts',
    type: 'item',
    icon: 'group_add',
    url: '/candidates',
  },
 
 
  
  {
    id: 'cards',
    title: 'Cards',
    type: 'item',
    icon: 'dashboard',
    url: '/apps/cards',
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    type: 'item',
    icon: 'email',
    url: '/apps/newsletter',
  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'item',
    icon: 'settings',
    url: '/apps/settings',
  },
 /* {
    id: 'match',
    title: 'Match',
    type: 'group',
    icon: 'web',
    children: [
     
   
    ],
  },*/
  /*{
    id: 'admin',
    title: 'Admin',
    type: 'group',
    icon: 'web',
    children: [
      {
        id: 'create-developer',
        title: 'Create Developer',
        type: 'item',
        icon: 'photo',
        url: '/apps/admin/createdeveloper',
        // url: '/apps/coming-soon2',
      },
      {
        id: 'developer-list',
        title: 'Developer List',
        type: 'item',
        icon: 'event_available',
       // url: '/apps/bookdev',
         url: '/apps/admin/developerlist',
      },
      {
        id: 'booked-classes',
        title: 'Booked Classes',
        type: 'item',
        icon: 'event_available',
       // url: '/apps/bookdev',
        url: '/apps/admin/assignedbookings',
      },
      {
        id: 'registered-users',
        title: 'Registered Users',
        type: 'item',
        icon: 'event_available',
       // url: '/apps/bookdev',
        url: '/apps/admin/registeredUsers',
      },
    ]
  }*/
];

export default navigationConfig;