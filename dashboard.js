let currentUser = JSON.parse(localStorage.getItem("current_user"));
if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("username").innerText = currentUser.name;
document.getElementById("mentorName").innerText = currentUser.mentor;

const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";
  currentUser.tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onchange = () => {
      currentUser.tasks[index].done = checkbox.checked;
      updateUserData();
      renderTasks();
    };

    li.appendChild(checkbox);
    li.append(" " + task.text);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = document.getElementById("newTask").value.trim();
  if (!taskText) return;

  currentUser.tasks.push({ text: taskText, done: false });
  document.getElementById("newTask").value = "";
  updateUserData();
  renderTasks();
}

function updateUserData() {
  const users = JSON.parse(localStorage.getItem("mymentor_users")) || [];
  const index = users.findIndex((u) => u.name === currentUser.name);
  if (index !== -1) {
    users[index] = currentUser;
    localStorage.setItem("mymentor_users", JSON.stringify(users));
    localStorage.setItem("current_user", JSON.stringify(currentUser));
  }
}

function logout() {
  localStorage.removeItem("current_user");
  window.location.href = "login.html";
}

renderTasks();
