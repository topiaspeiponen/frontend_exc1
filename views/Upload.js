import React, {useState} from 'react';
import {Image} from 'react-native';
import {Container, Content, Text, Form, Item, Input, Body, Header, Title, Button} from 'native-base';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const Upload = (props) => {
  const [image, setImage] = useState({});

  const {handleTitleChange,
    handleDescriptionChange,
    uploadInputs,
    handleUpload,
  } = useUploadForm();

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

    console.log(result);

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
          {image &&
          <Image source={{uri: image.uri}} style={{width: 300, height: 300}}></Image>
          }
          <Item>
            <Input placeholder="Title"
              onChangeText={handleTitleChange}/>
          </Item>
          <Item last>
            <Input placeholder="Description"
              onChangeText={handleDescriptionChange}/>
          </Item>
          <Button full onPress={_pickImage}>
            <Text>Select a file</Text>
          </Button>
          <Button full dark onPress={handleUpload(image)}>
            <Text>Upload a file</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Upload;
