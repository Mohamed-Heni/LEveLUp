import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 
import {getDatabase,ref,push, onValue,remove , set} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSitting={
    databaseURL:"https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app=initializeApp(appSitting);
console.log(app)
const database=getDatabase(app);
const favoritSubject=ref(database,"Accounts/Students")
let UserId;

document.getElementById("sherche").addEventListener("click",function() {
    chereche()
})

function chereche() {
    onValue(favoritSubject,function(snapshot) {
        snapshot=snapshot.val()
        document.getElementById("Profiles").innerHTML=""
        for (let i = 0; i < Object.keys(snapshot).length; i++) {
            const element = Object.keys(snapshot)[i];
            onValue(ref(database,`Accounts/Students/${element}`),function(snapshot1) {
                snapshot1=snapshot1.val()
                console.log(snapshot1["Name"])
                if (snapshot[`${element}`]["TopSubject"]==document.getElementById("subjects").value) {
                let profileszone=document.getElementById("Profiles");
                profileszone.innerHTML+=`<div class='Profile' id='${element}' style="display: flex; align-items: center; background-color: rgb(24,24,24); padding: 10px;  margin-bottom: 10px;">
    <img src='${snapshot1["imgURL"]}' style="border-radius: 50%; width: 50px; height: 50px; vertical-align: middle;" alt='No image'>
    <div style="margin-left: 10px;">
        <h3 style='color: white; margin: 0;'>${snapshot1["Name"] + " " + snapshot1["FamilyName"]}</h3>
        <h5 style='color: rgb(165, 165, 165); margin: 0;'>${snapshot1["ClassId"]}</h5>
    </div>
    <i class='fa-solid fa-user-secret' style='color: white; margin-left: auto; font-size: 24px;'></i>
</div>
`
                
            }

            })
            
            
        }

        const divs = document.querySelectorAll('.Profile');
        divs.forEach(div => {
            div.addEventListener("click",function() {
                UserId=div.id;
                localStorage.removeItem("UID")
                localStorage.setItem("UID",UserId)
                console.log(UserId)
                window.location="./Profile.html"
                
            })
           
          });
    })
   
}

