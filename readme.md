# Harmony Hotel - React Chat 

Developed by Khale and Julia.

## Stories

### Users
· Create user endpoint
Given the need to create a user.
When the user initiates the creation endpoint.
Then the user is able to create a new user.

· Login user endpoint
Given the need to log in a user.
When the user initiates the login endpoint.
Then the user is able to log in successfully.

### Rooms
· Create endpoint
Given the need to create a room.
When the user initiates the creation endpoint.
Then a new room is successfully created.

· Display all rooms endpoint
Given the need to view all available rooms.
When the user initiates the display all rooms endpoint.
Then the user is presented with a list of all available rooms.

### Messages
· Display all messages within a room endpoint
Given the need to view all messages within a room.
When the user initiates the display all messages within a room endpoint.
Then the user is presented with a list of all messages within that room.

· Create a message within a room endpoint
Given the need to create a message within a room.
When the user initiates the create message within a room endpoint.
Then a new message is successfully created within the specified room.

· Update a message within a room endpoint
Given the need to update a message within a room.
When the user initiates the update message within a room endpoint.
Then the selected message is successfully updated within the specified room.

· Delete a message within a room endpoint
Given the need to delete a message within a room.
When the user initiates the delete message within a room endpoint.
Then the selected message is successfully deleted within the specified room.

### Auth Component
This component allows the user to register and signup.
Given the user's intention to register or signup.
When the user interacts with the Auth component.
Then the component provides conditional rendering to switch between both states.

Its functional end result updates the localStorage token in the browser's client.
Given the successful registration or signup.
When the user completes the process.
Then the localStorage token is updated in the browser's client.

The token functionality is best put inside App.jsx so that other components can freely use it as well.
Given the need for widespread token usage.
When incorporating token functionality.
Then it is best placed inside App.jsx for seamless use by other components.

### Rooms Component
This component allows the user to view all available rooms.
Given the user's desire to view available rooms.
When the user interacts with the Rooms component.
Then they are presented with a list of all available rooms.

When clicked upon a room, they are invited to the respective room.
Given the user's selection of a specific room.
When clicking on the chosen room.
Then the user is invited to enter the respective room.

### Room Component
This component consists of two sub-components: input and the view.
Given the need for message input and viewing.
When the user interacts with the Room component.
Then they encounter two sub-components: input and view.

The input allows the user to input text into the field.
Given the user's intention to input text.
When utilizing the input sub-component.
Then the user can input text into the designated field.

After the input has been registered, the user has a send button to the right of the field.
Given the completion of text input.
When the user is ready to send the message.
Then a send button is available to the right of the field.

This button sends the request over to the server's respective endpoint.
Given the user's action of sending the message.
When clicking the send button.
Then the request is successfully sent to the server's respective endpoint.

The view sub-component consists of an area where users can see all of the messages within a particular room.
Given the user's desire to view messages.
When interacting with the view sub-component.
Then the user sees an area displaying all messages within the specified room.
