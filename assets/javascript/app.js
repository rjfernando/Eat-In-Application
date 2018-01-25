// $(document).ready(function () {
    var listIngredients = ["onion", "garlic", "carrot", "celery", "broccoli",
    "cauliflower", "potato", "sweet potato", "red onion", "bell pepper",
    "shallot", "eggplant", "zucchini", "chicken", "beef",
    "pork", "shrimp", "salmon", "tilapia", "butter", "milk", "cheddar", "cheese",
    "egg", "salt", "pepper", "parsley"];

var searchIngredients = [];
var difficulty = ["Easy", "Medium", "Hard"];
var time = ["HH:mm"];
var apiKey = "2b8eb696ebf1b4d8ff30c5e5d4e49b39";
var appID = "dbd3948d";

var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=" + appID + "&_app_key=" + apiKey + "&your_search_parameters";

function renderButtons() {
    $("#ingredientButton").empty();
    for (var i = 0; i < listIngredients.length; i++) {
        var a = $("<button>");
        a.addClass("ingredient-button");
        a.attr("data-name", listIngredients[i]);
        a.text(listIngredients[i]);
        $("#ingredientButton").append(a);
    }
};
renderButtons();

$(document).on("click", "#add", function () {
    event.preventDefault();
    if ($("#add").val().trim() == "") {
        alert("Please type ingredient to add");
    } else {
        var userEntry = $("#addEntry").val().trim();
        listIngredients.push(userEntry);
        $("#addEntry").val("");
        renderButtons();
        return false;
    }
});

$(document).on("click", ".ingredient-button", function () {

        var addedIngredient = $("<button>");
        addedIngredient.addClass("selected-ingredient-button");
        addedIngredient.text($(this).attr("data-name"));
        $("#ingredientList").append(addedIngredient);
        ingredient = $(this).text();
        searchIngredients.push(ingredient);
        listIngredients.splice(0, 1);
        // console.log(listIngredients);
        
        // $(this).hide()

});

$(document).on("click", ".selected-ingredient-button", function () {
    ingredient = $(this).val();
    listIngredients.push(ingredient);
    searchIngredients.splice(0,1)
    
    $(this).hide();

    // renderButtons();
});

$(document).on("click", ".clear-button", function () {
    $("#ingredientList").empty();
    searchIngredients = [];

});
    
