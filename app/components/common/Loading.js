import React from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';
import LottieView from 'lottie-react-native';
import {screenHeight, screenWidth} from '../../utils/Measurements';
import {Colors, GlobalStyle} from '../../styles/Global';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function Loading({loading, text}) {
  const opacity = useSharedValue(0.25);

  opacity.value = withRepeat(
    withTiming(1, {duration: 1500, easing: Easing.ease}),
    -1,
    true,
  );

  const animatedStyle = useAnimatedStyle(() => ({opacity: opacity.value}), []);

  return (
    <Modal statusBarTranslucent={true} visible={loading}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.animationWrapper}>
            <LottieView
              style={styles.animation}
              source={require('../../assets/animations/loading.json')}
              autoPlay
              loop
            />
          </View>
          <View style={styles.textWrapper}>
            <Animated.View style={animatedStyle}>
              <Text style={styles.text}>{text || 'Loading...'}</Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.mainFirst,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    marginBottom: 60,
  },
  animationWrapper: {
    width: screenWidth - 100,
    height: 400,
  },
  textWrapper: {
    position: 'absolute',
    paddingTop: 330,
  },
  text: {
    fontWeight: 'bold',
    fontSize: GlobalStyle.fontLarge,
    color: Colors.mainContrast,
  },
});
