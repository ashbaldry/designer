# Component Settings Shell

A container for the specified component input

## Usage

``` r
component(id, ...)

componentTab(id)
```

## Arguments

- id:

  The ID of the component input

- ...:

  Shiny tags to include inside the component

## Value

A shiny.tag of the component settings

## Details

The tab component contains a selection of specific inputs related to
adding a new tab, as the events to create it in the UI are different to
the other components
