var loadingView;
function loading(text) {
  if (!loadingView) {
    loadingView = jQuery("<div class='loading'><span class='loading-text'>" + text + "</span><br/><div class='progressbar animated'></div></div>").hide().appendTo("body");
    loadingView.find(".progressbar").progressbar({ value: 100 });
  }
  
  loadingView.find(".loading-text").text(text);
  return loadingView;
}