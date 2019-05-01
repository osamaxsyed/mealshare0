firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();

    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();

    var user = firebase.auth().currentUser;
    if(user != null){

      var email_id = user.email;
      var email_verified = user.emailVerified;
      document.getElementById("user_para").innerHTML = "Welcome  : " + email_id +
      "<br/>Verified : " + email_verified;



      if(email_verified){
        document.getElementById("sendVerification").style.display = "none";
      }else{
        document.getElementById("sendVerification").style.display = "block";


      }

    }



  } else {
    // No user is signed in.

    $(".login-cover").show();
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();


  }
});

$("#signOutBtn").click(
  function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.


    }).catch(function(error) {
      // An error happened.

      alert(error.message)
    });

  }
);



$("#loginBtn").click(
  function(){
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
        $("#loginError").show().text(error.message);
        $("#loginProgress").hide();
        $("#loginBtn").show();

      });

    }
  }
);


$("#createBtn").click(
  function(){


    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);


    });


  });



  $("#sendVerification").click(
    function(){
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function() {
        // Email sent.

        window.alert("Verification Sent");
      }).catch(function(error) {
        // An error happened.
        window.alert("Error : " + error.message);
      });

    }

  );


var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");

//Initialize Cloud Firestore through Firebase
var db = firebase.firestore();




function storeData(){

  var inputText = document.getElementById("text_field").value;
  var emailText = document.getElementById("email_field").value;

  // Add a new document in collection "cities"
db.collection("Sellers").doc().set({
    name: inputText,
    email: emailText

})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}


const list_div = document.querySelector("#list_div")

db.collection("Sellers").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

      list_div.innerHTML += "<div class = 'list-item'><h3>" +doc.data().name+"</h3><p> Email : " +doc.data().email +"</p></div>"

    });
});
