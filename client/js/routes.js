app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/shop', {
      templateUrl: '/views/templates/shop.html',
      controller: 'shop'
    }).
    when('/recipes', {
      templateUrl: '/views/templates/recipes.html',
      controller: 'recipes'
    }).
    when('/ingredients', {
      templateUrl: '/views/templates/ingredients.html',
      controller: 'ingredients'
    }).
    otherwise({
      redirectTo: '/shop'
    });
  }
]);