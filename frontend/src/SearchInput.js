import KeywordHistory from "./KeywordHistory.js";

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement("section");
    $wrapper.className = "SearchInputSection";
    $target.appendChild($wrapper);

    //검색 input
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.value = this.getLastKeyword()
    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    $searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value.length !== 0) {
        onSearch(e.target.value, this.$limitCount.value);
        //최근 키워드 저장
        this.KeywordHistory.addKeyword(e.target.value)
      }
    });

    //셀렉트 UI 
    const $limitCount = document.createElement('select');
    this.$limitCount = $limitCount;
    this.$limitCount.className = "LimitCount";

    const LimitCountOptions = [10, 25, 50];
    LimitCountOptions.map(option => {
      let $option = document.createElement("option");
      $option.value = option;
      $option.textContent = `${option}개`;
      this.$limitCount.appendChild($option);
    })

    $wrapper.appendChild(this.$limitCount)

    //랜덤 버튼
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className = "RandomButton";
    this.$randomButton.textContent = "🐈랜덤냥🐈‍⬛";
    $wrapper.appendChild(this.$randomButton);

    this.$randomButton.addEventListener("click", (e) => {
      onRandomSearch();
    });

    this.KeywordHistory = new KeywordHistory({
      $target : $wrapper,
      onSearch,
    });
  }

  getLastKeyword(){
    return localStorage.getItem("keywordHistory") ? localStorage.getItem("keywordHistory").split(",")[0] : ""
  }

  render() {}
}

export default SearchInput