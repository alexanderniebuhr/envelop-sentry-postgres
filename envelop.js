process.env.PGHOST = 'localhost';
process.env.PGUSER = 'postgres';
process.env.PGPASSWORD = 'postgres';

import { createServer } from '@graphql-yoga/node'
import { useSentry } from '@envelop/sentry'
import { buildSchema } from 'graphql'
import PG from 'pg'
import * as Sentry from '@sentry/node'
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

const baseSchema = buildSchema(/* GraphQL */ `
  type Query {
    hello: String
  }
`)

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        now: String
      }
    `,
    resolvers: {
      Query: {
        now: () => {
          return pool.query('SELECT NOW()').then(res => {
            console.log(res.rows[0].now);
          })
        },
      },
    },
  },
  plugins: [useSentry()],
})

const { response, executionResult } = await server.inject({document: "{ now }"})
