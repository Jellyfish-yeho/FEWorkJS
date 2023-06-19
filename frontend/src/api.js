import config from "./config.js"

const {API_ENDPOINT, REQUEST_ERROR} = config;


//fetch 를 진행할 메소드 부분
const request = async (url) => {
  try {
    //result가 나올 때까지 대기함.
    const result = await fetch(url);
    if (result.status === 200) { //성공
      return result.json();
    } else {//실패. catch 문으로 에러를 전달해 준다.
      throw REQUEST_ERROR[result.status];
    }
  } catch (error) {
    alert(error.msg)//유저에게 요청 실패 알림
    return {data : null}//프론트 데이터 처리를 위해 리턴
  }
};

const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsWithLimit: (keyword, limit) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=${limit}`);
  },
  fetchCatsByPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
    y;
  },
  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api