$(document).ready(function() {

  // base API route
  var baseUrl = '/api/todos';

  // array to hold todo data from API
  var allTodos = [];

  // element to display list of todos
  var $todosList = $('#todos-list');

  // form to create new todo
  var $createTodo = $('#create-todo');

  // compile handlebars template
  var source = $('#todos-template').html();
  var template = Handlebars.compile(source);

  // helper function to render all todos to view
  // note: we empty and re-render the collection each time our todo data changes
  function render() {
    // empty existing todos from view
    $todosList.empty();

    // pass `allTodos` into the template function
    var todosHtml = template({ todos: allTodos });

    // append html to the view
    $todosList.append(todosHtml);
  };

  $("#search-todo").submit(function(event) {
    event.preventDefault();

    $.ajax({
      method: "GET",
      url: "/api/todos/search",
      data: $("#search-todo").serialize(),
      success: handleSearch
    })
  })

  function handleSearch(json) {
    allTodos = json.todos;
    render();
  }
});
