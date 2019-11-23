window.onload = () => {
  let converter = new showdown.Converter();
  let pad = document.getElementById(`pad`);
  let markdownArea = document.getElementById(`markdown`);

  var convertTextAreaToMarkdown = () => {
    let markdownText = pad.value;
    markdownArea.innerHTML = converter.makeHtml(markdownText);
  }

  pad.addEventListener(`input`, convertTextAreaToMarkdown);

  convertTextAreaToMarkdown();
}