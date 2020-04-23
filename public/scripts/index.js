document.addEventListener("DOMContentLoaded", async (event) => {
    const port = await fetch('/');
    const { url } = port;
    const socket = io.connect(`${url}`);

    //grabbing userid from local storage
    const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
    const name = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");
    try {
        const user = await fetch(`https://clackbackend.herokuapp.com/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        })
        if (user.status === 404) {
            window.location.href = '/log-in'
            return
        }
        if (user.status === 401) {
            window.location.href = '/log-in';
            return
        }
        //grabbing messages for main page
        const allMessages = await fetch(`https://clackbackend.herokuapp.com/channels/1/messages`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        })
        const { Messages } = await allMessages.json()
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

        //grabbing channels for side-panel

    }
    catch (e) {
        console.error(e);
    }

    const chatWin = document.querySelector(".chatWin");
    const input = document.getElementById("messages");
    const broadcast = document.querySelector(".broadcast");
    //const messageDisplay = document.querySelector(".messageDisplay");

    

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            
            try {
                const message = await fetch(`https://clackbackend.herokuapp.com/channels/1/messages`, {
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
    input.addEventListener("keypress", event => {
        socket.emit("typing", "test");
        
    });
    socket.on("chat", data => {
        broadcast.innerHTML = "";
        let chatTimeStamp = `(${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()})`;
        let div = document.createElement("div");
        div.style.paddingLeft = "10px";
        div.style.paddingBottom = "10px";
        div.innerHTML = `<div><strong>${data.sender}</strong> : ${data.message}    ${chatTimeStamp}</div>`;
        chatWin.appendChild(div); // slack puts the texts on the bottom and it stacks underneath pushing old one higher up
        div.scrollIntoView(false); // .scrollIntoView() = .scrollIntoView(true) - all work the same in the case with appendChild() vs prepend()
        // messageDisplay.innerHTML += `<div><strong>${data.sender}</strong> : ${data.message}    ${chatTimeStamp}</div>`;
        
    });

    socket.on("typing", data => {
        broadcast.innerHTML = `<div><em>${data} is typing a message...</em</div>`;
        
        
    });

    
})



