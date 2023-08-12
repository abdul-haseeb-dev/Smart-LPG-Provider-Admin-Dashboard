if (!localStorage.getItem("username")) {
  window.location.href = "index.html";
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
  //getDocs(collection(db, "bookings"))
  //  .then((docSnap) => {
  //debugger;
  const query1 = query(
    collection(db, "Booking"),
    where("isActive", "==", "true"),
    where("Status", "==", "Approved")
  );
  getDocs(query1)
    .then((docSnap) => {
      debugger;
      let bookings = [];
      docSnap.forEach((doc) => {
        bookings.push({ ...doc.data(), id: doc.id });
      });

      // target the existing table element
      const table = document.getElementById("AssignDeliveryBoyTable");

      // create the table body element
      const tableBody = document.createElement("tbody");

      // iterate over the bookings and add a row for each booking
      bookings.forEach((booking) => {
        // create a new row and cells
        const row = document.createElement("tr");
        const bookingIdCell = document.createElement("td");
        const userIdCell = document.createElement("td");
        const NameCell = document.createElement("td");
        const AddressCell = document.createElement("td");
        const sizeCell = document.createElement("td");
        const colorCell = document.createElement("td");
        const deviceIncludeCell = document.createElement("td");
        //const DateTime = document.createElement("td");
        //const Payment = document.createElement("td");
        //const bookingStatusCell = document.createElement("td");
        //const deliveryBoy = document.createElement("td");

        // add the booking data to the cells
        bookingIdCell.textContent = booking.id;
        userIdCell.textContent = booking["User ID"];
        NameCell.textContent = booking.Name;
        AddressCell.textContent = "Address";
        sizeCell.textContent = booking.Size;
        colorCell.textContent = booking.Color;
        deviceIncludeCell.textContent = booking["Smart Device Included"];
        //DateTime.textContent = booking.Date;

        //-------------------------------------Deliveryboy----------------

        var inputCell = document.createElement("td");

        // create a new input element
        var DeliveryBoytextField = document.createElement("input");
        DeliveryBoytextField.type = "text";
        DeliveryBoytextField.className = "form-control";

        // create a new button element
        var AssignButton = document.createElement("button");
        AssignButton.type = "button";
        AssignButton.textContent = "Assign";
        AssignButton.className = "btn btn-primary";
        AssignButton.addEventListener("click", function () {
          // handle the Assign button click event
          var BookingId = row.cells[0].textContent;
          var deliveryBoyName = DeliveryBoytextField.value;
          // update the deliverboy of the user in the database
          updateDoc(doc(db, "Booking", BookingId), {
            "Delivery boy": deliveryBoyName,
            isActive: "false",
          });
        });

        // create a new div element to hold the text field and button
        var inputGroup = document.createElement("div");
        inputGroup.className = "input-group";

        // create a new div element to hold the text field
        var textFieldGroup = document.createElement("div");
        textFieldGroup.className = "input-group-prepend";
        textFieldGroup.appendChild(DeliveryBoytextField);

        // create a new div element to hold the Assign button
        var AssignButtonGroup = document.createElement("div");
        AssignButtonGroup.className = "input-group-append";
        AssignButtonGroup.appendChild(AssignButton);

        // append both the text field and Assign button divs to the input group div
        inputGroup.appendChild(textFieldGroup);
        inputGroup.appendChild(AssignButtonGroup);
        inputCell.appendChild(inputGroup);

        // append the cells to the row
        row.appendChild(bookingIdCell);
        row.appendChild(userIdCell);
        row.appendChild(NameCell);
        row.appendChild(AddressCell);
        row.appendChild(sizeCell);
        row.appendChild(colorCell);
        row.appendChild(deviceIncludeCell);
        //row.appendChild(DateTime);
        //row.appendChild(Payment);
        //row.appendChild(bookingStatusCell);
        //row.appendChild(deliveryBoy);
        //row.appendChild(buttonCell);
        row.appendChild(inputCell);

        // append the row to the table body
        tableBody.appendChild(row);
      });

      // replace the existing table body with the new one
      const existingTbody = table.querySelector("tbody");
      table.replaceChild(tableBody, existingTbody);
      //table.replaceChild(tableBody, table.getElementsByTagName("tbody")[0]);
    })
    .catch((error) => console.error(error));
};
getData();
