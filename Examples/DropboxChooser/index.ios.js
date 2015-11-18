'use strict';

var React = require('react-native');
var DropboxClient = require('react-native-dropbox-chooser');
var DropboxFile = require('./DropboxFile.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity,
} = React;

var DropboxExample = React.createClass({

  getInitialState() {
    return {
      files: [
        {
          bytes: 432543,
          icon: 'https://www.dropbox.com/static/images/icons64/page_white_picture.png',
          is_dir: false,
          link: 'https://www.dropbox.com/s/nt59841gty931yp/IMG_6122%202.JPG?dl=0',
          name: 'IMG_6122 2.JPG',
          thumbnails: {
            "64x64": "https://photos-1.dropbox.com/t/2/AAD11Eoyv8MC80FN_8KTpIhuF97HhQctCyQclbUJT6w-5A/12/2163104/jpeg/64x64/1/_/0/4/IMG_6122%202.JPG/CKCDhAEgASACIAMgBCAFIAYgBygCKAc/nt59841gty931yp/AAD-J-e1Gvxj1ILM35Gg5uzqa/IMG_6122%202.JPG",
            "200x200": "https://photos-3.dropbox.com/t/2/AAD11Eoyv8MC80FN_8KTpIhuF97HhQctCyQclbUJT6w-5A/12/2163104/jpeg/200x200/1/_/0/4/IMG_6122%202.JPG/CKCDhAEgASACIAMgBCAFIAYgBygCKAc/nt59841gty931yp/AAD-J-e1Gvxj1ILM35Gg5uzqa/IMG_6122%202.JPG",
            "640x480": "https://photos-5.dropbox.com/t/2/AAD11Eoyv8MC80FN_8KTpIhuF97HhQctCyQclbUJT6w-5A/12/2163104/jpeg/640x480/1/_/0/4/IMG_6122%202.JPG/CKCDhAEgASACIAMgBCAFIAYgBygCKAc/nt59841gty931yp/AAD-J-e1Gvxj1ILM35Gg5uzqa/IMG_6122%202.JPG",
          }
        }
      ],
    };
  },

  componentDidMount() {
    DropboxClient.init({
      appId: 'YOURAPPSECRETHERE',
      onFiles: this.handleFiles
    });
  },

  componentWillUnmount() {
    DropboxClient.remove();
  },

  render () {
    var filesElements = this.state.files.map((file)=><DropboxFile file={file} key={file.link} />);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePress} style={styles.button}>
          <Text style={styles.buttonText}>
            Add file from Dropbox
          </Text>
        </TouchableOpacity>

        <View style={styles.fileContainer}>
          {filesElements}
        </View>

      </View>
    );
  },

  handlePress(){
    DropboxClient.openChooser();
  },

  handleFiles(files){
    var newFiles = [].concat(this.state.files, files);
    this.setState({ files: newFiles });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  fileContainer: {
    justifyContent: 'flex-start',
  },

  button: {
    backgroundColor: '#007ee6',
    borderRadius: 4,
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('DropboxChooser', () => DropboxExample);
