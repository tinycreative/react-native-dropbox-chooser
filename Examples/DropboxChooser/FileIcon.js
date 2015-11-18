var React = require('react-native');

var ICON_COLORS = {
  'psd': ['#69d0d0', '#41a8a8'],
  'pdf': ['#e14b4e', '#dd9698'],
  'dxf': ['#23a9db', '#45c7f7'],
  'ai' : ['#fdb53f', '#f0592a'],
  'zip': ['#81c48f', '#b7dbbe'],
  'jpg': ['#f4d17e', '#fdb53f'],
  'default': ['#e0dad1', '#bdb9b4'],
};

var {
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var FileIcon = React.createClass({

  getDefaultProps() {
    return {
      type: null,
      thumb: null,
    };
  },

  render () {
    if (!this.props.type) return null;

    var thumbElement;

    var colors = ICON_COLORS[this.props.type.toLowerCase()] || ICON_COLORS['default'];
    var baseStyle = { tintColor: colors[0] };
    var cornerStyle = { tintColor: colors[1] };

    return (
      <View style={styles.container}>
        <Image
          source={require('./images/file-icon-base.png')}
          style={[styles.base, baseStyle]}
        />

        <Image
          source={require('./images/file-icon-corner.png')}
          style={[styles.corner, cornerStyle]}
        />

        <Text style={styles.extension}>
          {(this.props.type).toUpperCase()}
        </Text>

        {thumbElement}
      </View>
    );
  }
});


var styles = StyleSheet.create({

  container: {
    position: 'relative',
    width: 40,
    height: 50,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  base: {
    tintColor: '#ccc',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  corner: {
    tintColor: '#00ff00',
    position: 'absolute',
    top: 0,
    left: 25,
    backgroundColor: 'transparent',
  },

  thumb: {
    width: 31,
    height: 31,
    borderRadius: 2,
    position: 'absolute',
    top: 15,
    left: 4,
  },

  extension: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 20,
    fontSize: 10,
    fontWeight: 'bold',
  }
});


module.exports = FileIcon;
