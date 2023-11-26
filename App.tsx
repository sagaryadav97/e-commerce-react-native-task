import React from 'react';
import RoutesContainer from './src/routes/Routes';
import {NavigationContainer} from '@react-navigation/native';
import {ProductsProvider} from './src/contexts/Product.Context';
import {FavoritesProvider} from './src/contexts/Favorite.Context';

const App = () => {
  return (
    <>
      <FavoritesProvider>
        <ProductsProvider>
          <NavigationContainer>
            <RoutesContainer />
          </NavigationContainer>
        </ProductsProvider>
      </FavoritesProvider>
    </>
  );
};

export default App;
