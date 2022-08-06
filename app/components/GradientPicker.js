import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import TouchableScale from './common/TouchableScale';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, GlobalStyle, Gradients} from '../styles/Global';
import {screenWidth} from '../utils/Measurements';

export default function GradientPicker({active, setActive}) {
  let gradientRows = getGradientRows();

  return (
    <View style={styles.wrapper}>
      {gradientRows.map(row => {
        return row;
      })}
    </View>
  );

  function getGradientRows() {
    let rows = [];
    let gradient = 0;

    try {
      active = parseInt(active);
    } catch (error) {
      console.log(error);
    }

    for (let i = 0; i < 5; i++) {
      let items = [];
      for (let j = 0; j < 3; j++) {
        let current = gradient;
        items.push(
          <View
            style={styles.gradientWrapper}
            key={`gradientWrapper${gradient}`}>
            <TouchableScale
              style={[
                styles.gradientButton,
                active === gradient ? styles.gradientButtonActive : null,
              ]}
              onPress={() => setActive(current)}>
              <LinearGradient
                style={styles.gradient}
                colors={Gradients[gradient]}
                angle={45}
                useAngle
              />
            </TouchableScale>
          </View>,
        );
        gradient++;
      }
      rows.push(
        <View key={`gradientRow${i}`} style={styles.gradientRow}>
          {items}
        </View>,
      );
    }
    return rows;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.mainSecond,
    paddingBottom: 20,
    width: screenWidth - 40,
    margin: 20,
    borderRadius: GlobalStyle.borderRadius,
  },
  gradientRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  gradientWrapper: {
    marginRight: 10,
    marginLeft: 10,
  },
  gradientButton: {
    width: 100,
    height: 100,
    borderRadius: GlobalStyle.borderRadius,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'transparent',
  },
  gradientButtonActive: {
    borderColor: Colors.mainContrast,
  },
  gradient: {
    height: 100,
    width: 100,
  },
});
