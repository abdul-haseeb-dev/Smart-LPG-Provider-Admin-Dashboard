$(document).ready(function () {
  // Listen for changes to the search input
  $("#dataTable_search").on("keyup", function () {
    var searchQuery = $(this).val().toLowerCase();

    // Loop through each row in the table body
    $("#dataTable tbody tr").each(function () {
      var BookingID = $(this).find("td:first-child").text().toLowerCase();
      var UserID = $(this).find("td:nth-child(2)").text().toLowerCase();
      var Name = $(this).find("td:nth-child(3)").text().toLowerCase();
      var Address = $(this).find("td:nth-child(4)").text().toLowerCase();
      var Color = $(this).find("td:nth-child(5)").text().toLowerCase();
      var Size = $(this).find("td:nth-child(6)").text().toLowerCase();
      var DeviceInclude = $(this).find("td:nth-child(7)").text().toLowerCase();
      var Payment = $(this).find("td:nth-child(8)").text().toLowerCase();
      var DateTime = $(this).find("td:nth-child(9)").text().toLowerCase();
      var BookingStatus = $(this).find("td:nth-child(10)").text().toLowerCase();
      var DeliveryBoy = $(this).find("td:nth-child(11)").text().toLowerCase();

      // If the search query matches the data in table then show it with yellow color otherwise hide it
      if (
        BookingID.indexOf(searchQuery) !== -1 ||
        UserID.indexOf(searchQuery) !== -1 ||
        Name.indexOf(searchQuery) !== -1 ||
        Address.indexOf(searchQuery) !== -1 ||
        Color.indexOf(searchQuery) !== -1 ||
        Size.indexOf(searchQuery) !== -1 ||
        DeviceInclude.indexOf(searchQuery) !== -1 ||
        Payment.indexOf(searchQuery) !== -1 ||
        DateTime.indexOf(searchQuery) !== -1 ||
        BookingStatus.indexOf(searchQuery) !== -1 ||
        DeliveryBoy.indexOf(searchQuery) !== -1
      ) {
        $(this)
          .show()
          .find("td")
          .each(function () {
            var content = $(this).text();
            var index = content.toLowerCase().indexOf(searchQuery);
            if (index !== -1) {
              var highlighted =
                '<span class="highlight">' +
                content.substr(index, searchQuery.length) +
                "</span>";
              $(this).html(
                content.substr(0, index) +
                  highlighted +
                  content.substr(index + searchQuery.length)
              );
            }
          });
      } else {
        $(this).hide();
      }
    });
  });
});
