/**
 * Articles model events
 */

'use strict';

import {EventEmitter} from 'events';
import Articles from './articles.model';
var ArticlesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ArticlesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Articles.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ArticlesEvents.emit(event + ':' + doc._id, doc);
    ArticlesEvents.emit(event, doc);
  }
}

export default ArticlesEvents;
