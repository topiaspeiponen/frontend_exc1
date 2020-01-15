import React from 'react';
import {
  FlatList,
} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import { MediaContext } from '../contexts/MediaContext';

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  console.log(props);
  return (
    <FlatList
      data={media}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
