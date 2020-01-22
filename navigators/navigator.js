import {createAppContainer, createSwitchNavigator, NavigationEvents} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
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
    },
    {
      initialRouteName: 'Home',
    },
);

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
