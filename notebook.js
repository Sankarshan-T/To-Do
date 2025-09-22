// Initialize
window.onload = () => {
    displayNotebooks();
};

// Open the note popup
function notebookPopup() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "notebookpopup";
    popupContainer.innerHTML = `
        <div id="notebookpopup">
            <input type="text" id="notebook-title" placeholder="Enter notebook title..." />
            <textarea id="notebook-text" placeholder="Enter your notes here..."></textarea>
            <div id="btn-container">
                <button id="submitBtn" onclick="createNotebook()">Create Notebook</button>
                <button id="closeBtn" onclick="closenotebookPopup()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(popupContainer);
}

// Create and save a new notebook
function createNotebook() {
    const notebookText = document.getElementById("notebook-text").value;
    const notebookTitle = document.getElementById("notebook-title").value || "Untitled";

    const notebook = {
        id: Date.now(),
        title: notebookTitle,
        notes: notebookText
    };

    let notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];
    notebooks.push(notebook);


    localStorage.setItem("notebooks", JSON.stringify(notebooks));

    closenotebookPopup();
    displayNotebooks();
}

// Close the popup
function closenotebookPopup() {
    const popupContainer = document.getElementById("notebookpopup");
    if (popupContainer) popupContainer.remove();
}

// Display saved notebooks
function displayNotebooks() {
    const notebookLists = document.getElementById("notebook-list");
    notebookLists.innerHTML = "";

    const notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];

    notebooks.forEach((notebook) => {
        const listItem = document.createElement("li");
        listItem.classList.add("notebook");
        listItem.innerHTML = `
            <span>${notebook.title}</span>
            <div id="noteBtns-container">
                <button id="editBtn" onclick="editList(${notebook.id})"><i class="fa-solid fa-pen"></i></button>
                <button id="deleteBtn" onclick="deleteNotebook(${notebook.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        notebookLists.appendChild(listItem);
    });
}

// Edit existing notebook
function editList(notebookId) {
    const notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];
    const notebookToEdit = notebooks.find((notebook) => notebook.id === notebookId);
    if (!notebookToEdit) return;

    notebookPopup();

    document.getElementById("notebook-title").value = notebookToEdit.title;
    document.getElementById("notebook-text").value = notebookToEdit.notes;

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Update Notebook";

    submitBtn.onclick = function () {
        notebookToEdit.title = document.getElementById("notebook-title").value || "Untitled";
        notebookToEdit.notes = document.getElementById("notebook-text").value;

        const updatedNotebooks = notebooks.map((notebook) =>
            notebook.id === notebookId ? notebookToEdit : notebook
        );

        localStorage.setItem("notebooks", JSON.stringify(updatedNotebooks));
        closenotebookPopup();
        displayNotebooks();
    };
}

// Delete notebook
function deleteNotebook(notebookId) {
    let notebooks = JSON.parse(localStorage.getItem("notebooks")) || [];
    notebooks = notebooks.filter((notebook) => notebook.id !== notebookId);

    localStorage.setItem("notebooks", JSON.stringify(notebooks));
    displayNotebooks();
}
