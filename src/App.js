import React from 'react';
import AuthUser from './components/AuthUser';
import Guest from './components/navbar/guest';
import Auth from './components/navbar/auth';
function App() {
  const {getToken} = AuthUser();
  if(!getToken()){
    return <Guest />
  }
  return (
      <Auth />
  );
}

export default App;
