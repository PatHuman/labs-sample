'use strict';

import mongoose from 'mongoose';

var PsetupSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Psetup', PsetupSchema);
