import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {Input, Item, Content, Badge, Text} from 'native-base';


const FormTextInput = (props) => {
  const {error, ...otherProps} = props;
  return (
    <Content>
      <Item>
        <Input
          {...otherProps}
        />
      </Item>
      {error &&
      <Badge>
        <Text>
          {error}
        </Text>
      </Badge>
      }
    </Content>
  );
};

FormTextInput.propTypes = {

};

export default FormTextInput;
