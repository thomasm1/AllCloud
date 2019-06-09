import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.random = functions.https.onRequest((req, res) => {
    const randomNumber = Math.random();

    res.setHeader('Cache-control','private')
    res.status(200).send(`<!doctype html>
      <head>
        <title>Random number</title>
      </head>
      <body>
        ${'You number is: ' + randomNumber }
      </body>
    </html>`);
  });
  