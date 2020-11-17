# workiServer

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)

## ========= Readme under construction =========

Please note that the project is under review due the code freeze on 04th November as this was a 3 week "challenge/project".

Comments about the code, README.md, bug fixing and style fixing are going to be done in the next weeks.

Also be aware that to NOT submit any personal data (yours or others) on the website.

Frontend: https://github.com/simo54/worki
Backend: https://github.com/simo54/workiServer

## Intro

This is the final project of my coding academy's bootcamp. I decided to build up a job board website where users can apply to jobs and where the employer can post and read users applications through their private area.

Known issue:

- Login Authentication 401 on existing user/employer
  - In deployed version is it possible to signup and create either a user account or an employer account. The frontend has been designed with a React HOC component where, according a positive response status (200), will allow the user or the employer to have access in their private area. If different result status, the frontend will redirect to the signup page.
    The problem could rely on the creation of the cookies (JWT and UUID session token) on Browser (on localhost the cookies are created regularly).

## Tech Stack (Backend)

- Node.js
- Express
- Bcrypt
- Cookie
- DotEnv
- JWT
- Multer
- Pg
- Sequelize
- UUID4
