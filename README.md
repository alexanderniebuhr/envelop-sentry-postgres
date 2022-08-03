# envelop-sentry-postgres

## no-envelop.js

```
...
spans: [
  {
    "description": "SELECT NOW()",
    "op": "db",
    "parent_span_id": "a0da2465893847fb",
    "span_id": "b210e294715f4028",
    "start_timestamp": 1659508903.5280774,
    "timestamp": 1659508903.530417,
    "trace_id": "1a0c8d0558f3400ba4762723e5642cc2"
  }
]
...
```

## envelop.js

```
...
spans: [
  {
    "op": "Query.now",
    "parent_span_id": "9786bd26945adbc5",
    "span_id": "b506a49a9052326c",
    "start_timestamp": 1659508870.364404,
    "tags": {
      "fieldName": "now",
      "parentType": "Query",
      "returnType": "String"
    },
    "timestamp": 1659508870.4041245,
    "trace_id": "f2d913fb97a3483ab3e006ade150a4d6"
  }
]
...
```