// Get references to page elements
var $destination = $("#destination");
var $date_start = $("#date-start");
var $date_end = $("#date-end");
var $airline = $("#airline");

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {


  var data = {
    destination: $destination.val().trim(),
    date_start: $date_start.val().trim(),
    date_end: $date_end.val().trim(),
    airline: $airline.val().trim()
  };

  // input validation
  if (!data.destination) {
    //alert("You must enter an destination!");
    return
  }

  if (!data.date_start || !data.date_end) {
    // alert("You must enter the date of travel!");
    return;
  }

  if (data.date_start > data.date_end) {
    // alert("End date must after start date!");
    return
  }

  event.preventDefault();

  // console.log(data);
  $.post("/result", data, function (res) {
    //console.log(res);
    var newDoc = document.open("text/html", "replace");
    newDoc.write(res);
    newDoc.close();
  });
};

var handleFormSave = function (event) {
  var data = {
    destination: $destination.val().trim(),
    date_start: $date_start.val().trim(),
    date_end: $date_end.val().trim(),
    airline: $airline.val().trim()
  };
  // input validation
  if (!data.destination || !data.date_start || !data.date_end || data.date_start > data.date_end) {
    return;
  }
  event.preventDefault();
  var name = prompt("Save this trip as");
  if (name != null) {
    data.name = name.trim();
    if (data.name == "") {
      alert("Trip name must have at least one non space character!");
      return;
    }
    $.post("/api/saveTrip", data, function (result) {
      if (result) {
        // get response
        if (result.isNewTrip) {
          // new trip
          alert("Trip saved!");
          $(".dropdown-menu").append(`<span class="dropdown-item trip">${result.data.name}</span>`);
        } else {
          // existing trip
          if (confirm("This trip already exist, do you want to update it?")) {
            $.ajax({ url: "/api/updateTrip", method: "PUT", data: data }).then(function (result) {
              if (result) {
                alert("Trip updated!");
              } else {
                alert("Something went wrong, please try agian")
              }
            });
          }
        }
      } else {
        alert("Something went wrong, please try agian")
      }
    });
  }
};

var handleFormDelete = function (event) {
  var name = decodeURI($(this).attr("data-trip"));
  event.preventDefault();
  if (confirm(`Do you want to delete trip: ${name} ?`)) {
    console.log("delete!");
    $.ajax({ method: "DELETE", url: `/api/deleteTrip/${name}` }).then(function (result) {

      if (result == 1) {
        alert("Trip has been deleted!");
      }
      // refresh page
      window.location.reload();
      // $("#destination").val("");
      // $("#date-start").val("");
      // $("#date-end").val("");
      // $("#airline").val("");
      // $("#delete").remove();
    });
  }

}

var getTripInfo = function (event) {
  var name = $(this).text();
  $.get(`/api/getTrip/${name}`, function (result) {
    if (result) {
      $("#current-trip").html(`<h3 class="display-5">Current Trip<br> ${name}</h3>`);
      // auto fill
      $("#destination").val(result.destination);
      $("#date-start").val(new Date(result.date_start).toISOString().substr(0, 10));
      $("#date-end").val(new Date(result.date_end).toISOString().substr(0, 10));
      $("#airline").val(result.airline);
      // add a "remove" button
      console.log("add btn");
      $("#delete").remove();
      name = encodeURI(name);
      $("#form-btn-group").prepend(`<button id="delete" class="btn btn-danger" data-trip = ${name}>Delete</button>`);
    } else {
      alert("Something went wrong, please try agian");
    }
  })
}


// Add event listeners to the submit and delete buttons
$(document).on("click", "#submit", handleFormSubmit);
$(document).on("click", "#save", handleFormSave);
$(document).on("click", "#delete", handleFormDelete);
$(document).on("click", ".trip", getTripInfo);


// dynamically change the minimum end date
$(document).on("change", "#date-start", function () {
  var min = $("#date-start").val().trim();
  $("#date-end").attr("min", min);
});