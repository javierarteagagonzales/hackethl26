const { Client } = require('pg');
const client = new Client({
  connectionString: "postgres://postgres.fsrftxmecailbqpugtst:Kei5sXGTxLmKAaMH@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
});

async function test() {
  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log("Connection successful:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}

test();
