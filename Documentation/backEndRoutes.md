* users
  * GET /users/:id => get a single users info (returns fullName and email)
  * POST /users => create a new user (returns userId and token)
  * POST /users/token => verifies user login and returns token for the user
  * PUT /users/:id => update a users info (returns full user info)
  * DELETE /users/:id => delete a user (destroy on db)
* channels
  * GET /channels/:channelId/members => get list of users in channel
  * GET /channels/:channelId/messages => get messages associated with channel
  * POST /channels => create a new channel
  * PUT /channels/:channelId => update channel name
  * DELETE /channels/:channelId => delete an existing channel
* messages
  * POST /channels/:channelId/messages => create a new message
  * PUT /messages/:id => edit an existing message
  * DELETE /messages/:id => deletes an existing message