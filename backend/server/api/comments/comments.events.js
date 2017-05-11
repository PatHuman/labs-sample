/**
 * Comments model events
 */

'use strict';

import {EventEmitter} from 'events';
import Comments from './comments.model';
var CommentsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CommentsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Comments.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CommentsEvents.emit(event + ':' + doc._id, doc);
    CommentsEvents.emit(event, doc);
  }
}

export default CommentsEvents;
