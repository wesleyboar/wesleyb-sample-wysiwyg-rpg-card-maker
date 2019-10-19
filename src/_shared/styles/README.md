# ITCSS, BEM, Namespaces

These styles follow popular methodologies.

- The styles are organized via [ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528).
- The class names are written via [BEM](http://getbem.com/).
- The classes are namespaced via [Namespaces defined by the author of ITCSS](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/).

## Generics

Generic styles are very high-level, far-reaching styles. They are seldom modified. Examples are reset, normalize, box-sizing styles, and browser fixes.

Reference:

- [Creative Bloq: Manage Large CSS Projects With ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) (find "Generic")

Rules:

- Classes and IDs must not be styled.
- Opinionated high-level styles may be here.
- Element tags may be styled.
- Pseudo classes may be styled.
- Pseudo elements may be styled.

## Elements

Element styles are those for bare HTML elements (like `<h1>`, `<a>`, etc.). These come with default styling from the browser; we can redefine them here.

Reference:

- [Creative Bloq: Manage Large CSS Projects With ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) (find "Elements")
- [MDN: HTML element reference](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list)

Rules:

- Element tags may be styled.
- Pseudo classes may be styled.
- Pseudo elements may be styled.

## Objects

Object styles are repetitive, shared, and purely-structural parts of an interface. They are seldom modified. Changing these styles may unintentionally break several instances.

Reference:

- [BEM with Namespaces: Object Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#object-namespaces-o-)

Guidelines:

- Objects are abstract.
- They can be used in any number of places across the project
  (places you might not have even seen).
- Avoid modifying their styles.
- Be careful around anything with a leading `o-`.

## Components

Components are finite, discrete, implementation-specific parts of an interface. Most people (users, designers, developers, stakeholders) would be able to identify them.

Reference:

- [BEM with Namespaces: Component Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#component-namespaces-c-)

Guidelines:

- Components are implementation-specific bits of UI.
- They are quite safe to modify.
- Anything with a leading c- is a specific thing.

Rules:

- One element may be styled by many components.
- One element may be styled by many modifiers of one component.

## Tools

Tools are global sets of properties e.g. mixins / `@extend`s / functional selectors, functions / `@plugin`s. They are not defined as Settings, because one may require one of the global Settings as a default parameter.

Reference:

- [Creative Bloq: Manage Large CSS Projects With ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) (find "Tools")

## Trumps

Trump styles exist to overwrite other styles. They are added as necessary. Examples use cases are third-party styles, styles used only by JavaScript, modules that are not meant to extended as desired.

Reference:

- [Creative Bloq: Manage Large CSS Projects With ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) (find "Trumps")

Rules:

- Classes and IDs must not be styled.
- Opinionated high-level styles may be here.
- Element tags may be styled.
- Pseudo classes may be styled.
- Pseudo elements may be styled.

### Scopes

Scope styles are functional overrides and styles that are scoped to a specific area. These are meant to be used sparingly. Examples of scopes are functional styles for third-party markup, WYSIWIG editor tags, form elements, components with a forced relationship.

Reference:

- [BEM with Namespaces: Scope Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#scope-namespaces-s-)

Guidelines:

- Scopes are pretty rare, evaluate before creating.
- A consistent way to author these in nested inside `.s-* {}`.

Rules:

- The `!important` may be used.
- All overrides **must** have a comment.
- Scope styles should have a comment.

### Utility

Utility styles exist to overwrite other styles. They are seldom modified. Example use case is one-time use on modules that are not meant to be extended to have the desired behavior.

Reference:

- [BEM with Namespaces: Utility Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#utility-namespaces-u-)

Guidelines:

- Utilities are style heavyweights.
- Alert people as to their existence.
- Never reassign to anything that carries a leading u-.

Rules:

- All other existing styles must be considered first.
- All other existing stylesheets must be considered first.
- Prefer this to inline styles.

### Hacks

Styles and visual fixes applied in a "hacky" manner.

- **Avoid using these styles.**
- **Avoid adding to these styles.**