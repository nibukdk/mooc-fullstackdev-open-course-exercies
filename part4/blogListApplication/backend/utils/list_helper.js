const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs
    .map((blog) => blog.likes)
    .reduce((initialVal, currentVal) => initialVal + currentVal, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (prevBlog, currBlog) =>
      prevBlog.likes > currBlog.likes ? prevBlog : currBlog,
    { likes: 0 }
  );
};

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((a, c) => {
    a[c.author] = a[c.author] ? a[c.author] + 1 : 1;
    return a;
  }, {});

  return Object.keys(authors).reduce(
    (a, b) => {
      const prevObjKey = authors[Object.keys(a)[0]];
      const currObjKey = b;

      return a.blogs > authors[b]
        ? { author: prevObjKey, blogs: authors[prevObjKey] }
        : { author: currObjKey, blogs: authors[b] };
    },
    { author: "", blogs: null }
  );
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce((prev, curr) => {
    prev[curr.author] = prev[curr.author]
      ? prev[curr.author] + curr.likes
      : curr.likes;
    return prev;
  }, {});
  // authors ={Edsger W. Dijkstra: 5, Nibesh khadka: 50}
  return Object.keys(authors).reduce(
    (prev, curr) => {
      const prevObjKey = authors[Object.keys(prev)[0]];
      const currObjKey = curr;

      return prev.likes > authors[curr]
        ? { author: prevObjKey, likes: authors[prevObjKey] }
        : { author: currObjKey, likes: authors[currObjKey] };
    },
    { author: "", likes: null }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
