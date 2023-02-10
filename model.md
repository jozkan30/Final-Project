### Back-end:

Models:

- Post
- User
- Subreddit
- Comments

Post(BaseModel):
title = CharField(max\*length = 250)
text = TextField()
img_url = TextField()
up_vote = IntField()
down_vote = IntField()
user_id = IntField()
sub_reddit_id = IntField()
\*\*\* maybe \_\*\* date = Datetime()

---

User(BaseModel):
user_name = CharField(max_length = 20)
sub_reddits = ArrayField()
comments = ArrayField()
profile_pic = TextField()

---

Subs(BaseModel):
title = CharField(max\*length = 20)
followers = ArrayField()
creator = CharField(max_length = 20)
post_id = ArrayField()
descript = TextField()
\*\*\* maybe \_\*\* date = Datetime()
hello

---

Comments(BaseModel):
comment = TextField()
user_id = CharField(max_length = 20)
post_id = CharField(max_length = 20)
sub_id = CharField(max_length = 20)
up_vote = IntField()
down_vote = IntField()

# Front-end

### Screens:

- Home (comments)
- Sign-up
- Subreddit

### Components:

- Nav Bar
- Modal for login (on home page)
- Modal on subbreddit
- Post (cards)

### Gabe's Sign in Code:

import React from "react";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./signin.css";

export default function SignIn() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
function validateForm() {
return email.length > 0 && password.length > 0;
}

function handleSubmit(event) {
event.preventDefault();
}
return (

<div className="sign-in-main-container">
<Form onSubmit={handleSubmit} />
<Form.Group size="lg" controlid="email">
<Form.Label>Email</Form.Label>
<Form.Control
autoFocus
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</Form.Group>

      <Form.Group size="lg" controlid="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button block size="lg" type="submit" disabled={!validateForm()}>
        {" "}
        Sign in{" "}
      </Button>

      <h1> Sign-In page</h1>
    </div>

);
}
