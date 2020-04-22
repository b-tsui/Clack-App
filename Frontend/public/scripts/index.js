const socket = io.connect("http://localhost:8080");

document.addEventListener("DOMContentLoaded", async (event) => {
    //grabbing userid from local storage
    const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
    const name = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");
    try {
        const user = await fetch(`http://localhost:8000/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        })

        if (user.status === 401) {
            window.location.href = '/log-in';
            return
        }
        //grabbing messages for main page
        const allMessages = await fetch(`http://localhost:8000/channels/1/messages`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        })
        const { Messages } = await allMessages.json()
        console.log(Messages);
        const messagesContainer = document.querySelector(".texts");
        const messagesHTML = Messages.map(
            ({ message, User: { fullName }, createdAt }) => `
			<div class="message">
				<span class="message-author">
					<strong>${fullName}</strong> : 
				</span>
				<span class="message-body">
				<span class="message-text"> ${message}</span>
                </span>
                <span class="timestamp">
                     (${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}:${new Date(createdAt).getSeconds()})
                </span>
			</div>
			`
        );
        messagesContainer.innerHTML += messagesHTML.join("");
    }
    catch (e) {
        console.error(e);
    }

    // Get the modal
    let chatContainer = document.querySelector(".chat-container");
    let modal = document.getElementById("modal");

    // Get the button that opens the modal
    let modalButton = document.getElementById("modalButton");

    let channelDropdown = document.getElementById("channelDropdown");
    let channels = document.querySelector(".channel");


    // let dm = document.querySelector(".directMessage");
    let dmDropdown = document.getElementById("dmDropdown");
    let dms = document.querySelector(".dms");

    modalButton.addEventListener("click", event => {
        modal.style.display = "block";
        modal.removeAttribute("modal-transform");
    });
    
    //update the position/style for the profile pop-up to be on the right side once click on the 'view profile'
    const profile = document.getElementById("profile");
    profile.addEventListener("click", event =>{
        modal.setAttribute("id", "modal-transform");
        //add edit button for the profile
        const editButton = document.createElement("button");
        editButton.setAttribute("id", "editButton")
        const textEditButton = document.createTextNode("Edit profile");
        editButton.appendChild(textEditButton);
        modal.appendChild(editButton);
        //add message button to chat with the user
        const chatButton = document.createElement("button");
        chatButton.setAttribute("id", "chatButton")
        const textChatButton = document.createTextNode("Message");
        chatButton.appendChild(textChatButton);
        modal.appendChild(chatButton);
        //styling img for the user to be bigger by adding an id and styling it on side-panel.css
        const avatar = document.getElementById("avatar");
        avatar.setAttribute("id", "avatar-transform")
        //removing the profile button 
        profile.setAttribute("id", "profile-transform");
        
    })

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

    


    const input = document.getElementById("messages")
    const broadcast = document.querySelector(".broadcast")
    const messageDisplay = document.querySelector(".texts")
    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            try {
                const message = await fetch(`http://localhost:8000/channels/1/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
                    },
                    body: JSON.stringify({
                        userId,
                        message: input.value,
                    })
                })
            }
            catch (e) {
                console.error(e);
            }
            socket.emit("chat", { message: input.value, sender: name });
            input.value = "";
        }
    });
    input.addEventListener("keypress", even => {
        socket.emit("typing", "test");
    });
    socket.on("chat", data => {
        broadcast.innerHTML = "";
        let chatTimeStamp = `(${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()})`
        messageDisplay.innerHTML += `<div><strong>${data.sender}</strong> : ${data.message}    ${chatTimeStamp}</div>`;
    });

    socket.on("typing", data => {
        broadcast.innerHTML = `<div><em>${data} is typing a message...</em</div>`;
    });
})



