process.env.PGHOST = 'localhost';
process.env.PGUSER = 'postgres';
process.env.PGPASSWORD = 'postgres';

import PG from 'pg'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import '@sentry/tracing'
export const pool = new PG.Pool()

Sentry.addGlobalEventProcessor(event => {
  if (event.type === "transaction") {
    console.log(JSON.stringify(event.spans));
  }
  return event;
})

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  tracesSampleRate: 1.0,
  debug: true,
  enabled: true,
})
const transaction = Sentry.startTransaction({
  op: "transaction",
  name: "My Transaction",
});
Sentry.configureScope(scope => {
  scope.setSpan(transaction);
});

pool.query('SELECT NOW()').then(res => {
  console.log(res.rows[0].now);
  transaction.finish();
})
