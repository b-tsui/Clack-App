# Templates List

* layout.pug
  * Contains sidebar with channel list etc...
  * Contains navbar with user info/signout
* sign-up.pug
  * Session form
* log-in.pug
  * Session form
  * option to log in as demo
* splash.pug
  * Contains images showing functionality
  * Contains links to sign-up/login and demo
* main-page.pug
  * extends layout
  * welcome content
    * user guide 
    * features guide
* channel-page.pug
  * extends layout
  * navbar to access details
    * option to show members
    * option to show channel creator/admin
  * contains messages for that channel
    * scrollable
  * text area to send messages
* channel-create.pug
  * form to create new channel
* dm-create.pug
  * creates a private channel
* profile.pug
  * displays user info
  * has links to edit/delete profile
* profile-edit.pug
  * form to edit profile info