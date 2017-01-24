<img src="https://raw.githubusercontent.com/talkrz/mynotes-server/master/docs/logo.png" width="150">

My notes is a simple sticky notes app created to learn web development tech
stack (react, redux etc.) and make a useful thing as a side effect.

This repo contains server-side code.

Look at the [main repository](https://github.com/talkrz/mynotes) for more
details and the application demo.

## How to set up the development environment

Install deps:
```
npm install
```

Create an empty database:
```
npm run db:schema:create
```

Populate database with test data:
```
npm run db:fixtures
```

Alternatively there is a shortcut command that performs 3 operations at once:
 1. Drop database
 2. Create empty database
 3. Populate tables with test database

```
npm run db:schema:recreate
```

Start actual app:
```
npm start
```

## Running the tests
```
npm test
```
