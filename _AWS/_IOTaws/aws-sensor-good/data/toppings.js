'use strict';

const Topping = require('../models/topping'),
  _ = require('lodash');

const toppings = {};

function initToppings (callback) {
  createTopping('Thing a', 'a.png', 'a.png', 1);
  createTopping('Thing b', 'b.png', 'b.png', 2);
  createTopping('Thing c', 'c.png', 'c.png', 3);
  createTopping('Thing d', 'd.png', 'd.png', 4);
  createTopping('Thing e', 'e.png', 'e.png', 5);
  createTopping('Thing e1', 'e1.png', 'e1.png', 6);
  createTopping('Thing f', 'f.png', 'f.png', 7);
  createTopping('Thing g', 'g.png', 'g.png', 8);
  createTopping('Thing h', 'h.png', 'h.png', 9);
  createTopping('Thing i', 'i.png', 'i.png', 10);
  createTopping('Thing j', 'j.png', 'j.png', 11);
  createTopping('Thing k', 'k.png', 'k.png', 12);
  if (callback) callback();
}

function getAllToppings (callback) {
  let tops = _.values(toppings);
  callback(null, _.sortBy(tops, ['order']));
}

function createTopping (name, preview_image, image, order) {
  let id = name.replace(/ /g, '_').toLowerCase(),
    topping = new Topping(id, name, preview_image, image, order);

  toppings[id] = topping;
}

module.exports.getAllToppings = getAllToppings;
module.exports.initToppings = initToppings;
