
# designer

<!-- badges: start -->
[![Lifecycle: experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html#experimental)
[![Codecov test coverage](https://codecov.io/gh/ashbaldry/designer/branch/main/graph/badge.svg)](https://codecov.io/gh/ashbaldry/designer?branch=main)
[![R-CMD-check](https://github.com/ashbaldry/designer/workflows/R-CMD-check/badge.svg)](https://github.com/ashbaldry/designer/actions)
<!-- badges: end -->

The goal of designer is to enable the creation of shiny UIs through the use of drag-and-drop elements into a prototype UI, and then copy the code used to create the same layout.

## Installation

`{designer}` is not currently available on [CRAN](https://CRAN.R-project.org). However you can install using:

``` r
devtools::install_github("ashbaldry/designer")
```

## Example

To open the `{designer}` application and create your own UI, run the following code:

``` r
library(designer)
run_designer_app()
```

