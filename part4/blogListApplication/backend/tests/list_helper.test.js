const { test, describe } = require("node:test");
const assert = require("node:assert");

const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper.js");

describe("Dummy Test", () => {
  test("dummy returns 1", () => {
    const result = dummy([]);

    assert.strictEqual(result, 1);
  });
});

describe("Total Likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];
  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);

    assert.strictEqual(result, 5);
  });
});

describe("Most Favorite Blog", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
    },
    {
      title: "Breadth Search Algorithm",
      author: "Nibesh khadka",
      url: "https://google.com",
      likes: 20,
      id: "66386b8012a4cc76b4ffcd61",
    },
    {
      title: "Binary Search Algorithm",
      author: "Nibesh khadka",
      url: "https://google.com",
      likes: 30,
      id: "66386b9f12a4cc76b4ffcd64",
    },
  ];
  test("Most favorite blog for the given list of blog is with the total likes of ", () => {
    const result = favoriteBlog(blogs);

    assert.deepStrictEqual(result, {
      title: "Binary Search Algorithm",
      author: "Nibesh khadka",
      url: "https://google.com",
      likes: 30,
      id: "66386b9f12a4cc76b4ffcd64",
    });
  });
});

describe("Most Blogs", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
    },
    {
      title: "Breadth Search Algorithm",
      author: "Nibesh khadka",
      url: "https://google.com",
      likes: 20,
      id: "66386b8012a4cc76b4ffcd61",
    },
    {
      title: "Binary Search Algorithm",
      author: "Nibesh khadka",
      url: "https://google.com",
      likes: 30,
      id: "66386b9f12a4cc76b4ffcd64",
    },
  ];
  test("Most blog is written by the author ", () => {
    const result = mostBlogs(blogs);

    assert.deepStrictEqual(result, {
      author: "Nibesh khadka",
      blogs: 2,
    });
  });
});

describe("Most Likes", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
    },
    {
      title: "Breadth Search Algorithm",
      author: "Nibesh khadka",
      url: "https://google.com",
      likes: 20,
      id: "66386b8012a4cc76b4ffcd61",
    },
    {
      title: "Binary Search Algorithm",
      author: "Nibesh khadka",
      url: "https://google.com",
      likes: 30,
      id: "66386b9f12a4cc76b4ffcd64",
    },
  ];
  test("Most Popular author is  ", () => {
    const result = mostLikes(blogs);

    assert.deepStrictEqual(result, {
      author: "Nibesh khadka",
      likes: 50,
    });
  });
});
