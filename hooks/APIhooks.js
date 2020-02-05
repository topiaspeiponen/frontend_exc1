import {useState, useEffect, useImperativeHandle} from 'react';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    const response = await fetch(apiUrl + 'media/all');
    const json = await response.json();

    const result = await Promise.all(json.files.map(async (item) => {
      const response = await fetch(apiUrl + 'media/' + item.file_id);
      return await response.json();
    }));
    // console.log(result);

    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
};

const login = async (uName, uPass) => {
  console.log(uName, uPass);
  const data = {
    username: uName,
    password: uPass,
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(apiUrl + 'login', fetchOptions);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log('error', e.message);
  }
};

const register = async (uName, uPass, uEmail, uFullname) => {
  const data = {
    username: uName,
    password: uPass,
    email: uEmail,
    full_name: uFullname,
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(apiUrl + 'users', fetchOptions);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getAvatar = async (userId) => {
  const data = 'avatar_' + userId;

  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(apiUrl + 'tags/' + data, fetchOptions);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log('error', e.message);
  }
};

export {getAllMedia, login, register, getAvatar};
