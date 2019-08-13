# Database Persistence Helpers

There are two helper files that you can use to manage the persistence of _users_ and _posts_ data. These files are `users/userDb.js` and `posts/postDb.js`. Both files publish the following api:

- `get()`: calling find returns a promise that resolves to an array of all the `resources` contained in the database.
- `getById()`: takes an `id` as the argument and returns a promise that resolves to the `resource` with that id if found.
- `insert()`: calling insert passing it a `resource` object will add it to the database and return the new `resource`.
- `update()`: accepts two arguments, the first is the `id` of the `resource` to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the `resource` from the database, returns the number of records deleted.

The `userDb.js` helper includes an extra method called `getUserPosts()` that when passed a user's `id`, returns a list of all the `posts` for the `user`.

**All helper methods return a promise.**
All helper methods return a promise.