import { initPage } from "../page/init";
import { initSettings } from "./settings";

$(function() {
  initPage();
  initSettings();

  $(".help-icon").tooltip({ boundary: "window", placement: "right"});
});
