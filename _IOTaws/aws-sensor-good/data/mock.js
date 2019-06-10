'use strict';

const things = require('./things'),
  Thing = require('../models/thing'),
  users = require('./users'),
  transfile = require('../lib/transfile');

module.exports.insertData = () => {
  users.createUser('ryan', 'pass', () => {});
  users.createUser('jim', 'pass', () => {});
  users.createUser('kathy', 'pass', () => {});

  const files = transfile(__dirname + '/mock_things/');
  for (let key in files) {
    let thing = files[key];
    things.importThing(thing.name, thing.toppings, thing.img, thing.username);
  }

  // prep toppings
  require('./toppings.js').initToppings();
};
