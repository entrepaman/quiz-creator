# NavigationItem.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/components/Navigation/NavigationItems/NavigationItem/NavigationItem.css" %}
```css
.NavigationItem {
    list-style: none;
    display: inline-block;
    position: relative;
    top: -13px;
    margin-right: 1em;
}

.NavigationItem a {
    color: #fff;
    position: relative;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 11px 12px;
}

.NavigationItem a:not(.git):hover,
.NavigationItem a:not(.git):active,
.NavigationItem a:not(.git).selected {
    background-color: #eee;
    border-bottom: 5px solid #40A4C8;
    color: #000;
}

.gitLink {
    top: 1px;
}

@media (max-width: 800px) {
    .NavigationItem.onlyDesktop {
        display: none;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

