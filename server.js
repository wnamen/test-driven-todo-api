// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/search', function searchpage(req, res) {
  res.sendFile(__dirname + '/views/search.html');
})


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

   var keyword = req.query.q;

   var results = todos.filter(function(item) {
     return ((item.task.toLowerCase().indexOf(keyword.toLowerCase()) != -1) || (item.description.toLowerCase().indexOf(keyword.toLowerCase()) != -1));
   });

   res.json({todos: results});
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  var id = todos[todos.length - 1]._id + 1;
  var newTodo = {_id: id, task: req.body.task, description: req.body.description};

  todos.push(newTodo);
  res.json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var id = req.params.id;

   var result = todos.find(function(task){
     return task._id == id});
   res.json(result);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

   var id = req.params.id;

   var index = todos.findIndex(function(task) {
     return task._id == id;
   })

   var item = todos[index];
   item.task = req.body.task;
   item.description = req.body.description;

   res.json(item);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

   var id = req.params.id;

   var index = todos.findIndex(function(task) {
     return task._id == id;
   })

   todos.splice(index, 1);
   res.json(todos);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
