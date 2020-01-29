import React, {useState, useEffect} from 'react';
import {AsyncStorage, Image} from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Body} from 'native-base';
import PropTypes from 'prop-types';
import {createSwitchNavigator} from 'react-navigation';
import {getAvatar} from '../hooks/APIhooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = (props) => {
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  const retrieveData = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem('user');
      const user = JSON.parse(userFromStorage);
      const avatarGet = await getAvatar(user.user_id);
      console.log('avatar: ' + avatar);
      console.log('user: ' + user);
      setUser(user);
      setAvatar(avatarGet[0]);
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Image source={{uri: mediaUrl + avatar.filename}} style={{width: 300, height: 300}}></Image>
          </CardItem>
          <CardItem>
            <Text>Username: {user.username}</Text>
          </CardItem>
          <CardItem>
            <Text>Email: {user.email}</Text>
          </CardItem>
          <CardItem>
            <Text>User ID: {user.user_id}</Text>
          </CardItem>
          <CardItem footer bordered>
            <Body>
              <Button full onPress={signOutAsync}>
                <Text>Logout</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
