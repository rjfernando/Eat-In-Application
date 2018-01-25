$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDORz1e9e4aHUhPBHLbtxoBsE5z6DT5980",
        authDomain: "eat-in-c8063.firebaseapp.com",
        databaseURL: "https://eat-in-c8063.firebaseio.com",
        projectId: "eat-in-c8063",
        storageBucket: "eat-in-c8063.appspot.com",
        messagingSenderId: "1078349257986"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $(document).on("click", ".find-button", function () {
        event.preventDefault();
        database.ref("recipes").remove();
        var searchQuery = searchIngredients.join("+");
        // console.log("searchterms:" + searchQuery);

        var apiKey = "2b8eb696ebf1b4d8ff30c5e5d4e49b39";
        var appID = "dbd3948d";
        var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=" + appID + "&_app_key=" + apiKey + "&q=" + searchQuery + "&maxResult=10&start=10";
        // console.log("api url:" + queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            var results = response.matches;
            for (var j = 0; j < results.length; j++) {
                console.log(results);
                var mealImage = results[j].smallImageUrls;
                var mealName = results[j].recipeName;
                var mealTime = results[j].totalTimeInSeconds;
                var mealId = results[j].id;

                // push data from api call to firebase
                var recipes = {
                    name: mealName,
                    image: mealImage,
                    time: mealTime,
                    id: mealId,

                };
                database.ref("recipes").push(recipes);
            }

            return false;
        });


        database.ref("recipes").on("child_added", function (childSnapshot, prevChildKey) {

            // console.log(childSnapShot.val());

            var mealImage = childSnapshot.val().image;
            var mealName = childSnapshot.val().name;
            var mealTime = childSnapshot.val().time;
            var mealId = childSnapshot.val().id;

            var minutes = Math.floor(mealTime / 60);
            var convertTime = moment(minutes);

            $("#recipeTable > tbody").append("<tr><td><img src=" + mealImage + "></td><td>" + mealName +
                "</td><td>" + convertTime + "</td><td><button id='getRecipe' value=" + mealId + "></button></td></tr>");


            $(document).on("click", ".clear-button", function () {
                $("#ingredientList").empty();
                searchIngredients = [];
                // $("#recipeTable").empty();
                database.ref("recipes").remove();

            })

        }, function (errorObject) {
            console.log("Read failed: " + errorObject.code);
        });
    });

    $(document).on("click", "#getRecipe", function () {
        event.preventDefault();

        var recipeId = $("#getRecipe").val();
        var apiKey = "2b8eb696ebf1b4d8ff30c5e5d4e49b39";
        var appID = "dbd3948d";
        var queryURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + appID + "&_app_key=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function (response) {
            console.log(response);

            var results = response.attribution.url;
            console.log(results);

            window.open(results);

        })

    })
});