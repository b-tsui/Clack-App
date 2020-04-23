document.addEventListener("DOMContentLoaded", async (event) => {
    const port = await fetch('/');
    const { url } = port;
    const socket = io.connect(`${url}`);

    //grabbing userid from local storage
    const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
    const name = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");

    const chatWin = document.querySelector(".chatWin");
    const input = document.getElementById("messages");
    const broadcast = document.querySelector(".broadcast");
    const boldTag = document.getElementById("bold"); //grabbing bold from icon bar to test emoji toggling


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
        const { Messages } = await allMessages.json();
        const messagesContainer = document.querySelector(".messageDisplay");
        //creates an array of html divs containing messages from db
        const messagesHTML = Messages.map(
            ({ message, User: { fullName }, createdAt }) => {
                let div = document.createElement("div");
                div.style.paddingLeft = "10px";
                div.style.paddingBottom = "10px";
                div.innerHTML = `<div><strong>${fullName}</strong> : <span id="message">${message}</span><span id="emojiMessage" class="hidden">${emojiTranslate(message)}</span>    ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}:${new Date(createdAt).getSeconds()}</div>`;
                return div;
            })
        messagesHTML.forEach(message => {
            chatWin.appendChild(message);
            message.scrollIntoView(false)
        })
        //old way to get messages from db onto screen
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

        //grabbing channels for side-panel

    }
    catch (e) {
        console.error(e);
    }

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
        if (boldTag.classList.contains("emojiView")) {
            div.innerHTML = `<div><strong>${data.sender}</strong> : <span id="message" class="hidden">${data.message}</span><span id="emojiMessage">${emojiTranslate(data.message)}</span>   ${chatTimeStamp}</div>`;
        } else {
            div.innerHTML = `<div><strong>${data.sender}</strong> : <span id="message">${data.message}</span><span id="emojiMessage" class="hidden">${emojiTranslate(data.message)}</span>   ${chatTimeStamp}</div>`;
        }
        chatWin.appendChild(div); // slack puts the texts on the bottom and it stacks underneath pushing old one higher up
        div.scrollIntoView(false); // .scrollIntoView() = .scrollIntoView(true) - all work the same in the case with appendChild() vs prepend()
        // messageDisplay.innerHTML += `<div><strong>${data.sender}</strong> : ${data.message}    ${chatTimeStamp}</div>`;

    });

    socket.on("typing", data => {
        broadcast.innerHTML = `<div><em>${data} is typing a message...</em</div>`;


    });

    //-----------------------------------------------------------------------------------
    // EMOJI TOGGLE FUNCTIONS
    function emojiTranslate(message) {
        const alphabet = {
            a: ["🅰️"],
            b: ["🅱️"],
            c: ["©️"],
            d: ["↩️"],
            e: ["📧"],
            f: ["🎏"],
            g: ["ⓖ"],
            h: ["♓"],
            i: ["ℹ️"],
            j: ["ʝ"],
            k: ["ⓚ"],
            l: ["👢"],
            m: ["Ⓜ️"],
            n: ["ⓝ"],
            o: ["🅾️"],
            p: ["🅿️"],
            q: ["🔍"],
            r: ["®️"],
            s: ["💲"],
            t: ["✝️"],
            u: ["⛎"],
            v: ["♈"],
            w: ["〰️"],
            x: ["❌"],
            y: ["✌🏻"],
            z: ["💤"],
            1: ["1️⃣"],
            2: ["2️⃣"],
            3: ["3️⃣"],
            4: ["4️⃣"],
            5: ["5️⃣"],
            6: ["6️⃣"],
            7: ["7️⃣"],
            8: ["8️⃣"],
            9: ["9️⃣"],
            0: ["0️⃣"],
            "?": ["❓"],
            "!": ["❗️"],
            " ": [""],
            ".": ["❀"]
        };
        return message.toLowerCase().split('').map(char => {
            if (char in alphabet) {
                return alphabet[char][0];
            } else {
                return char;
            }
        }).join('')

    }

    boldTag.addEventListener('click', e => {
        boldTag.classList.toggle("emojiView")//this is how socket knows if emojiView is on or not
        let allEmojiMessageSpans = document.querySelectorAll("#emojiMessage");
        let allMessageSpans = document.querySelectorAll('#message');
        allMessageSpans.forEach(messageSpan => {
            messageSpan.classList.toggle("hidden");
        })

        allEmojiMessageSpans.forEach(emojiMessageSpan => {
            emojiMessageSpan.classList.toggle("hidden");
        })
    })




})



