import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';


export default class Home extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <View>
                <ImageBackground source={require('../images/earth.jpg')} style={{width: '100%', height: '100%'}}>

                    <View>
                        <Text style={styles.logo}>Bakalárska práca      Double Blockchain</Text>
                        <View style={{borderRadius: 10, padding: 2, overflow: 'hidden', marginLeft: 30, marginRight: 30}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={styles.button}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 250,
        margin: 40,
        fontSize: 30,
        justifyContent: 'center',
        color: 'grey',
        fontWeight: '800'
    },
    heading: {
        marginBottom: 10,
        marginLeft: 30,
        color: '#585858',
        fontWeight: '700'
    },
    button: {
        backgroundColor: 'white',
        color: '#08088A',
        width: "75%",
        borderRadius: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 50,
        marginRight: 30,
        padding: "2%",
        fontSize:  27,
        marginTop: 360,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    buttonContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 250,
        backgroundColor: 'lightgrey',
        borderColor: 'white',
        paddingVertical: 15,
        borderWidth: 0.5
    },
    logo: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 70,
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
});
