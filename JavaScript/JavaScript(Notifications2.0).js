import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set, off } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSitting = {
    databaseURL: "https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSitting);
console.log(app);
const database = getDatabase(app);
const user = localStorage.getItem("userid");
console.log(user);
const teamUpNotification = ref(database, `Accounts/Students/${user}/Notifications/Students`);
let div = document.getElementById("notidiv");
let popup = document.getElementById("popup");

function divs() {
    onValue(teamUpNotification, function (snapshot) {
        div.innerHTML = "";
        let data = snapshot.val();
        console.log(data);
        let keys = Object.keys(data);
        
        keys.forEach(key => {
            if (key!=user) {
                const studentRef = ref(database, `Accounts/Students/${key}`);
            onValue(studentRef, function (snapshot1) {
                console.log(snapshot1.val()["Name"]);
                let data1 = snapshot1.val();
                const newDiv = document.createElement('div');
                newDiv.id = `${key}`;
                newDiv.className = "Profile";
                newDiv.innerHTML = `
                    <div style="position: relative; background-color:rgb(24,24,24); color: white; padding: 10px; ">
    <img src="${data1['imgURL']}" alt="No image" style="border-radius: 50%; width: 50px; height: 50px; vertical-align: middle;">
    <div style="display: inline-block; vertical-align: middle; margin-left: 10px;">
        <h3 style="margin: 0; color: white;">${data1['Name']} ${data1['FamilyName']}</h3>
        <h5 style="margin: 0; color: rgb(165, 165, 165);">${data1['ClassId']}</h5>
    </div>
    <h4 style="position: absolute; top: 10px; right: 10px; font-size: 10px; color: white;">${data[key]['type']}</h4>
    <i class="fa-solid fa-check" id="check" style="display: none; position: absolute; top: 10px; right: 40px; transform: scale(0.999);"></i>
</div>

                `;
                
                newDiv.addEventListener("click", function () {
                    document.getElementById("title").innerText = `${data[key]['type']}`;
                    document.getElementById("details").innerHTML = `${data[key]['details']}`;
                    popup.style = "scale:1;";
                    popup.Name = `${key}`;
                    console.log(popup.Name);
                });
                
                div.appendChild(newDiv);
            }, { onlyOnce: true }); // Ensure this runs only once per child
        
            }
            });
    });
}

function popupbuttons() {
    document.getElementById("accept").addEventListener("click", function () {
        popup.style = "scale:0;";
        const popupName = popup.Name;
        set(ref(database, `Accounts/Students/${user}/Notifications/Students/${popupName}/condition`), "Accepted");
        onValue(ref(database, `Accounts/Students/${popupName}`), function (snapshot) {
            let data = snapshot.val();
            let respond = {
                Name: data["Name"],
                FamilyName: data["FamilyName"],
                reciver: `${popupName}`,
                type: "TeamUp Request Accepted",
                sender: ` ${user}`,
                details: `${data["NickName"]} accepted your request pls contact them via WhatsApp:`,
                condition: "done"
            };
            set(ref(database, `Accounts/Students/${popupName}/Notifications/Students/${user}`), respond);
        }, { onlyOnce: true });
    });
    
    document.getElementById("refuse").addEventListener("click", function () {
        popup.style = "scale:0;";
        const popupName = popup.Name;
        set(ref(database, `Accounts/Students/${user}/Notifications/Students/${popupName}/condition`), "Refused");
        onValue(ref(database, `Accounts/Students/${popupName}`), function (snapshot) {
            let data = snapshot.val();
            let respond = {
                Name: data["Name"],
                FamilyName: data["FamilyName"],
                reciver: `${popupName}`,
                type: "TeamUp Request Rejected",
                sender: ` ${user}`,
                details: `${data["NickName"]} rejected your request cry about it bitch`,
                condition: "done"
            };
            set(ref(database, `Accounts/Students/${popupName}/Notifications/Students/${user}`), respond);
        }, { onlyOnce: true });
    });
}

divs();
popupbuttons();
