'use strict';

const _ = require('lodash'),
  Thing = require('../models/thing'),
  ImageStore = require('../lib/imageStore'),
  things = {};

function createThing (name, toppings, img, username, callback) {
  ImageStore.saveImage(name.replace(/ /g, '-'), img, (err, imgUrl) => {
    if (err) throw err;

    let thing = new Thing(name, toppings, imgUrl, username);
    things[thing.id] = thing;
    callback(null, thing);
  });
}

// for mocks that don't need thing images saved
function importThing (name, toppings, imgUrl, username) {
  let thing = new Thing(name, toppings, imgUrl, username);
  things[thing.id] = thing;
}

function getThingForUser (username, callback) {
  let userThings = _.filter(things, (thing) => {
    return thing.username === username;
  });
  callback(null, userThings);
}

function getRecentThings (callback) {
  let recentThings = _.orderBy(things, ['created'], ['desc']);
  callback(null, _.values(recentThings).splice(0, 5));
}

function getThing (thingId, callback) {
  if (!things[thingId]) callback('Thing not found');
  else callback(null, things[thingId]);
}

module.exports.createThing = createThing;
module.exports.importThing = importThing;
module.exports.getThingForUser = getThingForUser;
module.exports.getThing = getThing;
module.exports.getRecentThings = getRecentThings;
