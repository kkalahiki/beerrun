app.controller('ingredients', ['$scope', '$resource', '$modal', function($scope, $resource, $modal){
	$scope.predicate = 'name';
	
	var Type = $resource('/api/ingredients/:id', {id: '@id'}, {
		update: {
	      method: 'PUT', // this method issues a PUT request
	      url: '/api/ingredients/:id'
	    },
	    remove: {
	      method: 'DELETE', // this method issues a PUT request
	      url: '/api/ingredients/:id'
	    }
	});

	Type.query(function (results) {
		$scope.types = results;
	});
	
	$scope.addType = function () {
		var type = new Type();
		type.name = $scope.newType;
		type.$save(function (result) {
			$scope.types.push(result);
			console.log($scope.types);
			$scope.newType = '';
		});
	}

	$scope.inEdit = function () {
		var editItem = this.type;
		var modalInstance = $modal.open({
			templateUrl: '/views/templates/editModal.html',
			controller: 'editModal',
			resolve: {
				item: function () {
					return editItem;
				}
			}
		});

		modalInstance.result.then(function (editItem) {
			var type = new Type();
			type.name = editItem.name;
			type.section = editItem.section;
			if (editItem.description ? type.description = editItem.description : type.description = '' );
			if (editItem.amount ? type.amount = editItem.amount : type.amount = '' );
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

	$scope.setNeed = function ($event) {
		if ($event.target.checked) { 
			angular.element($event.target).parent().parent().addClass('checked')
			/*console.log(this.type._id);*/
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

app.controller('editModal', function ($scope, $modalInstance, item) {
	$scope.item = item;
	$scope.predicate = 'name';

	if (!item.section) {$scope.item.section = 'other'};

	// move the sections out of here
	$scope.sections = [
		{name: 'bakery', value:'Bakery'},
		{name: 'baking', value:'Baking Supplies'},
		{name: 'bread', value:'Bread'},
		{name: 'beer', value: 'Beer'},
		{name: 'bulk', value: 'Bulk'},
		{name: 'cereal', value: 'Cereal'},
		{name: 'cheese', value: 'Cheese'},
		{name: 'coffee', value:'Coffee'},
		{name: 'crackers', value:'Crackers'},
		{name: 'dairy', value: 'Dairy'},
		{name: 'deli', value: 'Deli'},
		{name: 'frozen', value: 'Frozen'},
		{name: 'grains', value: 'Grains'},
		{name: 'health', value: 'Health and Beauty'},
		{name: 'house', value: 'Household'},
		{name: 'meat', value: 'Meat'},
		{name: 'pasta', value:'Pasta'},
		{name: 'produce', value: 'Produce'},
		{name: 'snacks', value: 'Snacks'},
		{name: 'spices', value:'Spices'},
		{name: 'liquor', value:'Wine and Liquor'},
		{name: 'other', value: 'Other'}
	];

	$scope.closeModal = function () {
		$modalInstance.dismiss();
	};

	$scope.saveEdit = function () {
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