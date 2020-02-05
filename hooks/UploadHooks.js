import {useState} from 'react-native';
import {NavigationEvents} from 'react-navigation';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const useUploadForm = (props) => {
  const [uploadInputs, setUploadInputs] = useState({});
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
  const handleUpload = async (result) => {
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    const localUri = result.uri;
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

    const response = await fetch(apiUrl + 'media', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log('post file ', response);

  };
  return {
    handleTitleChange,
    handleDescriptionChange,
    uploadInputs,
    setUploadInputs,
    handleUpload,
  };
};

export default useUploadForm;
