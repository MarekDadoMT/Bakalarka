import React, { Component } from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet, Image, RefreshControl, ScrollView} from 'react-native';
import fb from '../firebase';

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            sourceAddress: '',
            destinationAddress: '',
            amount: '',
            refreshing: false
        };
    }


    _onRefresh = () => {
        this.setState({refreshing: true});
        this.componentDidMount().then(() => {
            this.setState({refreshing: false});
        });
    };

    _onPress = async () => {

        try {
            await fb.instance.sendPayment(this.state);
        } catch (error) {
            console.log('Something is wrong');
        }
    };

    async componentDidMount() {
        const id = this.props.navigation.state.params.id;
        const payment = await fb.instance.showPayment(id, fb.instance.token);
        this.setState({author: payment.author, sourceAddress: payment.sourceAddress, destinationAddress: payment.destinationAddress, amount: payment.amount})
    }

    render() {
        const id = this.props.navigation.state.params.id;
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>

                <Text style={styles.title}>ID in Database: {id}</Text>


                <View style={{flexDirection: 'row', marginTop: 30 }}>
                    <Text style={styles.heading}>Source address: </Text>
                    <Text style={{color: '#585858', flex: 1, flexWrap: 'wrap'}}
                          numberOfLines={5}>{this.state.sourceAddress}</Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text style={styles.heading}>Destination address: </Text>
                    <Text style={{color: '#585858', flex: 1, flexWrap: 'wrap'}}>{this.state.destinationAddress}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.heading}>Amount: </Text>
                    <Text style={{color: '#585858'}}>{this.state.amount}</Text>
                </View>

                <TouchableOpacity style={styles.buttonContainerAdd}
                                  onPress={this._onPress}
                >
                    <Text style={styles.buttonText}>EXECUTE</Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        margin: 40,
        fontSize: 20,
        textAlign: 'center',
        color: '#585858',
        fontWeight: '700'
    },
    heading: {
        marginBottom: 10,
        marginLeft: 30,
        color: '#585858',
        fontWeight: '700',
        fontSize: 16
    },
    container: {
        paddingTop: 200
    },
    input:{
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: 'grey'
    },
    inputText:{
        marginLeft: 30,
        marginRight: 30,
        height: 120,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: 'grey'
    },
    buttonContainerAdd:{
        paddingTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        backgroundColor: 'grey',
        paddingVertical: 15,
    },
    buttonContainerImage:{
        paddingTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        backgroundColor: 'lightblue',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
