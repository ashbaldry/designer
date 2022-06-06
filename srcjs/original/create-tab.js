function deletePage () {
  const page_type = $('#settings-page_type input:radio:checked').val();
  if (page_type === "dashboardPage") {
    deleteTab();
  } else {
    deleteTab();
  }
}

function deleteTab () {
  const tab_name = $("#sidebar-tab_panel-name").val();

  const delete_tab = $(`ul.nav a[data-name='${tab_name}']`);
  if (delete_tab.length === 0) {
    $("#sidebar-tab_panel-alert").html(`
      <div class="alert alert-danger" role="alert">
        Unable to find a tab with the name "${tab_name}"
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
    return;
  }

  $("#sidebar-tab_panel-alert div").alert("close");

  const tab_value = $(`ul.nav a[data-name='${tab_name}']`).data("value");
  $(delete_tab[0].parentElement).remove();
  $(`.tab-content .tab-pane[data-value='${tab_value}']`).remove();
}

function addMenuItem () {}
