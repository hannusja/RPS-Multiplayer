$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyAWhre9d7b99XU6nacoc732QLW12pNRkk8",
        authDomain: "rock-paper-scissors-ab4d0.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-ab4d0.firebaseio.com",
        projectId: "rock-paper-scissors-ab4d0",
        storageBucket: "rock-paper-scissors-ab4d0.appspot.com",
        messagingSenderId: "559070008227",
        appId: "1:559070008227:web:46260a44be58da85"
    }
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database()
    var name = ""
    var choice =""
    var comment = ""
    var yourWins=0
    var elseWins=0
    var ties =0
    $("#click-button").on("click", function(event) {
        event.preventDefault()
        name = $("#name-input").val().trim()
        choice = $("input:radio[name=choice]:checked").val()
        comment = $("#comment-input").val().trim()
        //var yourchoice = $("<p>")
        //yourchoice.text(name + " chose " + choice)
        //$("#currentmatch").append(yourchoice)
        //var yourcomment = $("<p>")
        //yourcomment.text(name + " said " + comment)
        //$("#currentmatch").append(yourcomment)

        database.ref().set({
            name: name,
            choice: choice,
            comment: comment,
            yourWins: yourWins,
            elseWins: elseWins,
            ties: ties
        })  
    })
    database.ref().on("value", function(snapshot) {
        console.log(snapshot.val())
        console.log(snapshot.val().name)
        console.log(snapshot.val().choice)
        var csv = snapshot.val()
        var elsename = csv.name
        var elsechoice = csv.choice
        var elsecomment = csv.comment
        //var elsechoicedisp = $("<p>")
        //elsechoicedisp.text(elsename + " chose " + elsechoice)
       // $("#currentmatch").append(elsechoicedisp)
        var elsecommentDisp = $("<p>")
        elsecommentDisp.text(elsename + " said " + elsecomment)
        $("#currentmatch").append(elsecommentDisp)


        if ((choice === "rock" && elsechoice === "scissors") ||
          (choice  === "scissors" && elsechoice === "paper") || 
          (choice  === "paper" && elsechoice === "rock")) {
            yourWins++;
        } else if (choice === elsechoice) {
          ties++;
        } else {
          elseWins++;
        }

        $("#yourWins").text("Your wins: " + yourWins)
        $("#elseWins").text("Somebody elses wins: " + elseWins)
        $("#ties").text("Tied up: " + ties)
        

    //database.ref().remove()

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code)
    })


})
