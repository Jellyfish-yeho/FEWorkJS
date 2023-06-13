class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement("section")
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  //엘리먼트가 뷰포트에 보이는지 확인
  isElementInViewport(el){
    const rect = el.getBoundingClientRect() //el의 좌표 정보. 좌측 상단 꼭지점 기준
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && //뷰포트 창의 크기보다 작음
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  //dom 목록에 스크롤 이벤트 등록
  applyEventToElement = (items)=>{
    document.addEventListener("scroll", ()=>{
      items.forEach((el, index) => {
        //엘리먼트가 화면에 나오면서 index가 마지막일 때(items.length-1)
        if( this.isElementInViewport(el) && items.length - 1 === index ){
          //다음 페이지 로딩
          this.onNextPage()
        }
      })
    })
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        cat => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} />
          </div>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });

    let listItems = this.$searchResult.querySelectorAll(".item")
    this.applyEventToElement(listItems)
  }
}
