import React from 'react';
import { useMachine } from '@xstate/react';
import { redditMachine } from './state/redditMachine.js';
import Subreddit from './components/Subreddit.js';

const subreddits = ['frontend', 'reactjs', 'vuejs'];

const App = () => {
  const [current, send] = useMachine(redditMachine);
  const { subreddit } = current.context;

  return (
    <main>
      <header>
        <select
          onChange={e => {
            const subreddit = e.target.value;
            if (subreddit === '') {
              return;
            }
            send('SELECT', { name: subreddit });
          }}
        >
          <option key="none" value="">Choose a subreddit</option>
          {subreddits.map(subreddit => {
            return <option key={subreddit}>{subreddit}</option>;
          })}
        </select>
      </header>
      {subreddit && <Subreddit service={subreddit} key={subreddit.id} />}
    </main>
  );
};

export default App;