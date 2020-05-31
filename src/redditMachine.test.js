import { interpret } from 'xstate';
import { assert } from 'chai';

import { redditMachine } from './redditMachine.js';

describe('reddit machine (live)', () => {
  it('should load posts of a selected subreddit', done => {
    console.log('waiting');
    const redditService = interpret(redditMachine)
      .onTransition(state => {
        // when the state finally reaches 'selected.loaded',
        // the test has succeeded.
        console.log('TRANSITION', state.value, state.context);
        if (state.matches({ selected: 'loaded' })) {
          console.log('FOUND', state.toStrings());
          assert.isNotEmpty(state.context.posts);

          done();
        }
      })
      .start(); // remember to start the service!

    // Test that when the 'SELECT' event is sent, the machine eventually
    // reaches the { selected: 'loaded' } state with posts
    redditService.send('SELECT', { name: 'reactjs' });
  });
});