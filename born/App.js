/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from 'born/src/components/coins/CoinsStack';
import FavoritesStack from 'born/src/components/favorites/FavoritesStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from 'born/src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: "#FEFEFE",
          style: {
            backgroundColor: colors.blackPearl
          }
        }}
      >
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('born/src/assets/bank.png')}
              />
            )
          }}
        />

        <Tabs.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('born/src/assets/star.png')}
              />
            )
          }}
        />

      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
