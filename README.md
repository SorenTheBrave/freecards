# free-card.games

Play classic card games on any device for free. No ads. No signup or info required. https://free-card.games

## Stack

Svelte kit with redis-cloud for short-term persistance.

## Developing

```bash
npm i -g pnpm
pnpm i

# start the server and open the app in a new browser tab
npm run dev -- --open
```
OR more simply just 
`npm run dev`

or you can cut npm out of the picture and run vite directly:

```
pnpm i --save-dev vite
vite dev
```

You should probably install the 'Svelte for VS Code' extension if you
are using that IDE and make sure VS Code is up to date. If you get weird
errors (like on `<script>` tags), make sure the IDE itself is current.

## Building

To create a prodlike version of the app:

```bash
npm run build

#or with vite
vite build
```

build results default to `./.svelte-kit`

if you want to run the whole app from a container, ensure Docker is installed and the daemon is running and then:

`docker build . -t [CHOSEN-TAG]` from the project root.

Run the container with `docker run --rm -it -p 443:443 [CHOSEN-TAG]` The site can then be accessed from the browser over https via localhost, and when you're finished testing you can kill the docker process with Ctrl-C or ctrl-Z like usual. 

Note: Docker should kill the container after exit, but if it doesn't you might get an error such as `Bind for 0.0.0.0:443 failed: port is already allocated.` - in this case, you just need to kill the existing container. Run `docker container ls` and feed the hash it spits out into `docker container stop [HASH]` and then you should be good to go again. This also works if you have trouble killing the running container. 