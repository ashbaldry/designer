import { changePageCheck, createPage } from './utils';

export function initPage () {
    createPage();
    $("#settings-page_type").on("change", changePageCheck);
    $("#confirm_reset").on("click", createPage);
};