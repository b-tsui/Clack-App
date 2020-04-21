const socket = io.connect("http://localhost:8080");
window.addEventListener("DOMContentLoaded", event => {
    // Get the modal
    let modal = document.getElementById("modal");

    // Get the button that opens the modal
    let button = document.getElementById("button");


    button.addEventListener("click", event => {
        modal.style.display = "block";
    });
    const input = document.getElementById("messages")
    const broadcast = document.querySelector(".broadcast")
    const messageDisplay = document.querySelector(".texts")
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            socket.emit("chat", { message: input.value, sender: "test" });
            input.value = "";
        }
    });
    input.addEventListener("keypress", even => {
        socket.emit("typing", "test");
    });
    socket.on("chat", data => {
        broadcast.innerHTML = "";
        messageDisplay.innerHTML += `<div><strong>${data.sender}:</strong> ${data.message}</div>`;
    });

    socket.on("typing", data => {
        broadcast.innerHTML = `<div><em>${data} is typing a message...</em</div>`;
    });
})
