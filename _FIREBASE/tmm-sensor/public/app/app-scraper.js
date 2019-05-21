// $scope version

var app = angular.module("SensorScraper", []);  
    // app.config(function ($provide) {
    //     $provide.factory("scrape", function () {  
    // $provide.factory is shorthand for $provide.provider, 
    // which sets up a more generic provider returning objects that have $get fxs

     app.provider("scrape", function () {
            var type;
            return {
                setType: function (value) {
                   type = value;
                },
                $get: function () {
                   return  { 
                       title: type + "SensorScraper"
                   };
                }
            };
     }); 

    app.controller("tierScrapeCtrl", function ($scope, $rootScope, scrape) {
        $rootScope.rootScopeScraper = "Root Scrape";
        
        $scope.tierScrapeTitle = "Tier Scrape";
        $scope.title = scrape.title + $scope.tierScrapeTitle
    });

    app.controller("nadirScrapeCtrl", function ($scope, scrape) {
        $scope.nadirScrapeTitle = "Nadir Scrape";
        $scope.title = scrape.title + $scope.nadirScrape;
    });

    app.controller("midScrapeCtrl", function ($http, $route, $q, $log, $scope, scrape) { 
        $scope.midScrapeTitle = "Mid Scrape";
        $scope.title = scrape.title + $scope.midScrapeTitle;
        
        $scope.reloadData = function () {
            $route.reload();
        }
        $http.get("api/getAllScrapes")
           .then(function (response) {
              $scope.scrapes = response.data;
           })
           .catch(function(response) {
                    $log.error('Error retrieving scrapes: ' + response.statusText);
              $scope.errorText = $q.reject('Error retrieving scrapes.');
           })
     });

   
 /*       
 <!--View HTML-->
 <button ng-click="$scope.reloadData()">Rescrape</button>
 */
 
