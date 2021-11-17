// Parse image object from graphQL
function getImage(obj) {
  return {
    url: obj.edges[0].node.url || '',
    title: obj.edges[0].node.title || '',
  };
}

// Parse book object from graphQL
function getBookInfo(book) {
  return {
    title: book.title || '',
    url: getImage(book.cover_imageConnection).url,
    urlTitle: getImage(book.cover_imageConnection).title,
  };
}

export {
  getImage,
  getBookInfo,
};
