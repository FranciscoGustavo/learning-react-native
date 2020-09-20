import React, { Component } from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import colors from 'born/src/res/colors';

class CoinsSearch extends Component {
  
  state = {
    query: ''
  }
  
  handleText = (query) => {
    this.setState({ query });
  
    if (this.props.onChange) {
      this.props.onChange(query);
    }
  }

  render() {

    const { query } = this.state;

    return (
      <View>
        <TextInput
          style={[
            styles.TextInput,
            Platform.OS == 'ios' 
              ? styles.textIOS
              : styles.textAndroid
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder="Search coin"
          placeholderTextColor="#FFF"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TextInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: '#FFF'
  },
  textAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon
  },
  textIOS: {
    margin: 8,
    borderRadius: 8
  }
});

export default CoinsSearch;