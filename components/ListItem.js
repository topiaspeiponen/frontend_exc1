import React from 'react';
import {ListItem as BaseListItem, Left, Body, Right, Button, Thumbnail, Text} from 'native-base';
import PropTypes from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const listItem = (props) => {
  return (
    <BaseListItem thumbnail>
      <Left>
        <Thumbnail square source={{uri: mediaUrl + props.singleMedia.thumbnails.w160}} />
      </Left>
      <Body>
        <Text>{props.singleMedia.title}</Text>
        <Text note numberOfLines={1}>{props.singleMedia.description}</Text>
      </Body>
      <Right>
        <Button primary onPress={
          () => {
            props.navigation.push('Single',
                {
                  file: props.singleMedia,
                });
          }}>
          <Text>View</Text>
        </Button>
      </Right>
    </BaseListItem>
  );
};

listItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default listItem;
