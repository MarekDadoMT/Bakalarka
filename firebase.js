import uuid from 'uuid';
import * as firebase from 'firebase';
import { Alert } from 'react-native';

class fb {

    constructor() {

    }

    login(password, username) {

        return fetch(`https://us-central1-bpdatabase-58f91.cloudfunctions.net/auth?username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {

            if(response.status !== 200) {
                Alert.alert("Wrong username or password...");
            }
            else {
                let token = response['_bodyText'];
                return token;
            }
        })
    }
}

fb.instance = new fb();
fb.instance.token = '';
fb.instance.author = '';
export default fb;
