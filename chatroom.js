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

  user_name= localStorage.getItem("username");

  document.getElementById("welcome").innerHTML= "Welcome " + user_name + "!";

  function addRoom(){
    room_name= document.getElementById("room_name").value ;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);

      window.location="chatpage.html";
  }
  function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
    Room_names = childKey;
    console.log("Room Name - " + Room_names);
   row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
   document.getElementById("output").innerHTML += row;
 });
});

}
getData();

function redirectToRoomName(name)
{
    localStorage.setItem("room_name", name);
    window.location="chatpage.html";

}
function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location="index.html";
}