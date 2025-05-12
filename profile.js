const user = JSON.parse(localStorage.getItem("current_user"));
if (!user) {
  window.location.href = "login.html";
}

document.getElementById("userName").innerText = user.name;
document.getElementById("userMentor").innerText = user.mentor;
document.getElementById("userGoal").innerText = user.goal;

const total = user.tasks.length;
const done = user.tasks.filter((t) => t.done).length;
const percent = total === 0 ? 0 : Math.round((done / total) * 100);
document.getElementById("progressFill").style.width = percent + "%";

function logout() {
  localStorage.removeItem("current_user");
  window.location.href = "login.html";
}
