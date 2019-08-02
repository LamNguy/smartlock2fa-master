# Smartlock-2fa
Two factor authentication - Smartlock.

# Note
- Please note that this project is being in development phase.
- Please remove all .example extensions in config folder and put your own credential information to those files.
- If you want to manage database, see db url in app_server/config/database.js. 
- To generate fake account (username: "phong", password: "1"), run fakedata.js

# Run
- Install *npm*
- Clone this repo, cd into it
- Run command 
  - ```npm install```
  - ```npm start```
  - ```node app_server/services/pi-controller/socketClient.js``` (_optional_)

# Issues
- Need someone to make a nicer frontend.
- User need to login twice (cookie).
- SSL for socket connection
