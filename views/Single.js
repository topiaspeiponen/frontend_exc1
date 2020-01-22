import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (file) => {
  const {navigation} = file;
  console.log(file);
  console.log(mediaUrl + navigation.getParam('file', 'No image').filename);
  const url = mediaUrl + (navigation.getParam('file', 'no image').filename);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: mediaUrl + navigation.getParam('file', 'no image').filename}}></Image>
      <Text>{navigation.getParam('file', 'no file').title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 300,
    height: 300,
  }
});

export default Single;
