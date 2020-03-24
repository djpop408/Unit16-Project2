$(document).ready(function() {
    // Getting a reference to the input field where user adds a new todo
    var $newItemInput = $("input.new-item");
    var postSeasonSelect = $("#season");
    // Giving the postSeasonSelect a default value
    postSeasonSelect.val("All");
    // Our new todos will go inside the todoContainer
    var $todoContainer = $(".todo-container");
    // Adding event listeners for deleting, editing, and adding todos
    $(document).on("click", "button.delete", deleteTodo);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".todo-item", editTodo);
    $(document).on("keyup", ".todo-item", finishEdit);
    $(document).on("blur", ".todo-item", cancelEdit);
    $(document).on("submit", "#todo-form", insertTodo);
  
    // Our initial todos array
    var todos = [];
  
    // Getting todos from database when page loads
    getTodos();
  
    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
      $todoContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < todos.length; i++) {
        rowsToAdd.push(createNewRow(todos[i]));
      }
      $todoContainer.prepend(rowsToAdd);
    }
  
    // This function grabs todos from the database and updates the view
    function getTodos() {
      $.get("/api/packinglists", function(data) {
        todos = data;
        initializeRows();
      });
    }
  
    // This function deletes a todo when the user clicks the delete button
    function deleteTodo(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/packinglists/" + id
      }).then(getTodos);
    }

    // This function deletes a todo when the user clicks the delete button
    function deleteAllTodo(event) {
        event.stopPropagation();
        //var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/packinglists/"
        }).then(getTodos);
    }
  
    // This function handles showing the input box for a user to edit a todo
    function editTodo() {
      var currentTodo = $(this).data("todo");
      $(this).children().hide();
      $(this).children("input.edit").val(currentTodo.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var todo = $(this).parent().data("todo");
      todo.complete = !todo.complete;
      updateTodo(todo);
    }
  
    // This function starts updating a todo in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedTodo = $(this).data("todo");
      if (event.which === 13) {
        updatedTodo.text = $(this).children("input").val().trim();
        $(this).blur();
        updateTodo(updatedTodo);
      }
    }
  
    // This function updates a todo in our database
    function updateTodo(todo) {
      $.ajax({
        method: "PUT",
        url: "/api/packinglists",
        data: todo
      }).then(getTodos);
    }
  
    // This function is called whenever a todo item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentTodo = $(this).data("todo");
      if (currentTodo) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentTodo.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a todo-item row
    function createNewRow(todo) {
      var $newInputRow = $(
        [
          "<li class='list-group-item todo-item'>",
          "<span class='item-text'>",
          todo.text,
          "</span>",
          "<span class='quantity-text'>&times;&nbsp; ",
          todo.quantity,
          "</span>",
          "<span class='season-text season-color-",
          todo.season,
          "'>",
          todo.season,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", todo.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("todo", todo);
      if (todo.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new todo into our database and then updates the view
    function insertTodo(event) {
      event.preventDefault();
      var todo = {
        text: $newItemInput.val().trim(),
        quantity: 1,
        season: postSeasonSelect.val(),
        complete: false
      };
  
      $.post("/api/packinglists", todo, getTodos);
      $newItemInput.val("");
    }


    //weather stuff
    console.log(currentWeather);

    function initialPackinglist() {
        // Packinglist.sync().then(() => {
        //   //Spring-Summer season
        //   Packinglist.create({ item: "Swim Shorts", quantity: 1, season: "Summer" });
        //   Packinglist.create({ item: "Sunscreen", quantity: 1, season: "Summer" });
        //   //Fall-Winter season
        //   Packinglist.create({ item: "Down Jacket", quantity: 1, season: "Winter" });
        //   Packinglist.create({ item: "Scarf", quantity: 1, season: "Winter" });
        // });
        
        if (currentWeather >= 78) {
            console.log('hot weather')
        } else {
            console.log('cold weather')
        }

        // $.post("/api/packinglists", todo, getTodos);
    };

    initialPackinglist();
    
    // dynamically change the minimum end date
    $(document).on("click", "#start-over", deleteAllTodo)

  });
  