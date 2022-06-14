import { changePageCheck, createPage, updateTitle, revertPageSelection } from './utils';

export function initPage () {
    createPage();
    $("#settings-page_type").on("change", changePageCheck);
    $("#cancel_reset").on("click", revertPageSelection);
    $("#confirm_reset").on("click", createPage);

    $("#app_name").on("change keyup", updateTitle);   
};