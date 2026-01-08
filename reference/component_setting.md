# Bootstrap Component Inputs

A way to be able to adjust components so that can more easily visualise
how the shiny application will look.

## Usage

``` r
compSettingTag(id, choices = NULL)

compSettingType(id, choices)

compSettingPlot(id)

compSettingValue(id)

compSettingLabel(id, label = "Label", optional = FALSE)

compSettingID(id)

compSettingIcon(id)

compSettingColour(id, status = FALSE)

compSettingBackground(id)

compSettingFill(id, label = "Fill Whole Box")

compSettingText(id, value = NULL)

compSettingTextArea(id)

compSettingChoices(id)

compSettingRange(id)

compSettingInline(id)

compSettingDownload(id)

compSettingWidth(id)

compSettingHeight(id)

compSettingWidthNum(id, value = 3L, min = 1L)

compSettingOffset(id)
```

## Arguments

- id:

  Namespace to include the component

- choices:

  A vector of potential choices to include in the component

- label:

  Label of the input

- optional:

  Logical, is the input optional?

- status:

  Logical, are only status colours allowed, default is `FALSE`

- value:

  Value given to the component input

- min:

  Minimum value given to the component input

## Value

A `shiny.tag.list` of settings specific to the selected component

## See also

[`component`](https://ashbaldry.github.io/designer/reference/component.md)
