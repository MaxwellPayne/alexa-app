var alexa = require('../'),
    ssml = require('ssml'),
    tap = require('tap');

tap.test('Using SSML with .say() and .reprompt()', function(t) {
  var app = alexa.app();
  app.response();

  // Create a variety of chainable SSML and plain text phrases
  var first = new ssml().prosody({rate: '0.6'}).say('First thing.').up(),
      second = new ssml().say('Second thing.').break(500),
      third = "Third thing.",
      fourth = new ssml().audio('https://foobar.com/audio/song.mp3');

  var intendedResponse = '<speak><prosody rate="0.6">First thing.</prosody> Second thing.<break time="500ms"/> Third thing. <audio src="https://foobar.com/audio/song.mp3"/></speak>';

  app.say(first).say(second).say(third).say(fourth);
  t.equal(app.response.response.outputSpeech.type, 'SSML', 'output type should be SSML');
  t.equal(app.response.response.outputSpeech.ssml, intendedResponse, 'should yield intended SSML document');

  app.clear();

  app.reprompt(first).reprompt(second).reprompt(third).reprompt(fourth);
  t.equal(app.response.response.reprompt.outputSpeech.type, 'SSML', 'output type should be SSML');
  t.equal(app.response.response.reprompt.outputSpeech.ssml, intendedResponse, 'should yield intended SSML document');

  t.done();
});
