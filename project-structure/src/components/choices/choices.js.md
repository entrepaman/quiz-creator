# Choices.js

{% hint style="info" %}
functional component
{% endhint %}

### 

### props

| **name** | type | default | description |
| :--- | :--- | :--- | :--- |
| className | String | empty String | class for the container wrapping the choices |
| viewer | bool | false | decides user is creating \[input\] or taking the quiz \[para\] |
| changed | func |  | change handler for input while user is creating a quiz |
| answer | String | empty String | choice selected as answer for the question while creating a quiz |
| value | Array | \[ \] | arrays of values of choices input while creating a quiz |
| choices | Array | \[ \] | arrays of choices while taking quiz |
| selected | String | empty String | selected choice value whilte taking quiz |
| clicked | func |  | answer selection handler while taking quiz |

### [code](https://github.com/quizoscom/quizos/blob/master/code/src/components/Choices/Choices.js)

{% code-tabs %}
{% code-tabs-item title="/src/components/Choices/Choices.js" %}
```javascript
import React from 'react';
import ReactTooltip from 'react-tooltip'; //https://github.com/wwayne/react-tooltip

import classes from './Choices.css';

import Input from '../UI/Input/Input';

const choices = (props) => {
    const classNames = [classes.Choices, classes[props.className]].join(' ');
    let choices = ''
    if(!props.viewer) {
        choices = [1, 2, 3, 4].map(i => {
            return (
                <div key={i}>
                    <Input 
                        inputType="text" 
                        changed={(event) => props.changed(event, i)}
                        value={props.value.length >= i ? props.value[i-1] : ""}
                    />
                    <p 
                        className={props.answer === i ? classes.answer : ''} 
                        onClick={() => props.clicked(i)}
                        data-tip="Click it for choosing the correct answer"
                    >
                    ca</p>
                    <ReactTooltip 
                        type="light"
                        effect="solid"
                        place="right" 
                    />
                </div>
            );
        });
    } else {
        let sno = 1;
        choices = props.choices.map(choice => {
            const classNames = props.selected === choice
                                ? [classes.Choice, classes.selected].join(' ')
                                : classes.Choice;
            return (
                <p key={choice} className={classNames} onClick={() => props.clicked(choice)} >{sno++}) <span>{choice}</span></p>
            );
        });
    }
    return (
        <div className={classNames}>
            {!props.viewer ? <label>Choices</label> : null }
            {choices}
        </div>
    );
}

export default choices;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

