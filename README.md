
<!-- badges: start -->
[![Lifecycle: experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html#experimental)
[![Codecov test coverage](https://codecov.io/gh/ashbaldry/designer/branch/main/graph/badge.svg)](https://codecov.io/gh/ashbaldry/designer?branch=main)
[![R-CMD-check](https://github.com/ashbaldry/designer/workflows/R-CMD-check/badge.svg)](https://github.com/ashbaldry/designer/actions)
<!-- badges: end -->

# {designer}

<img src="https://raw.githubusercontent.com/ashbaldry/designer/master/man/figures/hex-designer.png" align="right" width="120"/>

The goal of designer is to enable the creation of shiny UIs through the use of drag-and-drop elements into a prototype UI, and then copy the code used to create the same layout.

## Installation

`{designer}` is not currently available on [CRAN](https://CRAN.R-project.org). However you can install the latest version from GitHub using:

``` r
devtools::install_github("ashbaldry/designer")
```

## Example

To open the `{designer}` application and create your own UI, run the following code:

``` r
library(designer)
designApp()
```

![](man/figures/example_app.jpeg)

### Notes

This package is **not** intended to fully create the application UI. For example you cannot include the options for a `selectInput`, and it only includes standard {shiny} components. However it is a useful tool when coming with with a mock layout of the application UI.

### What Next

- Enable it to work with `navbarPage`
- Enable it to work with `shinydashboardPage`
- Create module UI from the page
