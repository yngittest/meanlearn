'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './angtest.events';

var AngtestSchema = new mongoose.Schema({
  // name: String,
  // info: String,
  // active: Boolean
  isbn: String,
  title: String,
  price: Number,
  publish: String,
  imgFilename: String,
  imgBase64: String
});

registerEvents(AngtestSchema);
export default mongoose.model('Angtest', AngtestSchema);
