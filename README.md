# Retrain Entry Level Exam

Hi there!  
In this home assignment you will extend and add new features to a simplified ticketing system.

The task's main purpose is to demonstrate basic coding level skills, and give us things to talk about in the interview. If you have no time to implement a feature 100% - it's perfectly fine, just be ready to explain what you would do in a "real" production environment.

Please read everything before you get started, and contact us if you have any questions.

## Getting Started

1. Make sure you have _Node.js_ 18 or higher and _npm_ 8 or higher installed
2. Install the project dependencies by running `npm install` from the root project's directory (using a terminal). The root directory is the one that includes the `server` and `client` folders.
3. Run the project by running `npm start`. This runs both the server and the client.
4. Notice this project uses `lerna` to manage the packages inside this monorepo. If you need to add dependencies please use `lerna add <pkg> <server|client>` command.

You should now have the development version running on your computer and accessible via http://localhost:3000

## Tasks

### Part 1 - Frontend

##### 1a.

Make the search box be auto-focusable when the page is loaded.

##### 1b.
Write a reusable input component, and use it for the search bar. Component should be able to work in both controlled and uncontrolled mode.

##### 1d. Improve the search

Turns out our search was searching directly on the client side. Change the search to use the backend for search. You can look at the backend for exact details, but all you need to pass is a `searchText` query param.
Implement a spinner while search is happening.
** as the system will undoubtedly grow, and will have many more http calls that will need loaders try to make your solution as generic and re-usable as possible **

#### 1e - Optimization
if you go to the Ticket component, you will see a function named `ticketMagicValue` which has super secret algorithm that calculates a magic value for the ticket. The algorithm is commented out, please uncomment it to enable it in our code.

This algorithm takes a while to finish, and hurts rendering performance. We aren't allowd to change the logic. Provide workarounds around it.

### Part 2 - Backend

In this part, you will work on a very simple express.js server, with a sqlite db.
Even though sqlite doesn't support many RDBMS features, imagine you are working on one. Think about indexes, primary keys and performances for very large tables.

You don't need to implement any UI in this part.

##### 2a. Pagination

Let's say our UI only shows 20 tickets even though there are many more. Implement a paginated api.

##### 2b. Search

Implement a search over a given text over the title and the content of the tickets. 
Please consider we wish to give the user a pleasant experience while searching and implement it accordingly.
(Note: Your solution shouln't be perfect and not real world data production ready - Just to consider all avialble option and implement a suitable one).

##### 2c. New feature

a new demand came, to add a "Comments" functionality to our system. Every ticket can have comments as responses, and every comment can have other comments as responses. Each single comment is made of up of author name, email, text content, and an "vote counter".

Implement an api that does the following:

- adds a new comment (reminder - comment can be added as a response to a ticket, or as a response another comment)
- votes a comment +1/-1
- retrieves all comments that belong to a single ticket in some hierarchal form
- retrieve "best" comments based on score
  
It's your decision on how to implement the api and how to design the url structure. While not mandatory, if you have time, try to make the api as professional as possible, and think about error handling and validations.

## Part 3 - Tests

choose 1-2 of the features you implemented, and write a tests for them. Can be either server or client. (2c is made up of at least 4 features, you can choose only 1-2 of them).

Test can be either frontend or backend, (or both!). Can be unit, integration or e2e tests. Whatever you prefer.

For all tests, it's important that tests won't affect "production" data (which in our case is the data.sqlite file)

### Some help regarding server tests

If you write tests for server, you need to handle the db in your tests somehow. It's up to you on how to exactly handle it, it can be mocks/stubs/spies, or you can use in-memory db, whatever you prefer and what you feel is more suitable for your test.

To connect using knex to an in-memory sqlite db, this code can be used. (It's up to you to make sure the correct setting arrives is used when testing.)

`const knex = Knex({
    client: 'sqlite3',
    connection: ":memory:",
  });`

## General notes

- The entire task should take around 5 hours. The task is meant most of all to give us something to talk about in the interview. **If you already spent 5 hours on the task, you can stop. Quality > Quantity**

- Test your work well. Think of edge cases. Think of how users will use it, and make sure your work is of high quality
- Stick to the best practices of the libraries used as much as possible
- If you have any questions regarding the task itself or its environment, feel free to ask us. For general coding / technology questions, please consult stack overflow, forums and other sources of your choice.

## Submitting

1. Delete any `node_modules` directory from the project.
2. Zip the root directory to a file called `exam_{yourname}.zip` and send it back to us.
3. You can describe any general notes you may have.
   Can be anything from challenges you dealt with, something you feel was not done perfect and how would you do better with more time, or something you're specially proud of.

good luck!
