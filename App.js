import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import List from './components/List';
import {MediaProvider} from './contexts/MediaContext';


const App = () => {
  return (
    <MediaProvider>
      <View style={styles.container}>
        <List/>
      </View>
    </MediaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
});

export default App;
