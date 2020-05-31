import React from 'react';
import { useMachine } from '@xstate/react';
import redditMachine from './redditMachine.js';
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
            send('SELECT', { name: e.target.value });
          }}
        >
          {subreddits.map(subreddit => {
            return <option key={subreddit}>{subreddit}</option>;
          })}
        </select>
      </header>
      {subreddit && <Subreddit name={subreddit} key={subreddit.id} />}
    </main>
  );
};

export default App;