# QuizLists.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/containers/QuizLists/QuizLists.css" %}
```css
@import url('https://fonts.googleapis.com/css?family=Tangerine');

.QuizLists {
    padding: 0em 2em;
}

.selectCont {
    text-align: left;
}

.selectCont > div {
    text-align: left;
    margin: 2em 0em 2em 0em;
    font-size: 1.3rem;
    margin-right: 2em;
    display: inline-block;
    width: 21%;
}

.selectCont > div label{
    color: #fff;
}

.selectCont > div > div {
    width: 100%;
    font-size: 1rem;
}

.selectCont > div label {
    display: block;
    font-size: 0.9rem;
}

.selectCont > div select {
    font-size: 1.2rem;
    margin: 10px 0px;
    padding: 6px 18px;
    font-family: 'Righteous', cursive;
    width: 100%;
}

.Table {
    width: auto;
    background-color: #fff;
    margin: 0 auto;
    font-size: 1.1rem;
    padding: 8px 2px;
    border-spacing: 12px 1px;
}

.TableCont {
    overflow-x: auto;
}

.Table td,
.Table th {
    padding: 12px 1em;
    font-weight: normal;
    text-transform: capitalize;
}

.Table th:not(:last-child) {
    background-color: #efefef;
    cursor: pointer;
}

.Table th:last-child {
    background-color: #ffd241;
    padding: 0 20px;
}

.Table th:not(:last-child):hover {
    background-color: #fff;
}

.Table tr td:last-child img {
    width: 25px;
    cursor: pointer;
}

.Table td img {
    width: 40px;
}

.QuizLists button {
    padding: 4px 18px;
    font-size: 0.9rem;
    background-color: #ffab91;
    margin: 2em 0;
}

.thatsAll {
    color: #fff;
    font-size: 3.5rem;
    font-family: 'Tangerine', cursive;
}

@media (max-width: 800px) {
    .selectCont > div {
        margin: 0;
        width: 47%;
        margin-bottom: 2em;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

