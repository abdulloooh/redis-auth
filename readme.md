# Authentication with Redis

This is a sequel to my delving into redis which is found [here](https://github.com/abdulloooh/redis-pr).

This light project demonstrates the use of `redis` as full auth technique, it uses `uuid v4` to assign random session string as opposed to heave `jwt`, keeps track of all sessions by single user from 1/multiple device(s) as well as multiple users.

## Technologies

- ExpressJs
- MongoDB
- Redis

## Capabilities

- Simple signup with username, email & password
- Login
- Protected route authentication
- Logout single user instance (i.e from a single device)
- Logout all user instances (on all prev logged in devices)

## Concept

The simple approach I used was to keep track of all sessions in 2 ways:

1. map each instance string with serialized user details
2. Keep track of all sessions belonging to a single user with a set; user's email as key and session strings as values, increment the set with new session strings generated for user when logged in on other devices

## Login

1. Confirm user's email and password, then store it using redis string with session string as key and serialized user details as value
2. Create if not exist a set (the sibling of list) and add the session key to it, add more sessions keys as user logs in from other devices

## Logout (single instance/device)

1. Delete the key with the session string corresponding to this instance
2. Remove the session string from user's list of session strings

## Logout all instances

1. Fetch the set of keys belonging to user
2. Delete all the keys
3. Delete the set holding the keys

> With ❤️ by [Abdullah][https://twitter.com/abdulloooh]
