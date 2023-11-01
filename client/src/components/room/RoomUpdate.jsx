import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from "react";

function RoomUpdate(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addedUsers, setAddedUsers] = useState("");

  return (
    <>
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={title}
            placeholder="Enter to change the title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={description}
            placeholder="Enter to change the description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="addedUsers">Added Users</Label>
          <Input
            style={{
              width: "100%",
              color: "var(--tritary)",
            }}
            id="addedUsers"
            name="addedUsers"
            value={addedUsers}
            placeholder="Enter users to add or update"
            type="addUsers"
            onChange={(e) => setAddedUsers(e.target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </>
  );
}

export default RoomUpdate;
