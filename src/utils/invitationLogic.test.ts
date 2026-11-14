import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WEDDING_TARGET_MS,
  RSVP_ATTENDING_COPY,
  RSVP_DECLINING_COPY,
  RSVP_WHATSAPP_RECIPIENTS,
  MAX_NO_DODGES,
  YOUTUBE_SONG_URL,
  calculateCountdown,
  formatCountdownUnit,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  pickRandomWhatsAppRecipient,
  buildRandomAttendingWhatsAppTarget,
  getNoButtonDodgeOffset,
  createCelebrationParticles,
  extractYouTubeVideoId,
} from './invitationLogic';

test('calculateCountdown computes days, hours, minutes, seconds accurately before event', () => {
  const oneDayTwoHoursThreeMinsFourSecs =
    ((1 * 24 + 2) * 60 * 60 + 3 * 60 + 4) * 1000;
  const now = WEDDING_TARGET_MS - oneDayTwoHoursThreeMinsFourSecs;
  const result = calculateCountdown(WEDDING_TARGET_MS, now);

  assert.equal(result.days, 1);
  assert.equal(result.hours, 2);
  assert.equal(result.minutes, 3);
  assert.equal(result.seconds, 4);
  assert.equal(result.isPast, false);
});

test('calculateCountdown clamps to zero when event time has arrived or passed', () => {
  const onTime = calculateCountdown(WEDDING_TARGET_MS, WEDDING_TARGET_MS);
  assert.equal(onTime.days, 0);
  assert.equal(onTime.hours, 0);
  assert.equal(onTime.minutes, 0);
  assert.equal(onTime.seconds, 0);
  assert.equal(onTime.isPast, true);
  assert.equal(onTime.isEventDay, true);

  const twoDaysLater = calculateCountdown(
    WEDDING_TARGET_MS,
    WEDDING_TARGET_MS + 48 * 60 * 60 * 1000,
  );
  assert.equal(twoDaysLater.isPast, true);
  assert.equal(twoDaysLater.isEventDay, false);
});

test('formatCountdownUnit zero-pads single digits and guards negatives', () => {
  assert.equal(formatCountdownUnit(0), '00');
  assert.equal(formatCountdownUnit(7), '07');
  assert.equal(formatCountdownUnit(29), '29');
  assert.equal(formatCountdownUnit(-4), '00');
});

test('buildWhatsAppMessage and buildWhatsAppUrl format attending and declining messages directly', () => {
  assert.equal(buildWhatsAppMessage('yes'), RSVP_ATTENDING_COPY);
  assert.equal(buildWhatsAppMessage('no'), RSVP_DECLINING_COPY);

  const defaultUrl = buildWhatsAppUrl('yes');
  assert.ok(defaultUrl.startsWith('https://wa.me/?text='));
  assert.equal(decodeURIComponent(defaultUrl.split('?text=')[1]), RSVP_ATTENDING_COPY);

  const targetedUrl = buildWhatsAppUrl('yes', '+58 414-1234567');
  assert.ok(targetedUrl.startsWith('https://wa.me/584141234567?text='));
});

test('pickRandomWhatsAppRecipient and buildRandomAttendingWhatsAppTarget alternate between Alejandro and Dayneb', () => {
  assert.equal(RSVP_WHATSAPP_RECIPIENTS.length, 2);
  assert.equal(RSVP_WHATSAPP_RECIPIENTS[0].phone, '584125146317');
  assert.equal(RSVP_WHATSAPP_RECIPIENTS[1].phone, '584246624356');

  const first = pickRandomWhatsAppRecipient(RSVP_WHATSAPP_RECIPIENTS, () => 0.15);
  assert.equal(first.phone, '584125146317');

  const second = pickRandomWhatsAppRecipient(RSVP_WHATSAPP_RECIPIENTS, () => 0.85);
  assert.equal(second.phone, '584246624356');

  const edge = pickRandomWhatsAppRecipient(RSVP_WHATSAPP_RECIPIENTS, () => 0.9999);
  assert.equal(edge.phone, '584246624356');

  const target = buildRandomAttendingWhatsAppTarget(() => 0.72);
  assert.equal(target.recipient.phone, '584246624356');
  assert.ok(target.url.startsWith('https://wa.me/584246624356?text='));
  assert.equal(decodeURIComponent(target.url.split('?text=')[1]), RSVP_ATTENDING_COPY);
});

test('getNoButtonDodgeOffset returns bounded non-zero offsets during dodge attempts and resets after max', () => {
  assert.deepEqual(getNoButtonDodgeOffset(0), { x: 0, y: 0 });
  for (let i = 1; i <= MAX_NO_DODGES; i += 1) {
    const offset = getNoButtonDodgeOffset(i);
    assert.ok(offset.x !== 0 || offset.y !== 0);
    assert.ok(Math.abs(offset.x) <= 30 && Math.abs(offset.y) <= 24);
  }
  assert.deepEqual(getNoButtonDodgeOffset(MAX_NO_DODGES + 1), { x: 0, y: 0 });
});

test('createCelebrationParticles creates valid petals, sparkles, and hearts around origin', () => {
  const particles = createCelebrationParticles(40, 200, 500, () => 0.5);
  assert.equal(particles.length, 40);
  for (const p of particles) {
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
    assert.ok(p.opacity > 0 && p.opacity <= 1);
    assert.ok(['petal', 'sparkle', 'heart'].includes(p.kind));
  }
});

test('extractYouTubeVideoId extracts video ID from youtu.be and youtube.com URLs', () => {
  assert.equal(extractYouTubeVideoId(YOUTUBE_SONG_URL), 'rtOvBOTyX00');
  assert.equal(
    extractYouTubeVideoId('https://www.youtube.com/watch?v=rtOvBOTyX00&feature=share'),
    'rtOvBOTyX00',
  );
  assert.equal(extractYouTubeVideoId('invalid-url'), null);
});
