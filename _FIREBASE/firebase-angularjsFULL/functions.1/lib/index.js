"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.random = functions.https.onRequest((req, res) => {
    const randomNumber = Math.random();
    res.status(200).send(`<!doctype html>
      <head>
        <title>Random number</title>
      </head>
      <body>
        ${'You number is: ' + randomNumber}
      </body>
    </html>`);
});
//# sourceMappingURL=index.js.map