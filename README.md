# Social Media

## Description
This project is a social media application that allows users to interact with each other through thoughts and reactions. Users can create, update, and delete their thoughts and reactions, as well as manage their friends list.

## Table of Content
* [Features](#features)
* [Technologies Used](#technologies-used)
* [API Endpoints](#api-endpoints)
* [Installation](#installation)
* [Contributing](#contributing)
* [Contact](#contact)

## Features
* **User Management:** Create, update, and delete users. Add and remove friends.
* **Thought Management:** Create, update, and delete thoughts. Add and remove reactions to thoughts.
* **Reaction Management:** Add and delete reactions to thoughts.

## Technologies Used
* **Node.js:** JavaScript runtime for building server-side applications.
* **Express.js:** Web framework for Node.js.
* **MongoDB:** NoSQL database used for storing user and thought data.
* **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.

## API Endpoints
### User Endpoints
#### Get All Users
* Endpoint: `GET /api/users`
* Description: Fetch all users.
* Response: Array of user objects.

#### Get Single User
* Endpoint: `GET /api/users/:userId`
* Description: Fetch a user by ID.
* Response: User object.

#### Create User
* Endpoint: `POST /api/users`
* Description: Create a new user.
* Request Body: User object (e.g., { username: 'johndoe', email: 'john@example.com' }).
* Response: Created user object.

#### Update User
* Endpoint: `PUT /api/users/:userId`
* Description: Update a user by ID.
* Request Body: User object with fields to update.
* Response: Updated user object.

#### Delete User
* Endpoint: `DELETE /api/users/:userId`
* Description: Delete a user by ID.
* Response: Deleted user object.

#### Add Friend
* Endpoint: `POST /api/users/:userId/friends/:friendId`
* Description: Add a friend to the user's friends list.
* Response: Updated user object with friend added.

#### Unfriend
* Endpoint: `DELETE /api/users/:userId/friends/:friendId`
* Description: Remove a friend from the user's friends list.
* Response: Updated user object with friend removed.

### Thought Endpoints
#### Get All Thoughts
* Endpoint: `GET /api/thoughts`
* Description: Fetch all thoughts.
* Response: Array of thought objects.

#### Get Single Thought
* Endpoint: `GET /api/thoughts/:thoughtId`
* Description: Fetch a thought by ID.
* Response: Thought object.

#### Create Thought
* Endpoint: `POST /api/thoughts`
* Description: Create a new thought.
* Request Body: Thought object (e.g., { thoughtText: 'This is a thought', username: 'johndoe' }).
* Response: Created thought object.

#### Update Thought
* Endpoint: `PUT /api/thoughts/:thoughtId`
* Description: Update a thought by ID.
* Request Body: Thought object with fields to update.
* Response: Updated thought object.

#### Delete Thought
* Endpoint: `DELETE /api/thoughts/:thoughtId`
* Description: Delete a thought by ID.
* Response: Deleted thought object.

### Reaction Endpoints
#### Add Reaction
* Endpoint: `POST /api/thoughts/:thoughtId/reactions`
* Description: Add a reaction to a thought.
* Request Body: Reaction object (e.g., { reactionBody: 'This is a reaction', username: 'johndoe' }).
* Response: Updated thought object with reaction added.

#### Delete Reaction
* Endpoint: `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`
* Description: Delete a reaction from a thought.
* Response: Updated thought object with reaction removed.

## Installation
1. Clone the Repository:
```
git@github.com:swe-thinhnguyen1701/social-media.git
```

2. Navigate to the Project Directory:
```
cd social-media
```

3. Install Dependencies:
```
npm install
```

4. Start the Application:
```
npm start
```
## Contributing
Feel free to open an issue or submit a pull request if you have suggestions or improvements.

## Contact
For any questions or suggestions, please contact swe.thinhnguyen@gmail.com