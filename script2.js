// --- Persist notices using localStorage ---
let notices = JSON.parse(localStorage.getItem("notices")) || [];

// --- LOGIN LOGIC ---
function login() {
  const role = document.getElementById("roleSelect").value;
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const studentUser = { username: "student", password: "123" };
  const adminUser   = { username: "admin", password: "123" };

  if (role === "student") {
    if (username === studentUser.username && password === studentUser.password) {
      document.getElementById("loginSection").classList.add("hidden");
      document.getElementById("studentSection").classList.remove("hidden");
      displayNotices();
    } else {
      alert("Invalid student credentials!");
    }
  } else if (role === "admin") {
    if (username === adminUser.username && password === adminUser.password) {
      document.getElementById("loginSection").classList.add("hidden");
      document.getElementById("adminSection").classList.remove("hidden");
      displayAdminNotices();
    } else {
      alert("Invalid admin credentials!");
    }
  }
}

// --- LOGOUT LOGIC ---
function logout() {
  document.getElementById("studentSection").classList.add("hidden");
  document.getElementById("adminSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// --- ADD NOTICE (Admin) ---
function addNotice() {
  const text = document.getElementById("noticeText").value.trim();
  const dept = document.getElementById("noticeDept").value;

  if (text === "") {
    alert("Please enter a notice!");
    return;
  }

  notices.push({ text, dept });

  // Save to localStorage so it persists
  localStorage.setItem("notices", JSON.stringify(notices));

  document.getElementById("noticeText").value = "";

  // Refresh both boards
  displayAdminNotices();
  displayNotices();
}

// --- DISPLAY NOTICES (Student) ---
function displayNotices() {
  const branch = document.getElementById("filterBranch").value;
  const board = document.getElementById("noticeBoard");
  board.innerHTML = "";
  board.style.fontSize="30px";
  board.style.color="#991b16";



  const filtered = branch === "All" ? notices : notices.filter(n => n.dept === branch);

  if (filtered.length === 0) {
    board.innerHTML = "<p>No notices available.</p>";
    return;
  }

  filtered.forEach(n => {
    const div = document.createElement("div");
    div.textContent = `[${n.dept}] ${n.text}`;
    board.appendChild(div);
  });
}

// --- DISPLAY NOTICES (Admin) ---
function displayAdminNotices() {
  const branch = document.getElementById("adminFilterBranch").value;
  const board = document.getElementById("adminNoticeBoard");
  board.innerHTML = "";

  const filtered = branch === "All" ? notices : notices.filter(n => n.dept === branch);

  if (filtered.length === 0) {
    board.innerHTML = "<p>No notices available.</p>";
    return;
  }

  filtered.forEach((n, index) => {
    const div = document.createElement("div");
    div.textContent = `[${n.dept}] ${n.text}`;

    // Delete button for admin
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => {
      notices.splice(index, 1);
      localStorage.setItem("notices", JSON.stringify(notices));
      displayAdminNotices();
      displayNotices();
    };

    div.appendChild(delBtn);
    board.appendChild(div);
  });
}
