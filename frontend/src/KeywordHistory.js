import uniqueArray from "./utils/uniquerArray.js";

class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement("ul");
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = "KeywordHistory";

    $target.appendChild(this.$keywordHistory);

    this.onSearch = onSearch;

    this.init();
    this.render();
  }

  init() {
    const data = this.getHistory()
    this.setState(data);
  }

  addKeyword(keyword) {
    //최근 키워드 저장
    let keywordHistory = this.getHistory()
    //최근 순서대로 하기 위해 unshift 사용
    keywordHistory.unshift(keyword);
    //중복 제거
    keywordHistory = uniqueArray(keywordHistory)
    //5개 제한
    keywordHistory = keywordHistory.slice(0, 5);
    localStorage.setItem("keywordHistory", keywordHistory.join(","));
    //dom render
    this.init()
  }

  getHistory(){
    return localStorage.getItem("keywordHistory")
    ? localStorage.getItem("keywordHistory").split(",")
    : [];
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  bindEvent (){
    //전체 공유 변수이기 때문에 별도 인자 받을 필요가 없음
    this.$keywordHistory
    .querySelectorAll("li button")
    .forEach(($item, index) => {
      $item.addEventListener("click", (e) => {
        //데이터에서 index에 해당하는 item을 가져온다.
        this.onSearch(this.data[index]);
      });
    });
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map(
        (keyword) => `
        <li><button>${keyword}</button></li>      
      `
      )
      .join(""); //HTML 은 join("")해줘야 콤마가 없음
      this.bindEvent()
  }
}

export default KeywordHistory