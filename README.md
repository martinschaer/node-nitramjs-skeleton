## Install dependencies

    npm install

## Run dev server

    foreman start

## SASS and jsHint

    grunt watch

## Build

    grunt build

## NODE_ENV

The Express framework uses the NODE_ENV environment variable to determine some behaviors related to caching. If you’re using Express, set a config var with this value:

$ heroku config:set NODE_ENV=production

## CDN

- Ponerle lo de reduced redundancy
- Ponerle permisos a everyone de open y download
- Ponerle que la cache expira `Wed, 31 Dec 2014 11:59:59 GMT`