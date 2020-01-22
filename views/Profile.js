import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {createSwitchNavigator} from 'react-navigation';

const Profile = (props) => {
  const [user, setUser] = useState([]);
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  const retrieveData = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem('user');
      const user = JSON.parse(userFromStorage);
      console.log('user: ' + user);
      setUser(user);
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>User ID: {user.user_id}</Text>
      <Button title="Logout!" onPress={signOutAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
