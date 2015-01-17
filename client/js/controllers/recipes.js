app.controller('recipes', ['$scope', '$resource', '$modal', function($scope, $resource, $modal){
	$scope.predicate = 'name';
	
	var Type = $resource('/api/recipes/:id', {id: '@id'}, {
		update: {
	      method: 'PUT', // this method issues a PUT request
	      url: '/api/recipes/:id'
	    },
	    remove: {
	      method: 'DELETE', // this method issues a PUT request
	      url: '/api/recipes/:id'
	    }
	});

	$resource('api/ingredients/').query(function (results) {
		$scope.ingredients = results;
	});

	Type.query(function (results) {
		$scope.types = results;
	});
	
	$scope.addType = function () {
		var type = new Type();
		type.name = $scope.newType;
		type.$save(function (result) {
			$scope.types = result.resultSet;
			$scope.newType = '';
		});
	}

	$scope.inEdit = function () {
		var editItem = this.type;
		var modalInstance = $modal.open({
			templateUrl: '/views/templates/recipeModal.html',
			controller: 'recipeModal',
			resolve: {
				item: function () {
					return editItem;
				},
				ingredients: function () {
					return $scope.ingredients;
				}
			}
		});

		modalInstance.result.then(function (editItem) {
			var type = new Type();
			type.name = editItem.name;
			type.ingredients = editItem.ingredients;
			type.$update({'id': editItem._id}, function (result) {
				$scope.types = result.resultSet;
			});
	    });

	}

	$scope.deleteItem = function () {
		var item = this.type;
		var modalInstance = $modal.open({
			templateUrl: '/views/templates/deleteDialogModal.html',
			controller: 'deleteDialogModal',
			size: 'large',
			resolve: {
				item: function () {
					return item;
				}
			}
		});

		modalInstance.result.then(function (item) {
			var type = new Type();
			type.$remove({'id': item._id}, function (result) {
				//Type.query(function (results) {
					$scope.types = result.resultSet;
				//});
			});
	    });
	}

	$scope.setNeed = function ($event) {
		if ($event.target.checked) { 
			angular.element($event.target).parent().parent().addClass('checked')
			var type = new Type();
			type.needed = true;
			type.$update({'id': this.type._id}, function (result) {
				$scope.types = result.resultSet;
			});
		}
		else {
			angular.element($event.target).parent().parent().removeClass('checked');
			var type = new Type();
			type.needed = false;
			type.$update({'id': this.type._id}, function (result) {
				$scope.types = result.resultSet;
			});
		}
	}

}]);



app.controller('recipeModal', function ($scope, $resource, $modalInstance, item, ingredients) {
	$scope.item = item;
	$scope.allIngredients = ingredients;
	$scope.predicate = 'name';
	$scope.recipeIngredients = item.ingredients;

	$scope.editName = item.name;
	if (item.url) {
		$scope.editURL = item.url;	
	}
	
	$scope.addIngredient = function () {
		var thisItem = {};
		if (thisItem.name) {
			thisItem.name = $scope.selectedIngredient.title;
			thisItem.amount = $scope.editAmount;
			thisItem.id = $scope.selectedIngredient.originalObject._id;
			$scope.recipeIngredients.push(thisItem);

		}
		else {
			/*var thisItem = $resource('api/ingredients/');*/
			var thisItem = new app.ingredients.Type();
			thisItem.name = $scope.searchStr;
			thisItem.amount = $scope.editAmount;
			thisItem.$save(function (result) {
				$scope.recipeIngredients.push(result);
			});
		}
	}

	$scope.closeModal = function () {
		$modalInstance.dismiss();
	};

	$scope.saveEdit = function () {
		item.name = $scope.editName;
		item.ingredients = $scope.recipeIngredients
		$modalInstance.close(item);
	}

});

app.controller('deleteDialogModal', function ($scope, $modalInstance, item) {
	console.log(item);
	$scope.closeModal = function () {
		$modalInstance.dismiss();
	};

	$scope.doDelete = function () {
		$modalInstance.close(item);
	}

});