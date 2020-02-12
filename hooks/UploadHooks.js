import {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {getAllMedia} from '../hooks/APIhooks';
import validate from 'validate.js';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const constraints = {
  title: {
    presence: {
      message: 'Cannot be blank',
    },
    length: {
      minimum: 3,
      message: 'must be at least 3 characters',
    },
  },
  description: {
    presence: {
      message: 'Cannot be blank',
    },
    length: {
      minimum: 5,
      message: 'must be at least 5 characters',
    },
  },
}

const useUploadForm = () => {
  const [uploadInputs, setUploadInputs] = useState({});
  const [errors, setErrors] = useState({});
  const formData = new FormData();

  const handleTitleChange = (text) => {
    setUploadInputs((uploadInputs) =>
      ({
        ...uploadInputs,
        title: text,
      }));
  };
  const handleDescriptionChange = (text) => {
    setUploadInputs((uploadInputs) =>
      ({
        ...uploadInputs,
        description: text,
      }));
  };
  const handleUpload = async (image, navigation, setMedia) => {
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    console.log(image);
    const localUri = image.uri;
    const filename = localUri.split('/').pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    if (type === 'image/jpg') {
      type = 'image/jpg';
    }

    // Upload the image using the fetch and FormData APIs
    // Assume "photo" is the name of the form field the server expects
    formData.append('file', {uri: localUri, name: filename, type});
    formData.append('title', uploadInputs.title);
    formData.append('description', uploadInputs.description);

    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await fetch(apiUrl + 'media', {
      method: 'POST',
      body: formData,
      headers: {
        'x-access-token': token,
      },
      });
      const json = await response.json();
      console.log('post file ', json);
      console.log('json message status', json.message)
      if (json.message) {
        /*const [data, loading] = getAllMedia();
        setMedia(data); REFRESHING DONT WORK FOR SOME REASON*/
        navigation.push('Home');
      }
  } catch(e) {
    console.log('error: ' + e);
  }
  };
  return {
    handleTitleChange,
    handleDescriptionChange,
    uploadInputs,
    setUploadInputs,
    handleUpload,
    constraints,
    errors,
    setErrors,
  };
};

export default useUploadForm;
