/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 10:03:43 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-15 10:04:48
 */
import { Platform } from 'react-native';

export const FontFamily = Platform.OS === 'ios' ? { fontFamily: 'RobotoCondensed-Regular' } : { fontFamily: "RobotoCondensed-Regular" };
export const FontFamilyBold = Platform.OS === 'ios' ? { fontFamily: 'RobotoCondensed-Bold' } : { fontFamily: "RobotoCondensed-Bold" };
export const FontFamilyLight = Platform.OS === 'ios' ? { fontFamily: 'RobotoCondensed-Light' } : { fontFamily: "RobotoCondensed-Light" };