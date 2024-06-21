import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

const appSitting = {
    databaseURL: "https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "levelup-6248f.appspot.com"  // Corrected the storage bucket URL
};

const User = {
    Email: "",
    PassWord: "",
    ClassId: "",
    imgURL: "",
    Name: "",
    FamilyName: "",
    Gender: "",
    NickName: "",
    TopSubject: "",
    Grades: {}
};

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.href.includes("First_interact.html")) {
        document.getElementById("creatAct").addEventListener("click", function(event) {
            const email = document.getElementById("mail").value;
            
            if (!isValidEmail(email)) {
                alert("Please enter a valid email address.");
                event.preventDefault(); // Prevent the button's default action
            } else {
                alert("Email is valid. Proceeding to the next step.");
                checkEmail()
            }
        });
        
        function isValidEmail(email) {
            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
    } else if (window.location.href.includes("2_interact.html")) {
        document.getElementById("letsgo").addEventListener("click", function(event) {
            const name = document.getElementById("name").value.trim();
            const familyname = document.getElementById("familyname").value.trim();
            const pic = document.getElementById("pic").files.length > 0;
            const gender = document.getElementById("gender").value;
            const nickname = document.getElementById("nickname").value.trim();
            const password = document.getElementById("password").value.trim();
            
            let errorMessage = "";
        
            if (name === "") {
                errorMessage += "Please enter your name.\n";
            }
            if (familyname === "") {
                errorMessage += "Please enter your family name.\n";
            }
            if (!pic) {
                errorMessage += "Please upload a picture.\n";
            }
            if (gender === "null") {
                errorMessage += "Please select your gender.\n";
            }
            if (nickname === "") {
                errorMessage += "Please enter your nickname.\n";
            }
            if (password === "") {
                errorMessage += "Please enter your password.\n";
            }
        
            if (errorMessage !== "") {
                alert(errorMessage);
                event.preventDefault(); // Prevent the button's default action
            } else {
                alert("All fields are valid. Proceeding to the next step.");
                basicData()
            }
        });
        
    } else if (window.location.href.includes("3_interact(majour).html")) {
        document.getElementById("majourselect").addEventListener("click", function(event) {
            const major = document.getElementById("majours").value;
            const subject = document.getElementById("subjects").value;
            const year = document.getElementById("year").style.display !== 'none' ? document.getElementById("year").value : "SELECTED";
            const semester = document.getElementById("semester").style.display !== 'none' ? document.getElementById("semester").value : "SELECTED";
        
            let errorMessage = "";
        
            if (major === "NULL") {
                errorMessage += "Please select your major.\n";
            }
            if (subject === "NULL") {
                errorMessage += "Please select your top subject.\n";
            }
            if (year === "NULL") {
                errorMessage += "Please select your year.\n";
            }
            if (semester === "NULL") {
                errorMessage += "Please select your semester.\n";
            }
        
            if (errorMessage !== "") {
                alert(errorMessage);
                event.preventDefault(); // Prevent the button's default action
            } else {
                alert("All selections are valid. Proceeding to the next step.");
                classid()
            }
        });
        
    }
});

const app = initializeApp(appSitting);
const storage = getStorage(app);
const database = getDatabase(app);
const StudenAccounts = ref(database, "Accounts/Students");

function checkEmail() {
    const userEmail = document.getElementById("mail").value;
    onValue(StudenAccounts, function(snapshot) {
        const data = snapshot.val();
        const emails = Object.values(data).map(account => account.Email);
        if (emails.includes(userEmail)) {
            alert("This Email Already Exists!");
        } else {
            localStorage.setItem("UserEmail", JSON.stringify(userEmail));
            window.location.href = "./2_interact.html";
        }
    });
}

async function uploadFile() {
    User.imgURL = document.getElementById("pic").files[0];
    if (!User.imgURL) {
        alert("No file selected!");
        return;
    }

    const storageReference = storageRef(storage, 'Students/' + User.imgURL.name);
    try {
        await uploadBytes(storageReference, User.imgURL);
        const downloadURL = await getDownloadURL(storageReference);
        User.imgURL = downloadURL; // Save the download URL in the User object
        alert("File uploaded successfully!");
    } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to upload file");
    }
}

function basicData() {
    User.Name = document.getElementById("name").value;
    User.FamilyName = document.getElementById("familyname").value;
    User.NickName = document.getElementById("nickname").value;
    User.PassWord = document.getElementById("password").value;
    User.Gender = document.getElementById("gender").value;
    
    uploadFile().then(() => {
        localStorage.setItem("UserData", JSON.stringify(User));
        window.location.href = "./3_interact(majour).html";
    });
}

function classid() {
    
    let UserStorage = JSON.parse(localStorage.getItem("UserData"));
    UserStorage.TopSubject = document.getElementById("subjects").value;
    UserStorage.ClassId = document.getElementById("majours").value + document.getElementById("year").value + document.getElementById("semester").value;
    localStorage.setItem("UserData", JSON.stringify(UserStorage));
    window.location.href = "./4_interact(DataCollect1).html";
}
