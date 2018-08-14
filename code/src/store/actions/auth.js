import axios from 'axios';
import qs from 'qs';

import * as actionTypes from './actionTypes';

const API_KEY="AIzaSyB04gE4c2KLcZsOwDM8JhAQx1AJQ37OwWo";
const BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const authFailedAction = (error) => {
    return dispatch => {
        dispatch(authFailed(error));
    }
}

export const auth = (email, password, register, medium) => {
    return dispatch => {
        dispatch(authStart());
        if(register) {
            // register a user with email and password using firebase authentication
            axios.post(`${BASE_URL}signupNewUser?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(res => {
                const params = {
                    email: email,
                    token: res.data.idToken,
                    userId: res.data.localId,
                    medium: medium
                }

                axios.post('http://localhost/evaluiz/auth/auth.php', qs.stringify(params))
                .then(response => {
                    if(response.data.status === 'success') {
                        const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                        localStorage.setItem('token', res.data.idToken);
                        localStorage.setItem('userId', res.data.localId);
                        localStorage.setItem('expirationTime', expirationTime);
                        dispatch(authSuccess(res.data.idToken, res.data.localId));
                    } else {
                        dispatch(authFailed(response.data.msg));
                    }
                })
                .catch(error => {
                    dispatch(authFailed('Server Error, Please try again after some time'));
                });
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error.message.replace(/_/ig, ' ')));
            });
        } else {
            // login a user with email and password using firebase authentication
            axios.post(`${BASE_URL}verifyPassword?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(res => {
                const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error.message.replace(/_/ig, ' ')));
            });
        }
    };
};

export const googleLogin = (email, userId, token, expiresIn) => {
    return dispatch => {
        axios.post('http://localhost/evaluiz/auth/auth.php', qs.stringify({
            email: email,
            token: token,
            userId: userId,
            medium: 'google'
        }))
        .then(response => {
            if(response.data.status === 'success') {
                const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(authSuccess(token, userId));
            } else {
                dispatch(authFailed(response.data.msg));
            }
        })
        .catch(error => {
            dispatch(authFailed('Server Error, Please try again after some time'));
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const expirationTime = new Date(localStorage.getItem('expirationTime')).getTime();
        const currentTIme = new Date().getTime();
        if(currentTIme >= expirationTime) {
            localStorage.removeItem('expirationTime');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('questionsData');
            dispatch(setRedirectPath("/"));
        } else {
            const token = localStorage.getItem('token');
            if(token) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
            }
        }
    }
}

export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        redirectPath: path
    }
};

export const redirectPath = (path) => {
    return dispatch => {
        dispatch(setRedirectPath(path));
    }
};

export const onLogOut = () => {
    return {
        type: actionTypes.AUTH_LOG_OUT
    }
}

export const logOut = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('questionsData');
        dispatch(onLogOut());
    }
}

export const setNewUserAction = () => {
    return {
        type: actionTypes.NEW_USER
    }
}

export const setNewUser = () => {
    return dispatch => {
        dispatch(setNewUserAction());
    }
}

export const forgotPasswordLinkClickAction = () => {
    return {
        type: actionTypes.FORGOT_PASSWORD
    }
}

export const forgotPasswordLinkClick = () => {
    return dispatch => {
        dispatch(forgotPasswordLinkClickAction())
    }
}

export const sendLinkAction = (email) => {
    return {
        type: actionTypes.PASSWORD_RESET_LINK_SENT,
        email: email
    }
}

export const sendLink = (email) => {
    return dispatch => {
        axios.post('http://localhost/evaluiz/get/email-exists-check.php', qs.stringify({email: email}))
        .then(res => {
            if(res.data.status === 'success') {
                if(res.data.msg === 'exists') {
                    axios.post(`${BASE_URL}getOobConfirmationCode?key=${API_KEY}`, {
                        requestType: 'PASSWORD_RESET',
                        email: email
                    })
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    dispatch(sendLinkSuccessAction());
                } else if(res.data.msg === 'google') {
                    dispatch(sendLinkFailedAction('Entered email does not exists, either you are new or had used Google Login'));
                } else {
                    dispatch(sendLinkFailedAction('Entered email does not exists, If you are new, Please use Sign Up to create your account'));
                }
            }
        })
        .catch(err => {
            dispatch(sendLinkFailedAction('Server Error, Please try after some time'));
        });
        dispatch(sendLinkAction(email));
    }
}

export const sendLinkFailedAction = (error) => {
    return {
        type: actionTypes.PASSWORD_RESET_LINK_SENT_FAILED,
        error: error
    }
}

export const sendLinkSuccessAction = () => {
    return {
        type: actionTypes.PASSWORD_RESET_LINK_SENT_SUCCESS
    }
}

export const changePasswordAction = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD
    }
}

export const changePassword = (password, medium, oobCode) => {
    return dispatch => {
        axios.post(`${BASE_URL}resetPassword?key=${API_KEY}`, {
            oobCode: oobCode,
            newPassword: password
        })
        .then(res => {
            console.log(res.data);
            
            // server call
            console.log(password, medium, oobCode);
            dispatch(changePasswordAction());
        })
        .catch(err => {
            dispatch(changedPasswordFailedAction('The Link is expired, Please use reset password again to get new link'));
        });
    }
}

export const changedPasswordSuccessAction = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD_SUCCESS
    }
}

export const changedPasswordSuccess = () => {
    return dispatch => {
        dispatch(changedPasswordSuccessAction())
    }
}

export const changedPasswordFailedAction = (error) => {
    return {
        type: actionTypes.CHANGE_PASSWORD_FAILED,
        error: error
    }
}

export const changedPassswordResetStatesAction = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD_RESET_STATES
    }
}

export const changedPassswordResetStates = () => {
    return dispatch => {
        dispatch(changedPassswordResetStatesAction())
    }
}