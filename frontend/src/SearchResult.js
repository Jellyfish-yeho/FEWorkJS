import Empty from "./Empty.js";

class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement("section");
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.Empty = new Empty({
      $target : $wrapper, //바깥으로 나가지 않도록 wrapper 안에 생성
    })

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.Empty.show(nextData)
  }

  listObserver = new IntersectionObserver((items, observer) => {
    // console.log(items)
    //items는 뭔가 변화가 있는 요소.
    items.forEach((item) => {
      //isIntersection : 뷰포트에 해당 아이템이 존재하는지, boolean 값
      if (item.isIntersecting) {
        //item이 화면에 보일 때 : 로드되기 전 납작한 상태도 보이는 것으로 잡음
        //lazy load
        item.target.querySelector("img").src =
          item.target.querySelector("img").dataset.src;

        //마지막 요소를 찾아내서 : 목록 데이터의 length = 각 요소의 번호
        let dataIndex = Number(item.target.dataset.index);
        if (dataIndex + 1 === this.data.length) {
          //마지막 요소라면 next page 호출
          this.onNextPage();
        }
      }
    });
  });

  render() {
    if(this.data === null || this.data.length === 0){
      this.$searchResult.style.display = "none";
      return;
    }else{
      this.$searchResult.style.display = "grid";
    }
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <div class="item" data-index=${index}>
            <img src="https://via.placeholder.com/200x300" data-src=${cat.url} alt=${cat.name} />
            <div class="content">
              ${cat.name}
            </div>
          </div>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
      //observer 등록
      this.listObserver.observe($item);
    });
  }
}

export default SearchResult