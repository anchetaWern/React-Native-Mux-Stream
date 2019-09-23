# React-Native-Mux-Stream

A live video streaming app created with React Native and Mux.

### Prerequisites

- React Native development environment
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)
- [Mux Account](https://mux.com/)
- [Channels app instance](https://pusher.com/channels)
- [ngrok account](https://ngrok.com/)

## Getting Started

1.  Clone the repo:

```
git clone https://github.com/anchetaWern/React-Native-Mux-Stream.git
cd RNStream
```

2.  Install the app dependencies:

```
yarn
```

3.  Eject the project (re-creates the `ios` and `android` folders):

```
react-native eject
```

4.  Link the packages:

```
react-native link @react-native-community/async-storage
react-native link @react-native-community/netinfo
react-native link react-native-config
react-native link react-native-gesture-handler
react-native link react-native-nodemediaclient
react-native link react-native-permissions
react-native link react-native-video
```

5.  Put additional config on `android/app/build.gradle` file:

```
apply plugin: "com.android.application"
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle" // add this
```

And `android/build.gradle` file:

```
allprojects {
  repositories {
    mavenLocal()
    google()
    jcenter()
    maven {
      url "$rootDir/../node_modules/react-native/android"
    }

    // add this:
    maven {
      url 'https://jitpack.io'
    }
  }
}
```

6.  Add permissions to `android/app/src/main/AndroidManifest.xml` file:

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.rnstreamer">

  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>

  <!-- add the following -->
  <uses-feature android:name="android.hardware.camera"/>
  <uses-feature android:name="android.hardware.camera.autofocus"/>

  <uses-permission android:name="android.permission.CAMERA"/>
  <uses-permission android:name="android.permission.RECORD_AUDIO"/>
  <!-- end -->

  <application>
    ...
  </application>
</manifest>
```

7.  Update the `.env` file with your Mux and Channels app credentials, and the `server/.env` file with your Channels app credentials.

8.  Set up the server:

```
cd server
yarn
```

9.  Run the server:

```
yarn start
```

10. Run ngrok:

```
./ngrok http 5000
```

11. Update the `src/screens/Index.js` file with your ngrok HTTPS URL.

12. Run the app:

```
react-native run-android
react-native run-ios
```

## Built With

- [React Native](http://facebook.github.io/react-native/)
- [Mux](https://mux.com/)
- [Channels](https://pusher.com/channels)
