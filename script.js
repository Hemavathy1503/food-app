var app = angular.module('recipeApp', ['ngSanitize']);

app.controller('RecipeController', ['$scope', '$sce', function($scope, $sce) {
  const base = 'https://www.themealdb.com/api/json/v1/1/';
  
  this.meals = [];
  this.selectedMeal = null;
  this.searchTerm = '';
  this.selectedCountry = '';
  this.areas = [];

  // Load available countries (areas)
  fetch(base + 'list.php?a=list')
    .then(res => res.json())
    .then(data => {
      this.areas = data.meals.map(m => m.strArea);
      $scope.$apply();
    });

  // Search recipes by name
  this.searchRecipes = () => {
    if (!this.searchTerm) return;
    fetch(base + `search.php?s=${encodeURIComponent(this.searchTerm)}`)
      .then(res => res.json())
      .then(data => {
        this.meals = data.meals || [];
        this.selectedMeal = null;
        $scope.$apply();
      });
  };

  // Filter by country/area
  this.filterByCountry = () => {
    if (!this.selectedCountry) {
      this.meals = [];
      return;
    }
    fetch(base + `filter.php?a=${encodeURIComponent(this.selectedCountry)}`)
      .then(res => res.json())
      .then(data => {
        this.meals = data.meals || [];
        this.selectedMeal = null;
        $scope.$apply();
      });
  };

  // Load random dish
  this.loadRandom = () => {
    fetch(base + 'random.php')
      .then(res => res.json())
      .then(data => {
        this.meals = data.meals ? [data.meals[0]] : [];
        this.selectedMeal = data.meals ? data.meals[0] : null;
        $scope.$apply();
      });
  };

  // Select a meal for detailed view
  this.selectMeal = (meal) => {
    fetch(base + `lookup.php?i=${meal.idMeal}`)
      .then(res => res.json())
      .then(data => {
        this.selectedMeal = data.meals[0];
        $scope.$apply();
      });
  };

  // Extract ingredients
  this.getIngredients = (meal) => {
    let list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal['strIngredient' + i];
      const qty = meal['strMeasure' + i];
      if (ing && ing.trim()) list.push((qty ? qty : '') + ' ' + ing);
    }
    return list;
  };

  // Professional step-by-step instructions
  this.getInstructions = (meal) => {
    if (!meal.strInstructions) return [];
    return meal.strInstructions
      .split(/\r?\n|\.(?!\d)/) // split by line break or period
      .map(s => s.trim())
      .filter(s => s.length > 0);
  };

  // Highlight ingredients in instructions
  this.highlightIngredients = (step, meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      let ing = meal['strIngredient' + i];
      if (ing && ing.trim()) ingredients.push(ing);
    }
    ingredients.forEach(ing => {
      let regex = new RegExp(`\\b(${ing})\\b`, 'gi');
      step = step.replace(regex, '<strong>$1</strong>');
    });
    return $sce.trustAsHtml(step);
  };

  // Load a default dish
  this.loadRandom();

}]);
