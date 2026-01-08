# Run the Shiny Application

Runs the designer Shiny application.

For more information about how the application works, either run the
"Help" guide in-app, or run
[`vignette("designer")`](https://ashbaldry.github.io/designer/articles/designer.md).

## Usage

``` r
designApp(
  onStart = NULL,
  options = list(),
  enableBookmarking = "url",
  uiPattern = "/",
  ...
)
```

## Arguments

- onStart:

  A function that will be called before the app is actually run. This is
  only needed for `shinyAppObj`, since in the `shinyAppDir` case, a
  `global.R` file can be used for this purpose.

- options:

  Named options that should be passed to the `runApp` call (these can be
  any of the following: "port", "launch.browser", "host", "quiet",
  "display.mode" and "test.mode"). You can also specify `width` and
  `height` parameters which provide a hint to the embedding environment
  about the ideal height/width for the app.

- enableBookmarking:

  Can be one of `"url"`, `"server"`, or `"disable"`. The default value,
  `NULL`, will respect the setting from any previous calls to
  [`enableBookmarking()`](https://rdrr.io/pkg/shiny/man/enableBookmarking.html).
  See
  [`enableBookmarking()`](https://rdrr.io/pkg/shiny/man/enableBookmarking.html)
  for more information on bookmarking your app.

- uiPattern:

  A regular expression that will be applied to each `GET` request to
  determine whether the `ui` should be used to handle the request. Note
  that the entire request path must match the regular expression in
  order for the match to be considered successful.

- ...:

  arguments to pass to `golem_opts`. See
  [`get_golem_options`](https://thinkr-open.github.io/golem/reference/get_golem_options.html)
  for more details.

## Value

This function does not return a value; interrupt R to stop the
application (usually by pressing Ctrl+C or Esc).

## Examples

``` r
if (FALSE) { # interactive()
designApp()
}
```
