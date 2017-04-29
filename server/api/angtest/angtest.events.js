/**
 * Angtest model events
 */

'use strict';

import {EventEmitter} from 'events';
var AngtestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AngtestEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Angtest) {
  for(var e in events) {
    let event = events[e];
    Angtest.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    AngtestEvents.emit(event + ':' + doc._id, doc);
    AngtestEvents.emit(event, doc);
  };
}

export {registerEvents};
export default AngtestEvents;
