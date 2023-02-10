# ReactBlog

How to run:

- Install the dependencies and devDependencies and start the server.
- Run json server `npx json-server -p 3001 -w data/db.json`

You can change port in file `api/Posts.js`

```
export default axios.create({
  baseURL: "http://localhost:3001",
});
```
