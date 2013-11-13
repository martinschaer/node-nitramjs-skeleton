## Install dependencies

    npm install

## Run dev server

    foreman start

## Compile SASS (for development)

    grunt compass

## SASS and jsHint watch

    grunt watch

## Build

    grunt build

## NODE_ENV

The Express framework uses the NODE_ENV environment variable to determine some behaviors related to caching. If you’re using Express, set a config var with this value:

$ heroku config:set NODE_ENV=production