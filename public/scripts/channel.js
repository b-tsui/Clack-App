import { handleErrors } from "./utils.js";

//add channel: pop-up where you can add the name for the channel once done, the user will be the owner for it
const addChannel = document.getElementById("addChannel");
const addChannelModal = document.getElementById("addChannelModal");
const addChannelForm = document.getElementById("addChannelForm");
const addChannelFormContainer = document.getElementById("addChannelFormContainer");
const channels = document.querySelector(".channels")

addChannel.addEventListener("click", event => {
    addChannelModal.style.display = "block";
    //you only need to set parent element display to = none
    // addChannelFormContainer.style.display = "block";
    // // channel.style.display = "block";
    // addChannelForm.style.display = "block";
})

//closing the create channel form pop-up twith X button
const closeCreateChannel = document.querySelector(".closeCreateChannel")
closeCreateChannel.addEventListener("click", event => {

    // channel.style.display = "none";
    addChannelModal.style.display = "none";
    //you only need to set parent element display to = none;
    // addChannelForm.style.display = "none";
    // addChannelFormContainer.style.display = "none";
})

//Creates div for each public channel and add events listeners on them
//so that when a user clicks on them it will reload the correct channel
const getAllPublicChannels = async function () {
    try {
        const allChannels = await fetch("https://clackbackend.herokuapp.com/channels", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
            }
        })
        const pubChannels = await allChannels.json();
        const channelNameDiv = document.getElementById("channelNames");
        pubChannels.forEach((channel) => {
            console.log(Number(localStorage.getItem("CLACK_CURRENT_CHANNEL_ID")));
            if (Number(localStorage.getItem("CLACK_CURRENT_CHANNEL_ID")) === channel.id) {
                let channelDisplayBtn = document.createElement("button");
                channelDisplayBtn.classList.add('channelDisplay');
                channelDisplayBtn.setAttribute("id", `display${channel.id}`);
                channelDisplayBtn.innerHTML = `#${channel.name}`;
                const nav = document.querySelector(".nav");
                nav.appendChild(channelDisplayBtn);


                //get the modal to display on the right corner once press the channel name
                let channelModal = document.getElementById("channelModal")
                channelDisplayBtn.addEventListener("click", event => {
                    channelModal.style.display = "block";
                    channelModal.classList.remove('hidden');
                    channelModal.innerHTML = `#${channel.name}`;
                    //add edit button for the channel
                    const editChannel = document.getElementById("editChannel")
                    const editButton = document.createElement("button");
                    editButton.setAttribute("id", "editChannelButton")
                    const textEditButton = document.createTextNode("Edit channel");
                    editButton.appendChild(textEditButton);
                    editButton.classList.add("btn")
                    channelModal.appendChild(editButton);
                    //once press the edit button a pop-up will appear to change the name of the channel
                    editButton.addEventListener("click", event => {
                        editChannel.style.display = "block";
                    })





                    //add delete button for the channel
                    const deleteButton = document.createElement("button");
                    deleteButton.setAttribute("id", "deleteChannelButton")
                    const textDeleteButton = document.createTextNode("Delete channel");
                    deleteButton.appendChild(textDeleteButton);
                    deleteButton.classList.add("btn")
                    channelModal.appendChild(deleteButton);

                    const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
                    const channelId = localStorage.getItem("CLACK_CURRENT_CHANNEL_ID");

                    //delete button for the channel
                    deleteButton.addEventListener("click", async event => {
                        event.preventDefault();

                        try {
                            const res = await fetch(`https://clackbackend.herokuapp.com/channels/${channelId}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem(
                                        "CLACK_ACCESS_TOKEN"
                                    )}`
                                },
                                body: JSON.stringify({ userId })
                            });

                            if (!res.ok) {
                                throw res;
                            }
                            document.getElementById(`channel${channel.name}`).remove();
                            localStorage.setItem("CLACK_CURRENT_CHANNEL_ID", 1);
                            window.location.href = "/main";
                        } catch (err) {
                            console.error(err);
                        }
                    })

                })


            }

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


//closing the edit channel pop-up with X button
const closeEditChannel = document.querySelector(".closeEditChannel")
const editChannel = document.getElementById("editChannel");
closeEditChannel.addEventListener("click", event => {
    editChannel.style.display = "none";
})



//Gets the user_id and fullName from local storage
const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
// const name = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");


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

        const { channel: { id, name } } = await res.json();
        localStorage.setItem("CLACK_CURRENT_CHANNEL_ID", id);
        window.location.href = `/main`;
    } catch (e) {
        handleErrors(e);
    }
})

//grab the channelId for the edit channel 
const channelId = localStorage.getItem("CLACK_CURRENT_CHANNEL_ID")

const saveChannelEdit = document.getElementById("saveChannelEdit")
const editChannelForm = document.getElementById("editChannelForm")
editChannelForm.addEventListener("submit", async event => {
    event.preventDefault();
    // const editChannelForm = document.getElementById("editChannelForm ")
    //Grabs form input and creates a body object with them
    const formData = new FormData(editChannelForm);
    const newName = formData.get("name");
    const body = {
        name: newName,
        userId
    }
    //Send a put request to update the channel name
    try {
        const res = await fetch(`https://clackbackend.herokuapp.com/channels/${channelId}`,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
                },
            })

        if (!res.ok) {
            throw res;
        }

        //Reset the channel name in the localStorage and redirect
        //to main page
        const {
            name
        } = await res.json();
        console.log(name)
        window.location.reload();
    } catch (err) {
        console.error(err);
    }
})

