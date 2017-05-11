'use strict';

import mongoose from 'mongoose';

var PlanSchema = new mongoose.Schema({
  name: String,
  type: String,
  typeid: String,
  content: String,
  completed: Boolean,
  retired: Boolean
});

export default mongoose.model('Plan', PlanSchema);
