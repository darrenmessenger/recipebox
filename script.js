var app = angular.module('recipeBoxApp', [])
 .controller('recipeBoxCtrl', function($scope) {
  
  // Create the initial recipe list from local storage. 
 $scope.saved = localStorage.getItem('_msecrist_recipebox');
  // If localstorage has a value for my key, grab that. If not, create a new local storage item.
	$scope.recipeList = (localStorage.getItem('_msecrist_recipebox')!==null) ? JSON.parse($scope.saved) : [{
   title: "Pizza",
   ingredients: "Cheese, Ham, Tomato"
  }, {
   title: "Ice-cream",
   ingredients: "Milk, Chocolate, Sugar"
  }, {
   title: "Cheesecake",
   ingredients: "Milk, cream, buscuits, sugar"
  }, {
   title: "Cake",
   ingredients: "Milk, eggs, vanilla, chocolate"
  }];
  // This could probably be in a function on its own, with how many times its called. But its just one line so I didn't bother.
	localStorage.setItem('_msecrist_recipebox', JSON.stringify($scope.recipeList));

  //Allow a user to add a recipe.
  $scope.addRecipe = function() {
   if ($scope.newRecipe != null && $scope.newIngredients != null) {
    //Push the recipe to the array of recipes, and then save that to localstorage.
    $scope.recipeList.push({
     title: $scope.newRecipe,
     ingredients: $scope.newIngredients
    })
    localStorage.setItem('_msecrist_recipebox', JSON.stringify($scope.recipeList));
    $scope.newRecipe = null;
    $scope.newIngredients = null;
   }
  }

  //Allow a user to delete a recipe.
  $scope.deleteRecipe = function(index) {
   //Show confirm alert box, and when user confirms, it cuts the recipe out of the array and then updates localstorage.
   if (confirm("This recipe is going to be deleted")) {
    $scope.recipeList.splice(index, 1)
    localStorage.setItem('_msecrist_recipebox', JSON.stringify($scope.recipeList));
   }
  }
  
  //Edit a recipe
  $scope.editRecipe = function(index) {
   //Grab the recipe by the index of the array and then display the recipe's ingredients in a prompt.
   //That allows the user to change ingredients. If they hit cancel, it returns a null response, so check for that.
   var ingredients = $scope.recipeList[index].ingredients
   var result = prompt("Edit the ingredients: ", ingredients)
   if(result != null){
    $scope.recipeList[index].ingredients = result;
    localStorage.setItem('_msecrist_recipebox', JSON.stringify($scope.recipeList));
   }
  }

 });

//jQuery for Collapsible area 
  $(document).ready(function(){
    $('.collapsible').collapsible();
  });