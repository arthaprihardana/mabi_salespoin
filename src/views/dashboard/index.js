/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 14:43:37 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 14:24:15
 */
import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-material-ripple';
import moment from 'moment';
require('moment/locale/id');
import Text from '../../components/Text';
import {GreetingTime} from '../../components/GreetingTime';
import {shimmerPlaceholder, colorPrimary, colorPrimaryDark, textColorButton, textColor, colorPrimaryLight, backgroundContent} from '../../res/color';

type Props = {};
type State = {};

export default class Dashboard extends Component<Props, State> {

    render() {
        return(
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: backgroundContent, elevation: 2, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                        <View style={{ width: 55 }}>
                            <Image source={require("../../res/image/user-default.jpeg")} resizeMode={"cover"} borderRadius={15} style={{ width: 30, height: 30}} />
                        </View>
                        <View>
                            <Text>{ GreetingTime(moment()) }, User</Text>
                        </View>
                    </View>

                    <View style={{ paddingBottom: 16 }}>
                        <View style={{ flexDirection: 'row', paddingLeft: 16, paddingRight: 16 }}>
                            <Text h6>Jumlah Lokasi Anda </Text>
                            <Text h6 bold>20</Text>
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
                            <View style={{ backgroundColor: backgroundContent, justifyContent: 'center', alignItems: 'center', height: 80, width: 80, borderRadius: 10, borderWidth: 1.5, borderColor: shimmerPlaceholder }}>
                                <Icon name="add-circle" size={52} color={colorPrimary} />
                            </View>
                            <Text>Tambah Lokasi</Text>
                        </Button>

                        <Button onPress={() => Actions.jump("MainLokasi") } style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: backgroundContent, justifyContent: 'center', alignItems: 'center', height: 80, width: 80, borderRadius: 10, borderWidth: 1.5, borderColor: shimmerPlaceholder }}>
                                <Icon name="library-books" size={52} color={colorPrimary} />
                            </View>
                            <Text>Daftar Lokasi</Text>
                        </Button>

                        <Button onPress={() => Actions.jump("MainLokasi") } style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: backgroundContent, justifyContent: 'center', alignItems: 'center', height: 80, width: 80, borderRadius: 10, borderWidth: 1.5, borderColor: shimmerPlaceholder }}>
                                <Icon name="transfer-within-a-station" size={52} color={colorPrimary} />
                            </View>
                            <Text>Simpan Barang</Text>
                        </Button>
                    </View>

                    <View style={{ flexDirection: 'column', paddingLeft: 16, paddingRight: 16, marginTop: 26, backgroundColor: backgroundContent }}>
                        <Text h6 bold style={{ marginBottom: 16, marginTop: 16 }}>Mau menyimpan barang kemana hari ini ?</Text>

                        <Button onPress={() => Actions.jump("PosisiBarang", {})} style={{ backgroundColor: backgroundContent, borderWidth: 1, borderColor: shimmerPlaceholder, padding: 8, marginBottom: 10 }}>
                            <Text bold>Alfamart Berkah</Text>
                            <Text>Lorem ipsum dolor sit amet</Text>
                        </Button>

                        <Button onPress={() => Actions.jump("PosisiBarang", {})} style={{ backgroundColor: backgroundContent, borderWidth: 1, borderColor: shimmerPlaceholder, padding: 8, marginBottom: 10 }}>
                            <Text bold>Alfamart Berkah</Text>
                            <Text>Lorem ipsum dolor sit amet</Text>
                        </Button>

                        <Button onPress={() => Actions.jump("PosisiBarang", {})} style={{ backgroundColor: backgroundContent, borderWidth: 1, borderColor: shimmerPlaceholder, padding: 8, marginBottom: 10 }}>
                            <Text bold>Alfamart Berkah</Text>
                            <Text>Lorem ipsum dolor sit amet</Text>
                        </Button>

                        <Button onPress={() => Actions.jump("MainLokasi", { refresh: true })} style={{ padding: 8, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text bold style={{ color: colorPrimaryDark }}>Selengkapnya >></Text>
                        </Button>
                    </View>

                </View>
            </ScrollView>
        )
    }

}