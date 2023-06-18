
class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target }) {
    const $wrapper = document.createElement("section")
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $target.appendChild($wrapper);
    $wrapper.appendChild($DarkModeToggle);

    $DarkModeToggle.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked)
    });

    this.initColorMode()
  }

  initColorMode(){
    //초기화 : isDarkMode state, checkbox 상태, html attr
    //현재 브라우저가 다크모드인지 확인
    this.setState(window.matchMedia("(prefers-color-scheme: dark)").matches)
    //다크모드 여부를 체크박스에 반영
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode)
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }

  setState(nextData) {
    this.isDarkMode = nextData;
  }

}

export default DarkModeToggle
