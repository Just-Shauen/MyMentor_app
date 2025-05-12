console.log(JSON.parse(localStorage.getItem("mymentor_users")));
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("mymentor_users")) || [];
  const user = users.find((u) => u.name === name && u.password === password);

  if (!user) {
    alert("Incorrect name or password.");
    return;
  }

  localStorage.setItem("current_user", JSON.stringify(user));
  window.location.href = "profile.html";
});
