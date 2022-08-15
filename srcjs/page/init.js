import { selectPage, changePageCheck, createPage, updateTitle, revertPageSelection } from './utils';

export function initPage () {
    createPage();
    $(".canvas-page-choice").on("click", selectPage);
    $("#settings-page_type").on("change", changePageCheck);
    $("#cancel_reset").on("click", revertPageSelection);
    $("#confirm_reset").on("click", createPage);

    $("#app_name").on("change keyup", updateTitle);   
};