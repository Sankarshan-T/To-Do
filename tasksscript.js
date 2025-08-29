onload(displayLists());

function popup() { 
    const popupContainer = document.createElement("div");
    popupContainer.innerHTML = `
    <div id="popup-container">
        <input type="text" id="list-title" placeholder="Enter list title..." />
        
        <div class ="items">
            <div class="row">
                <input type="text" id="input-box" placeholder="Enter your task here...">
                <button onclick="addTask()" class="add">Add</button>
            </div>

        
            <div id="list-container">
                <ul>
                </ul>
            </div>
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

function createList() { 
    const popupContainer = document.getElementById("popup-container");
    const listContainer = document.getElementById("list-container");
    const listTitle = document.getElementById("list-title").value;

    const list = {
        id: new Date().getTime(),
        title: listTitle || "Untitled",
        list: listContainer.innerHTML
    };

    let existingLists = JSON.parse(localStorage.getItem('lists'))  || [];

    if (!Array.isArray(existingLists)) {
        existingLists = [];  
    }

    existingLists.push(list);

    localStorage.setItem('lists', JSON.stringify(existingLists));
    document.getElementById('list-container').value = '';
            
    popupContainer.remove();
    displayLists();
}
        


function closePopup() {
    const popupContainer = document.getElementById("popup-container");
    if(popupContainer) {
        popupContainer.remove();
    }
}

function displayLists() {
    const tasksList = document.getElementById("tasks-list");
    tasksList.innerHTML = '';

    const lists = JSON.parse(localStorage.getItem('lists')) || [];

    lists.forEach(list => {
        const listitem = document.createElement("li");
        listitem.classList.add("list");
        listitem.innerHTML = `
        <span>${list.title}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editList(${list.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${list.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        tasksList.appendChild(listitem);    
    });
}

 function editList(listId) {
    
    const lists = JSON.parse(localStorage.getItem('lists')) || [];
    const listToEdit = lists.find(list => list.id === listId);
    
    if (!listToEdit) return;

    popup();

    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = listToEdit.list;

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Update Note";

    submitBtn.onclick = function () {
        listToEdit.title = document.getElementById("list-title").value || "Untitled";
        listToEdit.list = listContainer.innerHTML;
    

    const updatedLists = lists.map(list =>
            list.id === listId ? listToEdit : list
    );

    localStorage.setItem('lists', JSON.stringify(updatedLists));
    closePopup();
    displayLists();
    };

} 

function deleteNote(listId) {
    let lists = JSON.parse(localStorage.getItem('lists')) || [];

    lists = lists.filter(list => list.id !== listId);

    localStorage.setItem('lists', JSON.stringify(lists));

    displayLists();
}

function addTask() {
       const inputBox = document.getElementById("input-box");  
       const listContainer = document.getElementById("list-container");
       if (inputBox.value === '') {
           alert('You must enter your task first!');
       }
       else {
           let li= document.createElement("li");
           li.innerHTML = inputBox.value;
           listContainer.appendChild(li);
           let span = document.createElement("span")
           span.innerHTML = '\u00d7';
           li.appendChild(span);
       }
       inputBox.value = '';
     
}

function saveData() {
    const listContainer = document.getElementById("list-container");
    if (listContainer) {
            localStorage.setItem("data", listContainer.innerHTML);
    }
}

function showTask() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = localStorage.getItem("data")
}
