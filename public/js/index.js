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

  if (data.date_start >= data.date_end) {
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

  // $destination.val("");
  // $date_start.val("");
  // $date_end.val("");
  // $airline.val("");
};


// Add event listeners to the submit and delete buttons
$(document).on("click", "#submit", handleFormSubmit);

// dynamically change the minimum end date
$(document).on("change", "#date-start", function () {
  var min = $("#date-start").val().trim();
  $("#date-end").attr("min", min);
});

