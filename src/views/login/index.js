/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 10:59:52 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-15 14:24:38
 */
import React, { Component } from 'react';
import { View, AsyncStorage, Keyboard, StatusBar, KeyboardAvoidingView, Image } from 'react-native';
import Button from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorPrimary, backgroundContent, shimmerPlaceholder, colorPrimaryDark } from '../../res/color';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';

type Props = {};
type State = {
    username: string,
    password: string
};

export default class Login extends Component<Props, State> {

    state = {
        username: '',
        password: ''
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="default" translucent={false} />
                <View style={{flex: 1, backgroundColor: colorPrimary, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        resizeMode='contain'
                        style={{ width: 100, marginTop: -16 }}
                        source={require('../../res/image/logo.png')}
                    />
                    <Text bold style={{ color: '#ffffff', position: 'absolute', top: '75%' }}>S  A  L  E  S  -  P O I N</Text>
				</View>
                <View style={{flex: 2, backgroundColor: backgroundContent, paddingLeft: 16, paddingRight: 16, paddingTop: 32, flexDirection: 'column'}}>
                    <View style={{ height: 80 }}>
                        <TextInput 
                            ref={ ref => this.username = ref }
                            onSubmitEditing={()=> {
                                this.password.setState({ isFocused: true })
                            }}
                            type="text"
                            keyboardType='email-address'
                            returnKeyType='next'
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                            label={'Username'} />
                    </View>
                    
                    <View style={{ height: 80 }}>
                        <TextInput 
                            ref={ ref => this.password = ref }
                            type="password"
                            keyboardType='default'
                            returnKeyType='next'
                            keyboardType='default'
                            returnKeyType='send'
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            label={'Password'} />
                    </View>

                    <Button 
                        onPress={() => {
                            if (this.state.username != "" && this.state.password != "" ) {
                                Keyboard.dismiss();
                                Actions.replace('Main', {});
                            } else {
                                return false;
                            }
                        }} 
                        style={{ marginTop: 32, backgroundColor: this.state.username != "" && this.state.password != "" ? colorPrimaryDark : shimmerPlaceholder, height: 52, justifyContent: 'center', alignItems: 'center', borderRadius: 0 }}>	
						<Text style={{ color: '#fff'}}>Masuk</Text>
					</Button>
				</View>
            </View>
        )
    }
}