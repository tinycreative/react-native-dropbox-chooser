# react-native-dropbox-chooser

# What is this?

For more details check out [https://www.dropbox.com/developers/chooser#ios](https://www.dropbox.com/developers/chooser#ios) for an explanation.

## Setup
This will use LinkingIOS so we'll need to add this code to your `AppDelegate.m`

```
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}
```
Explanation can be found here [https://facebook.github.io/react-native/docs/linkingios.html#content](https://facebook.github.io/react-native/docs/linkingios.html#content).


Per the chooser we'll need to add this to the `Info.plist`

```
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>dbapi-1</string>
  <string>dbapi-3</string>
</array>
```

We'll need to add header search paths for the LinkingIOS, add the string `$(SRCROOT)/../node_modules/react-native/React`
