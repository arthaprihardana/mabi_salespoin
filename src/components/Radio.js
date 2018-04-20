/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-20 13:53:02 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-20 14:30:04
 */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Button from 'react-native-material-ripple';
import Text from './Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colorPrimaryDark, textColor } from '../res/color';

const unorchecked = {};

export default class Radio extends Component{

	constructor(props) {
		super(props);
		this._nodes = new Map();
		this.state = {
			checked: []
		}
    }

	componentDidMount() {
        const { values } = this.props;
		var arr = [];
		if(values != undefined && values.length > 0 ) {
			for(i in values) {
                if(i==0) {
                    arr.push(true)
                }
				arr.push(false)
			}
            this.setState({ checked: arr })
            this.props.callbackFromParent({
                value: values
            })
		}
    }
    
    checkNodes() {
        Array.from(this._nodes.values())
            .filter(node => node != null)
            .forEach(node => {
				if(arguments[0] == node.props.value.key) {
                    if(!this.state.checked[node.props.id]) {
                        this.state.checked[node.props.id] = !this.state.checked[node.props.id]
                        this.props.callbackFromParent({
                            value: node.props.value.value
                        });
                    }
                } else {
                    this.state.checked[node.props.id] = false
                }
                this.setState({
                    checked: this.state.checked
                }, () => this.forceUpdate())
            });
    }

	render() {
        const { values, defaultValue } = this.props;
		const { checked } = this.state;
		if(values != undefined && values.length > 0 ) {
			return values.map((val, key) => {
                return (
                <View key={key} style={{ width: '100%' }}>
                    <Button onPress={() => { this.checkNodes(val.key) }}>
                        <View key={key} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                            <Icon 
                                key={key} 
                                id={key}
                                ref={c => this._nodes.set(key, c)} 
                                name={ checked[key] ? 'radio-button-checked' : 'radio-button-unchecked'}
                                value={val}
                                style={{color: checked[key] ? colorPrimaryDark : textColor, fontSize: 28, marginRight: 10}}
                                />
                            <View style={{ width: '75%' }}>
                                <Text style={{ flexWrap: 'wrap' }}>{val.value}</Text>
                            </View>
                        </View>
                    </Button>
                </View>
                )
            })
		}
		return <View />
    }

}