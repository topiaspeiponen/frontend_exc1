import React, {useContext} from 'react';
import {AsyncStorage} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Form, Item, H2} from 'native-base';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import {login, register} from '../hooks/APIhooks';
import useSignUpForm from '../hooks/LoginHooks';

const Login = (props) => {
  const {handleUsernameChange, handlePasswordChange, handleEmailChange, handleFullnameChange, inputs} = useSignUpForm();
  const signInAsync = async () => {
    try {
      console.log('username: ' + inputs.username + 'password: ' + inputs.password);
      const user = await login(inputs.username, inputs.password);
      console.log(user);
      await AsyncStorage.setItem('userToken', user.token);
      console.log(user.user.email);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e) {
      console.log('error', e);
    }
  };

  const registerAsync = async () => {
    try {
      const result = await register(inputs.username, inputs.password, inputs.email, inputs.full_name);
      console.log('user: ' + result);
      // IF does not exist do somtihng
      await signInAsync();
      // else
    } catch (e) {
      console.log('error', e);
    }
  };
  return (
    <Container>
      <Header>
        <Body>
          <Title>
            MyApp
          </Title>
        </Body>
      </Header>
      <Content>
        <Form>
          {/* Login */}
          <Title>
            <H2>Login</H2>
          </Title>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.username}
              placeholder='username'
              onChangeText={handleUsernameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.password}
              placeholder='password'
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </Item>
          <Button full onPress={signInAsync}><Text>Sign in!</Text></Button>
        </Form>

        {/* register form */}
        <Form>
          <Title>
            <H2>Register</H2>
          </Title>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.username}
              placeholder='username'
              onChangeText={handleUsernameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.email}
              placeholder='email'
              onChangeText={handleEmailChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.fullname}
              placeholder='fullname'
              onChangeText={handleFullnameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.password}
              placeholder='password'
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </Item>
          <Button full onPress={registerAsync}>
            <Text>Register!</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
