# Component Accordion Item

An item to add to the sidebar that opens up the settings for the
selected component

## Usage

``` r
sidebarItem(id, name, element, parent_id, ..., notes = NULL, active = FALSE)
```

## Arguments

- id:

  HTML ID to namespace on

- name:

  Label to show on the closed accordion

- element:

  Character string to let JS know what component has been chosen

- parent_id:

  HTML ID of the accordion

- ...:

  Option inputs to add when expanding the accordion item

- notes:

  A list of optional notes to include at the bottom of the settings

- active:

  Logical, should the accordion item be open on start? Default set to
  `FALSE`

## Value

A `shiny.tag` element containing the component accordion item with all
input settings
