* / (splash.pug)
  * Splash
* /login (log-in.pug)
  * Session Form
* /signup (sign-up.pug)
  * Session Form
* /main (main.pug)
  * Side panel
  * Nav bar
  * This is the page where profiles "pop-up" on
  * Links to channels on side
  * Welcome page
* /channels/:channelId (channel-page.pug)
  * Messages Container
    * Messages
  * Only accessible to users with valid login
* /channels/add (channel-create.pug)
  * pop-up over mainpage using ajax
  * Channel Form
  * Only accessible to users with valid login
    *Once created the user will become the admin
* /channels/:channelId/delete (redirect to main-page.pug)
  * Confirm page
  *Channel owner can delete
* /channels/:channelId/update (channel-page.pug)
  * pop-up over mainpage using ajax
  * Update Channel Form
  * Channel owner can update
* /users/:userId (profile.pug)
  * Profile Page
* /users/:userId/updateProfile (profile-edit.pug)
  * Profile form
  * Only associated user can edit their profile