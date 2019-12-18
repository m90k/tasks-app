'use strict';

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route');

Route.post('/users', 'UserController.store').validator('User');
Route.post('/session', 'SessionController.store').validator('Session');

Route.post('/forgot', 'ForgotPasswordController.store').validator(
  'ForgotPassword',
);
Route.put('/forgot', 'ForgotPasswordController.update').validator(
  'ResetPassword',
);

Route.post('/files', 'FileController.store');
Route.get('/files/:id', 'FileController.show');

Route.post('/files', 'FileController.store');

Route.group(() => {
  Route.get('/files/:id', 'FileController.show');
  Route.resource('/projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store'], ['Project']]]));
  Route.resource('/projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]]));
}).middleware(['auth']);
