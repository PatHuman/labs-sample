/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.use('/api/auth', require('./components/auth'));
//  app.use('/api/plans', require('./api/plan'));
app.use('/api/concepts', require('./api/concept'));
//app.use('/api/project-setup', require('./api/psetup'));
//app.use('/api/project', require('./api/project'));
//app.use('/api/projects', require('./api/projects'));
app.use('/api/comments', require('./api/comments'));
app.use('/api/categories', require('./api/categories'));
app.use('/api/articles', require('./api/articles'));
  // All undefined asset or api routes should return a 404
  app.use('/api/test',function(req,res){
    console.log(req.db);
    res.send()
  })
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
