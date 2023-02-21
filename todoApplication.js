let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveButton = document.getElementById("saveTodoButton");
//localStorage.removeItem("todoList");

function getTodoListFromLocalStoarge() {
    let strinifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(strinifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}


let todoList = getTodoListFromLocalStoarge();
let todoCount = todoList.length;
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onTodoStatusChange(labelId, checkboxId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    console.log(todoObjectIndex);
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoList.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

    /*if (checkboxElement.checked === true) {
        labelElement.classList.add("checked");
    } else {
        labelElement.classList.remove("checked");
    }*/
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    //console.log(deleteItemIndex);
    todoList.splice(deleteItemIndex, 1);
}

function CreateAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;


    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onTodoStatusChange(labelId, checkboxId, todoId);
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
    console.log(todoItemsContainer);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement('div');
    deleteContainer.classList.add('delete-icon-container');
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }
    deleteContainer.appendChild(deleteIcon);

}
/*CreateAndAppendTodo(todoList[0]);
CreateAndAppendTodo(todoList[1]);
CreateAndAppendTodo(todoList[2]);*/

for (let todo of todoList) {
    CreateAndAppendTodo(todo);
}


function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter a valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };

    console.log(todoList);
    todoList.push(newTodo);
    CreateAndAppendTodo(newTodo);
    userInputElement.value = "";
}


let addTodoElement = document.getElementById("addTodoButton");
addTodoElement.onclick = function() {
    onAddTodo();
}