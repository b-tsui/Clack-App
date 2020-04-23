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

const editProfile = document.querySelector(".editProfile")

//update the position/style for the profile pop-up to be on the right side once click on the 'view profile'
const profile = document.getElementById("profile");
profile.addEventListener("click", event => {
    modal.setAttribute("id", "modal-transform");
    //add the word 'Profile' on the top of the modal
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
    
    editButton.addEventListener("click", event => {
        editProfile.style.display = "block";
        let gridContainer = document.querySelector(".grid-container");
        gridContainer.classList.add("editProfileTransform")
        editProfileTransform.style.display = "block"
      
    })
    

    //remove the profile pop-up from the page
    chatContainer.addEventListener("click", e => {
        if (editProfile.style.display === "block") {
            editProfile.style.display = "none";
        }
    });

     // //add closing button to close the profile edit pop-up
     const closeProfileButton = document.createElement("button");
     closeProfileButton.setAttribute("id", "closeProfileButton")
     const textCloseButton = document.createTextNode("X");
     closeProfileButton.appendChild(textCloseButton);
     modal.appendChild(closeProfileButton);
     // //closing the profile
     closeProfileButton.addEventListener("click", event => {
         modal.style.display = "none";
     });

})

//closing the edit profile pop-up with X button
const closeEditProfile = document.querySelector(".closeEditProfile")
closeEditProfile.addEventListener("click", event =>{
    editProfile.style.display = "none";
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

//add channel: pop-up where you can add the name for the channel once done, the user will be the owner for it
const addChannel = document.getElementById("addChannel");
const addChannelModal = document.getElementById("addChannelModal");
const addChannelForm = document.getElementById("addChannelForm");
const channel = document.querySelector(".channel")
addChannel.addEventListener("click", event => {
    addChannelModal.style.display = "block";
    addChannelForm.style.display = "block";
    channel.style.display = "block";
})

// remove the channel pop-up from the page
chatContainer.addEventListener("click", e => {
    if (addChannelForm.style.display === "block") {
        addChannelForm.style.display = "none";
    }
});

