/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-17 10:39:18 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 11:25:25
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Button from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../components/Text';
import { backgroundSecondContent, backgroundContent, colorPrimaryDark, shimmerPlaceholder } from '../../res/color';
const version = require('../../../version.json').version;

type Props = {};
type State = {};

export default class AkunSaya extends Component<Props, State> {

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 16, backgroundColor: backgroundContent, minHeight: 50, elevation: 2, marginBottom: 20 }}>
                    <Text bold>Irhamdani Rasyied</Text>
                    <Text style={{ marginBottom: 16 }}>irhamdani@email.com</Text>
                    <Text>08123456789</Text>

                    <Button style={{ position: 'absolute', right: 16, top: 16 }}>
                        <Text style={{ color: colorPrimaryDark }}>Ubah</Text>
                    </Button>
                </View>

                <View style={{ paddingLeft: 16, paddingRight: 16, backgroundColor: backgroundContent, elevation: 2, marginBottom: 20 }}>
                    <Button>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '20%', justifyContent: 'center', height:50 }}>
                                <Icon name="perm-device-information" size={18} />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', height:50, borderBottomWidth: .5, borderBottomColor: shimmerPlaceholder }}>
                                <Text>Tentang Aplikasi</Text>
                            </View>
                        </View>
                    </Button>
                    <Button>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '20%', justifyContent: 'center', height:50 }}>
                                <Icon name="star" size={18} />
                            </View>
                            <View style={{ width: '70%', justifyContent: 'center', height:50, borderBottomWidth: .5, borderBottomColor: shimmerPlaceholder }}>
                                <Text>Beri kami nilai</Text>
                            </View>
                            <View style={{ width: '10%', justifyContent: 'center', height:50, borderBottomWidth: .5, borderBottomColor: shimmerPlaceholder }}>
                                <Text small>v{version}</Text>
                            </View>
                        </View>
                    </Button>
                </View>

                <Button style={{ width: '100%', height: 55, justifyContent: 'center', alignItems: 'center', borderWidth: .5, borderColor: shimmerPlaceholder, backgroundColor: backgroundContent }}>
                    <Text style={{ color: colorPrimaryDark }}>Keluar</Text>
                </Button>
            </ScrollView>
        )
    }

}