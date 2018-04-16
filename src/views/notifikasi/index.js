/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-16 23:44:43 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 00:04:00
 */
import React, { Component, PureComponent } from 'react';
import { View, ScrollView, FlatList, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Text from '../../components/Text';
import { shimmerPlaceholder } from '../../res/color';

type Props = {};
type State = {};

export default class Notifikasi extends Component<Props, State> {

    separator = ({ highlighted }) => <View style={[{
        borderBottomColor: shimmerPlaceholder,
        borderBottomWidth: 1
    }, highlighted]} />;

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    ItemSeparatorComponent={this.separator}
                    ListEmptyComponent={() => {}}
                    data={[{title: 'Title Text', key: 'item1'},{title: 'Title Text', key: 'item2'},{title: 'Title Text', key: 'item3'},{title: 'Title Text', key: 'item4'}]}
                    renderItem={({item, index}) => <Text key={index.toString()} >{item.key}</Text>}
                    />
            </View>
        )
    }

}