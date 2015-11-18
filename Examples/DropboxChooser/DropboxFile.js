var React = require('react-native');
var FileIcon = require('./FileIcon.js');
var _ = require('lodash');

var {
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var DropboxFile = React.createClass({

  getDefaultProps() {
    return {
      file: null,
    };
  },

  render () {
    if (!this.props.file) return null;

    return (
      <View style={styles.container}>
        <FileIcon
          thumb={_.get(this.props, 'file.thumbnails.200x200')}
          type={this.getFileExtension(_.get(this.props, 'file.name'))}
        />

        <Text
          style={styles.name}
          numberOfLines={1}>

          {this.props.file.name}
        </Text>
      </View>
    );
  },

  getFileExtension (name) {
    return _.last(name.split('.'));
  }
});


var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },

  name: {
    color: '#666',
  }
});


module.exports = DropboxFile;
