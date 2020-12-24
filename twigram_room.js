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
document.getElementById("user_name").innerHTML = "Welcome   " + user_name + "!";


function addRoom() {
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });


    localStorage.setItem("room_name", room_name);

    window.location = "twigram_page.html";
}



function getData() {
    firebase.database().ref("/").on('value',
        function (snapshot) {
            document.getElementById("output").innerHTML =
                ""; snapshot.forEach(function (childSnapshot) {
                    childKey =
                        childSnapshot.key;
                    Room_names = childKey;
                    //Start code
                    console.log("Room Name-" + Room_names);
                    row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
                    document.getElementById("output").innerHTML += row;
                    //End code
                });
        });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "twigram_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}