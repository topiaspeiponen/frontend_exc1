import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {getAllMedia} from '../hooks/APIhooks';

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);
  console.log(media, data);
  return (
    <FlatList
      data={media}
      keyExtractor = {(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
