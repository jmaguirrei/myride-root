
const FILLER_LENGTH = 55;
const MAX_PAYLOAD_LENGTH = 40;

export function log(str, payload) {

  const filler = '-'.repeat(FILLER_LENGTH - str.length);
  if (!payload) return console.log(`[SW] ${filler}> ${str}`);

  if (typeof payload !== 'string') return console.log(`[SW] ${filler}> ${str} `, payload);

  if (payload.length < MAX_PAYLOAD_LENGTH) return console.log(`[SW] ${filler}> ${str} `, payload);

  const payloadStr = payload.substr(payload.length - MAX_PAYLOAD_LENGTH, 1000);
  return console.log(`[SW] ${filler}> ${str} `, payloadStr);

}


