import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 
import {getDatabase,ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSitting={
    databaseURL:"https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
}
// localStorage.removeItem('userid') you should do this so sothing in the setting "class" to work propeply just figure it out ik u can ;)
const app=initializeApp(appSitting);
console.log(app)
const database=getDatabase(app);

//login
const StudenAccounts=ref(database,"Accounts/Students");
export function logIn() {
    let access=false;
    let userId=document.getElementById("email").value;
    userId=userId.split("@")[0]
    const userPassword=document.getElementById("password").value;
    onValue(StudenAccounts,function(snapshot) {
        const data=snapshot.val();
        const emails=Object.keys(data)
        if (emails.includes(userId)) {
            const password=ref(database,`Accounts/Students/${userId}`);
            onValue(password,function(snapshot) {
                let passWord=snapshot.val()["PassWord"];//Todo: change this to password 
                if (userPassword==passWord) {
                    access=true;
                    
                }else{
                    alert("WronG PaSSworD");
                }
                Access(access,userId);
            })
        }else{
            alert("ThIs EmAil is NoT ValiD ")
        }
    })
    
}
function Access(access,userId) {
    if (access) {
        localStorage.setItem("userid",userId)
        window.location.href="./indexu.html"
    }
}
document.getElementById("login").addEventListener("click",function() {
    logIn()
});

