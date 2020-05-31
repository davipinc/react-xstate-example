import { Machine, assign } from 'xstate';
import redditFetch from '../api/redditFetch.js';

const createSubredditMachine = subreddit => {
  return Machine({
    id: 'subreddit',
    initial: 'loading',
    context: {
      subreddit, // subreddit name passed in
      posts: null,
      lastUpdated: null
    },
    states: {
      loading: {
        invoke: {
          id: 'fetch-subreddit',
          src: redditFetch,
          onDone: {
            target: 'loaded',
            actions: assign({
              posts: (_, event) => event.data,
              lastUpdated: () => Date.now()
            })
          },
          onError: 'failure'
        }
      },
      loaded: {
        on: {
          REFRESH: 'loading'
        }
      },
      failure: {
        on: {
          RETRY: 'loading'
        }
      }
    }
  });
};

export { createSubredditMachine };