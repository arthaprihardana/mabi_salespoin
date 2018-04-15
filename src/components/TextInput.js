/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 12:08:52 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-15 12:41:10
 */
import React, { Component } from 'react'
import {
    View,
    StatusBar,
    TextInput,
    Animated,
    Easing,
    LayoutAnimation,
    NativeModules,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-material-ripple';
import {colorPrimary, textColor, shimmerPlaceholder} from '../res/color';
import Text from './Text';

const SPRING_CONFIG = {tension: 40, friction: 7};
const { UIManager } = NativeModules;

if(Platform.OS == 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
    value: string,
    label: string
}

type State = {
    isFocused: boolean,
    showpassword: boolean
}

export default class FloatingTextInput extends Component<Props, State> {
    
    state = {
        isFocused: false,
        showpassword: true
    }

    handleFocus() {
        LayoutAnimation.spring();
        this.setState({
            isFocused: true
        });
    }

    handleBlur() {
        if(this.props.value == "") {
            LayoutAnimation.spring();
            this.setState({
                isFocused: false
            })
        }
    }

    _type() {
        const { label, ...props } = this.props;
        const { isFocused, move } = this.state;
        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: !isFocused ? 30 : 0,
            fontSize: !isFocused ? 14 : 14,
            color: !isFocused ? textColor : colorPrimary,
        }
        switch (this.props.type) {
            case "text":
                return (
                    <View style={{paddingTop: 18}}>
                        <Text style={[labelStyle]}>{label}</Text>
                        <TextInput 
                            {...props}
                            style={{ fontFamily: 'RobotoCondensed-Regular', height: 40, fontSize: 14, color: '#999', borderBottomWidth: !isFocused ? .5 : 2, borderBottomColor: !isFocused ? '#999' : colorPrimary}}
                            onFocus={this.handleFocus.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            underlineColorAndroid='transparent'
                            blurOnSubmit
                        />
                    </View>
                )
                break;
            case "password":
                let eyeico = 'ios-eye';
                if(this.state.showpassword){
                    eyeico = 'ios-eye-off';
                }
                return (
                    <View style={{ paddingTop: 18 }}>
                        <Text style={[labelStyle]}>{label}</Text>
                        <TextInput 
                            {...props}
                            style={{ fontFamily: 'RobotoCondensed-Regular', height: 40, fontSize: 14, color: '#999', borderBottomWidth: !isFocused ? .5 : 2, borderBottomColor: !isFocused ? '#999' : colorPrimary}}
                            onFocus={this.handleFocus.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            underlineColorAndroid='transparent'
                            secureTextEntry={this.state.showpassword}
                            blurOnSubmit
                        />
                        
                        {this.props.value ? 
                            <View style={{ position: 'absolute', right: 0, top: 20, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Button onPress={()=>{
                                    this.setState({
                                        showpassword:!this.state.showpassword,
                                    });
                                }}>
                                    <Ionicons name={eyeico} style={{fontSize:24,color:shimmerPlaceholder}}/>
                                </Button>
                            </View>
                        : <View />}
                    </View>
                )
                break;
            default:
                return (
                    <View style={{paddingTop: 18}}>
                        <Text style={[labelStyle]}>{label}</Text>
                        <TextInput 
                            {...props}
                            style={{ fontFamily: 'RobotoCondensed-Regular', height: 40, fontSize: 14, color: '#999', borderBottomWidth: !isFocused ? .5 : 2, borderBottomColor: !isFocused ? '#999' : '#009688'}}
                            onFocus={this.handleFocus.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            underlineColorAndroid='transparent'
                            blurOnSubmit
                        />
                    </View>
                )
                break;
        }
    }

    render() {
        return this._type();
    }
}