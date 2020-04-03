This site will company you through your coding.

Feature now:
- Online Clipboard
- Retro Game (Donkey Kong) _ https://funhtml5games.com

<hr /> <br />
<h5>How to compile?</h5>

Dependency installation:
```
npm install --save jquery
npm install --save firebase
```

Javascript files are located in /js folder and comprises of config.js, db.js, main.js. Bundle.js is a "browserify" compiled js file that will be imported to index.html
To compile main.js with broserify, use following code:
```javascript
browserify js/main.js -o js/bundle.js
```
or live-reload with
```javascript
watchify js/main.js -o js/bundle.js
```

<h5>How does it work?</h5>

This page is complete serverless with database stored in Firestore and all the logic is run by user via Javascript. The backend is written in pure javascript, the frontend is improvised with Bootstrap.

We store all the data in copyPlaceholder_db collection and for each entry is going to make new document with respective ID. The true content is saved in msg field.

The next time ID is used (to retrieve content), its respective document is going to be deleted.
