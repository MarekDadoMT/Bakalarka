const functions = require("firebase-functions");
//const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
const RippleAPI = require('ripple-lib').RippleAPI



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

exports.getPackets = functions.https.onRequest((req, res) => {

    if(req.method === 'GET') {

        var token = req.query.token;

        if(token) {
            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {
                if(snapshot.val()) {

                    return database.orderByChild('key').on('value', (snapshot) => {

                        if(snapshot.val()) {

                            var packets = [];

                            snapshot.forEach(function(childSnapshot) {
                                var key = childSnapshot.key;
                                var childSnapshotBody = childSnapshot.val();
                                childSnapshotBody["id"] = key;

                                packets.push(
                                    childSnapshotBody
                                )

                            });
                            res.status(200).send(packets);
                        }
                        else {
                            res.status(404).send();
                        }
                    })
                }
            })
        }
    }
    else {
        res.status(400).send();
    }
});

exports.addPacket = functions.https.onRequest((req, res) => {

    if(req.method === 'POST') {

        var token = req.query.token;
        var author = req.body.author;
        var sourceAddress = req.body.sourceAddress;
        var destinationAddress = req.body.destinationAddress;
        var amount = req.body.amount;

        if(author && sourceAddress && destinationAddress &&  amount && token) {

            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {
                if(snapshot.val()) {

                    database.push({
                        author: author,
                        sourceAddress: sourceAddress,
                        destinationAddress: destinationAddress,
                        amount: amount
                    }).then(function(snapshot) {

                        var key = snapshot.key;

                        admin.database().ref(`/packets/${key}`).on('value', function(snapshot) {

                            if(snapshot.val()) {
                                var snapshotBody = snapshot.val();
                                snapshotBody["id"] = key;

                                res.status(200).send(
                                    snapshotBody
                                );
                            }
                            else {
                                res.status(404).send();
                            }
                        })

                    });
                } else {
                    res.status(403).send('Invalid token');
                }
            });
        }
        else {
            res.status(400).send('Missing parameter');
        }
    }
    else {
        res.status(400).send();
    }
});

exports.getPaymentId = functions.https.onRequest((req, res) => {

    if(req.method === 'GET') {

        var token = req.query.token
        var key = req.query.key;

        if(key && token) {

            return admin.database().ref('users').orderByChild('token').equalTo(token).once('value', function(snapshot) {
                if (snapshot.val()) {

                    return database.child(key).on('value', (snapshot) => {

                        if(snapshot.val()) {
                            var snapshotBody = snapshot.val();
                            snapshotBody["id"] = key;

                            res.status(200).send(
                                snapshotBody
                            );
                        }
                        else {
                            res.status(404).send();
                        }
                    })
                }
            })
        }
        else {
            res.status(400).send('No matches for id');
        }
    }
    else {
        res.status(400).send();
    }
});

exports.sendPayment = functions.https.onRequest((req, res) => {

    if(req.method === 'GET') {
        var sourceAddress = req.query.sourceAddress;
        var destinationAddress = req.query.destinationAddress;
        var amountQ = req.query.amount;


        // TESTNET ADDRESS 1
        const ADDRESS_1 = sourceAddress;
        const SECRET_1 = "ssK5R24G1oC8uvNV7bNkjsh5kQjnw";
        // TESTNET ADDRESS 2
        const ADDRESS_2 = destinationAddress;
        const instructions = {maxLedgerVersionOffset: 5};
        const currency = 'XRP';
        const amount = amountQ;

        console.log("SA: " + sourceAddress + ", DA: " + destinationAddress + ", Amount: " + amount);
        const payment = {
            source: {
                address: ADDRESS_1,
                maxAmount: {
                    value: amount,
                    currency: currency
                }
            },
            destination: {
                address: ADDRESS_2,
                amount: {
                    value: amount,
                    currency: currency
                }
            }
        }
        const api = new RippleAPI({
            server: 'wss://s.altnet.rippletest.net:51233'   // TESTNET
        });
        api.connect().then(() => {
            console.log('Connected...');
            api.preparePayment(ADDRESS_1, payment, instructions).then(prepared => {
                const {signedTransaction, id} = api.sign(prepared.txJSON, SECRET_1);
                console.log(id)
                api.submit(signedTransaction).then(result => {
                    console.log(JSON.stringify(result, null, 2));
                    api.disconnect()
                })
            })
        }).catch(console.error);
    }

});


