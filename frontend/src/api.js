const API_ENDPOINT =
  // "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev"
  "http://localhost:4001";

const api = {
  fetchCats: (keyword) => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then((res) =>
      res.json()
    );
  },
  fetchCatsByPage: (keyword, page) => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`).then((res) =>
      res.json()
    );
  },
  fetchRandomCats : () => {
    return fetch(`${API_ENDPOINT}/api/cats/random50`).then((res) =>
      res.json()
    );
  },
  fetchCatDetail: id => {
    return fetch(`${API_ENDPOINT}/api/cats/${id}`).then((res) =>
      res.json()
    );
  },
};
