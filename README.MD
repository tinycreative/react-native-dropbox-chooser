# react-native-dropbox-chooser

## What is this?

For more details check out [https://www.dropbox.com/developers/chooser#ios](https://www.dropbox.com/developers/chooser#ios) for an explanation.

## Only Works On Device

This will only work on Device. This will open up a window prompting you to install the Dropbox app on the Simulator.

## Install

`npm install react-native-dropbox-chooser --save`

## Sign up 

You'll need to sign up and get an app key from Dropbox.

First go here [https://www.dropbox.com/developers/apps/create](https://www.dropbox.com/developers/apps/create).

* Select "Dropbox API"
* Select what you need access to
* Name your app
* Agree to TOS
* Submit

You'll see a section where it says "App key" and a series of numbers/letters. We'll need this in a second.


## Setup

First off add it to your project. How to link native modules can be found here. [http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content). 

This will use LinkingIOS so we'll need to add this code to your `AppDelegate.m`

At the top of the file you will need to add `#import "RCTLinkingManager.h"`

Should look like 

```
#import "AppDelegate.h"

#import "RCTRootView.h"
#import "RCTLinkingManager.h"
```

Then before the `@end` you need to add this code.

```
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}
```
Explanation can be found here [https://facebook.github.io/react-native/docs/linkingios.html#content](https://facebook.github.io/react-native/docs/linkingios.html#content).

This will now start complaining that `RCTLinkingManager` doesn't exist.

We'll need to add header search paths for the Libraries.
Go to `Build Settings`, find `Header Search Paths`, and add `$(SRCROOT)/../node_modules/react-native/Libraries`. Set it to `recursive`.

Because we are using the chooser we'll need to add the below configuration to the `Info.plist`
What this will allow us to do is throw over the the Dropbox app and have it send us the links back.

```
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>dbapi-1</string>
  <string>dbapi-3</string>
</array>
```

Now go to the `Info` tab.

At the bottom it will have a section called `URL Types`.
Open it and press the `+`.

Add `db-APPKEYHERE` into the `URL Schemes` input box.

## How to use

Require the module.

```
var DropboxClient = require('react-native-dropbox-chooser');
```

```
  componentDidMount() {
    DropboxClient.init({
      appId: 'YOURAPPIDHERE',
      onFiles: this.handleFiles //Callback that receives file(s) when they are selected
    });
  },

  componentWillUnmount() {
    DropboxClient.remove(); //Don't forge to remove it
  },
 ```

## Done

We should be good to go!