import { handler } from './handler.js';
import express from 'express';
 
const app = express();
 
// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

app.use('images',express.static('images'));
 
// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
 
app.listen(443, () => {
  console.log('Freecards has started.');
});