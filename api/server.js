// See https://github.com/typicode/json-server#module
import { create, router as _router, defaults, rewriter } from 'json-server'

const server = create()

// Uncomment to allow write operations
import { readFileSync } from 'fs'
import { join } from 'path'
const filePath = join('tickets.json')
const data = readFileSync(filePath, "utf-8");
const tickets = JSON.parse(data);
const router = _router(tickets)

// Comment out to allow write operations
// const router = jsonServer.router('tickets.json')

const middlewares = defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
export default server
