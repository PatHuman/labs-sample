'use strict';

import mongoose from 'mongoose';

var ProjectSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Project', ProjectSchema);
