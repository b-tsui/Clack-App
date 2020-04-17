* users
  * GET /users/:id => get a single users info
  * POST /users/add => create a new user
  * PATCH /users/:id => update a users info
  * DELETE /users/:id => delete a user
* channels
  * GET /channels/:channelId/members => get list of users in channel
  * GET /channels/:channelId/messages => get messages associated with channel
  * POST /channels/add => create a new channel
  * PATCH /channels/:channelId => update channel name
  * DELETE /channels/:channelId => delete an existing channel
* messages
  * POST /channels/:channelId/messages => create a new message
  * PATCH /messages/:id => edit an existing message
  * DELETE /messages/:id => deletes an existing message