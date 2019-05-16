(function () {
   'use strict';


   // get the app module
   angular.module('app')
      .controller('dataGrid',
      [dataGrid]);

   function dataGrid() {
      var vm = this;
      vm.activate = activate;

      activate();

      function activate() {

         vm.salesData = [
            {sales: 400}, {sales: 800},
            {sales: 1200}, {sales: 1400}
         ]


         vm.ytdSalesChartOptions = {
            dataSource: {data: vm.salesData},
            series: [{field:"sales", type:"pie"}],
            seriesDefaults: {labels:{visible: true, format:"{0}"}},
            title: "Overall sales"
         };

         vm.salesChartOptions = {
            dataSource: {
               transport: {
                 read: {
                    url: "app/dataGrid/sales.json",
                    dataType: "json"
                 }
               }
            },
            series: [{field:"sales", type: 'donut'}],
            title: "Sales by Product"
         };
         vm.cars = [
            {year: 2012, make: "Ferrari", model: "California"},
            {year: 2012, make: "Ferrari", model: "458 Italia"},
            {year: 2012, make: "Lamborghini", model: "Aventador"},
            {year: 2012, make: "Lamborghini", model: "Gallardo LP-570"},
            {year: 2012, make: "Porsche", model: "911 GT3"},
            {year: 2012, make: "McLaren", model: "MP14-12C"},
            {year: 2012, make: "Koenigsegg", model: "CCX"},
            {year: 1971, make: "Plymouth", model: "(Hemi) Barracuda"},
            {year: 1967, make: "Ford", model: "Shelby Mustang GT500"},
            {year: 1972, make: "Jaguar", model: "E-Type"}

         ];
         
         vm.localCars = new kendo.data.DataSource({data: vm.cars, pageSize: 5});
         
         vm.localCars.read();
              $("#cars").kendoGrid({
                        dataSource: {data: vm.cars, pageSize: 5},
                        groupable: true,
                        sortable: true,
                        filtering: true,
                        pageable: {
                            refresh: true,
                            pageSizes: true,
                            input: true,
                            numeric: false
                        },
                        editable: "inline",
                        columns: [ {
                                field: "year",
                                width: 70,
                                title: "Year",
                                format: "{0000}"
                            } , {
                                field: "make",
                                title: "Make"
                            } , {
                               field: "model",
                                width: 130,
                                title: "Model"
                            } ,
                            { command: ["edit", "destroy"], width: "210px" }
                        ]
                    });

         }
   }
})();