const mentorKeywords = {
  "Nurzhan Sagyndyq": [
    "internship",
    "cv",
    "resume",
    "linkedin",
    "job",
    "career",
    "application",
    "interview",
    "get experience",
    "student job",
    "entry level",
    "find internship",
  ],
  "Maksat Guliev": [
    "web",
    "website",
    "developer",
    "frontend",
    "html",
    "css",
    "javascript",
    "build websites",
    "web developer",
    "learn web development",
    "create website",
    "fullstack",
    "site",
  ],
  "Bakytzhan Myktybaev": [
    "mobile",
    "app",
    "android",
    "ios",
    "flutter",
    "dart",
    "mobile developer",
    "build apps",
    "create mobile app",
    "apk",
    "smartphone",
    "learn mobile development",
  ],
  "Aibol Zhanybek": [
    "graphic",
    "design",
    "logo",
    "branding",
    "illustration",
    "photoshop",
    "adobe",
    "creative",
    "visual",
    "graphic designer",
    "create designs",
    "learn graphic design",
    "visual",
    "art",
  ],
};

document.getElementById("goal").addEventListener("input", function () {
  const goalText = this.value.toLowerCase();
  const suggestion = document.getElementById("mentorSuggestion");
  let bestMatch = null;

  for (const mentor in mentorKeywords) {
    for (const word of mentorKeywords[mentor]) {
      if (goalText.includes(word)) {
        bestMatch = mentor;
        break;
      }
    }
    if (bestMatch) break;
  }

  suggestion.textContent = bestMatch ? ` Recommended mentor: ${bestMatch}` : "";
});

const mentorInput = document.getElementById("mentor");
const cards = document.querySelectorAll(".box");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    mentorInput.value = card.dataset.mentor;
  });
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value;
    const mentor = mentorInput.value;
    const goal = document.getElementById("goal").value.trim();

    if (!mentor) {
      alert("Please select a mentor.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("mymentor_users")) || [];
    if (users.find((u) => u.name === name)) {
      alert("A user with this name already exists.");
      return;
    }

    const mentorPlans = {
      "Nurzhan Sagyndyq": [
        { text: "Create a professional resume", done: false },
        { text: "Set up your LinkedIn profile", done: false },
        { text: "Fill GitHub with 3+ projects", done: false },
        { text: "Write a cover letter", done: false },
        { text: "Study common interview questions", done: false },
        { text: "Attend 2+ mock technical interviews", done: false },
        { text: "Create a Notion/Trello tracker", done: false },
        { text: "Make a list of 10+ target companies", done: false },
        { text: "Send out 15+ internship applications", done: false },
        { text: "Practice HR interview with a peer", done: false },
      ],
      "Maksat Guliev": [
        { text: "Learn HTML5 and semantics", done: false },
        { text: "Master CSS (Flexbox + Grid)", done: false },
        { text: "Build a responsive layout", done: false },
        { text: "Study JavaScript basics", done: false },
        { text: "Create a To-Do List using localStorage", done: false },
        { text: "Understand DOM and events", done: false },
        { text: "Make a single-page application (SPA)", done: false },
        { text: "Build a mini portfolio site", done: false },
        { text: "Deploy it on GitHub Pages", done: false },
        { text: "Learn fetch and API integration", done: false },
      ],
      "Bakytzhan Myktybaev": [
        { text: "Learn Dart and Flutter basics", done: false },
        { text: "Install and configure Android Studio", done: false },
        { text: "Build your first mobile app", done: false },
        { text: "Create UI using Column, Row, and Stack", done: false },
        { text: "Add navigation between screens", done: false },
        { text: "Work with lists and form inputs", done: false },
        { text: "Use local storage (shared prefs)", done: false },
        { text: "Build a CRUD app (like notes)", done: false },
        { text: "Test on Android device or emulator", done: false },
        { text: "Learn how to publish to Google Play", done: false },
      ],
      "Aibol Zhanybek": [
        { text: "Learn the basics of graphic design principles", done: false },
        { text: "Master Adobe Photoshop or Illustrator", done: false },
        { text: "Create your first logo design", done: false },
        { text: "Develop a personal branding concept", done: false },
        { text: "Work on typography and color theory", done: false },
        { text: "Create a digital portfolio", done: false },
        { text: "Take part in a design challenge", done: false },
        { text: "Learn how to use vectors in design", done: false },
        { text: "Experiment with UI/UX design for apps", done: false },
        { text: "Publish your designs on Behance or Dribbble", done: false },
      ],
    };

    const newUser = {
      name,
      password,
      mentor,
      goal,
      tasks: mentorPlans[mentor] || [],
      resources: [],
    };

    users.push(newUser);
    localStorage.setItem("mymentor_users", JSON.stringify(users));
    localStorage.setItem("current_user", JSON.stringify(newUser));

    alert("Registration successful!");
    window.location.href = "profile.html";
  });
