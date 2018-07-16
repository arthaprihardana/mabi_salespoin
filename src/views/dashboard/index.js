/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 14:43:37 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-11 22:59:42
 */
import React, { Component } from 'react';
import { View, ScrollView, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-material-ripple';
import Placeholder from 'rn-placeholder';
import moment from 'moment';
require('moment/locale/id');
import Text from '../../components/Text';
import {GreetingTime} from '../../components/GreetingTime';
import {shimmerPlaceholder, colorPrimary, colorPrimaryDark, textColorButton, textColor, colorPrimaryLight, backgroundContent} from '../../res/color';
import { getUser , getMulti} from '../../services/tokenService';
import {getLokasiByAgen} from '../../services/lokasiService';

type Props = {};
type State = {};

export default class Dashboard extends Component<Props, State> {

    state = {
        isReady: false,
        user: {},
        token: null,
        totalLokasi: 0,
        arrLokasi: []
    }

    componentDidMount() {
        this.handleGetUser();
        this.handleGetLokasyByAgen();
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

    handleGetLokasyByAgen() {
        getLokasiByAgen(5).then(result => {
            this.setState({
                totalLokasi: result.options.total,
                arrLokasi: result.data,
                isReady: true
            });
        })
    }

    render() {
        const { user, totalLokasi, arrLokasi } = this.state;
        return(
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: backgroundContent, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                        <View style={{ width: 55 }}>
                            <Image source={require("../../res/image/user-default.jpeg")} resizeMode={"cover"} borderRadius={15} style={{ width: 30, height: 30}} />
                        </View>
                        <View>
                            <Text>{ GreetingTime(moment()) }, {user.nama}</Text>
                        </View>
                    </View>

                    <View style={{ paddingBottom: 16 }}>
                        <View style={{ flexDirection: 'row', paddingLeft: 16, paddingRight: 16 }}>
                            <Text h6>Jumlah Lokasi Anda </Text>
                            <Text h6 bold>{totalLokasi}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 16, paddingRight: 16 }}>
                            <Text h6>Tgl Terakhir Penyimpanan Barang </Text>
                            <Text h6 bold>1 Maret 2018</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 4, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', elevation: 3, marginTop: 0, paddingLeft: 16, paddingRight: 16 }}>
                        <Button onPress={() => Actions.jump("TambahLokasi") } style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: backgroundContent, justifyContent: 'center', alignItems: 'center', height: 80, width: 80, borderRadius: 5, borderWidth: 1.5, borderColor: shimmerPlaceholder }}>
                                <Icon name="add-circle" size={52} color={colorPrimary} />
                            </View>
                            <Text>Tambah Lokasi</Text>
                        </Button>

                        <Button onPress={() => Actions.jump("MainLokasi") } style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: backgroundContent, justifyContent: 'center', alignItems: 'center', height: 80, width: 80, borderRadius: 5, borderWidth: 1.5, borderColor: shimmerPlaceholder }}>
                                <Icon name="library-books" size={52} color={colorPrimary} />
                            </View>
                            <Text>Daftar Lokasi</Text>
                        </Button>

                        <Button onPress={() => Actions.jump("MainLokasi") } style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: backgroundContent, justifyContent: 'center', alignItems: 'center', height: 80, width: 80, borderRadius: 5, borderWidth: 1.5, borderColor: shimmerPlaceholder }}>
                                <Icon name="transfer-within-a-station" size={52} color={colorPrimary} />
                            </View>
                            <Text>Simpan Barang</Text>
                        </Button>
                    </View>

                    <View style={{ flexDirection: 'column', paddingLeft: 16, paddingRight: 16, marginTop: 26, backgroundColor: backgroundContent }}>
                        <Text h6 bold style={{ marginBottom: 16, marginTop: 16 }}>Mau menyimpan barang kemana hari ini ?</Text>

                        <Placeholder.Paragraph
                            size={60}
                            textSize={12}
                            animate="fade"
                            lineNumber={3}
                            lineSpacing={5}
                            lastLineWidth="30%"
                            onReady={this.state.isReady}
                            />
                        {arrLokasi.map((val, key) => (
                            <Button key={key} onPress={() => {}} style={{ backgroundColor: backgroundContent, borderWidth: 1, borderColor: shimmerPlaceholder, padding: 8, marginBottom: 10 }}>
                                <Text bold>{val.namaLokasi}</Text>
                                <Text>{val.alamat}</Text>
                            </Button>
                        ))}

                        <Button onPress={() => Actions.jump("MainLokasi", { refresh: true })} style={{ padding: 8, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text bold style={{ color: colorPrimaryDark }}>Selengkapnya >></Text>
                        </Button>
                    </View>

                </View>
            </ScrollView>
        )
    }

}