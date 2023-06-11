// Initialize an npm package
npm init -y
// create source file directory
mkdir src
// create the application server entry point file
touch src/index.js
const { mkdir } = require('fs')
// vi to src/index.js or edit it how over you like and add the following code to it
const http = require('http');
function requestHandler(req, res) {
    res.write('ok');
    res.end();
}
const server = http.createServer(requestHandler);
const port = process.env.PORT || 8888;
server.listen(port, () => console.log(`listening on port ${port}`));
