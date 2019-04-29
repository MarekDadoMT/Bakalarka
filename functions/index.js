const functions = require("firebase-functions");
//const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const database = admin.database().ref('/packets');
const login = admin.database().ref('/users');

exports.auth = functions.https.onRequest((req, res) => {

    if(req.method === 'POST') {

        var username = req.query.username;
        var password = req.query.password;

        console.log(username);  //testovanie
        console.log(password);

        if(username) {
            if (password) {

                return login.orderByChild('username').equalTo(username).once('value', (snapshot) => {

                    if (snapshot.val()) {

                        console.log(snapshot.val());

                        var obj = snapshot.val();
                        var key = Object.keys(obj)[0];
                        var user = obj[key];

                        if (user.password === password) {

                            console.log("User " + user);
                            console.log("Key " + key);
                            console.log(user.username);
                            console.log(user.password);

                            return admin.auth().createCustomToken(user.username).then((token) => {
                                console.log(token);
                                snapshot.child(key).ref.update({
                                    "token": token
                                }).catch(function(error) {
                                    console.log("Marek " + error);
                                });

                                res.status(200).send(token);
                            });

                        } else {
                            res.status(403).send('Incorrect password');
                        }
                    } else {
                        res.status(403).send('Incorrect username');
                    }
                });
            } else {
                res.status(400).send('Missing parameter');
            }
        } else {
            res.status(400).send('Missing parameter');
        }
    } else {
        res.status(400).send();
    }
});




