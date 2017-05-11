'use strict';

import mongoose from 'mongoose';

var ProjectsSchema = new mongoose.Schema({
  name: String,
  category: String,
  categoryid: String,
  status: String,
  description: String,
  public: Boolean,
  retired: Boolean
});

export default mongoose.model('Projects', ProjectsSchema);
