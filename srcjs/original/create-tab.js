$(document).ready(function() {
  $("#sidebar-tab_panel-add").on("click", addPage);
  $("#sidebar-tab_panel-delete").on("click", deletePage);
});

let navbar_item = 1;

function addPage () {
  const page_type = $('#settings-page_type input:radio:checked').val();
  if (page_type === "dashboardPage") {
    addMenuItem();
  } else {
    addTab();
  }
}

function deletePage () {
  const page_type = $('#settings-page_type input:radio:checked').val();
  if (page_type === "dashboardPage") {
    deleteTab();
  } else {
    deleteTab();
  }
}

function addTab () {
  const nav_panel = $("ul.navbar-nav");
  const tab_panel = $(".tab-content");
  const nav_id = nav_panel.data("tabsetid");

  const active_class = tab_panel.html() === "" ? "active" : "";
  const tab_name = $("#sidebar-tab_panel-name").val();
  let tab_value = $("#sidebar-tab_panel-value").val();
  if (tab_value === "") {
    tab_value = createRandomID("tab");
  }

  if ($(`ul.navbar-nav a[data-name='${tab_name}']`).length > 0) {
    $("#sidebar-tab_panel-alert").html(`
      <div class="alert alert-danger" role="alert">
        ${tab_name} is the name of an existing tab. Please choose a unique name
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
    return;
  } else if ($(`ul.navbar-nav a[data-value='${tab_value}']`).length > 0) {
    $("#sidebar-tab_panel-alert").html(`
      <div class="alert alert-danger" role="alert">
        ${tab_value} is the ID of an existing tab. Please choose a unique ID
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
    return;
  }

  $("#sidebar-tab_panel-alert div").alert("close");

  nav_panel.append(
    `<li class="${active_class}">
       <a href="#tab-${nav_id}-${navbar_item}" data-toggle="tab"
          data-bs-toggle="tab" data-value="${tab_value}" data-name="${tab_name}">${tab_name}</a>
     </li>`
  );

  tab_panel.append(
    `<div class="tab-pane ${active_class}" data-value="${tab_value}" id="tab-${nav_id}-${navbar_item}"
          data-shinyfunction="tabPanel"
          data-shinyattributes="title = &quot;${tab_name}&quot;, value = &quot;${tab_value}&quot;"></div>`
  );
  enableSortablePage(document.getElementById(`tab-${nav_id}-${navbar_item}`));

  navbar_item = navbar_item + 1;
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

function addMenuItem () {
  const nav_panel = $("ul.sidebar-menu");
  const tab_panel = $("section.content .tab-content");

  const active_class = tab_panel.html() === "" ? "active" : "";
  const tab_name = $("#sidebar-tab_panel-name").val();
  let tab_value = $("#sidebar-tab_panel-value").val();
  if (tab_value === "") {
    tab_value = createRandomID("menu_item");
  }

  if ($(`ul.sidebar-menu a[data-name='${tab_name}']`).length > 0) {
    $("#sidebar-tab_panel-alert").html(`
      <div class="alert alert-danger" role="alert">
        ${tab_name} is the name of an existing menu item. Please choose a unique name
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
    return;
  } else if ($(`ul.sidebar-menu a[data-value='${tab_value}']`).length > 0) {
    $("#sidebar-tab_panel-alert").html(`
      <div class="alert alert-danger" role="alert">
        ${tab_value} is the ID of an existing menu item. Please choose a unique ID
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
    return;
  }

  $("#sidebar-tab_panel-alert div").alert("close");

  $(".sidebarMenuSelectedTabItem").before(
    `<li class="nav-item" data-shinyfunction="bs4Dash::menuItem"
         data-shinyattributes="text = &quot;${tab_name}&quot;, tabName = &quot;${tab_value}&quot;">
       <a class="nav-link ${active_class}" id="tab-${tab_value}" href="#"
          data-toggle="tab" data-target="#shiny-tab-${tab_value}"
          data-value="${tab_value}" data-name="${tab_name}">
         <p>${tab_name}</p>
       </a>
     </li>`
  );

  if (!$(".sidebarMenuSelectedTabItem").attr("data-value")) {
    $(".sidebarMenuSelectedTabItem").attr("data-value", tab_value);
  }

  tab_panel.append(
    `<div role="tabpanel" data-value="${tab_value}" id="shiny-tab-${tab_value}"
          class="tab-pane container-fluid ${active_class}"
          data-shinyfunction="bs4Dash::tabItem" data-shinyattributes="tabName = &quot;${tab_value}&quot;"></div>`
  );
  enableSortablePage(document.getElementById(`shiny-tab-${tab_value}`));

  navbar_item = navbar_item + 1;
}
