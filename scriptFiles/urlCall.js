


// urlCall.js

const baseURL = "https://www.the-lore-of-pour.com";
const allPostsURL = `${baseURL}/wp-json/wp/v2/posts?per_page=6&_embed`;
const cardPostsURL = `${baseURL}/wp-json/wp/v2/posts?per_page=20&_embed`;
const productsURL = `${baseURL}/wp-json/wp/v2/media?per_page=24&_embed`;

export { baseURL, allPostsURL, cardPostsURL, productsURL };