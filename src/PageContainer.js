import React from 'react';
import './App';
import * as AppContext from './AppContext';
import Layout from './Components/Layout';

export function PageContainer(props) {
  return <Layout {...props}>{props.children}</Layout>;
}

export function AppRoot(props) {
  return <AppContext.Provider {...props}>{props.children}</AppContext.Provider>;
}
