import React, {useContext, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Form, Item, H2} from 'native-base';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import {login, register} from '../hooks/APIhooks';
import useSignUpForm from '../hooks/LoginHooks';
import validate from 'validate.js';

const Login = (props) => {
  const [toggleForm, setToggleForm] = useState(true);
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleRePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    inputs,
    errors,
    setErrors,
    validateUsername} = useSignUpForm();
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
      if (inputs.password === inputs.rePassword) {
        const result = await register(inputs.username, inputs.password, inputs.email, inputs.full_name);
        console.log('user: ' + result);
        // IF does not exist do somtihng
        await signInAsync();
        // else
      } else {
        setErrors('password', 'Password\'s do not match');
      }
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
        {toggleForm &&
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
            <Button full dark onPress={() => {
              setToggleForm(false);
            }}>
              <Text>Register</Text>
            </Button>
          </Form>
        }

        {/* register form */}
        {!toggleForm &&
          <Form>
            <Title>
              <H2>Register</H2>
            </Title>
            <Item>
              <FormTextInput
                error={errors.username}
                autoCapitalize='none'
                value={inputs.username}
                placeholder='username'
                onChangeText={handleUsernameChange}
                onEndEditing={async (evt) => {
                  try {
                    validateUsername();
                    const text = evt.nativeEvent.text;
                    const result = await fetch('http://media.mw.metropolia.fi/wbma/users/username/' + text);
                    const json = await result.json();
                    if (json.available) {
                      setErrors('username', 'Username is available');
                    } else {
                      setErrors('username', 'Username is unavailable');
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            </Item>
            {errors.username != 'undefined' &&
              <Body>
                <Text>{errors.username}</Text>
              </Body>
            }
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
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.rePassword}
                placeholder='Re-enter password'
                secureTextEntry={true}
                onChangeText={handleRePasswordChange}
              />
            </Item>
            <Button full onPress={registerAsync}>
              <Text>Register!</Text>
            </Button>
            <Button full dark onPress={() => {
              setToggleForm(true);
            }}>
              <Text>Login</Text>
            </Button>
          </Form>
        }
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
