import React, { Component } from 'react';
import { Button, View, Text , FlatList, Image, StyleSheet, TouchableOpacity, Picker, ScrollView, RefreshControl} from 'react-native';
import fb from '../firebase';
import IOSPicker from 'react-native-ios-picker';
import im from '../images/transaction.png'



const data = [{category: 'No filter', code: '1'},{category: 'Football', code: '2'},{category: 'Hockey', code: '3'}];

export default class Payments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedValue: '',
            refreshing: false

        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData () {
        const pole = await fb.instance.showData(fb.instance.token).catch((error) => {
            alert(error.message);
        });
        this.setState({data: pole});


    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData().then(() => {
            this.setState({refreshing: false});
        });
    };

    /*_change = async (d, i) => {
        await this.setState({selectedValue: data[i].category});
        this.fetchDataCategory();
    }*/


    _keyExtractor = (item, index) => item.id;
    _flatListSeparator = () => <View style={styles.line} />;

    _renderItem = ({ item }) => {
        return(
            <TouchableOpacity style={{flexDirection: 'row'}}
                              onPress={() => this.props.navigation.navigate('Payment', {id: item.id})}
            >
                <Image
                    source={require('../images/transaction.png')}
                    style={{ width: 60, height: 60, marginLeft: 30, marginTop: 30, marginBottom: 30 }}
                />
                <Text style={styles.heading}>{item.id}</Text>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>

                <Text style={styles.title}>User logged in: {fb.instance.author}</Text>


                <View>
                    <FlatList
                        data ={this.state.data}
                        ItemSeparatorComponent={this._flatListSeparator}
                        renderItem ={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>

                <TouchableOpacity style={styles.buttonContainerAdd}
                                  onPress={() => this.props.navigation.navigate('NewPayment')}
                >
                    <Text style={styles.buttonText}>Add new transaction</Text>
                </TouchableOpacity>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    combobox: {
        //flex: 1,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'grey',
        borderColor: '#d6d7da',
        //borderRadius: 20,
        borderWidth: 0.5,
        //overflow: 'hidden'
        //color: 'grey'
    },
    heading: {
        color: 'black',
        fontWeight: '700',
        paddingTop: 25,
        fontSize: 15,
        marginLeft: 30
    },
    title: {
        margin: 40,
        fontSize: 20,
        textAlign: 'center',
        color: 'grey',
        fontWeight: '700'
    },
    buttonFilter:{
        marginTop: 65,
        paddingTop: 10,
        marginLeft: 30,
        marginRight: 30,
        width: 180,
        height: 40,
        backgroundColor: 'lightblue',
        paddingVertical: 15,
    },
    buttonUnfilter:{
        marginTop: 20,
        paddingTop: 10,
        marginLeft: 30,
        marginRight: 30,
        width: 180,
        height: 40,
        backgroundColor: 'lightblue',
        paddingVertical: 15,
    },
    buttonContainerAdd:{
        marginTop: 20,
        paddingTop: 10,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'grey',
        paddingVertical: 15,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    line: {
        height: 0.5,
        width: '100%',
        backgroundColor: 'black'
    }
});
