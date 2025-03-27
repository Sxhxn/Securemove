// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDyF0hdE5FATvaDMjd1GW8Rq1TDowvFaQ8",
    authDomain: "move-logistics-14677.firebaseapp.com",
    databaseURL: "https://move-logistics-14677-default-rtdb.firebaseio.com/",
    projectId: "move-logistics-14677",
    storageBucket: "move-logistics-14677.appspot.com",
    messagingSenderId: "490285994631",
    appId: "1:490285994631:web:f98ae6fc1294d8a972de22",
    measurementId: "G-TSKTZ74GJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
   var messageDiv=document.getElementById(divId);
   messageDiv.style.display="block";
   messageDiv.innerHTML=message;
   messageDiv.style.opacity=1;
   setTimeout(function(){
       messageDiv.style.opacity=0;
   },5000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('rEmail').value;
   const password=document.getElementById('rPassword').value;
   const firstName=document.getElementById('fName').value;
   const lastName=document.getElementById('lName').value;

   const auth=getAuth();
   const db=getFirestore();

   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential)=>{
       const user=userCredential.user;
       const userData={
           email: email,
           firstName: firstName,
           lastName:lastName
       };
       showMessage('Account Created Successfully', 'signUpMessage');
       const docRef=doc(db, "users", user.uid);
       setDoc(docRef,userData)
       .then(()=>{
           window.location.href='index.html';
       })
       .catch((error)=>{
           console.error("error writing document", error);

       });
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode=='auth/email-already-in-use'){
           showMessage('Email Address Already Exists !!!', 'signUpMessage');
       }
       else{
           showMessage('unable to create User', 'signUpMessage');
       }
   })
});

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('email').value;
   const password=document.getElementById('password').value;
   const auth=getAuth();

   signInWithEmailAndPassword(auth, email,password)
   .then((userCredential)=>{
       showMessage('login is successful', 'signInMessage');
       const user=userCredential.user;
       localStorage.setItem('loggedInUserId', user.uid);
       window.location.href='index.html';
   })
   .catch((error)=>{
       const errorCode=error.code;
       if(errorCode==='auth/invalid-credential'){
           showMessage('Incorrect Email or Password', 'signInMessage');
       }
       else{
           showMessage('Account does not Exist', 'signInMessage');
       }
   })

})


// Sign-in validation function
document.getElementById("submitSignIn").addEventListener("click", async function(event) {
    event.preventDefault();

    // Get input values
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let signInMessage = document.getElementById("signInMessage");

    if (email === "" || password === "") {
        signInMessage.style.display = "block";
        signInMessage.style.color = "red";
        signInMessage.innerText = "Please enter both email and password.";
        return;
    }

    try {
        // Query Firestore for a matching user
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email), where("password", "==", password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Valid user - Redirect to index.html
            window.location.href = "index.html";
        } else {
            // Incorrect credentials
            signInMessage.style.display = "block";
            signInMessage.style.color = "red";
            signInMessage.innerText = "Incorrect email or password. Please try again.";
        }
    } catch (error) {
        
    }
});




