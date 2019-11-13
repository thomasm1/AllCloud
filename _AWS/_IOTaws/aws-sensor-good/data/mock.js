'use strict';

const things = require('./things'),
  Thing = require('../models/thing'),
  users = require('./users'),
  transfile = require('../lib/transfile');

  // Demo purposes only 
module.exports.insertData = () => {
  users.createUser('tom', 'pass', () => {});
  users.createUser('1234', '1234', () => {});
  users.createUser('user-name', 'password', () => {});

  const files = transfile(__dirname + '/mock_things/');
  for (let key in files) {
    let thing = files[key];
    things.importThing(thing.name, thing.toppings, thing.img, thing.username);
  }

  // prep toppings
  require('./toppings.js').initToppings();
};
