// server/api/test.ts
import { send } from 'h3';

export default defineEventHandler((event) => {
  return send(event, { message: 'Hello JSON' }, {
    headers: { 'Content-Type': 'application/json' },
  });
});