// import reactjsPosts from '../mocks/reactjs.json';
//const useMocks = false;

export default async function reddit(context) {
  const { subreddit } = context;

  // if (useMocks) {
  //   return reactjsPosts.data.children.map(child => child.data);
  // }
 
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
  const json = await response.json();
  return json.data.children.map(child => child.data);
}