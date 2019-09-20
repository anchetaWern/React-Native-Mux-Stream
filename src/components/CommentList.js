import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default class CommentList extends Component {

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.comments}
          renderItem={this._renderComment}
          keyExtractor={item => item.id.toString()}
          ref="flatList"
          onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
        />
      </View>
    );
  }


  _renderComment({ item }) {
    return (
      <View style={styles.comment}>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
	list: {
    height: 300,
    position: 'absolute',
    bottom: 30,
    left: 20
  },
	comment: {
    padding: 10
  },
  commentText: {
    color: '#FFF',
    fontSize: 14
  },
});