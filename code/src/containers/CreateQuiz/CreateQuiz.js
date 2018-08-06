import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './CreateQuiz.css';
import QuestionMarkIcon from '../../assets/close-icon.png';

import Aux from '../../hoc/Auxiliary/Auxiliary';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import Select from '../../components/UI/Select/Select';
import Alert from '../../components/UI/Alert/Alert';
import Confirm from '../../components/UI/Confirm/Confirm';

import Question from '../../components/Question/Question';
import Choices from '../../components/Choices/Choices';
import ShareLink from '../../components/ShareLink/ShareLink';

import { duplicacyCheckingForArray } from '../../shared/utility';

import * as actions from '../../store/actions';

class CreateQuiz extends Component {
    state = {
        quizId: '',
        selectedLanguage: 'select',
        noOfQuestions: 0,
        testTime: 0,
        difficulty: 'select',
        questions: [],
        currentQuestionNo: 0,
        creatingQuiz: false,
        currentAnswer: 0,
        currentQuestionValue: '',
        currentChoicesValues: [],
        alert: '',
        alertType: ''
    }

    componentDidMount() {
        if(localStorage.getItem('questionsData')) {
            const questionsData = JSON.parse(localStorage.getItem('questionsData'));
            this.setState(prevState => ({
                selectedLanguage: questionsData.language,
                noOfQuestions: questionsData.noOfQuestions,
                questions: questionsData.questions,
                currentQuestionValue: questionsData.questions[0].question,
                currentChoicesValues: questionsData.questions[0].choices,
                testTime: questionsData.testTime,
                difficulty: questionsData.difficulty
            }));
        }
    }

    componentDidUpdate() {
        if(this.props.okClicked) {
            this.setState(prevState => ({
                selectedLanguage: 'select',
                noOfQuestions: 0,
                questions: [],
                currentQuestionNo: 0,
                creatingQuiz: false,
                currentAnswer: 0,
                currentQuestionValue: '',
                currentChoicesValues: []
            }));
            localStorage.removeItem('questions');
            this.props.onOkClicked(0);
        }
    }

    selectChangeHandler = (event) => {
        this.setState({
            ...this.state,
            selectedLanguage: event.target.value
        });
    }

    noOfQuestionInputChangedHandler = (event) => {
        let noOfQuestions = parseInt(event.target.value, 10);
        if(noOfQuestions === "" || noOfQuestions <= 0) {
            noOfQuestions = 0;
        }
        this.setState({
            ...this.state,
            noOfQuestions: noOfQuestions
        });
    }

    testTimeInputChangedHandler = (event) => {
        let testTime = parseInt(event.target.value, 10);
        if(testTime <= 180) {
            if(testTime === "" || testTime <= 0) {
                testTime = 0;
            }
            this.props.onHideAlert();
        } else {
            testTime = 180;
            this.props.onShowAlert('Maximum allowed test time is 3 Hours (180 mins)', 'warning');
        }

        this.setState({
            ...this.state,
            testTime: testTime
        });
    }

    difficultySelectChangeHandler = (event) => {
        this.setState({
            ...this.state,
            difficulty: event.target.value
        });
    }

    onQuestionInputChangedHandler = (event) => {
        let questionValue = event.target.value;
        let newQuestions = this.state.questions.slice();
        if(newQuestions.length === 0) {
            newQuestions.push({
                question: questionValue,
                choices: [],
                answer: 0
            });
        } else {
            if(newQuestions.length >= this.state.currentQuestionNo) {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: questionValue,
                    choices: this.state.currentChoicesValues,
                    answer: this.state.currentAnswer
                };
            } else {
                newQuestions[this.state.currentQuestionNo-1] = {
                    question: questionValue,
                    choices: [],
                    answer: 0
                };
            }
        }
        this.setState(prevState => ({
            currentQuestionValue: questionValue,
            questions: newQuestions
        }));
    }

    onChoiceInputsChangedHandler = (event, index) => {
        var choiceValue = event.target.value;
        var currentQUestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions.slice();
        if(newQuestions.length < currentQUestionNo) {
            newQuestions[currentQUestionNo-1] = {
                question: "",
                choices: [],
                answer: 0
            }
        }
        var newChoices = newQuestions[currentQUestionNo-1].choices.slice();

        if(newChoices[index-1] === undefined) {
            newChoices.splice(index-1, 0, choiceValue);
        } else {
            newChoices[index-1] = choiceValue;
        }

        if(newQuestions.length !== 0) {
            newQuestions[currentQUestionNo-1].choices = newChoices;
        }
        this.setState(prevState => ({
            questions: newQuestions,
            currentChoicesValues: newChoices
        }));
    }

    onAnswerSelectHandler = (ca) => {
        var currentQuestionNo = this.state.currentQuestionNo;
        var newQuestions = this.state.questions.slice();
        newQuestions[currentQuestionNo-1].answer = ca;
        this.setState(prevState => ({
            currentAnswer: ca,
            questions: newQuestions
        }));
    }

    previousButtonClickHandler = () => {
        if(this.state.currentQuestionNo >= 2) {
            this.setState(prevState => ({
                currentQuestionNo: prevState.currentQuestionNo - 1,
                currentQuestionValue: prevState.questions[this.state.currentQuestionNo-2].question,
                currentChoicesValues: prevState.questions[this.state.currentQuestionNo-2].choices,
            }));
            this.props.onHideAlert();
        } else {
            this.props.onShowAlert('If you want to change the language or no of questions, click on close button on top right', 'warning');
        }
    }

    saveQuestions = (questionsData) => {
        localStorage.setItem('questionsData', JSON.stringify(questionsData));
    }

    continueButtonClickHandler = () => {
        if(this.state.selectedLanguage !== "" && this.state.selectedLanguage !== undefined && this.state.selectedLanguage !== "select" 
            && this.state.noOfQuestions !== 0 && this.state.testTime !== 0 && this.state.difficulty !== 'select' && this.state.difficulty !== undefined) {
            if(this.state.currentQuestionNo === 0) {
                this.setState({
                    ...this.state,
                    creatingQuiz: true,
                    currentQuestionNo: 1
                });
            } else {
                // if language and no of questions are selected

                // proceed iff the question, choices and current answer is selected
                let formComplete = 0;
                let choicesDuplicacy = 0;
                if(this.state.questions.length >= this.state.currentQuestionNo) {
                    if("question" in this.state.questions[this.state.currentQuestionNo-1] && "choices" in this.state.questions[this.state.currentQuestionNo-1] && "answer" in this.state.questions[this.state.currentQuestionNo-1]) {
                        if(this.state.questions[this.state.currentQuestionNo-1].question !== "" && this.state.questions[this.state.currentQuestionNo-1].choices.length === 4 && this.state.questions[this.state.currentQuestionNo-1].answer !== 0) {
                            if(duplicacyCheckingForArray(this.state.questions[this.state.currentQuestionNo-1].choices)) {
                                choicesDuplicacy = 1;
                            }
                            formComplete = 1;
                        }
                    }
                }

                if(formComplete) {
                    if(!choicesDuplicacy) {
                        if((this.state.questions.length === this.state.noOfQuestions) && (this.state.currentQuestionNo === this.state.questions.length)) {
                            // check for questions duplicacy
                            const questionsArr = this.state.questions.map(row => {
                                return row.question;
                            });
                            if(!duplicacyCheckingForArray(questionsArr)) {
                                this.props.onCreatingQuiz({
                                    questions: this.state.questions,
                                    language: this.state.selectedLanguage,
                                    userId: this.props.userId,
                                    quizId: this.state.quizId,
                                    testTIme: this.state.testTime,
                                    difficulty: this.state.difficulty,
                                });
                                this.props.onHideAlert();
                            } else {
                                this.props.onShowAlert("'Duplicate questions are not allowed, Please recheck your questions before submiting", 'warning');
                            }
                        } else {
                            // update currentQuestionNo and clear the complete form for new question and choices
                            if(this.state.questions.length > this.state.currentQuestionNo) {
                                this.setState(prevState => ({
                                    currentQuestionNo: prevState.currentQuestionNo + 1,
                                    currentQuestionValue: this.state.questions[this.state.currentQuestionNo].question,
                                    currentChoicesValues: this.state.questions[this.state.currentQuestionNo].choices,
                                    currentAnswer: 0,
                                    alert: '',
                                    alertType: ''
                                }));
                            } else {
                                this.setState(prevState => ({
                                    currentQuestionNo: prevState.currentQuestionNo + 1,
                                    currentQuestionValue: '',
                                    currentChoicesValues: [],
                                    currentAnswer: 0,
                                }));
                                this.props.onHideAlert();
                            }
                        }
                        this.saveQuestions({
                            questions: this.state.questions,
                            language: this.state.selectedLanguage,
                            noOfQuestions: this.state.noOfQuestions,
                            quizId: this.state.quizId,
                            testTime: this.state.testTime,
                            difficulty: this.state.difficulty
                        });
                    } else {
                        this.props.onShowAlert("Choices can't be duplicate", 'warning');
                    }
                } else {
                    this.props.onShowAlert("Input the question, choices and select correct answer before proceeding", 'warning');
                }
            }
        } else {
            this.props.onShowAlert("Please Select the language, no of questions, test time and difficulty to start creating quiz", 'warning');
        }
    }

    onCloseIconClickHandler = () => {
        if(this.state.creatingQuiz) {
            this.props.onShowConfirm('Please Confirm to Quit');
        }
    }

    render() {
        let body = <Loader />;
        if(this.props.loading === false) {
            if(this.state.creatingQuiz === false) {
                body = (
                    <Aux>
                        <div className={classes.selectCont}>
                            <label>Choose Your Language</label>
                            <Select 
                                changed={this.selectChangeHandler}
                                value={this.state.selectedLanguage}
                                options={["select", "React", "Redux", "JavaScript", "PHP", "Python"]}
                            />
                        </div>
                        <div className={classes.noOfQuestions}>
                            <label htmlFor="">No of Questions</label>
                            <Input 
                                changed={this.noOfQuestionInputChangedHandler} 
                                inputType="number" 
                                className="noq"
                                value={this.state.noOfQuestions}
                            ></Input>
                        </div>
                        <div className={classes.testTime}>
                            <label htmlFor="">Test Time (in minutes)</label>
                            <Input 
                                changed={this.testTimeInputChangedHandler} 
                                inputType="number" 
                                className="noq"
                                value={this.state.testTime}
                            ></Input>
                        </div>
                        <div className={classes.Difficulty}>
                            <label htmlFor="">Difficulty</label>
                            <Select 
                                changed={this.difficultySelectChangeHandler}
                                value={this.state.difficulty}
                                options={["select", "Beginners", "Intermediate", "Advanced"]}
                            />
                        </div>
                    </Aux>
                );
            } else if(this.props.shareLink !== '') {
                body = <ShareLink shareLink={this.props.shareLink} />
            } else {
                body = (
                    <Aux>
                        {this.state.currentQuestionNo !== 0 ? <p className={classes.questionSNo}>Q. <span>{this.state.currentQuestionNo}</span>/<span>{this.state.noOfQuestions}</span></p> : null}
                        <Question 
                            changed={this.onQuestionInputChangedHandler} 
                            value={this.state.currentQuestionValue}
                        />
                        <Choices 
                            changed={this.onChoiceInputsChangedHandler} 
                            clicked={this.onAnswerSelectHandler} 
                            answer={this.state.currentAnswer}
                            value={this.state.currentChoicesValues}
                        />
                    </Aux>
                );
            }
        }

        return (
            <Aux>
                {
                    this.props.shareLink === '' && this.props.loading === false
                    ? <img
                        onClick={this.onCloseIconClickHandler} 
                        className={classes.Close} 
                        src={QuestionMarkIcon} 
                        alt="Close"
                    />
                    : null
                }
                <div className={classes.CreateQuiz}>
                    {body}
                    {
                        this.props.shareLink === '' && this.props.loading === false
                        ? <div className={classes.ButtonGroup}>
                            <Button btnType="cta" clicked={this.previousButtonClickHandler} className="quiz-prev-btn" >Previous</Button>
                            <Button btnType="cta" clicked={this.continueButtonClickHandler} className="quiz-continue-btn" >Continue</Button>
                          </div>
                        : null
                    }
                </div>
                {
                    this.props.alertMsg !== ''
                    ? <Alert alertType={this.props.alertType}>{this.props.alertMsg}</Alert>
                    : null
                }
                {
                    this.props.confirmMsg !== ''
                    ? <Confirm>{this.props.confirmMsg}</Confirm>
                    : null
                }
            </Aux> 
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        shareLink: state.createQuiz.shareLink,
        loading: state.createQuiz.loading,
        alertMsg: state.alert.alertMsg,
        alertType: state.alert.alertType,
        confirmMsg: state.confirm.confirmMsg,
        okClicked: state.confirm.okClicked
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreatingQuiz: (params) => dispatch(actions.creatingQuiz(params)),
        onShowAlert: (alertMsg, alertType) => dispatch(actions.showAlert(alertMsg, alertType)),
        onHideAlert: () => dispatch(actions.hideAlert()),
        onShowConfirm: (confirmMsg) => dispatch(actions.showConfirm(confirmMsg)),
        onHideConfirm: () => dispatch(actions.hideConfirm()),
        onOkClicked: (okClicked) => dispatch(actions.okClicked(okClicked))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);