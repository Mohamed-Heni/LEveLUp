import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSitting = {
    databaseURL: "https://levelup-6248f-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSitting);
console.log(app);
const database = getDatabase(app);
const UserId = localStorage.getItem("userid");

if (UserId) {
    const student = ref(database, `Accounts/Students/${UserId}`);

    document.getElementById("grades").addEventListener("click", function () {
        window.location = "./editegrades.html";
    });

    document.getElementById("class").addEventListener("click", function () {
        window.location = "./3_interact(majour).html";
    });
    document.getElementById("logout").addEventListener("click",function() {
        if (confirm("LoG OUt ?")) {
            localStorage.removeItem('userid')
            window.top.location.href="./index.html"
        }
        
    })

    document.getElementById("password").addEventListener("click", function () {
        document.getElementById("changepass").style.display = "inline-block";
    });

    document.getElementById("save").addEventListener("click", function () {
        const oldPassword = document.getElementById("oldpassword").value;
        const newPassword = document.getElementById("newpassword").value;

        onValue(student, function (snapshot) {
            if (snapshot.exists() && snapshot.val()["PassWord"] === oldPassword) {
                set(ref(database, `Accounts/Students/${UserId}/PassWord`), newPassword)
                    .then(() => {
                        alert("Your password has been changed");
                        document.getElementById("changepass").style.display = "none";
                    })
                    .catch((error) => {
                        console.error("Error updating password:", error);
                        alert("An error occurred while changing the password");
                    });
            } else {
                alert("Password is wrong");
            }
        }, { onlyOnce: true });
    });
} else {
    console.error("User ID is not found in local storage");
}
