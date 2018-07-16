/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 19:06:49 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-11 22:39:17
 */
import React, { Component } from 'react';
import { View, RefreshControl, ListView } from 'react-native';
import Button from 'react-native-material-ripple';
import Placeholder from 'rn-placeholder';
import Text from '../../components/Text';
import {shimmerPlaceholder, backgroundContent, textColorButton, colorPrimary} from '../../res/color';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getLokasiByAgen } from '../../services/lokasiService';

type Props = {};
type State = {
    loading: boolean,
    shimmerAnimating: boolean,
    data: array
};

let timeout;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class MainLokasi extends Component<Props, State> {

    state = {
        loading: false,
        token: {},
        user: {},
        data: ds.cloneWithRows([]),
        refreshing: false,
        isReady: false,
        page: 1,
        limit: 25
    }

    separator = ({ highlighted }) => <View style={[{
        borderBottomColor: shimmerPlaceholder,
        borderBottomWidth: .5
    }, highlighted]} />;

    componentDidMount() {
        this.handleGetLokasyByAgen()
    }
    

    renderItem(item, index) {
        return (
            <Button onPress={() => Actions.jump("PosisiBarang", {lokasi: item}) } key={index} style={{ padding: 16, width: '100%', backgroundColor: backgroundContent }}>
                <Text bold>{item.namaLokasi}</Text>
                <Text>{item.alamat}</Text>
            </Button>
        )
    }

    handleGetLokasyByAgen() {
        getLokasiByAgen(this.state.limit, this.state.page).then(result => {
            if(result.data.length > 0) {
                this.setState({
                    refreshing: false,
                    isReady: true,
                    totalLokasi: result.options.total,
                    data: this.state.data.cloneWithRows(result.data)
                }, () => this.forceUpdate());
            } else {
                this.setState({
                    refreshing: false,
                    isReady: true,
                });
            }
        })
    }

    onRefresh() {
        this.setState({
            refreshing: true,
            // page: this.state.page + 1,
        }, () => this.handleGetLokasyByAgen());
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                {!this.state.isReady ? 
                <View>
                    <View style={{ padding: 16, width: '100%' }}>
                        <Placeholder.Paragraph
                            size={60}
                            textSize={12}
                            animate="fade"
                            lineNumber={3}
                            lineSpacing={5}
                            firstLineWidth="50%"
                            onReady={this.state.isReady}
                            /> 
                    </View>
                    <View style={{ padding: 16, width: '100%' }}>
                        <Placeholder.Paragraph
                            size={60}
                            textSize={12}
                            animate="fade"
                            lineNumber={3}
                            lineSpacing={5}
                            firstLineWidth="50%"
                            onReady={this.state.isReady}
                            /> 
                    </View> 
                </View> : 
                <ListView
                    renderSeparator={this.separator}
                    enableEmptySections={true}
                    dataSource={this.state.data}
                    renderRow={(item, index) => this.renderItem(item, index)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            colors={[colorPrimary]}
                        />
                    }
                    /> 
                }

                <Button 
                    onPress={() => Actions.jump("TambahLokasi", {}) }
                    style={{
                        zIndex: 3,
                        position: 'absolute',
                        bottom: 20, right: 20,
                        width: 56, height: 56,
                        borderRadius: 28,
                        backgroundColor: colorPrimary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 1,
                        shadowColor: '#000000',
                        shadowRadius: 20,
                        shadowOffset: {width: 20, height: 20},
                    }}>
                        <Icon name="add" size={28} style={{ color: textColorButton}} />
                </Button>
            </View>
        )
    }
}