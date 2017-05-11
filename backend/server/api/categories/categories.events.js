/**
 * Categories model events
 */

'use strict';

import {EventEmitter} from 'events';
import Categories from './categories.model';
var CategoriesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CategoriesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Categories.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CategoriesEvents.emit(event + ':' + doc._id, doc);
    CategoriesEvents.emit(event, doc);
  }
}

export default CategoriesEvents;
