angular
    .module('staffModule', ['ui.bootstrap', 'ngFileUpload'])
    .controller('resultCtrl', ['$scope', '$log', 'Upload', '$timeout', function ($scope, $log, Upload, $timeout) {
	   	$scope.files = [];
	   	$scope.uploadFiles = function(files, errFiles) {
	        $scope.files = $scope.files ? _.concat($scope.files, files) : files;
	        $scope.errFiles = errFiles;
	        angular.forEach(files, function(file) {
	            file.upload = Upload.upload({
	                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
	                data: {file: file}
	            });
	            file.upload.then(function (response) {
	                $timeout(function () {
	                    file.result = response.data;
	                });
	            }, function (response) {
	                if (response.status > 0)
	                    $scope.errorMsg = response.status + ': ' + response.data;
	            });
	        });
	    }
	    // 删除单个file
        $scope.btn_remove = function(index) {
        	$scope.files.splice(index,1)
        };
	}])
   