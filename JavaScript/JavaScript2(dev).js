import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 
import {getDatabase,ref,push, onValue,remove , set} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSitting={
    databaseURL:"https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
}

document.getElementById("push").addEventListener("click", function () {
    UserGrades();
    
    if (localStorage.getItem("userid")==null) {
        pushdata();
    }else{
        let userId=localStorage.getItem("userid");
        set(ref(database,"Accounts/Students/"+userId+"/Grades"),testUser.Grades);
        alert(" YOur ClassId is : "+testUser.ClassId)
        set(ref(database,"Accounts/Students/"+userId+"/ClassId"),testUser.ClassId)
        console.log(`${userId}`)
        window.location.href="./index.html";
    }
    
});

const app=initializeApp(appSitting);
console.log(app)
const database=getDatabase(app);
const majours=ref(database,"Majours");
let pre;
let lec;
let mas;
let testUser=JSON.parse(localStorage.getItem("UserData"));
testUser.Email=JSON.parse(localStorage.getItem("UserEmail"));
//even I don't know what this function do or why did i write it but it look kinda cute
function prelecmas() {
    onValue(majours,function(snapshot) {
    snapshot=Object.entries(snapshot.val());
    console.log(snapshot[0]);
    pre=snapshot[snapshot.length -1];
    lec=snapshot[snapshot.length -2];
    mas=snapshot[snapshot.length -3];
    pre=Object.keys(Object.values(pre)[1]);
    lec=Object.keys(Object.values(lec)[1]);
    mas=Object.keys(Object.values(mas)[1]);
})}
function title(classId) {
    console.log(classId)
    onValue(majours,function(snapshot) {
        if (snapshot.exists()){   
            let lecNames=Object.entries(snapshot.val());
            lecNames=Object.entries(lecNames[15][1]);
            let preNames=Object.entries(snapshot.val())
            preNames=Object.entries(preNames[17][1])
            const lecpre=lecNames.concat(preNames);
            const foundItem = lecpre.find(item => item[0] === classId)[1];
            console.log(foundItem);
            const title=document.getElementById("title");
            if (foundItem) {
                 title.innerHTML=foundItem;
            } else {
                title.innerHTML="No Majour found"
            }
            }
})
}
title(testUser.ClassId.substring(0,2));
function subjectspath(id) {
    let classId=id.substring(0,2);
    let yearid=id.substring(2,3);
    let semestre=id.substring(3,4);
    console.log(semestre);
    const userSubjects=ref(database,`Majours/${classId}/${yearid}/${semestre}`);
    return userSubjects;
}
const userSubjects=subjectspath(testUser.ClassId);
let Subjects;
onValue(userSubjects,function (snapshot) {
    Subjects=Object.values(Object.values(snapshot.val()));
    askquestions(Subjects);
})
function askquestions(Subjects) {
    const questionzone=document.getElementById("DataCollectZone");
    for (let i  = 0; i  < Subjects.length; i ++) {
        questionzone.innerHTML+=`<input type='number' name="${Subjects[i]}" id="${Subjects[i]}" placeholder=' ${Subjects[i]} tEst ' class='input1'>`;
    }
}

function UserGrades() {
    onValue(userSubjects,function (snapshot) {
        Subjects=Object.values(Object.values(snapshot.val()));
        testUser["Grades"]={};
        for (let i = 0; i < Subjects.length; i++) {
            const grade = document.getElementById(`${Subjects[i]}`).value;
            testUser["Grades"][`${Subjects[i]}`]=grade;
        }
    })
}

function pushdata() {
    let userId = testUser.Email.substring(0, testUser.Email.indexOf('@'));
    console.log(userId)
    set(ref(database,"Accounts/Students/"+userId),testUser);
    alert("Your account is created successfully please log in.")
    window.location.href="./index.html";
}


