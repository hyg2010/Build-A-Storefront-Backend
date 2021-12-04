# Storefront Backend Project

## ENVIRONMENT VARIABLES: (How to setup and connect to the database)

SETUP DATABASE 
CREATE USER full_stack_user WITH PASSWORD 'password123'
CREATE DATABASE store_front & CREATE DATABASE storefront_test
Grant store_front & storefront_test to full_stack_user

(Add ENV Files)

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_front
POSTGRES_TEST_DB=store_front_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=your-secret-BCRYPT_PASSWORD
SALT_ROUNDS=10
TOKEN_SECRET=alohomora123!
ENV=dev


## package installation instructions

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


## Test
-Yarn test 

##Sources 

-https://knowledge.udacity.com/?nanodegree=nd0067&page=1&project=811&query=endpoint%20testing&rubric=3061&sort=RELEVANCE

-https://www.npmjs.com/package/supertest


