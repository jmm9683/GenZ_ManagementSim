# GenZ_ManagementSim Backend

This is our master branch.

The required installations to get the backend running on your local machine:

	Node.js - https://nodejs.org/en/
    MongoDB - https://www.mongodb.com/download-center/community

Useful applications to help manage the backend:

	Postman - Helps with testing http requests - https://www.postman.com/
    Robo 3T - Use this application to view and directly manage the MongoDb database - https://robomongo.org/

After installing Node.js you will have the npm package manager. Navigate to this directory in your terminal and run the command:

	npm i

Then to start the backend, run the command:

	npm start

The backend will now be running on port 63145. Make sure to run the frontend and simulators as well.

When the backend is running, it will be printing to the console every time the cron jobs execute. This helpful to see if the backend is correctly navigating the simulator data and saving to the database.