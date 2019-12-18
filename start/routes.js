'use strict';

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route');

Route.post('/users', 'UserController.store').validator('User');
Route.post('/session', 'SessionController.store');
Route.post('/forgot', 'ForgotPasswordController.store');
Route.put('/forgot', 'ForgotPasswordController.update');

Route.post('/files', 'FileController.store');
Route.get('/files/:id', 'FileController.show');

Route.post('/files', 'FileController.store');

Route.group(() => {
  Route.get('/files/:id', 'FileController.show');
  Route.resource('/projects', 'ProjectController').apiOnly();
  Route.resource('/projects.tasks', 'TaskController').apiOnly();
}).middleware(['auth']);
