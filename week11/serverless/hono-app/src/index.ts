import { Hono } from 'hono'

const app = new Hono()

app.post('/',authmiddleware, async (c) => {
  // so for accessing the body we can also do that by using the 
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));
  return c.json({
    message: 'Hello Hono!'
  });
})

// so now here we can alos use the middle ware also 
async function authmiddleware(c : any , next : any){
  if(c.req.header("Authorization")){
    // so here all the logic then 
    await next();
  }else{
    return c.text("you do not have access", 401); // with the status code also 
  }
}

export default app