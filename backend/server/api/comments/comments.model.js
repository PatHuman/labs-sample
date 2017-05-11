'use strict';

import mongoose from 'mongoose';

var CommentsSchema = new mongoose.Schema({
  entity: String,
  entityname: String,
  enttytype: String,
  comment: String,
  owner: String,
  ownerid: String,
  created: Date,
  updated: Date,
  retired: Boolean
});

export default mongoose.model('Comments', CommentsSchema);
