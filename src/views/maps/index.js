/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-16 11:46:42 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-16 18:27:11
 */
import React, { Component, PureComponent } from 'react';
import { View, Keyboard, PermissionsAndroid, Platform, ToastAndroid, Dimensions, TextInput, StyleSheet, Image, FlatList, LayoutAnimation, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-material-ripple';
import Text from '../../components/Text';
import { colorPrimaryDark, textColorButton, backgroundContent } from '../../res/color';
import { GOOGLE_MAPS_AUTOCOMPLETE, GOOGLE_API, GOOGLE_MAPS_PLACE_DETAIL, GOOGLE_PLACES_TEXTSEARCH } from '../../Constant';

const { UIManager } = NativeModules;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -6.2038867;
const LONGITUDE = 106.703461;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const timeout = 500;
let animationTimeout;
let animationInterval;
let id = 0;
let addressQueue = [];
let panQueue = [];

if(Platform.OS == 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
    provider: any
}
type State = {
    back: boolean,
    refreshMap: boolean,
    searchAddress: boolean,
    searchAddressText: string,
    mapReady: boolean,
    region: object,
    dataSearchAddress: array,
    address: object
}

export default class Map extends Component<Props, State> {

    state = {
        back: false,
        refreshMap: false,
        searchAddress: false,
        searchAddressText: "",
        mapReady: false,
        region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        dataSearchAddress: [],
        address: {}
    }

    componentDidMount() {
        this._getCurrentLocation();
    }
    
    componentWillUnmount() {
        Actions.refresh({ address: this.state.address });
    }
    

    async hasLocationPermission() {
        if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
          return true;
        }
    
        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (hasPermission) return true;
    
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
    
        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }
    
        return false;
    }

    async _getCurrentLocation() {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        Geolocation.getCurrentPosition(
            (position) => {
                // console.log('position==>', position);
                this.setState({ mapReady: true }, () => {
                    animationTimeout = setTimeout(() => {
                        animationTimeout = setTimeout(() => {
                            this._focusMap({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }, true);
                        }, timeout);
                    }, timeout);
                });
            },
            (error) => {
                console.log('error==>', error);
                Alert.alert(
                    'Info',
                    error.message,
                    [
                        {text: 'Ulangi', onPress: () => this._getCurrentLocation()},
                        {text: 'Keluar', onPress: () => Actions.pop(), style: 'cancel'}
                    ]
                )
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 }
        );
    }

    _focusMap(markers, animated) {
        LayoutAnimation.easeInEaseOut();
        this.map.animateToCoordinate(markers, 0)
    }

    _searchAddress(text) {
        this.setState({ searchAddressText: text })
        if(text.length >= 3) {
            fetch(`${GOOGLE_MAPS_AUTOCOMPLETE}?input=${text}&types[0]=establishment&types[1]=geocode&types[2]=address&types[3]=regions&types[4]=cities&language=id&key=${GOOGLE_API}&components=country:ID`,{
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status == "OK" && responseJson.predictions.length > 0) {
                    this.setState({
                        dataSearchAddress: responseJson.predictions
                    })
                } else {
                    this.setState({
                        dataSearchAddress: responseJson.error_message
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    dataSearchAddress:[]
                })
            })
        } else {
            this.setState({
                dataSearchAddress:[]
            })
        }
    }

    _layoutSearchAddress(item, index) {
        return(
            <Button key={index} onPress={() => this._searchAutocompleteSearch(item.place_id) }>
                <View style={{ backgroundColor: '#fff', width: "100%", minHeight: 60, borderTopColor: "#E0E0E0", borderTopWidth: .3, marginTop: 0, paddingTop: 5, paddingBottom: 5 }}>
                    <View style={{ flexDirection: 'row', width: "100%", minHeight: 60}} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '15%' }}>
                            <Icon name={"place"} size={20} />
                        </View>
                        <View style={{ justifyContent: 'center', width: '85%', paddingRight: 5, flexWrap: 'wrap' }}>
                            <Text bold>{item.structured_formatting.main_text}</Text>
                            <Text style={{ fontSize: 12 }}>{item.structured_formatting.secondary_text}</Text>
                        </View>
                    </View>
                </View>
            </Button>
        )
    }

    _searchAutocompleteSearch(placeId) {
        Keyboard.dismiss();
        this.setState({
            dataSearchAddress: [],
            searchAddressText: "",
        }, () => {
            fetch(`${GOOGLE_MAPS_PLACE_DETAIL}?key=${GOOGLE_API}&placeid=${placeId}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status == "OK") {
                    let data = responseJson.result;
                    this.setState({ address: responseJson.result }, () => {
                        this._focusMap({
                            latitude: data.geometry.location.lat,
                            longitude: data.geometry.location.lng
                        }, true);
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    address:[]
                }, () => this.forceUpdate())
            });
        });
    }

    _regionChangeComplete(dt) {
        // this._getAddress(dt.latitude, dt.longitude);
        fetch(`${GOOGLE_PLACES_TEXTSEARCH}?query=${dt.latitude},${dt.longitude}&key=${GOOGLE_API}&language=id&region=id`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log('_getAddress ==> ', responseJson)
            if(responseJson.status == "OK" && responseJson.results.length > 0) {
                this._getPlaceId(responseJson.results[0].place_id)
            }
        })
        .catch((error) => {
            this.setState({
                address:[]
            }, () => this.forceUpdate())
        })
    }

    _getPlaceId(placeId) {
        Keyboard.dismiss()
        this.setState({
            dataSearchAddress: [],
            searchAddressText: "",
        })
        fetch(`${GOOGLE_MAPS_PLACE_DETAIL}?key=${GOOGLE_API}&placeid=${placeId}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status == "OK") {
                let data = responseJson.result;
                // console.log('data ==> ', data)
                this.setState({ address: responseJson.result })
            }
        })
        .catch((error) => {
            this.setState({
                address:[]
            }, () => this.forceUpdate())
        })
    }

    render() {
        // LayoutAnimation.linear();
        return (
            <View style={{ flex: 1 }}>
                <View style={{height: 56,backgroundColor:'#FFFFFF',flexDirection:'row',alignItems:'center', elevation: 1, paddingTop: 0}}>
                    <View style={{ width: '12%' }}>
                        <Button onPress={() => this.setState({ back: true }, () => Actions.pop() ) } 
                                style={{ 
                                    height:56,
                                    width:56,
                                    justifyContent:'center' 
                                }}>
                            <View style={{
                                height:56,
                                width:56,
                                justifyContent:'center',
                                backgroundColor: 'transparent',
                                borderRadius: 28,
                                alignItems:'center'}}>
                                <Icon name={"close"} style={{color:'#000000',fontSize: 22}}/>
                            </View>
                        </Button>
                    </View>
                    <View style={{ marginLeft: 10, width: '88%', paddingRight: 20 }}>
                        <TextInput
                            onFocus={() => this.setState({searchAddress: true, address: {} })}
                            onChangeText={this._searchAddress.bind(this)}
                            value={this.state.searchAddressText}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Cari alamat'}
                            editable={ this.state.refreshMap ? false : true }
                            placeholderTextColor={'#BDBDBD'}
                        />
                    </View>
                </View>

                { this.state.mapReady ? 
                <View style={styles.container}>
                    <Image 
                        source={require("../../res/image/marker.png")}
                        style={{ 
                            zIndex: 3,
                            position: 'absolute',
                            // marginTop: -37,
                            marginTop: Object.keys(this.state.address).length > 0 ? -120 : -37,
                            marginLeft: -30,
                            left: '50%',
                            top: '50%'
                         }} />
                    <View style={{
                        zIndex: 3,
                        flexDirection: 'column',
                        position: 'absolute',
                        // marginTop: -85,
                        marginTop: Object.keys(this.state.address).length > 0 ? -165 : -85,
                        marginLeft: -76,
                        left: '50%',
                        top: '50%',
                        width: 140,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(0,0,0,.5)',
                        justifyContent: 'center',
                        alignItems: 'center'
                        }}>
                        <Text style={{ color: textColorButton }}>Lokasi Saya</Text>
                    </View>

                    <Button 
                        onPress={() => this._getCurrentLocation() }
                        style={{
                            zIndex: 3,
                            position: 'absolute',
                            top: 20, right: 20,
                            width: 56, height: 56,
                            borderRadius: 28,
                            backgroundColor: '#FFFFFF',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 1,
                            shadowColor: '#000000',
                            shadowRadius: 20,
                            shadowOffset: {width: 20, height: 20},
                        }}>
                            <Icon name="my-location" size={28} style={{ color: '#4285F4'}} />
                    </Button>
                    
                    <MapView
                        provider={this.props.provider}
                        style={[styles.map, { marginBottom: Object.keys(this.state.address).length > 0 ? 180 : 0 }]}
                        initialRegion={this.state.region}
                        ref={ref => this.map = ref}
                        onRegionChangeComplete={this._regionChangeComplete.bind(this)}
                        showsCompass={true}
                        />
                </View>
                : <View /> }

                { ( this.state.searchAddressText.length >= 5 && this.state.dataSearchAddress != undefined && this.state.dataSearchAddress.length > 0) ?
                <View style={{ backgroundColor: '#FFFFFF', zIndex: 100, elevation: 2 }}> 
                    <FlatList 
                        data={this.state.dataSearchAddress}
                        renderItem={({ item, index }) => this._layoutSearchAddress(item, index) }
                        keyExtractor={( item, index ) => index.toString() }
                        keyboardShouldPersistTaps={"always"}
                    />
                </View>
                : <View /> }

                <View 
                    style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        height: Object.keys(this.state.address).length > 0  ? 180 : 0, 
                        width: '100%', 
                        backgroundColor: backgroundContent, 
                        zIndex: 150,
                        padding: Object.keys(this.state.address).length > 0  ? 16 : 0 }}>
                    <Text h5 bold>Lokasi Anda</Text>
                    <View style={{ width: '100%', paddingTop: 10, justifyContent: 'center' }}>
                        <Text bold small style={{ color: '#616161' }}>{ Object.keys(this.state.address).length > 0 ? this.state.address.name : ""}</Text>
                        <Text small style={{ color: '#616161' }}>{ Object.keys(this.state.address).length > 0 ? this.state.address.formatted_address : "" }</Text>
                    </View>
                    <Button 
                        onPress={() => Actions.popTo('TambahLokasi') } 
                        style={{ marginTop: 10, backgroundColor: colorPrimaryDark, height: 52, justifyContent: 'center', alignItems: 'center', borderRadius: 0 }}>	
						<Text style={{ color: '#fff'}}>Set Lokasi Anda</Text>
					</Button>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        marginTop: 56,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});