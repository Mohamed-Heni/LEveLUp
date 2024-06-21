import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 
import {getDatabase,ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSitting={
    databaseURL:"https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
}

// window.location.href="../web/3_interact(majour).html";

const app=initializeApp(appSitting);

console.log(app)
const database=getDatabase(app);
const userid=localStorage.getItem("userid");
const refUser=ref(database,`Accounts/Students/${userid}`);
function graph(UserAbil) {
    let sides = 5; // number of data points (increment this to add more data)
    let units = 4; // number of graphs + 1 (increment this to add more graphs)
    let vertices = (new Array(units)).fill(""); 
    let percents = new Array(units);
    percents[0] = (new Array(sides)).fill(100); // for the polygon's grid
    
    console.log(UserAbil);
    percents[1] = [100, 50, 60, 50, 90]; 
    percents[2] = [100, 50, 60, 50, 90];
    percents[3] = [UserAbil["CS"], UserAbil["C"], UserAbil["T"], UserAbil["AF"], UserAbil["CT"]];
    let gradient = "conic-gradient(";
    let angle = 360 / sides;
    
    // calculate vertices
    for (let i = 0, n = 2 * Math.PI; i < sides; i++, n += 2 * Math.PI) {
        for (let j = 0; j < units; j++) {
            let x = (Math.round(Math.cos(-1 * Math.PI / 2 + n / sides) * percents[j][i]) + 100) / 2; 
            let y = (Math.round(Math.sin(-1 * Math.PI / 2 + n / sides) * percents[j][i]) + 100) / 2; 
            vertices[j] += `${x}% ${y}${i == sides - 1 ? '%' : '%, '}`;
        }
        gradient += `white ${(angle * (i + 1)) - 1}deg,#ddd ${(angle * (i + 1)) - 1}deg,#ddd ${(angle * (i + 1)) + 1}deg,white ${(angle * (i + 1)) + 1}deg,`;
    }
    
    // draw polygons (grids + graphs)
    document.querySelectorAll('.graphs > div').forEach((graph, i) => {
        graph.style.clipPath = `polygon(${vertices[i + 1]})`;
    });
    document.querySelectorAll('.grids > div').forEach((grid, i) => {
        grid.style.clipPath = `polygon(${vertices[0]})`;
    });
    document.querySelector('.grids:nth-of-type(1) > div').style.background = `${gradient.slice(0, -1)})`;
    
    // position data labels
    let firstLabel = document.querySelector('.labels:first-of-type');
    firstLabel.style.insetInlineStart = `calc(50% - ${firstLabel.offsetWidth / 2}px)`;
    
    // setting labels for the rest of the vertices (data points)
    let v = Array.from(vertices[0].split(' ').splice(0, (2 * sides) - 2), (n) => parseInt(n)); 
    document.querySelectorAll('.labels:not(:first-of-type)').forEach((label, i) => {
        let width = label.offsetWidth / 2; 
        let height = label.offsetHeight;
        label.style.insetInlineStart = `calc(${v[i * 2]}% + ${v[i * 2] < 50 ? -3 * width : v[i * 2] == 50 ? -width : width}px)`;
        label.style.insetBlockStart = `calc(${v[(i * 2) + 1]}% - ${v[(i * 2) + 1] == 100 ? -height : height / 2}px)`;
    });
}

function direct() {
    onValue(refUser,function(snapshot) {
        let userdata=snapshot.val();
        document.getElementById("classid").innerText=userdata["ClassId"];
        document.getElementById("overall").innerText=userdata["Abilitys"]["O"];
        document.getElementById("Name").innerText=userdata["Name"] + " " + userdata["FamilyName"];
        document.getElementById("nickName").innerText=userdata["NickName"];
        document.getElementById("profilepic").src=userdata["imgURL"]

        graph(userdata["Abilitys"]);      
    })
}
direct()
