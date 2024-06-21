import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const appSitting = {
    databaseURL: "https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(appSitting);
console.log(app);
const database = getDatabase(app);
const majours=ref(database,"Majours");
const UserId = localStorage.getItem("userid");

onValue(ref(database,`Accounts/Students/${UserId}`),function(snapshot) {
    snapshot=snapshot.val()
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
    title(snapshot["ClassId"].substring(0,2));
    function subjectspath(id) {
        let classId=id.substring(0,2);
        let yearid=id.substring(2,3);
        let semestre=id.substring(3,4);
        console.log(semestre);
        const userSubjects=ref(database,`Majours/${classId}/${yearid}/${semestre}`);
        return userSubjects;
    }
    const userSubjects=subjectspath(snapshot["ClassId"]);
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
            let container={};
            for (let i = 0; i < Subjects.length; i++) {
                const grade = document.getElementById(`${Subjects[i]}`).value;
                container[`${Subjects[i]}`]=grade;
            }
            set(ref(database,"Accounts/Students/"+UserId+"/Grades"),container);
            alert("Your grades were updated successfully")
        })
    }
    document.getElementById("push").addEventListener("click", function () {   
        UserGrades();
        window.location="./Setting.html"
    });

})
