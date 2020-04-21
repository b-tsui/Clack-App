const socket = io.connect("http://localhost:8080");
window.addEventListener("DOMContentLoaded", event => {
    let chatContainer = document.querySelector(".chat-container");
    // Get the modal
    let modal = document.getElementById("modal");

    // Get the button that opens the modal
    let button = document.getElementById("button");

    let channelDropdown = document.getElementById("channelDropdown");
    let channels = document.querySelector(".channel");

    
    // let dm = document.querySelector(".directMessage");
    let dmDropdown = document.getElementById("dmDropdown");
    let dms = document.querySelector(".dms");

    button.addEventListener("click", event => {
        modal.style.display = "block";
    });

    chatContainer.addEventListener("click", e => {
        if (modal.style.display === "block") {
            modal.style.display = "none";
        }
    });

    channelDropdown.addEventListener("click", e => {
        
        channels.classList.toggle("channel");
    });

    dmDropdown.addEventListener("click", e => {
        
        dms.classList.toggle("dms");
    });
    
    const profile = document.getElementById("profile");
    

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



