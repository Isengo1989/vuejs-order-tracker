# Realtime Shopware 6 order tracking in Google Maps

This project is tailord for the Showpare 6 plugin, but can also be used for any other ecommerce shop as long as you can push the data to firebase from there. The recommended way for PHP is this [repository](https://github.com/kreait/firebase-php)

## Google Maps API
You need a API Key for the [Google Maps JS API](https://developers.google.com/maps/documentation/javascript/overview) which is generating the Map and adding the coordination marks.

## Google Firebase
Google Firebase allows you to have a Real Time Database which is a perfect fit for a reactive interaction. For this project you will need a [Firebase Account](https://firebase.google.com/) and add the project settings under **main.js**

:warning: Please handle your reads and writes in Firebase directly! You can allow access only to accounts you verify. You can also use .env files for that -> see [here](https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
