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
        var yourcomment = $("<p>")
        yourcomment.text(name + " said " + comment)
        $("#messageboard").append(yourcomment)

        database.ref().set({
            name: name,
            choice: choice,
            comment: comment
        })  
    })
    
    database.ref().on("value", function(snapshot) {
        var csv = snapshot.val()
        var elsename = csv.name
        var elsechoice = csv.choice
        var elsecomment = csv.comment

       if (elsename != name && csv !=null && name !="") {
        var elsecommentDisp = $("<p>")
        elsecommentDisp.text(elsename + " said " + elsecomment)
        $("#messageboard").append(elsecommentDisp)
        var choiceComment = $("<p>")
            choiceComment.text(name + " chose " + choice + " and " + elsename + " chose " + elsechoice)
            $("#messageboard").append(choiceComment)

        if ((choice === "rock" && elsechoice === "scissors") ||
          (choice  === "scissors" && elsechoice === "paper") || 
          (choice  === "paper" && elsechoice === "rock")) {
            yourWins++
            var winComment = $("<p>")
            winComment.text(name + " wins this round!")
            $("#messageboard").append(winComment)

        } else if (choice === elsechoice) {
          ties++
          var tieComment = $("<p>")
            tieComment.text("It's a tie! Keep going!")
            $("#messageboard").append(tieComment)

        } else {
          elseWins++
          var looseComment = $("<p>")
            looseComment.text(name + " lost... " + elsename + " wins this round!")
            $("#messageboard").append(looseComment)
        }

        $("#yourWins").text("Your wins: " + yourWins)
        $("#elseWins").text("Somebody elses wins: " + elseWins)
        $("#ties").text("Tied up: " + ties)
    }

    else {
        var nobodyhereComment = $("<p>")
            nobodyhereComment.text("Hey "+ name + " wait for the partner!")
            $("#messageboard").append(nobodyhereComment)
    }
        
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code)
    })

    $("#clearmessage").on("click", function(event) {
        event.preventDefault()
        $("#messageboard").empty()
    })

})