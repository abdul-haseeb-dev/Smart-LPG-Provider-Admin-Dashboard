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
let reportData = [];
const getData = async () => {
  // fecthing data from firestore firebase

  let userData = await getDocs(collection(db, "users"));

  const users = [];
  userData.forEach((doc) => {
    users.unshift({ ...doc.data(), id: doc.id });
  });

  getDocs(collection(db, "Booking"))
    .then((docSnap) => {
      let bookings = [];
      docSnap.forEach((doc) => {
        bookings.push({ ...doc.data(), id: doc.id });
      });

      // target the existing table element
      const table = document.getElementById("BookingDetailTable");

      // create the table body element
      const tableBody = document.createElement("tbody");

      // iterate over the bookings and add a row for each booking
      bookings.forEach((booking) => {
        // create a new row and cells
        const row = document.createElement("tr");
        const bookingIdCell = document.createElement("td");
        const userIdCell = document.createElement("td");
        const NameCell = document.createElement("td");
        const addressCell = document.createElement("td");
        const colorCell = document.createElement("td");
        const sizeCell = document.createElement("td");
        const deviceIncludeCell = document.createElement("td");
        const Payment = document.createElement("td");
        const DateTime = document.createElement("td");
        const bookingStatusCell = document.createElement("td");
        const deliveryBoy = document.createElement("td");

        // add the booking data to the cells
        const user = users.find((u) => {
          return u.id === booking.id;
        });
        debugger;
        console.log(user);
        if (user) {
          bookingIdCell.textContent = booking.id;
          userIdCell.textContent = user.id;
          NameCell.textContent = `${user?.["First Name"] ?? ""} ${
            user?.["Last Name"] ?? ""
          }`;
          addressCell.textContent = user.Address;
          colorCell.textContent = booking.Color;
          sizeCell.textContent = booking.Size;
          deviceIncludeCell.textContent = booking["Smart device Included"];
          Payment.textContent = booking.Payment;
          DateTime.textContent = `${booking?.Date ?? ""} ${
            booking?.Time ?? ""
          }`;
          bookingStatusCell.textContent = booking.Status;
          deliveryBoy.textContent = booking["Delivery Boy"];

          reportData.push({
            ...booking,
            ...user,
          });
          // append the cells to the row
          row.appendChild(bookingIdCell);
          row.appendChild(userIdCell);
          row.appendChild(NameCell);
          row.appendChild(addressCell);
          row.appendChild(colorCell);
          row.appendChild(sizeCell);
          row.appendChild(deviceIncludeCell);
          row.appendChild(Payment);
          row.appendChild(DateTime);
          row.appendChild(bookingStatusCell);
          row.appendChild(deliveryBoy);

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
    })
    .catch((error) => console.error(error));
};
getData();
// console.log(reportData);

const downloadCsv = () => {
  debugger;
  reportData = [
    ...reportData.filter((row) => {
      delete row.isActive;
      return row;
    }),
  ];

  // let columns =
  //   "Booking ID,User ID,Name,Address,Color,Size,Device Include,Payment,DateTime,Booking Status,DeliveryBoy\n";

  let columns = "";

  let totalPayment = 0;

  columns += "id" + ",";
  columns += "User ID,";
  columns += "Name" + ",";
  columns += "PhoneNo." + ",";
  columns += "Email" + ",";
  columns += "Address" + ",";
  columns += "Color" + ",";
  columns += "Size" + ",";
  columns += "Smart Device Included,";
  columns += "Payment" + ",";
  columns += "DateTime" + ",";
  columns += "Status" + ",";
  columns += "DeliveryBoy" + "\n";

  // new
  const monthSelect = document.getElementById("monthSelect");
  const desiredMonth = monthSelect.value;

  console.log(columns);
  reportData.forEach((row) => {
    //new
    const rowDateParts = row.Date.split(" ");
    const rowMonth = rowDateParts[0];

    debugger;

    if (
      rowMonth.toLowerCase() === desiredMonth.toLowerCase() &&
      Number.isInteger(parseInt(row.Payment)) &&
      row.Payment !== "Rejected" &&
      row.Payment !== "Pending"
    ) {
      totalPayment += parseInt(row.Payment);
    }

    let data = "";
    data += row.id + ",";
    data += row.id + ",";
    data += row["First Name"] + " " + row["Last Name"] + ",";
    data += "+92 " + row.phone + ",";
    data += row.email + ",";
    data += row.Address + ",";
    data += row.Color + ",";
    data += row.Size + ",";
    data += row["Smart device Included"] + ",";
    data += row.Payment + ",";
    data += row.Time + " " + row.Date.replace(",", "") + ",";
    data += row.Status + ",";
    data += row["Delivery Boy"] + ",";
    //new
    if (rowMonth.toLowerCase() === desiredMonth.toLowerCase()) {
      columns = columns + data + "\n";
    }
    //columns = columns + data + "\n";
  });
  //new
  // Add total payment row
  columns +=
    "Total Payment for Month " + desiredMonth + ":," + totalPayment + ",,\n";

  // Add line separator before total payment row
  //columns += "-----\n";

  // Add total payment row
  //columns += "Total Payment:," + totalPayment + ",,\n";

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(columns);
  hiddenElement.target = "_blank"; //provide the name for the CSV file to be downloaded
  hiddenElement.download = "SmartLPG(" + `${desiredMonth}` + ").csv";
  hiddenElement.click();
};

document.getElementById("csvBtn").addEventListener("click", () => {
  downloadCsv();
});
