# This site will company you through your coding.

The features include
- Online Clipboard
- Retro Game (Donkey Kong) from https://funhtml5games.com

## Compilation steps

Dependency installation:
```
npm install --save jquery
npm install --save firebase
```

Javascript files are located in /js folder and comprises of config.js, db.js, main.js. Bundle.js is a "browserify" compiled js file that will be imported to `index.html`

### To compile main.js with broserify, use following code:
```javascript
browserify js/main.js -o js/bundle.js
```
or live-reload with
```javascript
watchify js/main.js -o js/bundle.js
```

## Short description of the architecture
This site is complete serverless with database stored in Firestore and all the logic is run by user via Javascript. The backend is written in pure javascript, the frontend is improvised with Bootstrap.

All data is stored in copyPlaceholder_db collection and for each entry is going to make new document with respective ID. The true content is saved in msg field.

The next time ID is used (to retrieve content), its respective document is going to be deleted.

## Future improvements
- [ ] Proper documentations
- [ ] More features?

## LICENSE
There is no license attached to this project, you can freely take whatever you need from this project with or without crediting me. Have fun :)
