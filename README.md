# Music Share

Music sharing application built with ReactJS, Apollo Client (GraphQL), and Hasura for the backend.

## Create `Hasura.io` Free Tier Project

1. Go to `hasura.io` and click `use hasura cloud for free`
2. Create an account if you don't already have one
3. Project setup

![](1-project-setup)

4. Database setup with heroku

![](2-database-setup)

5. Launch Hasura Console. Take note of the GraphQL endpoint

![](3-hasura-console)

6. Go to `Data` tab and add a new `table`

![](4-add-new-table)

7. Backend is all set

## Setup `.env.local`

1. Create a `.env.local` file in the root folder
2. See env.example for how to set it up
3. Change the example URI to the `GraphQL endpoint` we got from Hasura Console

Note: Remove `https:` we handle the in `client.js`

## All set you can start using the web app

1. Copy and Paste a `Youtube/SoundClound` url and add a song
2. Start listening

## Sample URL

1. Youtube `https://youtu.be/YQHsXMglC9A`
2. SoundClound `https://soundcloud.com/oliviarodrigo/drivers-license`
