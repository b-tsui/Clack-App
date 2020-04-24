const fullName = document.getElementById("fullName");
const nameDisplay = document.getElementById("nameDisplay")
fullName.innerHTML = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");
nameDisplay.innerHTML = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");

