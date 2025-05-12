let currentUser = JSON.parse(localStorage.getItem("current_user"));
if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("username").innerText = currentUser.name;
const noteList = document.getElementById("noteList");

function renderNotes() {
  noteList.innerHTML = "";

  currentUser.resources.forEach((note, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "editable";
    span.innerText = note;
    span.contentEditable = false;

    // Edit button
    const editBtn = document.createElement("span");
    editBtn.className = "action-btn-small";
    editBtn.innerText = "Edit";
    editBtn.onclick = () => {
      span.contentEditable = true;
      span.focus();
    };

    // Save on blur
    span.onblur = () => {
      const newText = span.innerText.trim();
      if (newText && newText !== currentUser.resources[index]) {
        currentUser.resources[index] = newText;
        updateUserData();
      }
      span.contentEditable = false;
    };

    // Delete icon
    const delImg = document.createElement("img");
    delImg.src = "img/bin_icon.webp";
    delImg.alt = "Delete";
    delImg.className = "icon";
    delImg.onclick = () => {
      currentUser.resources.splice(index, 1);
      updateUserData();
      renderNotes();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delImg);
    noteList.appendChild(li);
  });
}

function addNote() {
  const text = document.getElementById("noteInput").value.trim();
  if (!text) return;

  currentUser.resources.push(text);
  document.getElementById("noteInput").value = "";
  updateUserData();
  renderNotes();
}

function updateUserData() {
  const users = JSON.parse(localStorage.getItem("mymentor_users")) || [];
  const idx = users.findIndex((u) => u.name === currentUser.name);
  if (idx !== -1) {
    users[idx] = currentUser;
    localStorage.setItem("mymentor_users", JSON.stringify(users));
    localStorage.setItem("current_user", JSON.stringify(currentUser));
  }
}

renderNotes();
