
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
var todoList = [];

document.getElementById("changeTitleBtn").addEventListener("click", function () {
    const newTitle = document.getElementById("title").value;
    if (newTitle) {
        document.getElementById("page-title").textContent = newTitle;
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert('You must enter your task first!');
    }
    else {
        var lineItemText = inputBox.value;
        let liElem = document.createElement("li");
        liElem.innerHTML = lineItemText;
        var newId = todoList.length;
        liElem.setAttribute("id", newId);
        listContainer.appendChild(liElem);
        let span = document.createElement("span")
        span.innerHTML = '\u00d7';
        liElem.appendChild(span);
        saveLineItem(lineItemText);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        e.target.parentElement.get("id");
        var idToRemove = e.target.parentElement.remove();

        removeLineItem(idToRemove);
        saveData();
       
    }
}, false);
function saveLineItem(itemText) {
    // create this todo line item
    var todo = {
        id: Date.now(),
        lineitem: itemText,
        completed: false
    };
    // add this todo line item to todoList 
    todoList.push(todo);

}
function removeLineItem(id) {

    // remove this todo line item from todoList 
    //TODO
    todoList.splice(id);

}

function saveData() {

    localStorage.setItem("data", listContainer.innerHTML);

}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
