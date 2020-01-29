import React from 'react';
import {Image} from 'react-native';
import {Container, Content, Text, Card, CardItem, Body} from 'native-base';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (file) => {
  const {navigation} = file;
  console.log(file);
  console.log(mediaUrl + navigation.getParam('file', 'No image').filename);

  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Image style={{width: 300, height: 300}} source={{uri: mediaUrl + navigation.getParam('file', 'no image').filename}}/>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                {navigation.getParam('file', 'no file').title}
              </Text>
              <Text>
                {navigation.getParam('file', 'no file').description}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Single;
