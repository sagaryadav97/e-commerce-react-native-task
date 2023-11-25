import React from 'react';
import RoutesContainer from './src/routes/Routes';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <RoutesContainer />
      </NavigationContainer>
    </>
  );
};


export default App;
