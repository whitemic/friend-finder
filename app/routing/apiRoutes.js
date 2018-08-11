var friendData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res){
        //This still needs to implement the compatibility logic
        var bestMatch = {
            name: "",
            photo: ""
        };
        var bestScore = 100;
        for (var i = 0; i < friendData.length; i++) {
            var totalScore = 0;
            // console.log(friendData[i].scores);
            for (var j = 0; j < friendData[i].scores.length; j++) {
                var scoreInt = parseInt(friendData[i].scores[j]);
                // console.log(req.body.scores[j]);
                // var score = req.body.scores[j];
                // score = parseInt(req.body.scores[j]);
                var inputScoreInt = parseInt(req.body.scores[j]);
                var scoreDifference = Math.abs(scoreInt - inputScoreInt);
                totalScore += scoreDifference;
                console.log(totalScore);
            }
            if (totalScore < bestScore) {
                bestScore = totalScore;
                bestMatch.name = friendData[i].name;
                bestMatch.photo = friendData[i].photo;
            }
            console.log(bestMatch);
        }

        friendData.push(req.body);

        res.json(bestMatch);
    });
}