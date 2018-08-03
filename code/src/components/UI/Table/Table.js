import React from 'react';
import classes from './Table.css';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

const table = (props) => {
    let headerArr = [];
    for(let i = 0; i < 1; i++) {
        headerArr = Object.keys(props.content[i]);
    }
    const head = headerArr.map(head => {
        return head === 'id' || head === 'total_questions' ? null : <th key={head}>{head.replace(/_/g, ' ')}</th>
    });
    
    const tbody = props.content.map((row) => {
        return (
            <tr key={props.viewType === 'created' ? 'qc-' + row['id'] : 'qt-' + row['id']}>
                {Object.keys(row).map(col => {
                    if(col === 'id') {
                        return null
                    } else if(col === 'max_marks_obtained' || col === 'marks_obtained') {
                        return row[col] === 'no users'
                        ? <td key={col}>{row[col]}</td>
                        : <td key={col}>{row[col] + '/' + row['total_questions']}</td>
                    } else if(col !== 'total_questions' ) {
                        return <td key={col}>{row[col]}</td>
                    } else {
                        return <td key={col}>{row[col]}</td>
                    }
                })}
            </tr>
        );
    });
    return (
        <Aux>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        {head}
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        </Aux>
    );
};

export default table;