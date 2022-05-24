updatePage = function() {
  var page_type = $('#settings-page_type input:radio:checked').val();
    $(".page-canvas").html(createCanvasPage(page_type));

  if (page_type === "navbarPage") {
    $(".navbar-tab-item").css("display", "");
    $("#settings-component a[name='tab_panel']").click();
  } else if (page_type === "dashboardPage") {
    $(".navbar-tab-item").css("display", "");
    $("#settings-component a[name='tab_panel']").click();
  } else {
    $(".navbar-tab-item").css("display", "none");
    $("#settings-component a[name='header']").click();

    enableSortablePage(document.getElementById("canvas-page"));
  }
};

enableSortablePage = function(el) {
  Sortable.create(el, {
    group: {
      name: "shared",
      put: function (to, from, clone) {
        return !clone.classList.contains("col-sm");
      }
    }
  });
};

updateCanvasCheck = function() {
  if ($("#canvas-page").html() === "") {
    $("#canvas-page").html("<div></div>");
    updatePage();
  } else {
    $("#warning_modal").modal();
  }
};

createCanvasPage = function(page) {
  const title = $("#canvas-title").html();
  const page_id = Math.round(Math.random() * 8999 + 1000);

  if (page === "navbarPage") {

    return `<div class="designer-page-template">
              <nav class="navbar navbar-default navbar-static-top" role="navigation">
                <div class="container-fluid">
                  <div class="navbar-header">
                    <span class="navbar-brand">${title}</span>
                  </div>
                  <ul class="nav navbar-nav" data-tabsetid="${page_id}"></ul>
                </div>
              </nav>
              <div class="container-fluid navbar-page-tabs">
                <div id="canvas-page" class="tab-content"
                     data-tabsetid="${page_id}" data-shinyfunction="navbarPage"
                     data-shinyattributes="title = &quot;${title}&quot;, theme = bslib::bs_theme(4)"></div>
              </div>
            </div>`;
  } else if (page === "dashboardPage") {
    return `
      <div id="canvas-page" class="wrapper designer-page-template" data-shinyfunction="bs4Dash::dashboardPage">
        <nav data-fixed="false" class="main-header navbar navbar-expand navbar-white navbar-light"
             data-shinyfunction="bs4Dash::dashboardHeader">
          <ul class="navbar-nav">
            <a class="nav-link" data-widget="pushmenu" href="#">
              <i class="fa fa-bars" role="presentation" aria-label="bars icon"></i>
            </a>
          </ul>
          <ul class="navbar-nav ml-auto navbar-right"></ul>
        </nav>
        <aside id="sidebarId" data-fixed="true" data-minified="true" data-collapsed="false"
               data-disable="FALSE" class="main-sidebar sidebar-dark-primary elevation-4"
               data-shinyfunction="bs4Dash::dashboardSidebar">
          <div class="sidebar" id="sidebarItemExpanded">
            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column sidebar-menu nav-child-indent"
                  data-widget="treeview" role="menu" data-accordion="true" data-shinyfunction="bs4Dash::sidebarMenu">
                <div id="tabs_${page_id}" class="sidebarMenuSelectedTabItem" data-value="null"></div>
              </ul>
            </nav>
          </div>
        </aside>
        <div class="content-wrapper" data-shinyfunction="bs4Dash::dashboardBody">
          <section class="content"></section>
        </div>
      </div>
    `;
  } else {
    let page_class = "";
    if (page === "fixedPage") {
      page_class = "container";
    } else if (page !== "fillPage") {
      page_class = "container-fluid";
    }

    let page_attrs = "";
    if (page !== "basicPage") {
      page_attrs = `data-shinyattributes="title = &quot;${title}&quot;, theme = bslib::bs_theme(4)"`;
    }

    return `<div id="canvas-page" class="designer-page-template ${page_class}"
                 data-shinyfunction="${page}" ${page_attrs}></div>`;
  }
};

toggleComponentLabels = function() {
  if (this.checked) {
    $(".designer-page-template").removeClass("hidden-after-label");
  } else {
    $(".designer-page-template").addClass("hidden-after-label");
  }
};

toggleBackgroundColours = function() {
  if (this.checked) {
    $(".designer-page-template").removeClass("hidden-colour");
  } else {
    $(".designer-page-template").addClass("hidden-colour");
  }
};

toggleBorders = function() {
  if (this.checked) {
    $(".designer-page-template").removeClass("hidden-borders");
  } else {
    $(".designer-page-template").addClass("hidden-borders");
  }
};

copyUICode = function() {
  var copy_text = document.getElementById("settings-code-code");
  var text_area = document.createElement("textarea");
  text_area.textContent = copy_text.textContent;
  document.body.append(text_area);
  text_area.select();
  document.execCommand("copy");
  text_area.remove();
};
