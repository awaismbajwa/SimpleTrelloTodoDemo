This is a [Next.js](https://nextjs.org/) project, a simple one page todo application which uses [Trello](https://trello.com/) as backend.

This application allows user to create a new card with name and description. Newly added card goes to the list of open tasks.

Once the task is finished, the task card can be moved to the list of finished tasks. Application also allows removing the task card.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
The application contains only one page and that is defined in `pages/index.js`.
React components used by main page are defined in `components/` directory.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
Application contains only one api i.e. `/api/trello/[cardId].js`. This api is responsible in connecting react client with trello board.

CSS styles required by application are defined in `styles/` directory.

Before starting don't forget configuring trello in environment file. Environment variables are defined in `.env.local` file. You can create this file duplicating `.env.local.example` file and renaming it as `.env.local`. Trello board needs to be configured in environment file by providing api key, token, board id, open task list id and closed task list id.


## Testing
Once making the changes in the source, don't forget to test that your changes have not broken anything.
For that purpose existing jest tests might become handy.
Use the following command:

```bash
    npm run test
```

All the tests are placed in `tests/` root directory.

## Using Docker
To start application in docker container first build the application service defined in `docker-compose.yml` file, using the following command:

```bash
docker-compose build
```

Then, start container by executing following command:

```bash
docker-compose up
```

To stop container, execute following command:

```bash
docker-compose down
```