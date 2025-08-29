onload(displayLists());

function popup() { 
    const popupContainer = document.createElement("div");
    popupContainer.innerHTML = `
    <div id="popup-container">
        <h1> List 1 </h1>
        
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
    
        const list = {
            id: new Date().getTime(),
            list: JSON.stringify(listContainer),
        };

        let existingLists = JSON.parse(localStorage.getItem('lists'))  || [];

        if (!Array.isArray(existingLists)) {
            existingLists = [];  
        }

        existingLists.push(list);

        localStorage.setItem('lists', JSON.stringify(existingLists));
        document.getElementById('list-container').value = '';
        
        console.log("removing");
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
        <span>1</span>
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
    const listContainer = document.getElementById("list-container");
    const editingPopup = document.createElement("div");

    editingPopup.innerHTML

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
