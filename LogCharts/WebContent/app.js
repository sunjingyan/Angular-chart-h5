var app = angular.module("logChartApp", ["chart.js"]);
app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#F5DEB3']
    });
    
  });

app.controller("serviceController", ['$scope', '$timeout', '$http',
  function ($scope, $timeout, $http) {
  $scope.labels = ['20016-12-15'];
  $scope.series = ['Series A'];
  $scope.colors = ["#F5DEB3"];
  $scope.data = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];
  $scope.cmdNameArray = [];
  $scope.dateArray = [];
  $scope.respTimeArray = [];
  $scope.reqTimesArray = [];

  $scope.allCmdDatas = [];
  $scope.cmdNameList = [];

  $scope.requestTimes = 0;

  var logFileUrl = "log.txt";
  $http.get(logFileUrl).then(function(response) {
    $scope.allCmdDatas = response.data.split("+++++");
    var allCmdLength = $scope.allCmdDatas.length;
    if(allCmdLength > 0) {
      for(var i=0; i< allCmdLength; i++) {
        var current = $scope.allCmdDatas[i];
        var lineArr = current.split("\n");
        if(lineArr && lineArr.length > 0) {
          for (var j = 0; j < lineArr.length; j++) {
            var lineItem = lineArr[j];
            if("" != lineItem) {
              var data = lineItem.split(",");
              if(data && data.length > 0) {
                $scope.cmdNameList.push(data[0]);
                break;
              }
            }
          }
        }
      }
    }
    
  }, function(error) {
    console.log(error);
  });

  $scope.selectedCmdName = function() {
    console.log($scope.selectedCmd);
    dealWithCmd($scope.selectedCmd);
    
  }
  $scope.onClick = function (points, evt) {
      var index = points[0]._index;
      if($scope.reqTimesArray.length > 0) {
        $scope.requestTimes = $scope.reqTimesArray[index];
        $scope.$digest();
      }

  };

  function show() {
    $scope.data = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    if($scope.dateArray && $scope.respTimeArray) {
      $timeout(function() {
          $scope.labels = $scope.dateArray;
          $scope.data = $scope.respTimeArray;
       }, 500);
      $scope.colors = [];
      for(var i=0;i<$scope.dateArray.length;i++) {
        var color = '#FFD700';
        $scope.colors.push(color);
      }
    }
  }

  function dealWithCmd(index) {

    clearArray();
    var cmdData = $scope.allCmdDatas[index];
    console.log(cmdData);
    cmdData = cmdData.split("\n");
    if(cmdData && cmdData.length > 0) {
      for(var i=0; i<cmdData.length; i++) {
            var current = cmdData[i];
            if("" != current) {
              var data = current.split(",");
              if(data && data.length > 0) {
                  $scope.cmdNameArray.push(data[0]);
                  $scope.dateArray.push(data[1]);
                  $scope.respTimeArray.push(data[2]);
                  $scope.reqTimesArray.push(data[3]);
              }

            }
      }
    }

    show();

  }

  function clearArray() {
    if($scope.cmdNameArray.length > 0) {
      $scope.cmdNameArray = [];
    }
    if($scope.reqTimesArray.length > 0){
      $scope.reqTimesArray = [];
    }
    if($scope.dateArray.length > 0) {
      $scope.dateArray = [];
    }
    if($scope.respTimeArray.length > 0){
      $scope.respTimeArray = [];
    }
  }


}]);








