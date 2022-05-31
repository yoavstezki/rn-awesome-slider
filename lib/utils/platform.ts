import { I18nManager, Platform } from 'react-native';

export const isAndroid = () => Platform.OS === 'android';
export const isRTL = () => I18nManager.isRTL;

export const isAndroidAndRTL = () => isAndroid() && isRTL();
