import React, {useState, useContext, useEffect} from 'react';
import {Image} from 'react-native';
import {Container, Content, Text, Form, Item, Input, Body, Header, Title, Button} from 'native-base';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {MediaContext} from '../contexts/MediaContext';
import {validateField} from '../utils/validation';
import FormTextInput from '../components/FormTextInput'
import validate from 'validate.js';

const Upload = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [image, setImage] = useState(null);
  const [ready, setReady] = useState();

  const {handleTitleChange,
    handleDescriptionChange,
    uploadInputs,
    setUploadInputs,
    handleUpload,
    constraints,
    errors,
    setErrors,
  } = useUploadForm();

  const validationProperties = {
    title: {title: uploadInputs.title},
    description: {description: uploadInputs.description},
  };

  const validate = (field, value) => {
    console.log('validating', validationProperties[field]);
    setErrors((errors) =>
      ({
        ...errors,
        [field]: validateField({[field]: value},
            constraints),
        fetch: undefined,
      }));
  };

  const resetForm = () => {
    setErrors({});
    setUploadInputs({});
    setImage(null);
  };

  const upload = () => {
    console.log('upload errors', errors);
    handleUpload(image, props.navigation, setMedia);
    resetForm();
  };

  const titleChange = (text) => {
    handleTitleChange(text);
    validate('title', text);
  };

  const descriptionChange = (text) => {
    handleDescriptionChange(text);
    validate('description', text);
  };

  const checkErrors = () => {
    console.log('errors for upload', errors);
    if (errors.title !== undefined ||
      errors.description !== undefined) {
      setReady(false);
    } else {
      console.log('setting ready to true');
      setReady(true);
    }
  };

  useEffect(() => {
    checkErrors();
  }, [errors]);

  const componentDidMount = () => {
    getPermissionAsync();
    console.log('hi');
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  componentDidMount();

  const _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
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
          <Title>Upload</Title>
          {image !== null &&
          <Image source={{uri: image.uri}} style={{width: 300, height: 300}}></Image>
          }
          <Item>
            <FormTextInput placeholder="Title"
              value={uploadInputs.title}
              onChangeText={titleChange}/>
          </Item>
          <Item last>
            <FormTextInput placeholder="Description"
              value={uploadInputs.description}
              onChangeText={descriptionChange}/>
          </Item>
          <Button full onPress={_pickImage}>
            <Text>Select a file</Text>
          </Button>
          {image !== null && ready &&
          <Button full dark onPress={upload}>
            <Text>Upload a file</Text>
          </Button>
          }
          <Button dark full onPress={resetForm}>
            <Text>Reset form</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

export default Upload;
