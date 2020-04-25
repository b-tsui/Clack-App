import { emojiTranslate, handleErrors } from "./utils.js";
document.addEventListener("DOMContentLoaded", async (event) => {

    //uses a fetch on '/' to grab dynamic port that heroku provides
    //then connects socket to that port
    const port = await fetch('/');
    const { url } = port;
    const socket = io.connect(`${url}`);

    //Grabs userid & fullName from local storage
    const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
    const name = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");
    const channelId = localStorage.getItem("CLACK_CURRENT_CHANNEL_ID");

    //Makes socket rooms for each channel and emits signal to server side
    var socketRoom = `room${channelId}`;
    socket.on('connect', () => {
        socket.emit('room', socketRoom);
    });

    //Grabs all elements for chat container
    const chatWin = document.querySelector(".chatWin");
    const input = document.getElementById("messages");
    const broadcast = document.querySelector(".broadcast");

    //Grabs emoji switch button from navbar to test toggle emojiView
    const emojiSwitch = document.getElementById("emoji-switch");


    try {

        //Checks to see if current user is authorized (logged in)
        const user = await fetch(`https://clackbackend.herokuapp.com/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        });

        // If user is not authorized, redirects them to login page
        if (user.status === 404) {
            window.location.href = '/log-in';
            return;
        }

        if (user.status === 401) {
            window.location.href = '/log-in';
            return;
        }

        //If user is authorized, grabs all messages from database for main channel
        const allMessages = await fetch(`https://clackbackend.herokuapp.com/channels/${channelId}/messages`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        })

        const { Messages } = await allMessages.json();
        const messagesContainer = document.querySelector(".messageDisplay");

        //Creates an array of HTML divs containing messages from database
        //Each div contains the original message and the emoji translated message in span tags,
        //Div will only show one span and hide the other, depending on toggle
        const messagesHTML = Messages.map(
            ({ message, User: { fullName }, createdAt }) => {
                let div = document.createElement("div");
                div.style.paddingLeft = "10px";
                div.style.paddingBottom = "10px";
                div.innerHTML = `<div class="message-text"><strong>${fullName}</strong> : <span class="message">${message}</span><span class="emojiMessage hidden">${emojiTranslate(message)}</span>    (${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}:${new Date(createdAt).getSeconds()})</div>`;
                return div;
            })
        messagesHTML.forEach(message => {
            chatWin.appendChild(message);
            message.scrollIntoView(false);
        });

        //Old implementation to get messages from database onto screen
        // `
        // <div class="message">
        // 	<span class="message-author">
        // 		<strong>${fullName}</strong> : 
        // 	</span>
        // 	<span class="message-body">
        // 	<span class="message-text"> ${message}</span>
        //     </span>
        //     <span class="timestamp">
        //          (${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}:${new Date(createdAt).getSeconds()})
        //     </span>
        // </div>
        // `
        //messagesContainer.innerHTML += messagesHTML.join("");


    }
    catch (e) {
        handleErrors(e);
    }

    //const messageDisplay = document.querySelector(".messageDisplay");


    //Wait for user to press the 'enter' to make a post request for new messages
    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {

            try {
                const message = await fetch(`https://clackbackend.herokuapp.com/channels/${channelId}/messages`, {
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
                handleErrors(e);
            }

            //Emits socket signal for chat
            socket.emit("chat", { message: input.value, sender: name });
            input.value = "";
        }
    });

    //When user types, emits socket signal for typing
    input.addEventListener("keypress", event => {
        socket.emit("typing", name);
    });

    //When a signal for chat is received, displays the new message into the chat window
    socket.on("chat", data => {
        broadcast.innerHTML = "";
        let chatTimeStamp = `(${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()})`;
        let div = document.createElement("div");
        div.style.paddingLeft = "10px";
        div.style.paddingBottom = "10px";

        //Changes display view of messages to show either emoji or original:
        if (emojiSwitch.classList.contains("emojiView")) {
            div.innerHTML = `<div class="message-text"><strong>${data.sender}</strong> : <span class="message hidden">${data.message}</span><span class="emojiMessage">${emojiTranslate(data.message)}</span>   ${chatTimeStamp}</div>`;
        } else {
            div.innerHTML = `<div class="message-text"><strong>${data.sender}</strong> : <span class="message">${data.message}</span><span class="emojiMessage hidden">${emojiTranslate(data.message)}</span>   ${chatTimeStamp}</div>`;
        }

        chatWin.appendChild(div); // slack puts the texts on the bottom and it stacks underneath pushing old one higher up
        div.scrollIntoView(false); // .scrollIntoView() = .scrollIntoView(true) - all work the same in the case with appendChild() vs prepend()
        // messageDisplay.innerHTML += `<div><strong>${data.sender}</strong> : ${data.message}    ${chatTimeStamp}</div>`;
    });

    //When a signal for typing is received, displays a message showing that someone is typing
    socket.on("typing", data => {
        broadcast.innerHTML = `<div><em>${data} is typing a message...</em</div>`;
    });



    //When a user clicks on the emoji view button, toggles the classlists for message
    //spans and the button itself
    emojiSwitch.addEventListener('change', e => {
        emojiSwitch.classList.toggle("emojiView")//this is how socket knows if emojiView is on or not

        const allEmojiMessageSpans = document.querySelectorAll(".emojiMessage");
        const allMessageSpans = document.querySelectorAll('.message');

        allMessageSpans.forEach(messageSpan => {
            messageSpan.classList.toggle("hidden");
        });

        allEmojiMessageSpans.forEach(emojiMessageSpan => {
            emojiMessageSpan.classList.toggle("hidden");
        });
    })

})



