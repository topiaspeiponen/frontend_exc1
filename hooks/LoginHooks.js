import {useState} from 'react';
import validate from 'validate.js';

const constraints = {
  username: {
    presence: {
      message: 'cannot be blank.',
    },
    length: {
      minimum: 3,
      message: 'must be at least 3 characters',
    },
  },
  email: {
    presence: {
      message: 'cannot be blank.',
    },
    email: {
      message: 'not valid.',
    },
  },
  fullname: {
    presence: 'cannot be blank.',
  },
  password: {
    length: {
      minimum: 5,
      message: 'must be at least 5 characters',
    },
  },
  rePassword: {
    presence: 'cannot be blank.',
    equality: {
      attribute: 'password',
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

  const validateField = (attr) => {
    const attrName = Object.keys(attr).pop(); // get the only or last item from array
    const valResult = validate(attr, constraints);
    console.log('valresult', valResult);
    let valid = undefined;
    if (valResult[attrName]) {
      valid = valResult[attrName][0]; // get just the first message
    }
    setErrors((errors) =>
      ({
        ...errors,
        [attrName]: valid,
        fetch: undefined,
      }));
  };

  const checkAvail = async () => {
    const text = inputs.username;
    try {
      const result = await fetchGET('users/username', text);
      console.log(result);
      if (!result.available) {
        setErrors((errors) =>
          ({
            ...errors,
            username: 'Username not available.',
          }));
      }
    } catch (e) {
      setErrors((errors) =>
        ({
          ...errors,
          fetch: e.message,
        }));
    }
  };

  const validateOnSend = (fields) => {
    checkAvail();

    for (const [key, value] of Object.entries(fields)) {
      console.log(key, value);
      validateField(value);
    }

    if (errors.username !== undefined ||
      errors.email !== undefined ||
      errors.full_name !== undefined ||
      errors.password !== undefined ||
      errors.confirmPassword !== undefined) {
      return false;
    } else {
      return true;
    }
  };

  return {
    handleUsernameChange,
    handlePasswordChange,
    handleRePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    validateField,
    checkAvail,
    validateOnSend,
    inputs,
    errors,
    setErrors,
  };
};

export default useSignUpForm;
