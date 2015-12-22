'use strict';

let qs = require('qs');
let React = require('react-native');
let {
  NativeModules,
  LinkingIOS,
} = React;


let DropboxManager = NativeModules.DropboxChooser;

class DropboxClient {
  constructor () {
    this.appId = null;

    this.processURL = this.processURL.bind(this);
  }

  init (opts) {
  	let options = opts || {};

    this.appId = options.appId || '';
    this.onFiles = options.onFiles;

    let url = LinkingIOS.popInitialURL();
    if (url) {
     this.processURL({ url });
    }

    LinkingIOS.addEventListener('url', this.processURL);
  }

  remove () {
    LinkingIOS.removeEventListener('url', this.processURL);
  }

  openChooser(type) {
    let DBChooserLinkType = 'DBChooserLinkTypePreview';
    if (type === 'direct') DBChooserLinkType = 'DBChooserLinkTypeDirect';

    if (!this.appId) {
    	return new Promise((resolve, reject) => {
        reject('no-appId');
      });
    }

    return new Promise((resolve, reject) => {
      DropboxManager.openChooser(DBChooserLinkType, (err, res)=>{
        if (err) {
          reject(err);
        } else {
          resolve(res)
        }
      });
    });
  }

  processURL(e) {
    let url = e.url.replace(`db-${this.appId}://`, '').split('?');
    let path = url[0];
    let params = url[1] ? qs.parse(url[1]) : null;
    let files = null;

    if (params) {
      try {
        files = JSON.parse(params.files);
      }
      catch (e){}
    };
    
    if (files && this.onFiles) {
    	this.onFiles(files);
    };
  }
}

module.exports = new DropboxClient();
