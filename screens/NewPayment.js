import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View,
    Button,
    Alert,
    Image,
    Picker, ScrollView
} from 'react-native';
import fb from '../firebase';
import IOSPicker from 'react-native-ios-picker';

const sourceData = [{address: 'mpRgtZCtmJepJwMVoSonUbQoQPqHDWwqtr', code: '1'},{address: 'aGamdIhRhdjTopmFFndoLqItgmjyGnDddt', code: '2'}];
const destinationData = [{address: 'mpJUB1MZjio8BuxSxsKkWtje8kqxKmvSF7', code: '1'},{address: 'aRBIhjTOlkjtAmKLsojfbnMMsbcgtRLAma', code: '2'}];


//const privateKeyWIF = 'cW95fJ3yU9Y9frcYuhvxxtDY5mnNkqfT9GAAqogTRNJdmMH4JDFw';
//console.log('address: ' + address);  //malo by vratit mpRgtZCtmJepJwMVoSonUbQoQPqHDWwqtr
//console.log('Address 2: ' + address2);  //mpJUB1MZjio8BuxSxsKkWtje8kqxKmvSF7


export default class NewPayment extends Component {

    static navigationOptions = {
        title: 'New Payment'
    };

    constructor(props) {
        super(props);
        this.state = {
            sourceAddress: '',
            destinationAddress: '',
            amount: ''
        }
    }

    _onPress = async () => {

        try {
            await fb.instance.addToDatabase(this.state, fb.instance.token, fb.instance.author)
        } catch (error) {
            console.log('Something is wrong');
        }
    };

    _change1 = async (d, i) => {
        await this.setState({sourceAddress: sourceData[i].address});
        //this.fetchDataCategory();
    };

    _change2 = async (d, i) => {
        await this.setState({destinationAddress: destinationData[i].address});
        //this.fetchDataCategory();
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="position">

                <Text style={styles.title}>Adding new transaction</Text>

                <Text style={styles.heading}>Source address: </Text>
                <View style={styles.combobox}>
                    <IOSPicker
                        selectedValue={this.state.selectedValue}
                        onValueChange={(d, i)=> this._change1(d, i)}
                        mode='modal'
                        textStyle={{color: 'grey'}}
                    >
                        {
                            sourceData.map((item, index)=>
                                <Picker.Item key={index} label={item.address} value={item.code} />
                            )
                        }
                    </IOSPicker>
                </View>



                <Text style={styles.heading}>Destination address: </Text>
                <View style={styles.combobox}>
                    <IOSPicker
                        selectedValue={this.state.selectedValue}
                        onValueChange={(d, i)=> this._change2(d, i)}
                        mode='modal'
                        textStyle={{color: 'grey'}}
                    >
                        {
                            destinationData.map((item, index)=>
                                <Picker.Item key={index} label={item.address} value={item.code} />
                            )
                        }
                    </IOSPicker>
                </View>

                <Text style={styles.heading}>Amount</Text>
                <TextInput style={styles.input}
                          onChangeText={(text) => this.setState({amount: text})}
                />


                <TouchableOpacity
                    style= {styles.buttonContainerAdd}
                    onPress={this._onPress}
                >
                    <Text style={styles.buttonText}>Add transaction</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    combobox: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        backgroundColor: 'grey',
        borderColor: '#d6d7da',
        borderWidth: 0.5,

    },
    title: {
        margin: 40,
        fontSize: 20,
        textAlign: 'center',
        color: 'grey',
        fontWeight: '700'
    },
    heading: {
        marginBottom: 10,
        marginLeft: 30,
        color: 'grey',
        fontWeight: '700'
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
        marginBottom: 10,
        backgroundColor: 'grey',
        paddingVertical: 15
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
