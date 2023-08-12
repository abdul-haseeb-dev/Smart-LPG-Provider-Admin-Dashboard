if (!localStorage.getItem("username")) {
  window.location.href = "AdminLogin.html";
}
// Import the functions from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  setDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// web app Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const getData = () => {
  // fecthing data from firestore firebase
  getDocs(collection(db, "users"))
    .then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });

      // target the existing table element
      const table = document.getElementById("UserProfileTable");

      // create the table body element
      const tableBody = document.createElement("tbody");

      // iterate over the users and add a row for each user
      users.forEach((user) => {
        // create a new row and cells
        const row = document.createElement("tr");
        const UserIdCell = document.createElement("td");
        const fNameCell = document.createElement("td");
        const lNameCell = document.createElement("td");
        const PhoneNoCell = document.createElement("td");
        const addressCell = document.createElement("td");
        const emailCell = document.createElement("td");

        // add the user data to the cells
        UserIdCell.textContent = user.id;
        fNameCell.textContent = user["First Name"];
        lNameCell.textContent = user["Last Name"];
        PhoneNoCell.textContent = user.phone;
        addressCell.textContent = user.Address;
        emailCell.textContent = user.email;

        // append the cells to the row
        row.appendChild(UserIdCell);
        row.appendChild(fNameCell);
        row.appendChild(lNameCell);
        row.appendChild(PhoneNoCell);
        row.appendChild(addressCell);
        row.appendChild(emailCell);

        // append the row to the table body
        tableBody.appendChild(row);
      });
      document.getElementById("dataTable").style.visibility = "visible";
      document.getElementById("loading").style.display = "none";

      // replace the existing table body with the new one
      const existingTbody = table.querySelector("tbody");
      table.replaceChild(tableBody, existingTbody);
      //table.replaceChild(tableBody, table.getElementsByTagName("tbody")[0]);
    })
    .catch((error) => console.error(error));
};
getData();
