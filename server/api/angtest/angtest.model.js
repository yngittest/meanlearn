'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './angtest.events';

var AngtestSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(AngtestSchema);
export default mongoose.model('Angtest', AngtestSchema);
