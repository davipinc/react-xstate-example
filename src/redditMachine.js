import { Machine, assign } from 'xstate';
import reactjsPosts from '../mocks/reactjs.json';

const useMocks = false;

async function invokeFetchSubreddit(context) {
  const { subreddit } = context;

  if (useMocks) {
    return reactjsPosts.data.children.map(child => child.data);
  }
 
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
  const json = await response.json();
  return json.data.children.map(child => child.data);
}

const redditMachine = Machine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null, // none selected,
    posts: null
  },  
  states: {
    idle: {},
    selected: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetch-subreddit',
            src: invokeFetchSubreddit,
            onDone: {
              target: 'loaded',
              actions: assign({
                posts: (context, event) => event.data
              })
            },
            onError: 'failed'
          }
        },
        loaded: {},
        failed: {}
      }
    }
  },
  on: {
    SELECT: {
      target: '.selected',
      actions: assign({
        subreddit: (context, event) => event.name
      })
    }
  }
});

export { redditMachine };

// // sample SELECT event
// const selectEvent = {
//   type: 'SELECT', // event type
//   name: 'reactjs' // subreddit name
// };