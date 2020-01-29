import React, {useContext} from 'react';
import {List as BaseList} from 'native-base';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {getAllMedia} from '../hooks/APIhooks';

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);
  // console.log(media, data);
  return (
    <BaseList
      dataArray={media}
      keyExtractor = {(item, index) => index.toString()}
      renderItem={
        ({item}) => <ListItem
          navigation={props.navigation}
          singleMedia={item}
        />
      }
    />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
