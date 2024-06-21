import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 
import {getDatabase,ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSitting={
    databaseURL:"https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app=initializeApp(appSitting);
console.log(app)
const database=getDatabase(app);

const StudenAccounts=ref(database,"Accounts/Students");
const submite=document.getElementById("login");
function logIn() {
    const userEmail=document.getElementById("email").value;
    const userPassword=document.getElementById("password").valaue;
    onValue(StudenAccounts,function(snapshot) {
        const data=snapshot.val();
        const emails=Object.keys(data)
        console.log(emails);
        if (emails.includes(userEmail)) {
            const password=ref(database,`Accounts/Students/${userEmail}`);
            onValue(password,function(snapshot) {
                console.log(snapshot.val());
            })
        }
    })
}
