import React from 'react';
import {StyleSheet, View} from 'react-native';
import List from './components/List';
import MediaProvider from './contexts/MediaContext';

const App = () => {
  return (
    <View style={styles.container}>
      <List mediaArray={MediaProvider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
});

export default App;
