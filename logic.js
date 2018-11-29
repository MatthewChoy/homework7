var config = {
    apiKey: "AIzaSyCHHdgclpMboJCb5Jz_McWwLS9Jq3ZHu64",
    authDomain: "train-times-eb1d6.firebaseapp.com",
    databaseURL: "https://train-times-eb1d6.firebaseio.com",
    projectId: "train-times-eb1d6",
    storageBucket: "train-times-eb1d6.appspot.com",
    messagingSenderId: "683196019946"
  };
  firebase.initializeApp(config);

firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function () {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format(x);
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainTime,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;

})

trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("HH:mm A");

    $("#trainTable > tBody").append("<tr><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
})