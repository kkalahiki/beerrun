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
			if (editItem.description) { type.description = editItem.description };
			if (editItem.amount) { type.amount = editItem.amount };
			if (editItem.section) { type.section = editItem.section };
			type.$update({'id': editItem._id}, function (result) {
				//Type.query(function (results) {
					$scope.types = result.resultSet;
				//});
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
}]);

app.controller('recipeModal', function ($scope, $modalInstance, item, ingredients) {
	$scope.item = item;
	$scope.ingredients = ingredients;
	$scope.predicate = 'name';

	$scope.editName = item.name;
	if (item.description) {
		$scope.editDescription = item.description;	
	}
	if (item.amount) {
		$scope.editAmount = item.amount;	
	}
	if (item.section) {
		$scope.editSection = item.section;	
	}
	$scope.closeModal = function () {
		$modalInstance.dismiss();
	};

	$scope.saveEdit = function () {
		item.name = $scope.editName;
		item.description = $scope.editDescription;
		item.amount = $scope.editAmount;
		item.section = $scope.editSection;
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