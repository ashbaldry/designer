import { initPage } from "../page/init";

$(function() {
  initPage();
  
  $(".help-icon").tooltip({ boundary: "window", placement: "right"});
});
