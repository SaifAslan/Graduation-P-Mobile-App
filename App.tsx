/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import { store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import home from './src/pages/Home';
import AppHeader from './src/components/Header';
import Product from './src/pages/Product';
import StickyFooter from './src/components/StickyFooter';
import Cart from './src/pages/Cart';
import Favourites from './src/pages/Favourites';
import Profile from './src/pages/Profile';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      {/* wrapping the app with redux persis wrapper to persist the redux data in async storage */}
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppHeader />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={home} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
          <StickyFooter />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
