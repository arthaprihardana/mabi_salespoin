/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-17 13:49:29 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-16 08:56:26
 */
import React, { Component } from 'react';
import { View, ScrollView, Picker, Alert } from 'react-native';
import Text from '../../components/Text';
import Button from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { backgroundContent, colorPrimaryDark, shimmerPlaceholder } from '../../res/color';
require('moment/locale/id');
import Radio from '../../components/Radio';
import Loading from '../../components/Loading';
import {postTransaksi} from '../../services/transaksiService';
import {getKategoriBarang} from '../../services/kategoribarangservice';

type Props = {};
type State = {
    kategoriBarang: any
};

export default class PosisiBarang extends Component<Props, State> {

    state = {
        arrKategoriBarang: [],
        lokasi: this.props.lokasi._id,
        kategoriBarang: "",
        statusTransaksi: "simpan barang",
        loading: false
    }

    componentDidMount() {
        this.handleGetKategoriBarang();
    }

    handlePostTransaksi() {
        this.setState({ loading: true });
        postTransaksi({
            kategoriBarang: this.state.kategoriBarang,
            lokasi: this.state.lokasi,
            statusTransaksi: this.state.statusTransaksi
        }).then(response => {
            console.log('response ==>', response);
            this.setState({ loading: false });
            if(response.status) {
                Alert.alert(
                    'Info',
                    'Transaksi penyimpanan telah ditambahkan',
                    [
                        {text: 'OK', onPress: () => Actions.reset('Main')},
                    ],
                    { cancelable: false }
                )
            } else {
                let msg = response.errMessage.split(':');
                Alert.alert(
                    'Info',
                    `${msg[msg.length-1]}`,
                    [
                        {text: 'OK', onPress: () => {}},
                    ],
                    { cancelable: false }
                )
            }
        }).catch(err => {
            this.setState({ loading: false });
            console.log('error ==>', error);
        });
    }

    handleGetKategoriBarang() {
        getKategoriBarang().then(response => {
            console.log('kategori barang ==>', response);
            if(response.status) {
                this.setState({
                    arrKategoriBarang: response.data,
                    kategoriBarang: response.data[0]._id
                })
            } else {
                alert('Gagal mendapatkan kategori barang')
            }
        }).catch(err => {
            console.log('err ==>', err);
        })
    }

    render() {
        return(
            <ScrollView style={{ flex: 1 }}>
                <View style={{ minHeight: 80, padding: 16, backgroundColor: backgroundContent, elevation: 2, marginBottom: 16 }}>
                    <Text h5 bold style={{ marginBottom: 16 }}>Lokasi penyimpanan barang</Text>

                    <Text bold>{this.props.lokasi.namaLokasi}</Text>
                    <Text>{this.props.lokasi.alamat}</Text>
                </View>

                <View style={{ minHeight: 50, padding: 16, backgroundColor: backgroundContent, elevation: 2, marginBottom: 16 }}>
                    <Text bold>Tanggal Hari Ini</Text>
                    <Text>{moment().format('LLL')}</Text>
                </View>
                
                <View style={{ minHeight: 80, padding: 16, backgroundColor: backgroundContent, elevation: 2 }}>
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ marginBottom: 8 }}>Kategori Barang</Text>
                        <Picker
                            mode={"dropdown"}
                            selectedValue={this.state.kategoriBarang}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => this.setState({kategoriBarang: itemValue})}>
                            {this.state.arrKategoriBarang.map((val, key) => (
                                <Picker.Item key={key} label={val.kategori} value={val._id} />
                            ))}
                            {/* <Picker.Item label="Kotak Amal" value="java" />
                            <Picker.Item label="Aksesoris Handphone" value="js" /> */}
                        </Picker>
                    </View>

                    <View>
                        <Text style={{ marginBottom: 8 }}>Status</Text>
                        <Radio 
                            values={[{key: 1, value: "simpan barang"}, {key: 2, value: "simpan barang"}]}
                            callbackFromParent={ data => {
                                console.log('data ==>', data)
                                {/* this.setState({
                                    statusTransaksi: data.value
                                }) */}
                            }} 
                        />
                    </View>
                </View>

                <View style={{ height: 80, padding: 16 }}>
                    <Button 
                        onPress={() => this.handlePostTransaksi()} 
                        style={{ backgroundColor: colorPrimaryDark, height: 52, justifyContent: 'center', alignItems: 'center', borderRadius: 0 }}>	
						<Text style={{ color: '#fff'}}>Update Penyimpanan Barang</Text>
					</Button>
                </View>

                <Loading visible={this.state.loading} />
            </ScrollView>
        )
    }

}