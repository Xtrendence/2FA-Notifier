import {Dimensions, StatusBar} from 'react-native';

// The width and height of the device's screen.
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

// The width and height of the app's visible window.
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// The height of Android's bottom navigation bar.
const barDifference = screenHeight - windowHeight + 10;

// The height of the OS' status bar.
const statusBarHeight = StatusBar.currentHeight || 32;

// The height of Android's bottom navigation bar after adjusting for unusually big ones.
const actionBarHeight = barDifference > 60 ? 60 : barDifference;

// The height of the app's navigation bar.
const barHeight = 62;

const wrapperHeight =
  screenHeight - statusBarHeight - barHeight - actionBarHeight - 40;

export {
  screenWidth,
  screenHeight,
  windowWidth,
  windowHeight,
  statusBarHeight,
  actionBarHeight,
  barHeight,
  wrapperHeight,
};
