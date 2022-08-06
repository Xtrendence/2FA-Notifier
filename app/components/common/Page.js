import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {screenWidth, statusBarHeight} from '../../utils/Measurements';
import LinearGradient from 'react-native-linear-gradient';
import {empty} from '../../utils/Utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors, GlobalStyle, Gradients} from '../../styles/Global';
import TouchableScale from './TouchableScale';

export default function Page(props) {
  let gradient = !empty(props?.gradient) ? props.gradient : 0;
  let angle = !empty(props?.angle) ? props.angle : 45;
  let noBack = !empty(props?.noBack) ? props?.noBack : false;
  let noIcon = !empty(props?.noIcon) ? props?.noIcon : false;
  let icon = !empty(props?.icon) ? props?.icon : 'cog';
  let onPressBack = !empty(props?.onPressBack) ? props?.onPressBack : () => {};
  let onPressIcon = !empty(props?.onPressIcon) ? props?.onPressIcon : () => {};

  return (
    <View style={styles.page}>
      {!empty(props?.title) && (
        <View style={styles.top}>
          <View style={styles.left}>
            {!noBack && (
              <TouchableScale style={styles.back} onPress={onPressBack}>
                <Icon
                  name="chevron-left"
                  size={32}
                  color={Colors.mainContrast}
                />
              </TouchableScale>
            )}
            <LinearGradient
              style={styles.titleCard}
              colors={Gradients[gradient]}
              angle={angle}
              useAngle={true}>
              <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
                {props.title}
              </Text>
            </LinearGradient>
          </View>
          {!noIcon && (
            <View style={styles.right}>
              <TouchableScale style={styles.settings} onPress={onPressIcon}>
                <Icon name={icon} size={32} color={Colors.mainContrast} />
              </TouchableScale>
            </View>
          )}
        </View>
      )}
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    paddingTop: statusBarHeight + 20,
  },
  top: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: Colors.mainThird,
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    flexGrow: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  titleCard: {
    height: 50,
    paddingLeft: 30,
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    borderRadius: GlobalStyle.borderRadius,
    shadowColor: GlobalStyle.shadowColor,
    shadowOffset: GlobalStyle.shadowOffset,
    shadowOpacity: GlobalStyle.shadowOpacity,
    shadowRadius: GlobalStyle.shadowRadius,
    elevation: GlobalStyle.shadowElevation,
  },
  title: {
    color: Colors.accentContrast,
    fontSize: GlobalStyle.fontLarge,
    fontWeight: 'bold',
    maxWidth: screenWidth - 200,
  },
  back: {
    justifyContent: 'center',
    height: 50,
    paddingRight: 20,
  },
  settings: {
    justifyContent: 'center',
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
