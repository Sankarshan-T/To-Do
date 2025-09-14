// Initialize
window.onload = () => {
    displayLists();
};

// Open the note popup
function popup() {
    const popupContainer = document.createElement("div");

    popupContainer.innerHTML = `
        <div id="popup-container">
            <input type="text" id="list-title" placeholder="Enter list title..." />
            <div class="items">
                <div class="row">
                    <input type="text" id="input-box" placeholder="Enter your task here...">
                    <button onclick="addTask()" class="add">Add</button>
                </div>
                <div id="list-container"><ul></ul></div>
            </div>
            <div id="btn-container">
                <button id="submitBtn" onclick="createList()">Create Note</button>
                <button id="closeBtn" onclick="closePopup()">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(popupContainer);

    const listContainer = document.getElementById("list-container");

    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
        }
    });
}

// Create and save a new list
function createList() {
    const popupContainer = document.getElementById("popup-container");
    const listContainer = document.getElementById("list-container");
    const listTitle = document.getElementById("list-title").value || "Untitled";

    const list = {
        id: Date.now(),
        title: listTitle,
        list: listContainer.innerHTML
    };

    let lists = JSON.parse(localStorage.getItem("lists")) || [];
    lists.push(list);

    localStorage.setItem("lists", JSON.stringify(lists));

    closePopup();
    displayLists();
}

// Close the popup
function closePopup() {
    const popupContainer = document.getElementById("popup-container");
    if (popupContainer) popupContainer.remove();
}

// Display saved lists
function displayLists() {
    const tasksList = document.getElementById("tasks-list");
    tasksList.innerHTML = "";

    const lists = JSON.parse(localStorage.getItem("lists")) || [];

    lists.forEach((list) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list");

        listItem.innerHTML = `
            <span>${list.title}</span>
            <div id="noteBtns-container">
                <button id="editBtn" onclick="editList(${list.id})"><i class="fa-solid fa-pen"></i></button>
                <button id="deleteBtn" onclick="deleteNote(${list.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        tasksList.appendChild(listItem);
    });
}

// Edit existing list
function editList(listId) {
    const lists = JSON.parse(localStorage.getItem("lists")) || [];
    const listToEdit = lists.find((list) => list.id === listId);
    if (!listToEdit) return;

    popup();

    document.getElementById("list-title").value = listToEdit.title;
    document.getElementById("list-container").innerHTML = listToEdit.list;

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Update Note";

    submitBtn.onclick = function () {
        listToEdit.title = document.getElementById("list-title").value || "Untitled";
        listToEdit.list = document.getElementById("list-container").innerHTML;

        const updatedLists = lists.map((list) =>
            list.id === listId ? listToEdit : list
        );

        localStorage.setItem("lists", JSON.stringify(updatedLists));
        closePopup();
        displayLists();
    };
}

// Delete note
function deleteNote(listId) {
    let lists = JSON.parse(localStorage.getItem("lists")) || [];
    lists = lists.filter((list) => list.id !== listId);

    localStorage.setItem("lists", JSON.stringify(lists));
    displayLists();
}

// Add a task to the popup
function addTask() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    if (!inputBox.value.trim()) {
        alert("You must enter your task first!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = inputBox.value;

    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Unicode for ×
    

    const tagDropdown = document.createElement("select");

    const tag1 = document.createElement("option");
    tag1.value = "Math";
    tag1.textContent = "Math";

    const tag2 = document.createElement("option");
    tag2.value = "naturalScience";
    tag2.textContent = "Natural Science";

    const tag3 = document.createElement("option");
    tag3.value = "socialScience";
    tag3.textContent = "Social Science";

    const tag4 = document.createElement("option");
    tag4.value = "english";
    tag4.textContent = "English";

    tagDropdown.appendChild(tag1);
    tagDropdown.appendChild(tag2);
    tagDropdown.appendChild(tag3);
    tagDropdown.appendChild(tag4);

    li.appendChild(span);
    li.appendChild(tagDropdown);

    listContainer.appendChild(li);
    inputBox.value = "";
}
