# Dev Setup

Here's a comprehensive set of steps to take if you'd like to develop FC.

## svelte setup

```bash
npm i -g pnpm
pnpm i

# start the server and open the app in a new browser tab
npm run dev -- --open
```
OR more simply just 
`npm run dev`

You should probably install the 'Svelte for VS Code' extension if you
are using that IDE and make sure VS Code is up to date. If you get weird
errors (like on `<script>` tags), make sure the IDE itself is current.

## redis setup

FC runs on redis-cloud in production. In order to achieve some parity 
for local testing, please install redis (& redis-cli) locally by 
following the instructions here: https://redis.io/docs/getting-started/installation/

FC will read and write to your local redis instance in dev mode.