import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources(); 
  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}

registerRootComponent(App);