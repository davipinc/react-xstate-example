// import reactjsPosts from '../mocks/reactjs.json';
//const useMocks = false;

export default async function redditFetch(context) {
  console.log('redditFetch', context);
  const { subreddit } = context;
  const url = `https://www.reddit.com/r/${subreddit}.json`;

  console.log('FETCHING', subreddit, url);

  // if (useMocks) {
  //   return reactjsPosts.data.children.map(child => child.data);
  // }
 
  const response = await fetch(url)
  const json = await response.json();
  return json.data.children.map(child => child.data);
}