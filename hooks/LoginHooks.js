import {useState} from 'react';
import validate from 'validate.js';

const constraints = {
  username: {
    presence: {
      message: 'This field is required',
    },
    length: {
      minimum: 3,
      message: 'Your username must be at least 3 characters',
    },
  },
  password: {
    presence: {
      message: 'This field is required',
    },
    length: {
      minimum: 5,
      message: 'Your password must be at least 3 characters',
    },
  },
  fullname: {
    format: {
      pattern: '^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$',
      message: 'Full name is not valid',
    },
  },
  email: {
    email: {
      message: 'This doesnt\'t look like a valid email address',
    },
  },
};

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (text) => {
    const check = validate({username: text}, constraints);
    console.log('validate: ', check);

    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handlePasswordChange = (text) => {
    const check = validate({password: text}, constraints);
    console.log('validate: ', check);
    console.log('validate pass: ', validate.isEmpty(check));

    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };
  const handleRePasswordChange = (text) => {
    const check = validate({password: text}, constraints);
    console.log('validate: ', check);

    setInputs((inputs) =>
      ({
        ...inputs,
        rePassword: text,
      }));
  };

  const handleEmailChange = (text) => {
    const check = validate({email: text}, constraints);
    console.log('validate: ', check);

    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };
  const handleFullnameChange = (text) => {
    const check = validate({full_name: text}, constraints);
    console.log('validate: ', check);

    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };

  const validateUsername = () => {
    const valResult = validate({username: inputs.username}, constraints);
    console.log('validateU', valResult);
    let valid = undefined;
    if (valResult) {
      valid = valResult.username[0];
    }
    setErrors((errors) =>
      ({
        ...errors,
        username: valid,
      }));
  };

  return {
    handleUsernameChange,
    handlePasswordChange,
    handleRePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    validateUsername,
    inputs,
    errors,
    setErrors,
  };
};

export default useSignUpForm;
