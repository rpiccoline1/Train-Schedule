$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyBMk3eE_VbKKLqvESdhtfV39C9Tjk96k5w",
    authDomain: "train-schedule-28a66.firebaseapp.com",
    databaseURL: "https://train-schedule-28a66.firebaseio.com",
    projectId: "train-schedule-28a66",
    storageBucket: "",
    messagingSenderId: "742492828525"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#new-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainId = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var trainTime = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var trainPosting = {
      name: trainId,
      destination: dest,
      time: trainTime,
      occurance: frequency
    };
    console.log(trainPosting);
    database.ref().push(trainPosting);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

      $("#train-schedule > tbody").append("<tr><td>" + trainId + "</td><td>" + dest + "</td><td>" +
        frequency + "</td><td>" + nextArrival + "</td><td>" + timeTillNext, "</td></tr>");

      //var trainSchedule = 5;

      //var trainStart = "12:00";

      var convertingTime = moment(trainTime, "hh:mm").subtract(1, "years");
      console.log(convertingTime);

      var exactTime = moment();
      console.log("CURRENT TIME: " + moment(exactTime).format("hh:mm"));

      var timeDifference = moment().diff(moment(convertingTime), "minutes");

      var remainder = timeDifference % frequency;
      console.log(remainder);

      var timeTillNext = frequency - remainder;
      console.log("Time left: " + timeTillNext);

      var nextArrival = moment().add(timeTillNext, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
    });
  });
});