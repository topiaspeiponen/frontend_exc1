import React from 'react';
import {createAppContainer, createSwitchNavigator, NavigationEvents} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'native-base';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Upload from '../views/Upload';
import AuthLoading from '../views/AuthLoading';
import Login from '../views/Login';


const TabNavigator = createBottomTabNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          title: 'Home',
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Profile',
        },
      },
      Upload: {
        screen: Upload,
        navigationOptions: {
          title: 'Upload',
        },
      },
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: () => {
          const {routeName} = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = 'home';
          } else if (routeName === 'Profile') {
            iconName = 'person';
          } else if (routeName === 'Upload') {
            iconName = 'cloud-upload';
          }

          // You can return any component that you like here!
          // eslint-disable-next-line react/react-in-jsx-scope
          return <Icon
            name={iconName}
            size={25}
          />;
        },
      }),
    },
    {
      initialRouteName: 'Home',
    },
);

TabNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
  };
};

const StackNavigator = createStackNavigator(
    // RouteConfigs
    {
      Home: {
        screen: TabNavigator,
        navigationOptions: {
          headerMode: 'none',
        },
      },
      Single: {
        screen: Single,
      },
      Logout: {
        screen: Login,
      },
    },
);

const Navigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: StackNavigator,
      Auth: Login,
    },
    {
      initialRouteName: 'AuthLoading',
    },
);

export default createAppContainer(Navigator);
