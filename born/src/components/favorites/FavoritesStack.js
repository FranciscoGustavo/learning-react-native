import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from 'born/src/components/favorites/FavoritesScreen';
import colors from 'born/src/res/colors';

const Stack = createStackNavigator();

const FavoritesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.blackPearl,
        shadowColor: colors.blackPearl
      },
      headerTintColor: colors.white
    }}
  >
    <Stack.Screen
      name="Favorites"
      component={FavoritesScreen}
    />
  </Stack.Navigator>
);

export default FavoritesStack;
