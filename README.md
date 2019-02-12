
Javascript files are located in js folder and comprises of config.js, db.js, main.js. Bundle.js is a "browserify" compiled js file that will be imported to index.html
To compile main.js with broserify, use following code:
```javascript
browserify js/main.js -o js/bundle.js
```
or live-reload with
```javascript
watchify js/main.js -o js/bundle.js
```
