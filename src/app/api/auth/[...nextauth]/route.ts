// because this is a route.ts file, we can export functions to implement api route request handlers
// this route pattern is for when outside servers need to access our app; here, github auth.
export { GET, POST } from '@/auth'
