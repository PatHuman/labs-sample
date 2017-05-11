/**
 * Psetup model events
 */

'use strict';

import {EventEmitter} from 'events';
import Psetup from './psetup.model';
var PsetupEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PsetupEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Psetup.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PsetupEvents.emit(event + ':' + doc._id, doc);
    PsetupEvents.emit(event, doc);
  }
}

export default PsetupEvents;
