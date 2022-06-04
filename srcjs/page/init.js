import { changePageCheck, createPage, updateTitle } from './utils';

export function initPage () {
    createPage();
    $("#settings-page_type").on("change", changePageCheck);
    $("#confirm_reset").on("click", createPage);

    $("#app_name").on("change keyup", updateTitle);    
};