import React from 'react';
import {MediaProvider} from './contexts/MediaContext';
import Navigator from './navigators/navigator';


const App = () => {
  return (
    <MediaProvider>
      <Navigator></Navigator>
    </MediaProvider>
  );
};

/*const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
});*/

export default App;
