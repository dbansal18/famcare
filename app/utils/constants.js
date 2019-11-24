import React from 'react';
import Dashboard from '@material-ui/icons/Dashboard';
import Assignment from '@material-ui/icons/Assignment';
import MapIcon from '@material-ui/icons/Map';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const JWT_TOKEN_KEY = 'secretDecoderOfJWTLocalstorage';
// export const API = 'http://localhost:8000';
// export const API = process.env.API_URL;
export const API = 'https://famcare-api.herokuapp.com'

export const NAVIGATION_HEADER = {
    '/dashboard': 'DASHBOARD',
    '/mapp': 'Mapp',
  };
  
  export const NAVIGATION_BREADCRUMB = {
    '/dashboard': {
      name: ['Dashboard'],
      links: ['/dashboard'],
    },
    '/mapp': {
      name: ['Home'],
      links: ['/mapp'],
    },
  };
  
  export const SIDE_DRAWER_LIST = [
    { name: 'Dashboard', link: '/dashboard', icon: <Dashboard /> },
    { name: 'Mapp', link: '/mapp', icon: <MapIcon /> },
  ];