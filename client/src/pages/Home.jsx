import React from 'react';
import AuthUserScreen from '../components/common/AuthUserScreen';
import UnauthUserScreen from '../components/common/UnauthUserScreen';

const Home = () => {
  const  user = false

  return (
    <div className='min-h-screen'>
      {user ? (
        <AuthUserScreen/>
      ) : (
        <UnauthUserScreen />
      )}
    </div>
  );
};

export default Home;