import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 
import {getDatabase,ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSitting={
    databaseURL:"https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app=initializeApp(appSitting);
console.log(app)
const database=getDatabase(app);
const majours=ref(database,"Majours");
const majoursSelect=window.document.getElementById("majours");
const year=window.document.getElementById("year");
const semester=window.document.getElementById("semester");


let pre;
let lec;
let mas;


function addoption(Item) {
    const newoption=document.createElement("option");
    let ItemVal=Item[1];
    let ItemId=Item[0];
    newoption.value=ItemId;
    newoption.textContent=ItemVal;
    // or i can do this but i was feeling fancy : list.innerHTML+=`<li>${Item}</li>` ;
    majoursSelect.append(newoption);
    
}
onValue(majours,function(snapshot) {
    if (snapshot.exists()){   
        let lecNames=Object.entries(snapshot.val());
        //console.log(lecNames[10][1][1][2]);
        lecNames=Object.entries(lecNames[15][1]);
        majours.innerHTML="<select name='majours' id='majours' class='majours'> <option value='NULL' style='color: red;'>selEct YouR mAjor hErE</option></select>";
        // snapshot=Object.entries(snapshot.val());
         lec = lecNames.map(subArray => subArray[0]);
        // mas=snapshot[snapshot.length -3];
        let currentItemId=[]; 
        let currentItemValue=[];
        for (let i = 0; i < lecNames.length -1; i++) {
            currentItemId[i]=lecNames[i][0];
            currentItemValue[i]=lecNames[i][1];
            addoption(lecNames[i]);}
        let preNames=Object.entries(snapshot.val())
        preNames=Object.entries(preNames[17][1])
        pre=preNames.map(subArray => subArray[0]);
        for (let i = 0; i < preNames.length -1; i++) {
            currentItemId[i]=preNames[i][0];// about these two there is a small bug cuz there is an overwrite here but i won't fix it cuz i don't need to for now
            currentItemValue[i]=preNames[i][1];
            addoption(preNames[i]);}
    }else{
        majours.innerHTML="NO options";
    }
})
function yearSelect(Idmajour) {
    let keysprepa=pre;
    let keyslec=lec;
    // let keymas=Object.keys(Object.values(mas)[1]);
    if (keysprepa.includes(Idmajour) ) {
        year.style="display:block; top:25px"
        year.innerHTML="<option value='NULL'>SeLeCt tHe yEar</option><option value='1'>fIrsT YeaR</option><option value='2'>SecONd YEar</option> ";
        }else if (keyslec.includes(Idmajour)) {
            year.style="display:block; top:25px"
            year.innerHTML="<option value='NULL'>SeLeCt tHe yEar</option><option value='1'>fIrsT YeaR</option><option value='2'>SecONd YEar</option><option value='3'>ThiRD yEaR</option>";

        }
}
function semesterSelect(Idyear) {
    if (Idyear=="1") {
        semester.style="display:block; top:40px"
        semester.innerHTML="<option value='NULL'>SeLeCt tHe SeMesteR</option><option value='1'>fIrsT SemesTer</option><option value='2'>SecONd SemEster</option> ";
        }else if (Idyear=="2") {
            semester.style="display:block; top:40px"
            semester.innerHTML="<option value='NULL'>SeLeCt tHe SeMester</option><option value='3'>ThiRD Semester</option><option value='4'>Fourth Semester</option>";
        }else{
            semester.style="display:block; top:40px"
            semester.innerHTML="<option value='NULL'>SeLeCt tHe SeMester</option><option value='5'>5th Semester</option><option value='6'>FINAL Semester</option>";
        }
}
majoursSelect.addEventListener("click",function(){
    let selectedMajour=document.getElementById("majours").value;
    yearSelect(selectedMajour);

}
);
year.addEventListener("click",function() {
    let selectedYear=document.getElementById("year").value;
    semesterSelect(selectedYear);
})
    