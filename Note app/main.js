const notesContainer = document.querySelector(".note-container");
const createBtn = document.querySelector(".btn");

let notes = document.querySelectorAll(".note");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let noteDiv = document.createElement("div");
  noteDiv.className = "note";

  let heading = document.createElement("div");
  heading.className = "note-heading";
  heading.contentEditable = true;
  heading.innerText = "Heading";

  let inputBox = document.createElement("div");
  inputBox.className = "input-box";
  inputBox.contentEditable = true;
  inputBox.innerText = "Write something...";

  let img = document.createElement("img");
  img.src = "./notes-app-img/images/delete.png";

  // Append elements correctly
  noteDiv.appendChild(heading);
  noteDiv.appendChild(inputBox);
  noteDiv.appendChild(img);
  notesContainer.appendChild(noteDiv);

  // Clear default text on focus
  heading.addEventListener("focus", () => {
    if (heading.innerText === "Heading") heading.innerText = "";
  });
  inputBox.addEventListener("focus", () => {
    if (inputBox.innerText === "Write something...") inputBox.innerText = "";
  });

  updateStorage();
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

notesContainer.addEventListener("keyup", () => {
  updateStorage();
});
