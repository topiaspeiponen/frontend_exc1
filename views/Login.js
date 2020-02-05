import React, {useContext, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Text, Form, Item, H2, Card, CardItem} from 'native-base';
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
    validateField,
    validateOnSend,
    checkAvail} = useSignUpForm();

    const validationProperties = {
    username: {username: inputs.username},
    email: {email: inputs.email},
    full_name: {full_name: inputs.full_name},
    password: {password: inputs.password},
    rePassword: {
      password: inputs.password,
      rePassword: inputs.rePassword,
    },
  };
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
    const regValid = validateOnSend(validationProperties);
    console.log('reg field errors', errors);
    if (!regValid) {
      return;
    }

    try {
      console.log('sen inputs', inputs);
      const user = inputs;
      delete user.confirmPassword;
      const result = await register(inputs.username, inputs.password, inputs.email, inputs.full_name);
      console.log('register', result);
      signInAsync();
    } catch (e) {
      console.log('registerAsync error: ', e.message);
      setErrors((errors) =>
        ({
          ...errors,
          fetch: e.message,
        }));
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
                  checkAvail();
                  validateField(validationProperties.username);
                  }}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.email}
                placeholder='email'
                onChangeText={handleEmailChange}
                onEndEditing={() => {
                  validateField(validationProperties.email);
                }}
                error={errors.email}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.fullname}
                placeholder='fullname'
                onChangeText={handleFullnameChange}
                onEndEditing={() => {
                  validateField(validationProperties.full_name);
                }}
                error={errors.full_name}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.password}
                placeholder='password'
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
                onEndEditing={() => {
                  validateField(validationProperties.password);
                }}
                error={errors.password}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.rePassword}
                placeholder='Re-enter password'
                secureTextEntry={true}
                onChangeText={handleRePasswordChange}
                onEndEditing={() => {
                  validateField(validationProperties.rePassword);
                }}
                error={errors.rePassword}
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
        {errors.fetch &&
        <Card>
          <CardItem>
            <Body>
              <Text>{errors.fetch}</Text>
            </Body>
          </CardItem>
        </Card>
        }
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
