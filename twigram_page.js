var firebaseConfig = {
    apiKey: "AIzaSyB9fU8aGbEF5WIOlkqX9ZwSg_Bq3iffMCA",
    authDomain: "medi-chat-5d984.firebaseapp.com",
    databaseURL: "https://medi-chat-5d984.firebaseio.com",
    projectId: "medi-chat-5d984",
    storageBucket: "medi-chat-5d984.appspot.com",
    messagingSenderId: "666648017063",
    appId: "1:666648017063:web:224210965b917d85f40382",
    measurementId: "G-S98G9YRSZQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}
function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag; document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();


function updateLike(message_id) {
    console.log("clicked on the liked button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);


    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}