class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  //고양이 상세 정보
  showDetail(data){
    
    //상세 정보 요청
    api.fetchCatDetail(data.cat.id).then(({data})=>{
      //정보 업데이트
      this.setState({
        visible: true,
        cat : data
      })
    })
  }

  //모달 닫기
  closeImageInfo(){
    this.setState({
      visible: false,
      cat : undefined,
    })
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      // //닫기 버튼
      // this.$imageInfo.querySelector(".close").addEventListener("click", (e)=>{
      //   console.log(e)
      //   this.closeImageInfo()
      // })
      
      //esc 버튼
      document.addEventListener("keydown", (e)=>{
        if(e.key === "Escape"){
          this.closeImageInfo()
        }
      })
      //배경, 닫기버튼
      this.$imageInfo.addEventListener("click", (e)=>{
        if(e.target.className === "ImageInfo" || e.target.className === "close"){
          this.closeImageInfo()
        }
      })
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
