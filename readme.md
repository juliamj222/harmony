# Harmony Hotel - React Chat 

Developed by Khale and Julia.

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

### Auth Component

This component allows the user to register and signup. It requires conditional rendering to switch between both states.

It's functional end result updates the `localStorage` token in the browser's client. The token functionality is best put inside `App.jsx` so that other components can freely use it as well.

### Rooms Component

This component allows the user to view all available rooms to them. When clicked upon a room, they are invited to respective room. 

### Room Component

This component consists of two sub-components: input and the view. The input allows user to input text into the field. After the input has been registered, the user has a `send` button to the right of the field. This button sends the request over to the server's respective endpoint.

The view sub-component consists of an area where users can see all of the messages within a particular room.
