console.log("app is running!");

import Loading from "./Loading.js"
import DarkModeToggle from "./DarkModeToggle.js"
import SearchInput from "./SearchInput.js"
import SearchResult from "./SearchResult.js"
import ImageInfo from "./ImageInfo.js"
import api from "./api.js";

class App {
  $target = null;
  DEFAULT_PAGE = 1;
  data = {
    items : [],
    page : DEFAULT_PAGE,
  }

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.darkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        //loading show
        this.Loading.show();

        api.fetchCats(keyword).then(({ data }) => {
          this.setState({
            items : data,
            page : DEFAULT_PAGE
          });
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
          this.setState({
            items : data,
            page : DEFAULT_PAGE
          });
          //loading hide
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },
      onNextPage : () => {
        const lastResult = localStorage.getItem("keywordHistory") ? localStorage.getItem("keywordHistory").split(",") : []
        const lastKeyword = lastResult[0];

        const page = this.page + 1;

        api.fetchCatsByPage(lastKeyword, 2).then(({ data }) => {
          //과거의 데이터에 새 데이터를 합침
          let newData = this.data.items.concat(data)
          this.setState({
            items : newData,
            page : page
          });
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
    this.searchResult.setState(nextData.items);
  }

  saveResult(result) {
    localStorage.setItem("lastResult", JSON.stringify(result));
  }

  init(){
    let lastResult = localStorage.getItem("lastResult") ? JSON.parse(localStorage.getItem("lastResult")) : []
    this.setState({
      items : lastResult,
      page : DEFAULT_PAGE
    })
  }
}

export default App;