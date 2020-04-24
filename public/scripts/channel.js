import { emojiTranslate, handleErrors } from "./utils.js";

//add channel: pop-up where you can add the name for the channel once done, the user will be the owner for it
const addChannel = document.getElementById("addChannel");
const addChannelModal = document.getElementById("addChannelModal");
const addChannelForm = document.getElementById("addChannelForm");
const addChannelFormContainer = document.getElementById("addChannelFormContainer");
// const channel = document.querySelector(".channel")
addChannel.addEventListener("click", event => {
    addChannelModal.style.display = "block";
    addChannelFormContainer.style.display = "block";
    // channel.style.display = "block";
    addChannelForm.style.display = "block";
})


//closing the create channel form pop-up twith X button

const closeCreateChannel = document.querySelector(".closeCreateChannel")
closeCreateChannel.addEventListener("click", event => {
   
    // channel.style.display = "none";
    addChannelModal.style.display = "none";
    addChannelForm.style.display = "none";
    addChannelFormContainer.style.display = "none";
})

const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
const name = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");


//For adding a new channel

addChannelForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(addChannelForm);
    const name = formData.get("name");
    const isDM = false;
    const body = { userId, name, isDM };

    console.log(userId, name, isDM);
    try {
        const res = await fetch("https://clackbackend.herokuapp.com/channels", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        })

        if (!res.ok) {
            throw res;
        }

        const { channel: {id, name} } = await res.json();
        console.log(id);
        localStorage.setItem("CLACK_CURRENT_CHANNEL_ID", id);
        // const chatWin = document.querySelector(".chatWin");
        // chatWin.innerHTML = '';
        window.location.href = `/main`;
    } catch (e) {
        handleErrors(e);
    }
})
