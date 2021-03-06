import React from 'react';
import Body from '../body';
import Header from '../header';

import '../reset.scss';
import styles from './calculator.scss';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonValue: '',
      buttonType: '',
      savedValue: 0,
      savedButtonType: '',
    };
  }

  getTotals() {
    const { buttonValue, buttonType, savedValue } = this.state;
    const newSavedValue = Number(savedValue);
    const newButtonValue = Number(buttonValue);

    if (buttonType === 'add') {
      return newSavedValue + newButtonValue;
    }

    if (buttonType === 'substract') {
      return newSavedValue - newButtonValue;
    }

    if (buttonType === 'multiply') {
      return newSavedValue * newButtonValue;
    }

    if (buttonType === 'division') {
      return newSavedValue / newButtonValue;
    }

    if (buttonType === 'percentage') {
      return this.calculatePercentages();
    }

    return newButtonValue;
  }

  handleOperation(type) {
    return {
      buttonValue: '',
      buttonType: type,
      savedValue: this.getTotals(),
    };
  }

  handleEqual() {
    return {
      buttonValue: this.getTotals(),
      buttonType: '',
      savedValue: this.getTotals(),
      savedButtonType: '',
    };
  }

  // to be tested

  handlePercentage(value) {
    const { buttonValue, savedValue, buttonType } = this.state;
    return {
      buttonValue,
      buttonType: value,
      savedValue,
      savedButtonType: buttonType,
    };
  }
  // to be tested

  handleReset() {
    return {
      buttonValue: '',
      buttonType: '',
      savedValue: 0,
    };
  }
  // to be tested

  handleNumber(value) {
    const { buttonValue } = this.state;
    const buttonValueNumber = buttonValue + value;

    return {
      buttonValue: buttonValueNumber,
    };
  }
  // to be tested

  handleOpposite(value) {
    const { buttonValue, savedValue, buttonType } = this.state;
    return {
      buttonValue: buttonValue * -1,
      buttonType: value,
      savedValue: savedValue * -1,
      savedButtonType: buttonType,
    };
  }

  handleButtonClick({ value, type }) {
    let newState;

    if (type === 'num') {
      newState = this.handleNumber(value);
    } else if (
      type === 'operation' &&
      value !== 'equal' &&
      value !== 'percentage' &&
      value !== 'reset' &&
      value !== 'oposite'
    ) {
      newState = this.handleOperation(value);
    } else if (value === 'equal') {
      newState = this.handleEqual();
    } else if (value === 'percentage') {
      newState = this.handlePercentage(value);
    } else if (value === 'reset') {
      newState = this.handleReset();
    } else if (value === 'oposite') {
      newState = this.handleOpposite(value);
    }

    this.setState(newState);
  }

  calculatePercentages() {
    const {
      buttonValue, savedValue, savedButtonType,
    } = this.state;
    const newSavedValue = Number(savedValue);
    const newButtonValue = Number(buttonValue);
    const calcPercentage = (newSavedValue * newButtonValue) / 100;
    const valuePercentage = newButtonValue * 0.01;

    if (newButtonValue !== 0 && savedButtonType === '') {
      return newButtonValue * 0.01;
    }

    if (savedButtonType === 'add') {
      return calcPercentage + newSavedValue;
    }

    if (savedButtonType === 'substract') {
      return (calcPercentage - newSavedValue) * -1;
    }

    if (savedButtonType === 'multiply') {
      return newSavedValue * valuePercentage;
    }

    if (savedButtonType === 'division') {
      return newSavedValue / valuePercentage;
    }

    return 0;
  }

  render() {
    const { buttonValue, savedValue } = this.state;
    // const buttonToConsole = this.state.buttonType;
    // const savedButtonToConsole = this.state.savedButtonType;
    // console.log(`button value: ${buttonValue}`);
    // console.log(`operation type: ${buttonToConsole}`);
    // console.log(`saved value: ${savedValue}`);
    // console.log(`saved button type: ${savedButtonType}`);
    // console.log(this.getTotals());

    return (
      <div className={styles.calculator}>
        <Header total={buttonValue || savedValue} />
        <Body
          onButtonClick={({ type, value }) => this.handleButtonClick({ type, value })}
        />
      </div>
    );
  }
}

export default Calculator;
