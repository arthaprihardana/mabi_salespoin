/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-17 13:49:29 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 14:13:36
 */
import React, { Component } from 'react';
import { View, ScrollView, Picker } from 'react-native';
import Text from '../../components/Text';
import Button from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { backgroundContent, colorPrimaryDark, shimmerPlaceholder } from '../../res/color';
require('moment/locale/id');

type Props = {};
type State = {
    kategoriBarang: any
};

export default class PosisiBarang extends Component<Props, State> {

    state = {
        kategoriBarang: ""
    }

    render() {
        return(
            <ScrollView style={{ flex: 1 }}>
                <View style={{ minHeight: 80, padding: 16, backgroundColor: backgroundContent, elevation: 2, marginBottom: 16 }}>
                    <Text h5 bold style={{ marginBottom: 16 }}>Lokasi penyimpanan barang</Text>

                    <Text bold>Alfamart Berkah</Text>
                    <Text>Jln Raya Tanjung Duren 31</Text>
                </View>

                <View style={{ minHeight: 50, padding: 16, backgroundColor: backgroundContent, elevation: 2, marginBottom: 16 }}>
                    <Text bold>Tanggal Hari Ini</Text>
                    <Text>{moment().format('LLL')}</Text>
                </View>
                
                <View style={{ minHeight: 80, padding: 16, backgroundColor: backgroundContent, elevation: 2 }}>
                    <Text style={{ marginBottom: 8 }}>Kategori Barang</Text>
                    <Picker
                        mode={"dropdown"}
                        selectedValue={this.state.kategoriBarang}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) => this.setState({kategoriBarang: itemValue})}>
                        <Picker.Item label="Kotak Amal" value="java" />
                        <Picker.Item label="Aksesoris Handphone" value="js" />
                    </Picker>
                </View>

                <View style={{ height: 80, padding: 16 }}>
                    <Button 
                        onPress={() => {}} 
                        style={{ backgroundColor: colorPrimaryDark, height: 52, justifyContent: 'center', alignItems: 'center', borderRadius: 0 }}>	
						<Text style={{ color: '#fff'}}>Update Penyimpanan Barang</Text>
					</Button>
                </View>

            </ScrollView>
        )
    }

}