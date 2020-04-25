import { handleErrors } from "./utils.js";

//add channel: pop-up where you can add the name for the channel once done, the user will be the owner for it
const addChannel = document.getElementById("addChannel");
const addChannelModal = document.getElementById("addChannelModal");
const addChannelForm = document.getElementById("addChannelForm");
const addChannelFormContainer = document.getElementById("addChannelFormContainer");
const channels = document.querySelector(".channels")

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

//Creates div for each public channel and add events listeners on them
//so that when a user clicks on them it will reload the correct channel
const getAllPublicChannels = async function() {
    try {
        const allChannels = await fetch("https://clackbackend.herokuapp.com/channels", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        })
        const pubChannels = await allChannels.json();
        const channelNameDiv = document.getElementById("channelNames");
        pubChannels.forEach((channel) => {
            let div = document.createElement("div");
            div.setAttribute("id", `channel${channel.name}`);
            div.innerHTML = `<a href="/main" class="links channelName"># ${channel.name}</a>`;
            channelNameDiv.appendChild(div);
            div.addEventListener("click", event => {
                localStorage.setItem("CLACK_CURRENT_CHANNEL_ID", channel.id);
                window.location.reload();
            })
        })
    } catch (err) {
        handleErrors(err);
    }
}
getAllPublicChannels();

//Gets the user_id and fullName from local storage
const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
const name = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");


//Adds a submit event listener on the add channel form
addChannelForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Grabs the form input and creates a body object for the post request
    const formData = new FormData(addChannelForm);
    const name = formData.get("name");
    const isDM = false;
    const body = { userId, name, isDM };

    //Makes post request to backend that will create a new channel
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
        window.location.href = `/main`;
    } catch (e) {
        handleErrors(e);
    }
})
