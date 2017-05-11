'use strict';

import mongoose from 'mongoose';

var ConceptSchema = new mongoose.Schema({
  name: String,
  type: String,
  typeid: String,
  project: String,
  public: Boolean,
  retired: Boolean,
  content: String
});

export default mongoose.model('Concept', ConceptSchema);
