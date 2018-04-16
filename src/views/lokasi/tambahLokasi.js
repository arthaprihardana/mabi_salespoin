/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-16 10:34:36 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-16 18:40:00
 */
import React, { Component } from 'react';
import { View, ScrollView, Keyboard, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-material-ripple';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { colorPrimaryDark, shimmerPlaceholder, colorPrimaryLight, textColorButton, textColor } from '../../res/color';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';

let addressFilter = (addr, frmt) => {
    for(let i in addr) {
        var filter = addr[i].types.filter(function(txt) {
            return txt === frmt
        })
        if(filter.length > 0) {
            return addr[i].long_name;
        }
    }
}

type Props = {
    address: object
};
type State = {
    namaLokasi: string,
    alamat: string,
    kodepos: string,
    pinalamat: object
};

export default class TambahLokasi extends Component<Props, State> {

    state = {
        namaLokasi: "",
        alamat: "",
        kodepos: "",
        pinalamat: {}
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps ==>', nextProps);
        this.setState({
            pinalamat: nextProps.address != undefined && Object.keys(nextProps.address).length > 0 ? {
                "id": nextProps.address.id,
                "name": nextProps.address.name,
                "premise": addressFilter(nextProps.address.address_components, "premise"),
                "route": addressFilter(nextProps.address.address_components, "route"),
                "location": nextProps.address.geometry.location,
                "administrative_area_level_1": addressFilter(nextProps.address.address_components, "administrative_area_level_1"),
                "administrative_area_level_2": addressFilter(nextProps.address.address_components, "administrative_area_level_2"),
                "administrative_area_level_3": addressFilter(nextProps.address.address_components, "administrative_area_level_3"),
                "administrative_area_level_4": addressFilter(nextProps.address.address_components, "administrative_area_level_4"),
                "street_number": addressFilter(nextProps.address.address_components, "street_number"),
                "country": addressFilter(nextProps.address.address_components, "country"),
                "postal_code": addressFilter(nextProps.address.address_components, "postal_code"),
                "formatted_address": nextProps.address.formatted_address,
                "countryCode":"ID",
                "locale":"en_US",
            } : {}
        })
    }

    render() {
        return(
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 80, padding: 16 }}>
                    <TextInput 
                        ref={ ref => this.namalokasi = ref }
                        onSubmitEditing={()=> {}}
                        type="text"
                        keyboardType='default'
                        returnKeyType='next'
                        onChangeText={(text) => this.setState({ namaLokasi: text })}
                        value={this.state.namaLokasi}
                        label={'Nama Lokasi'} />
                </View>

                <View style={{ height: 80, padding: 16 }}>
                    <TextInput 
                        ref={ ref => this.alamat = ref }
                        onSubmitEditing={()=> {}}
                        type="text"
                        keyboardType='default'
                        returnKeyType='next'
                        onChangeText={(text) => this.setState({ alamat: text })}
                        value={this.state.alamat}
                        label={'Alamat'} />
                </View>

                <View style={{ height: 80, padding: 16 }}>
                    <TextInput 
                        ref={ ref => this.kodepos = ref }
                        onSubmitEditing={()=> {}}
                        type="text"
                        keyboardType='numeric'
                        maxLength={5}
                        returnKeyType='next'
                        onChangeText={(text) => this.setState({ kodepos: text })}
                        value={this.state.kodepos}
                        label={'Kode Pos'} />
                    <Text small>* opsional</Text>
                </View>

                <View style={{ height: 150, padding: 16, marginTop: 16 }}>
                    <Text>Tandai Alamat</Text>
                    <MapView
                        style={{ ...StyleSheet.absoluteFillObject, marginLeft: 16, marginRight: 16, marginTop: 40 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 1,
                            longitudeDelta: 0.0421,
                        }}
                        provider={PROVIDER_GOOGLE}
                        />
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.4)', width: '100%', height: 110, position: 'absolute', top:40, left: 16, justifyContent: 'center', alignItems: 'center'}}>
                        <Button onPress={() => Actions.Map() } style={{ backgroundColor: colorPrimaryLight, width: 100, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                            <Text small style={{ color: textColorButton }}>Tandai Lokasi</Text>
                        </Button>
                    </View>
                </View>
                
                { Object.keys(this.state.pinalamat).length > 0 ? 
                    <View style={{ width: '100%', paddingLeft: 16, paddingTop: 5, justifyContent: 'center' }}>
                    <Text bold small style={{ color: textColor }}>{this.state.pinalamat.name}</Text>
                    <Text small style={{ color: textColor }}>{this.state.pinalamat.formatted_address}</Text>
                </View> : <View /> }

                <View style={{ height: 80, padding: 16 }}>
                    <Button 
                        onPress={() => {}} 
                        style={{ backgroundColor: colorPrimaryDark, height: 52, justifyContent: 'center', alignItems: 'center', borderRadius: 0 }}>	
						<Text style={{ color: '#fff'}}>Tambah Lokasi</Text>
					</Button>
                </View>
            </ScrollView>
        )
    }
}