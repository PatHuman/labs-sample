/**
 * Concept model events
 */

'use strict';

import {EventEmitter} from 'events';
import Concept from './concept.model';
var ConceptEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConceptEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Concept.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ConceptEvents.emit(event + ':' + doc._id, doc);
    ConceptEvents.emit(event, doc);
  }
}

export default ConceptEvents;
