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

const getData = async () => {
  // fecthing data from firestore firebase
  try {
    let docSnap = await getDocs(collection(db, "complaint"));
    let userData = await getDocs(collection(db, "users"));

    const users = [];
    userData.forEach((doc) => {
      users.unshift({ ...doc.data(), id: doc.id });
    });

    // getDocs(collection(db, "Complains"))
    //   .then((docSnap) => {
    let Complaints = [];
    docSnap.forEach((doc) => {
      Complaints.push({ ...doc.data(), id: doc.id });
    });

    // target the existing table element
    const table = document.getElementById("UserComplainTable");

    // create the table body element
    const tableBody = document.createElement("tbody");

    // iterate over the Complain and add a row for each user
    Complaints.forEach((complain) => {
      // create a new row and cells
      const row = document.createElement("tr");
      const UserIdCell = document.createElement("td");
      const NameCell = document.createElement("td");
      const PhoneNoCell = document.createElement("td");
      const ComplainCell = document.createElement("td");

      // add the complain data to the cells
      const user = users.find((u) => {
        return u.id === complain.id;
      });
      debugger;
      console.log(user);
      if (user) {
        UserIdCell.textContent = user.id;
        NameCell.textContent = `${user?.["First Name"] ?? ""} ${
          user?.["Last Name"] ?? ""
        }`;
        PhoneNoCell.textContent = user?.phone ?? "";
        ComplainCell.textContent = complain.Complaint;

        // append the cells to the row
        row.appendChild(UserIdCell);
        row.appendChild(NameCell);
        row.appendChild(PhoneNoCell);
        row.appendChild(ComplainCell);

        // append the row to the table body
        tableBody.appendChild(row);
      }
    });
    document.getElementById("dataTable").style.visibility = "visible";
    document.getElementById("loading").style.display = "none";
    // replace the existing table body with the new one
    const existingTbody = table.querySelector("tbody");
    table.replaceChild(tableBody, existingTbody);
    //table.replaceChild(tableBody, table.getElementsByTagName("tbody")[0]);
  } catch (error) {
    console.error(error.message);
  }
};

getData();
