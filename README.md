# Tracker-server
The server for the mobile tracker app. Created with Node.JS, Ngrok and MongoDB.

Installation and Setup
---
1. `git clone` this repository.
2. `npm install`
3. Set up a MongoDB account and cluster if not already (instructions can be found on MongoDB documentation [here](https://www.mongodb.com/docs/atlas/getting-started/?_ga=2.81656151.1154954790.1650863367-1280951868.1650863367&_gac=1.192432728.1650938439.CjwKCAjwjZmTBhB4EiwAynRmD9kwvPdnRwpyRA1gvrD4ypcy3bFcY7SXvr4jQgAbPQOd_ljreTOwPRoCuDkQAvD_BwE)).
4. connect to the cluster and copy connection string.
5. rename `.env.example` file at the root of the project to `.env`. Then paste the connection string to `MONGODB_URI`.
6. set your `PORT` and `SECRET_KEY` in thee .env as needed.
7. Set up an Ngrok account and follow the [instructions](https://ngrok.com/docs/getting-started) to install and set up Ngrok locally.
8. Start the server by typing `npm start`.
9. On the terminal running Ngrok, start Ngrok by typing `ngrok http PORT` where PORT being your server's port.
10. copy the forwarding url in the terminal to paste in the [mobile application](https://github.com/ruatapattan/tracker-mobile-app)'s environment (please note that on a free account, the ip address will change every time ngrok is restarted).
