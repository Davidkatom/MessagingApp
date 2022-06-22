# Messaging web app
Simple Messaging web app developed with react:
- Create new messages
- Send messages to others
- View all messages sent

Used libraries:
- react-router-dom
- react-bootstrap
- jquery 
- signalr

NPM Installation guide:

1. Clone the project
2. Run  npm install
3. Run  npm i jquery --save
4. Run  npm install react-bootstrap
5. Run  npm install react-router-dom
6. Run  npm install react-icons --save
7. Run npm install @microsoft/signalr
To lunch the app, write inside the terminal of you favourite softwere development environment 'npm start'
<br/>note that when adding a new contact - you may choose to leave it empty in order for default local host

Note that the server the app is connecting to is: https://localhost:7087

# Server App
Web API and App containing the review page and the public API.

Installation guide:
1. start visual studio - open the sln project inside "WebApplication2" folder.
2. In the package manager type: 
<br/>	-Add-Migration Init
<br/>	-Update-Database
3. Start the Web server inside Visual Studio.
4. open visual code for the react project inside "whats-down" folder.
5. inside the console - write: "npm start" to start the front side server.
6. sign up
7. login
8. don't forget to leave an honest reveiw :)
 -Make sure the server is running on https://localhost:7087:

# Android App
note the server port we talk to by default is 7087.

1. make sure the server is running as mentioned above.
2. start android studio and run the app on the simulator.
3. the app is provided with empty data base, so first register unless existing contact in the database.
4. login to the server.
5. add a new contact using the add contact button - inside the emulator you can type for the server field: http://10.0.2.2:7087 to talk to our .net server.
6. press on a specific contact to start chat with him (using firebase api).
7. enjoy!

