 
  const { Client } = require('pg');
  const client = new Client({
                  user: process.env.DB_USER,
                  host: process.env.DB_HOST,
                  database: process.env.DB_DATABASE,
                  password: process.env.DB_PASSWORD,
                  port: 5432
                });
                
  exports.handler = async (event, context, cb) => {
    context.callbackWaitsForEmptyEventLoop = false; 
    await client.connect();
  
    // const userIdget = event.pathParameters.id; 
    // const user = `Select * from public.users where user_id = ${userIdget}`; 
    const user = `Select * from public.users where user_id = 1`; 
    const row = await client.query(user);
    
    const lambdaResponse = {
    statusCode: 200,
    body: JSON.stringify(row)
  };
    
    // const activeUsers = `Select * from public.users where is_active = 'true'`;
    // let rows = [];
    // rows = await client.query(activeUsers);
    
    // const lambdaResponseUsers = {
    // statusCode: 200,
    // body: JSON.stringify([rows])
    // };
  
  client.end();
  return lambdaResponse;
 
};