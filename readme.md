# Harmony - React Chat Backend

Pair/group coding project!

Creating a piece of full stack software: a chat application.

Utilize the full MERN stack to do so: M(ongoose/MongoDB), E(xpress), R(eact), and N(ode).

## Message Schema

The message document in the `messages` collection is the following:

```json

{
    "when": "2018-07-15T20:00:47.696Z",
    "user": "John",
    "room": "Main",
    "body": "I really want to attend NASA's DEVELOP program this summer!"
}

```

## User Schema

The user document in the `users` collection is the following:

```json

{
    "firstName": "John",
    "lastName": "Wick",
    "email": "jwick@puppyfinder.com",
    "password": "focusCommitment1979"
}

```

## Room Schema

Room document in the `rooms` collection is the following:

```json

{
    "name": "Continental",
    "description": "No business conducted",
    "addedUsers": ["John Wick", "Winston", "Ms. Perkins"]
}

```


## Stories

### Users

- [ ] Create user endpoint
- [ ] Login user endpoint

### Rooms

- [ ] Create endpoint
- [ ] Display all rooms endpoint

### Messages

- [ ] Display all messages within a room endpoint
- [ ] Create a message within a room endpoint
- [ ] Update a message within a room endpoint
- [ ] Delete a message within a room endpoint

# Harmony - React Chat Front End

User interface that users will be able to interact with.

## Stories

### Setup

Used `create-react-app` script to create a new instance of a React app within the `client` folder. Purged all unnecessary files and code. Created a `components` folder to store all of the components needed for the application.

### Auth Component

This component allows the user to register and signup. It requires conditional rendering to switch between both states.

It's functional end result updates the `localStorage` token in the browser's client. The token functionality is best put inside `App.jsx` so that other components can freely use it as well.

### Rooms Component

This component allows the user to view all available rooms to them. When clicked upon a room, they are invited to respective room. 

### Room Component

This component consists of two sub-components: input and the view. The input allows user to input text into the field. After the input has been registered, the user has a `send` button to the right of the field. This button sends the request over to the server's respective endpoint.

The view sub-component consists of an area where users can see all of the messages within a particular room.
