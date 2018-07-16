/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-17 10:39:18 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-10 21:14:06
 */
import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage, Modal } from 'react-native';
import Button from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../components/Text';
import Loading from '../../components/Loading';
import { backgroundSecondContent, backgroundContent, colorPrimaryDark, shimmerPlaceholder } from '../../res/color';
import { getMulti } from '../../services/tokenService';
const version = require('../../../version.json').version;

type Props = {};
type State = {};

export default class AkunSaya extends Component<Props, State> {

    state = {
        loading: false,
        user: {},
        token: {}
    }

    componentDidMount() {
        this.handleGetUser();
    }
    

    async logout() {
        this.setState({ loading: true });
        try {
            let logout = await AsyncStorage.multiRemove(['@global:user', '@global:token']);   
            setTimeout(() => {
                this.setState({ loading: false })
                Actions.reset('Login');
            }, 3000);
        } catch (error) {
            console.log('error ==>', error);
        }
    }

    handleGetUser() {
        getMulti().then(result => {
            this.setState({
                user: JSON.parse(result[0][1]),
                token: JSON.parse(result[1][1])
            })
        }).catch(err => {
            console.log('err ==>', err);
        })
    }

    render() {
        const { user } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView >
                    <View style={{ padding: 16, backgroundColor: backgroundContent, minHeight: 50, marginBottom: 20 }}>
                        <Text bold>{user.nama}</Text>
                        <Text style={{ marginBottom: 16 }}>{user.email}</Text>
                        <Text>{user.noHandphone}</Text>

                        <Button style={{ position: 'absolute', right: 16, top: 16 }}>
                            <Text style={{ color: colorPrimaryDark }}>Ubah</Text>
                        </Button>
                    </View>

                    <View style={{ paddingLeft: 16, paddingRight: 16, backgroundColor: backgroundContent, marginBottom: 20 }}>
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

                    <Button onPress={() => this.logout() } style={{ width: '100%', height: 55, justifyContent: 'center', alignItems: 'center', borderWidth: .5, borderColor: shimmerPlaceholder, backgroundColor: backgroundContent }}>
                        <Text style={{ color: colorPrimaryDark }}>Keluar</Text>
                    </Button>
                </ScrollView>
                
                <Loading visible={this.state.loading} />
            </View>
        )
    }

}