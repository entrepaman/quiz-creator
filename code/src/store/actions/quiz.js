import axios from 'axios';
import qs from 'qs';

import * as actionTypes from './actionTypes';

export const quizContinue = (answer) => {
    return {
        type: actionTypes.QUIZ_CONTINUE,
        answer: answer
    };
};

export const quizCompleteSuccess = (score) => {
    return {
        type: actionTypes.QUIZ_COMPLETE_SUCCESS
    };
};

export const quizCompleteFailed = (error) => {
    return {
        type: actionTypes.QUIZ_COMPLETE_FAILED,
        error: error
    };
};

export const quizComplete = (answers) => {
    return {
        type: actionTypes.QUIZ_COMPLETE
    };
};

export const quizQuit = () => {
    return {
        type: actionTypes.QUIZ_QUIT
    };
};

export const quizCont = (answer) => {
    return dispatch => {
        // console.log('quiz continue')
        dispatch(quizContinue(answer));
    };
};

export const quizComp = (answers, timerValue) => {
    return dispatch => {
        console.log('quiz complete');
        dispatch(quizComplete(answers));

        // server call to save answers and timerValue and calculate score
        let score = 20;
        dispatch(quizCompleteSuccess(score));
    };
};

export const quizQuitHandler = () => {
    return dispatch => {
        console.log('quit quiz');
        dispatch(quizQuit());
    };
};

export const seeScore = (answers, timerValue) => {
    return dispatch => {
        dispatch(quizComp(answers, timerValue));
    }
}

export const counterComplete = () => {
    return {
        type: actionTypes.COUNTER_COMPLETE
    }
}

export const counterCompleted = () => {
    return dispatch => {
        dispatch(counterComplete());
    }
}