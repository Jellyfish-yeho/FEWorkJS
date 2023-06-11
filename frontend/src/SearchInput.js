const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement("section")
    $target.appendChild($wrapper);

    //검색 input 
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    //랜덤 버튼
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton
    this.$randomButton.className = "RandomButton"
    this.$randomButton.textContent = "🐈랜덤냥🐈‍⬛"
    $wrapper.appendChild(this.$randomButton)

    this.$randomButton.addEventListener("click", e => {
      onRandomSearch()
    });

  }
  render() {}
}
