# Features.css

### [code](https://github.com/quizoscom/quizos/blob/master/code/src/components/Features/Features.css)

{% code-tabs %}
{% code-tabs-item title="/src/components/Features/Features.css" %}
```css
@import url('https://fonts.googleapis.com/css?family=Exo+2:400,700');

.NewUserWelcome {

    margin: 3em auto;
    width: 90%;
    height: 400px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-size: contain;
}

.NewUserWelcome img {
    width: 200px;
}

.NewUserWelcome p {
    font-size: 1.8rem;
    margin: 10px auto;
    width: 70%;
}

.NewUser > h2 {
    
}

.Title {
    font-size: 2rem;
    color: #fff;
}

.CardCont {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 2em;
    align-items: center;
}

.CardCont > div {
    width: 50%;
    order: 1;
    padding: 1em 3em;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
}

.CardCont > div > div {
    background-color: #fff;
    padding: 0 30px 0 4px;
    border-radius: 3px;
    width: 90%;
}

.CreateQuiz .Title,
.TakeQuiz .Title {
    color: #54628f;
    text-align: center;
    padding-top: 18px;
    font-size: 1.3rem;
}

.Features > li {
    color: #5d3785;
    list-style-type: none;
    margin-bottom: 1em;
    font-size: 1.2rem;
    font-family: 'Exo 2';
}

.Features > li img {
    width: 20px;
    margin-right: 6px;
}

.ButtonImgGroup {
    display: flex;
}

.ButtonImgGroup > div {
    flex-grow: 1;
}

.ButtonImgGroup img {
    width: 150px;
    float: right;
}

.ButtonImgGroup button {
    float: right;
    position: relative;
    bottom: -2em;
}

.StarUl {
    margin: 0 auto;
    text-align: left;
    margin-bottom: 4em;
    width: 70%;
}

.StarUl > li {
    list-style-type: none;
    color: #fff;
    font-size: 1.3rem;
    font-family: 'Exo 2', sans-serif;
    margin-bottom: 5px;
}

@media(max-width: 1000px) {
    .CardCont {
        display: flex;
        flex-direction: column;
    }

    .CardCont > div {
        width: 90%;
    }

    .StarUl {
        width: 85%;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
