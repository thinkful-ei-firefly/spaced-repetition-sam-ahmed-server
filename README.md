# ![WebApp](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-client/blob/master/images/register.png?raw=true)

# ![WebApp](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-client/blob/master/images/dashboard.png?raw=true)


# Spaced Repetition -- web Application

This web application uses spaced repetition to help people in  memorize Italy language. The app shows word in Italy and asks you to remember the English translation of the word. 

### Engineering Team
- Sam 
- Ahmed
- tomatau (github) - starter code

## Table of contents

- [App Description](#app-description)
- [Live Demo](#live-demo)
- [Client-site repo](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-client)
- [Server-site repo](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-server)
- [User Stories](#user-stories)
- [Site Screenshots](#site-screenshots)
- [Wireframe](#wireframe)
- [Build with](#build-with)
- [Development](#development)
- [Local dev setup](#local-dev-setup)
- [Configuring Postgres](#configuring-postgres)
- [Scripts](#scripts)

## App Description

<table>
<tr>
<td>
  This web application uses spaced repetition to help people in  memorize Italy language. The app shows word in Italy and asks you to remember the English translation of the word. As a prospective client, you must register an account to save your progress by logging in and using the request. You must login to the program to start learning as a registered user. The home dashboard shows your vocabulary, the words you need to know, and the score for each word. The learning page asks you to enter a word's translation, which will then give you feedback as to whether you were correct. The words you forget more often are more often reflected. Once each word is mastered, each word is asked increasingly less frequently.

</td>
</tr>
</table>

## Live Demo

> [Live Page](https://spaced-repetition-sam-ahmed.now.sh/ )


## User Stories

#### USER STORY (Registration page)
> 
> As a prospective user, I can register an account so that I can login and use the application.
> 
> #### Acceptance criteria:
> 
> As a first time user:
> - I'm directed to a registration page.
> - On that page, I can enter my name, username, and password.
> - If all of my information is correct, upon clicking the submit button, I'm taken to the login page.
> - If any of my information is incorrect, I'm given an appropriate error message and the option to correct my information.
> 
#### USER STORY (Login page)
> 
> As a registered user, I can login to the application so that I can begin learning.
> 
> #### Acceptance criteria:
> 
> On any visit when I'm not logged in:
> - I can navigate to the "login" page.
> 
> As a registered user on the login page:
> - I can navigate back to the registration page.
> - I can enter my username and password.
> - If my submitted username and password are incorrect, I'm given an appropriate error message so that I can attempt to login again.
> - If my submitted username and password are correct, the app "logs me in" and redirects me to my dashboard.
> 
> As a logged in user:
> - The app displays my name and presents a logout button.
> - The application refreshes my auth token so that I can remain logged in while active on the page.
> 
> As a logged in user who is starting a new session:
> - The application remembers that I'm logged in and doesn't redirect me to the registration page.
> 
#### USER STORY (Dashboard page)


As a logged in user, I'm directed to a dashboard where I can see my progress learning my language.
> 
> #### Acceptance criteria:
> 
> When viewing the dashboard as a logged in user:
> 
> - The app gets my language and words progress from the server
> - I'm shown my language
> - I'm shown the words to learn for the language
> - I'm shown my count for correct and incorrect responses for each word
> - I'm given a button/link to start learning
> - I'm shown the total score for guessing words correctly
> 
####  USER STORY (Learning page - 1)
> 
> As a logged in user, I can learn words using spaced repetition.
> 
> #### Acceptance criteria:
> 
> When viewing the learning page as a logged in user:
> 
> - The app gets my next word to learn details from the server
> - I'm shown the word to learn
> - I'm shown my current total score
> - I'm shown the number of correct and incorrect guesses for that word
> - I'm presented an input to type my answer/guess for the current words translation
>

#### USER STORY (Learning page - 2)
> 
> As a logged in user, I can see feedback on my submitted answers.
> 
> #### Acceptance criteria:
> 
> After submitting an answer on the learning page as a logged in user:
> 
> - The app POSTs my answer for this word to the server
> - The server will update my appropriate scores in the database
> - After submitting, I get feedback whether I was correct or not
> - After submitting, I'm told the correct answer
> - My total score is updated
> - I'm told how many times I was correct and incorrect for the word
> - I can see a button to try another word
> 
#### USER STORY (Learning page - )
> 
> As a logged in user, I can learn another word after receiving feedback from my previous answer
> 
> #### Acceptance criteria:
> 
> When viewing feedback for an answer on the learning page as a logged in user:
> 
> - I'm presented with a button that I can click to learn another word
> - When clicking on the button I see the next word to learn
> 

## Site Screenshots

#### Register Page.
  ![](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-client/blob/master/images/register.png?raw=true)
#### Sign In Page
  ![](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-client/blob/master/images/login.png?raw=true)
#### Dashboard Page
  ![](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-client/blob/master/images/dashboard.png?raw=true)
#### Question Page
  ![](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-client/blob/master/images/question.png?raw=true)
#### FeedBack Page
  ![](https://github.com/thinkful-ei-firefly/spaced-repetition-sam-ahmed-client/blob/master/images/feedback.png?raw=true)


##  Wireframe
- Register page
  - [ live version of the wireframe](https://docs.google.com/drawings/d/1070twISGz1pQWNLVJn73ePn_slF14q7pfI1UEKRyjNw/edit?usp=sharing)


- Sign In Page
  - [ live version of the wireframe](https://docs.google.com/drawings/d/11rAW2hzT5WN2hNzNuuIrP6R0P3TB8jDlj5shFSNgkSo/edit?usp=sharing)


- Dashboard Page
  - [ live version of the wireframe](https://docs.google.com/drawings/d/1u7EiZj6ePKilAUKsR_bJmoiqiVhpGwrHWaEisy4552g/edit?usp=sharing)

- Question Page
  - [ live version of the wireframe](https://docs.google.com/drawings/d/1Jhej2v0hw0gYVJlab5DLeKKgqNl48CB0lz1JnmZAW9o/edit?usp=sharing)


- FeedBack Page
  - [ live version of the wireframe](https://docs.google.com/drawings/d/1FMoKV9PDZ34MiGG30jJpQTzOPFEP7uSKPZIYHZKQeFc/edit?usp=sharing)



## Build with

- React 
- Vanilla CSS
- Node package manager 
- Node.js 
- Express 
- Cypress - (testing)


## Development

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request

## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin spaced-repetition
createdb -U dunder-mifflin spaced-repetition-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
