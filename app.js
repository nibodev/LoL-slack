const app = require('koa')()
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
require('dotenv').load()

const lol = require('./lib')

// LOL
router.post('/lol', lol)

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3001);

console.log('listening on port 3001')
