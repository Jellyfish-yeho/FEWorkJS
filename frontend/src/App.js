console.log("app is running!");

class App {
  $target = null;
  data = [];
  page = 1;

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.searchInput = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        //loading show
        this.Loading.show();

        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data ? data : []);
          //loading hide
          this.Loading.hide();
          //localStorage에 저장
          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        //loading show
        this.Loading.show();

        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          //loading hide
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },
      onNextPage : () => {
        console.log("다음페이지 로딩")

        const lastResult = localStorage.getItem("keywordHistory") ? localStorage.getItem("keywordHistory").split(",") : []
        const lastKeyword = lastResult[0];

        const page = this.page + 1;

        api.fetchCatsByPage(lastKeyword, 2).then(({ data }) => {
          //과거의 데이터에 새 데이터를 합침
          let newData = this.data.concat(data)
          this.setState(newData);
          this.page = page
          //loading hide
          this.Loading.hide();
        }); 
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init()
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem("lastResult", JSON.stringify(result));
  }

  init(){
    let lastResult = localStorage.getItem("lastResult") ? JSON.parse(localStorage.getItem("lastResult")) : []
    this.setState(lastResult)
  }
}
