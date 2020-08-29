### Notes

1. Need to set Content-Type to application/json from Client (postman, browser, etc.)
2. https://node-postgres.com/features/queries (use prepared statement please!)
3. https://node-postgres.com/features/queries

### Takeaway

1. Add constraint using DB functionalities
2. Consider templating
3. Serial type always increases since sequence type cannot be rolled back and it's okay
4. You need a server to limit access (since you can't just type in the valid url and expect it to be served!)
5. SSR means that we don't have to send huge payloads over the wire and then render them in the browser.

### Todos

[] Why uses JWT (reduce network calls? Hashing is not enough?)
[] Implement JWT with Cookies
[] What to send back in cookies? What's the content of a token? Maybe all that users need to execute subsequent requests (id, etc.)
[] How do you test all of this token and cookie thing?
[] Should there be a max age?
[] What should be the secret string to hash the token?
[] Implement password reset (and what happens when to everything else once this happens!)
[] Consider security implication (since the lifting app does expose state-changing endpoints)
[] Set up a test database
[] Research about where to validate user input?

[x] Set up basic auth with bcrypt
[x] Set up basic validation in Express App as well as Postgres
[x] Set up custom error handlers
