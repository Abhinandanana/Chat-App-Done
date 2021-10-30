var firebaseConfig = {
    apiKey: "AIzaSyB1Pt1Ekj67SYbtWpwUv9hUi1sVh5odTv4",
    authDomain: "chat-app-dd19f.firebaseapp.com",
    databaseURL: "https://chat-app-dd19f-default-rtdb.firebaseio.com",
    projectId: "chat-app-dd19f",
    storageBucket: "chat-app-dd19f.appspot.com",
    messagingSenderId: "927856726751",
    appId: "1:927856726751:web:f6a48da6538cc1aefecf6a",
    measurementId: "G-ZEB6DNK37B"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

room_name= localStorage.getItem("room_name");
user_name= localStorage.getItem("username");

function send(){
    msg= document.getElementById("message").value ;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("message").value= "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("messages").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
//<h4> name <img id="tick" src="blue tick.png"> </h4>
    message_2= "<h4>" + message + "</h4>";
    like_button= "<button class='btn btn warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)' >";
    span= "<span class='glyphicon glyphicon-thumbs-up'>Like:"+ like + "</span></button><hr>";

    row= message_2 + like_button + span;
    document.getElementById("messages").innerHTML += row;
} }); }); }
getData();

function updateLike(message_id){
    button_id= message_id;
    no_likes= document.getElementById(button_id).value;
    update_likes= Number(no_likes)+1;

    firebase.database().ref(room_name).child(message_id).update({
        like: update_likes
    });
}

function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location="index.html";
}

