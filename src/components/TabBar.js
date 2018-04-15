/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 13:42:14 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-15 19:04:29
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    BackHandler,
    Platform,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-material-ripple';
import { Actions, Tabs } from 'react-native-router-flux';
import Text from './Text';
import { backgroundContent, colorPrimary, colorPrimaryDark , textColor, shimmerPlaceholder} from '../res/color';

type Props = {
    selectedIndex: number
};
type State = {
    login: object
}

export default class TabBar extends Component<Props, State> {
    
    render() {
        const { selectedIndex } = this.props;
        return (
            <View style={{ marginBottom: -1, marginTop: 0, borderTopWidth: .5, borderTopColor: shimmerPlaceholder}}>
                <View style={[styles.tabs]}>
                    <Button 
                        onPress={() => Actions.tab_beranda() } 
                        style={styles.tab}
                        >
                        <Icon
                            name={ "dashboard" }
                            size={ 24 }
                            color={ selectedIndex == 0 ? colorPrimaryDark : textColor }
                        />
                        <Text style={{ color: selectedIndex == 0 ? colorPrimaryDark : textColor , fontSize: 10 }}>Beranda</Text>
                    </Button>

                    <Button 
                        onPress={() => Actions.tab_notifikasi() } 
                        style={styles.tab}
                        >
                        <Icon
                            name={ "notifications" }
                            size={24}
                            color={ selectedIndex == 1 ? colorPrimaryDark : textColor}
                        />
                        <Text style={{ color: selectedIndex == 1 ? colorPrimaryDark : textColor, fontSize: 10 }}>Notifikasi</Text>
                    </Button>

                    <Button 
                        onPress={() => Actions.tab_akun() } 
                        style={styles.tab}
                        >
                        <Icon
                            name={ "account-circle"}
                            size={24}
                            color={ selectedIndex == 2 ? colorPrimaryDark : textColor }
                        />
                        <Text style={{ color: selectedIndex == 2 ? colorPrimaryDark : textColor, fontSize: 10 }}>Akun Saya</Text>
                    </Button>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabs: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        backgroundColor: backgroundContent
    },
});