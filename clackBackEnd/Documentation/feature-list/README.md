# Clack Feature List
1. Users
    * User registration with validations
    * Login page for users with validations
    * User authentication that persists throughout session
    * Guest Users (for demonstration)
    * Login/logout functionality
    * Profiles/Profile photo that appears in top right when logged in
    * Roles(admin/normal) You're an admin if you created the channel
      * Admin can delete messages
    * Styling that highlights what chat the user is currently in
2. Live chat
    * text sent to server, stored, then displayed to user
    * Sends emoji letters instead of text letters
    * Using Express and socket.io
    * Displays timestamps of messages
    * Name/Profile pic of the user shows up next to message sent
    * Can support chat between multiple users
3. Conversations
    * Supports creation and use of channels
      * Public group chats base on emoji theme
      * Anyone can join a channel
    * Direct Messaging
      * Private conversation between 2 users
    * Teams/ multi-person DM
      * Private messages between a group of more than 2 users
4. UI Design
    * Landing Page
      * User login/registration
      * Highlight some app features
    * Homepage/Main Page
      * Sidebar (always peristent and scrollable)
        * Shows all channels/chats
        * Collapsible fields for chat categories(channels,dms,...)
        * Shows profile
    
5. Bonus features
   * Search messages
   * Notifications
   * Threads (Channels, DMs)
6. Technologies Used
   * HTML5
   * CSS3
   * JavaScript
   * Node.js
   * Express.js
   * Templating Engine: PUG
   * Socket.io
   * SQL
   * RDBMS = PostgreSQL
   * ORM = Sequelize
   * Bootstrap/jQuery