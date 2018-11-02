// Now this db.js is specialized to upload copy machine
// How it works = save it to the database and add one to the db_counter

const firebase = require("firebase/app");
// Required for side-effects
require("firebase/firestore");
const config = require("./config.js")();

firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

const collection = "copyPlaceholder_db" // The name of the db collection
const counter_id = "copy_counter";

var set = function(doc_name, msg_str, callback){ // Callback: added document ID
    db.collection(collection).doc(doc_name).set({
        msg: msg_str
    })
    .then(function() {
        callback();
    })
    .catch(function(error) {
        console.error("Error setting document: ", doc_name, error);
    });
}

var add = function(msg_str, callback) { // Count here is the temp placeholder to handle the doc_id
    get(counter_id, function(count) {
        set(count.toString(), msg_str, function() {
            count += 1;
            set(counter_id, count, function() {
                count-=1;
                callback(count);
            });
        });
    });
}

var getOptions = {
    source: 'server'
};

var get = function(copy_id, callback) {
    var docRef = db.collection(collection).doc(copy_id);

    docRef.get(getOptions).then(function(doc) {
        if (doc.exists) {
            callback(doc.data()["msg"]);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

var del = function(copy_id) {
    db.collection(collection).doc(copy_id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

module.exports = function() {
    return {add, get};
}
