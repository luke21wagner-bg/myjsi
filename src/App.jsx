To make the top banner slightly less grey, you can reduce the intensity of the grey color in your CSS. You'll need to look into your `index.css` file, where the `.topbar` class is likely defined, and adjust the background color. 

Here's a possible adjustment:

1. Open your `index.css` file.
2. Locate the `.topbar` class definition.
3. Adjust the `background-color` property to a slightly lighter color. For instance, if it's currently set to something like `#888888`, you can change it to `#aaaaaa` or a lighter grey.

```css
/* index.css */
.topbar {
  /* Change the background color to a lighter grey */
  background-color: #aaaaaa;
  /* Other styles for topbar */
}
```

This change will make your top banner appear lighter, balancing the visual weight of the header with the rest of the page. Adjust the color code according to your visual preference until you get the desired appearance.