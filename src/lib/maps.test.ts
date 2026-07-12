import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mapsEmbedUrl, mapsLinkUrl } from './maps.ts';

const address = { addressLine: 'Drapstraat 90', postalCode: '9810', city: 'Nazareth' };

test('mapsEmbedUrl encodes the address and requests the embed view in Dutch', () => {
  assert.equal(
    mapsEmbedUrl(address),
    'https://www.google.com/maps?q=Drapstraat%2090%2C%209810%20Nazareth%2C%20Belgi%C3%AB&output=embed&hl=nl'
  );
});

test('mapsLinkUrl uses the documented Maps URLs search format', () => {
  assert.equal(
    mapsLinkUrl(address),
    'https://www.google.com/maps/search/?api=1&query=Drapstraat%2090%2C%209810%20Nazareth%2C%20Belgi%C3%AB'
  );
});
