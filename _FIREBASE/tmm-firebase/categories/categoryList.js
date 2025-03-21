angular.module('app').component('categoryList', {
  templateUrl: 'app/categories/categoryList.html',
  bindings: {
    categories: "="
  },
  controller: function(fbRef, $firebaseArray) {
   
    this.createNewCategory = function() {
      this.categories.$add({name: this.newCategoryName});
      this.newCategoryName = '';
    }
  }
})