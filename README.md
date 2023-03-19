# free-card.games

Play classic card games on any device for free. No ads. No signup or info required.

## Stack

Svelte kit with redis-cloud for short-term persistance.

## Developing

```bash
npm i -g pnpm
pnpm i

# start the server and open the app in a new browser tab
npm run dev -- --open
```

or you can cut npm out of the picture and run vite directly:

```
pnpm i --save-dev vite
vite dev
```

## Building

To create a prodlike version of the app:

```bash
npm run build

#or with vite
vite build
```

build results default to `./.svelte-kit`