# WES - Sample WYSIWYG RPG Card Maker

## Introduction
This is a small sample project by Wesley B for a potential employer.

It is intentionally limited in complexity, but maintains clarity and accessibility.

The service [Glitch][glitch] is used for hosting.

## Developer Rules
- Use [PEP-0350][pep0350] codetags to prefix applicable comments.
- Use [ITCSS][itcss] organization for styles.
- Use [BEM][bem] naming format for classnames.

## Files & Directories

### `README.md`
That's this file, where you can tell people what your cool website does and how you built it.

### `index.html`
The website content is an introduction, a form, and reference to the [Glitch][glitch] service.

### `style.css`
The styles have [ITCSS][itcss] organization and [BEM][bem] classnames.

### `script.js`
The following interactivity of the site is provided with JavaScript:

- automatically-updating output
- card preview toggle

### `assets`
Glitch allows dragging into `assets` (CDN-managed library) any relevant images, music , etc.

## Known Issues

- Not using `<fieldset>` & `<legend>` sometimes, because of a [Chrome CSS bug][chrome-fieldset-flex-bug].
- Not using `var()` nor `calc()` generously, so prototype complexity is reduced.
- The "Preview Card" toggle needs `tabindex="-1"`, because parent is positioned.
- Overloading the JavaScript-managed CSS class name for disabling the form.
- JavaScript, and maybe CSS, will break in IE browser (even v11, I believe).
- This application has not been tested in Edge browser.

[itcss]: https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/
[bem]: http://getbem.com/naming/
[glitch]: https://glitch.com/about
[pep0350]: https://www.python.org/dev/peps/pep-0350/
[chrome-fieldset-flex-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=375693