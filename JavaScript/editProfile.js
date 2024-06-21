import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

// Firebase configuration
const appSitting = {
    databaseURL: "https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(appSitting);
console.log(app);
const database = getDatabase(app);
const storage = getStorage(app);

const UserId = localStorage.getItem("userid");
const student = ref(database, `Accounts/Students/${UserId}`);
console.log(UserId);

// Fetch user data and update placeholders
onValue(student, function(snapshot) {
    let data = snapshot.val();
    document.getElementById("name").placeholder = data["Name"];
    document.getElementById("familyName").placeholder = data["FamilyName"];
    document.getElementById("nickname").placeholder = data["NickName"];
    document.getElementById("email").placeholder = data["Email"];
    document.getElementById("phonenumber").placeholder = data["PhoneNumber"];
    document.getElementById("profilepic").src = data["imgURL"];
});

// Function to upload file
async function uploadFile() {
    const UserImg = document.getElementById("pic").files[0];
    if (!UserImg) {
        alert("No file selected!");
        return;
    }

    const storageReference = storageRef(storage, 'Students/' + UserImg.name);
    try {
        await uploadBytes(storageReference, UserImg);
        const downloadURL = await getDownloadURL(storageReference);
        await set(ref(database, `Accounts/Students/${UserId}/imgURL`), downloadURL);
        document.getElementById("profilepic").src = downloadURL; // Update the profile picture in the DOM
        alert("File uploaded successfully!");
    } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to upload file");
    }
}

// Save user data
document.getElementById("save").addEventListener("click", async function() {
   
    if (document.getElementById("name").value=="") {
        document.getElementById("name").value=document.getElementById("name").placeholder
    }
    if (document.getElementById("familyName").value=="") {
        document.getElementById("familyName").value=document.getElementById("familyName").placeholder
    }
    if (document.getElementById("nickname").value=="") {
        document.getElementById("nickname").value=document.getElementById("nickname").placeholder
    }
    if (document.getElementById("email").value=="") {
        document.getElementById("email").value=document.getElementById("email").placeholder
    }
    if (document.getElementById("phonenumber").value=="") {
        document.getElementById("phonenumber").value=document.getElementById("phonenumber").placeholder
    }
    await set(ref(database, `Accounts/Students/${UserId}/Name`), document.getElementById("name").value);
    await set(ref(database, `Accounts/Students/${UserId}/FamilyName`), document.getElementById("familyName").value);
    await set(ref(database, `Accounts/Students/${UserId}/NickName`), document.getElementById("nickname").value);
    await set(ref(database, `Accounts/Students/${UserId}/Email`), document.getElementById("email").value);
    await set(ref(database, `Accounts/Students/${UserId}/PhoneNumber`), document.getElementById("phonenumber").value);
    alert("Changes made successfully");

    await uploadFile();
});
