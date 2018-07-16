/**
 * @author: Artha Prihardana 
 * @Date: 2018-07-10 20:43:44 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-11 22:05:59
 */
import { AsyncStorage } from "react-native";

export const getUser = async () => {
    try {
        const value = await AsyncStorage.getItem('@global:user');
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error ==>', error);
    }
}

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@global:token');
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error ==>', error);
    }
}

export const getMulti = async () => {
    try {
        const value = await AsyncStorage.multiGet(['@global:user', '@global:token']);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (error) {
        
    }
}