var expectPostTitles = function(expectedTitles, key) {
  element.all(by.repeater(key + ' in posts').column(key + '.title')).then(function(arr) {
    arr.forEach(function(wd, i) {
      expect(wd.getText()).toMatch(expectedTitles[i]);
    });
  });
};

it('should search across all fields when filtering with a string', function() {
  var searchText = element(by.model('searchText'));
  searchText.clear();
  searchText.sendKeys('m');
  expectPostTitles(['mno', 'Mwerty' ], 'post');

  searchText.clear();
  searchText.sendKeys('76');
  expectPostTitles(['Mwerty', 'mno','uios'], 'post');
});

it('should search in specific fields when filtering with a predicate object', function() {
  var searchAny = element(by.model('search.$'));
  searchAny.clear();
  searchAny.sendKeys('i');
  expectPostTitles([ 'thui','uios'], 'postObj');
});
it('should use a equal comparison when comparator is true', function() {
  var searchTitle = element(by.model('search.title'));
  var strict = element(by.model('strict'));
  searchTitle.clear();
  searchTitle.sendKeys('abc');
  strict.click();
  expectPostTitles(['abc'], 'postObj');
});