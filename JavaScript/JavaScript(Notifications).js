import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue,set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSitting = {
    databaseURL: "https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSitting);
console.log(app);
const database = getDatabase(app);
const user=localStorage.getItem("userid")
const teamUpNotification=ref(database,`Accounts/Students/${user}/Notifications/Students`)
let keys=[];
let div=document.getElementById("notidiv");
onValue(teamUpNotification,function(snapshot) {
  snapshot=snapshot.val()
  let from=Object.keys(snapshot);
  div.innerHTML=" "
  for (let i  = 0; i < from.length; i++) {
    const element = from[i];
    keys[i]=element;
    onValue(ref(database,`Accounts/Students/${element}`),function(snapshot1) {
      snapshot1=snapshot1.val()
        
      div.innerHTML+=`<div class="Profile" id="${element}" > 
          <img src="../img/Profiletest.png" alt="NO image">
          <h3 style="color: white; display:inline; position:relative; bottom:40px; ">${snapshot1['Name']+' '+ snapshot1['FamilyName'] }</h3>
          <h5 style="color: rgb(165, 165, 165); display:inline; position:relative; right:51px;
          bottom:20px;">${snapshot1["ClassId"]}</h5>
          <h4 style="color: white; display:inline; float:right; ">${snapshot[`${element}`]['type']}</h4>
          <i class="fa-solid fa-check" id="check" style="display:none; position:relative;  top:-70px; scale:0.999;"></i>
         
      </div>`

      if (snapshot[`${element}`]['condition']=="Accepted") {
        document.getElementById("check").style+="display:inline; position:relative;  top:-70px; scale:0.999;"
      }
      console.log(element)
      
      

    })

    
  }
  
  
})


function onclick(str, snapshot) {
  document.getElementById(`${str}`).addEventListener("click",function() {
        document.getElementById("title").innerText=`${snapshot[`${str}`]['type']}`
        document.getElementById("details").innerHTML=`${snapshot[`${str}`]['details']}`
        let popup1=document.getElementById("popup");
        popup1.style="scale:1;"
        popup.Name=`${str}`
        console.log(popup.Name)
      })
}



let popup=document.getElementById("popup");
document.getElementById("refuse").addEventListener("click", function() {
  popup.style="scale:0;"
  set(ref(database,`Accounts/Students/${user}/Notifications/Students/${popup.Name}/condition`),"Refused")
  onValue(ref(database,`Accounts/Students/${user}`),function(snapshot) {
    let data=snapshot.val();
    console.log(data["NickName"])
    let Notification={
      Name: data["Name"],
      FamilyName: data["FamilyName"],
      reciver: `${popup.Name}`,
      type: "TeamUp Request Rejected",
      sender: ` ${user}`,
      details: `${data["NickName"]} Rejected, cry about it`,
      condition:"done"
    }
    set(ref(database,`Accounts/Students/${popup.Name}/Notifications/${user}`),Notification)
  })

        })
document.getElementById("accept").addEventListener("click",function() {
  popup.style="scale:0;"
  set(ref(database,`Accounts/Students/${user}/Notifications/Students/${popup.Name}/condition`),"Accepted")
  onValue(ref(database,`Accounts/Students/${user}`),function(snapshot) {
    let data=snapshot.val();
    console.log(data["NickName"])
    let Notification={
      Name: data["Name"],
      FamilyName: data["FamilyName"],
      reciver: `${popup.Name}`,
      type: "TeamUp Request Accepted",
      sender: ` ${user}`,
      details: `${data["NickName"]} accepted your request pls contact them via WhatsApp:`,
      condition:"done"
    }
    set(ref(database,`Accounts/Students/${popup.Name}/Notifications/${user}`),Notification)
  })
  
})


// const divs = document.querySelectorAll('.Profile');
//         divs.forEach(div => {
//             div.addEventListener("click",function() {
//                 onValue(database,`Accounts/Students/${element}`)
                
//             })
           
//           });





