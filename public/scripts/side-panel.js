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
profile.addEventListener("click", event => {
    modal.setAttribute("id", "modal-transform");
    //add th word 'Profile' on the top of the modal
    const textProfileDisplay = document.createElement("div")
    const textProfile = document.createTextNode("Profile");
    textProfileDisplay.setAttribute("id", "textProfile");
    textProfileDisplay.appendChild(textProfile);
    modal.appendChild(textProfileDisplay);
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

    //redirect the user to the edit page/pop-up for the profile
    const editProfile = document.querySelector(".editProfile")
    editButton.addEventListener("click", event => {
        editProfile.style.display = "block";
        let gridContainer = document.querySelector(".grid-container");
        gridContainer.classList.add("editProfileTransform")
    })

    //remove the profile pop-up from the page
    chatContainer.addEventListener("click", e => {
        if (editProfile.style.display === "block") {
            editProfile.style.display = "none";
        }
    });

})



//remove the profile pop-up from the page
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