import React from 'react';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Calculator />
  );
}


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: '',
      oldNum: null,
      newNum: 0,
      display: '0',
      decimal: false,
      decimalPlaces: 0,
      done: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.equalify = this.equalify.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  equalify = () => {
      if (this.state.operator === '+') {
        this.setState({
          display: +parseFloat(this.state.oldNum + this.state.newNum).toFixed(4),
          decimalPlaces: 0,
          newNum: +parseFloat(this.state.oldNum + this.state.newNum).toFixed(4),
          //newNum: 0,
          done: true,
          operator: ""
        })
      } else if (this.state.operator === '-') {
        this.setState({
          display: +parseFloat(this.state.oldNum - this.state.newNum).toFixed(4),
          decimalPlaces: 0,
          newNum: +parseFloat(this.state.oldNum - this.state.newNum).toFixed(4),
          //newNum: 0,
          done: true,
          operator: ""
        })
      } else if (this.state.operator === '*') {
        this.setState({
          display: +parseFloat(this.state.oldNum * this.state.newNum).toFixed(4),
          decimalPlaces: 0,
          newNum: +parseFloat(this.state.oldNum * this.state.newNum).toFixed(4),
          //newNum: 0,
          done: true,
          operator: ""
        })
      } else if (this.state.operator === '/') {
        this.setState({
          display: +parseFloat(this.state.oldNum / this.state.newNum).toFixed(4),
          decimalPlaces: 0,
          newNum: +parseFloat(this.state.oldNum / this.state.newNum).toFixed(4),
          //newNum: 0,
          done: true,
          operator: ""
        })
      }    
  }
  
  operator = (value) => {
    if (this.state.operatorLast) {
      this.setState({
        operator: value,
        display: (this.state.display.slice(0, (this.state.display.length -1)) + value),
        done: false,
      })
    } else if (this.state.operator === ""){
      this.setState({
        operator: value,
        operatorLast: true,
        oldNum: this.state.newNum,
        newNum: 0,
        decimalPlaces: 0,
        decimal: false,
        display: this.state.display + value,
        done: false,
      })
    } else if (this.state.operator === '+') {
      this.setState({
        operator: value,
        operatorLast: true,
        oldNum: parseInt(this.state.oldNum) + parseInt(this.state.newNum),
        newNum: 0,
        decimalPlaces: 0,
        decimal: false,
        display: this.state.display + value,
        done: false,
      })
    } else if (this.state.operator === '-') {
      this.setState({
        operator: value,
        operatorLast: true,
        oldNum: this.state.oldNum - this.state.newNum,
        newNum: 0,
        decimalPlaces: 0,
        decimal: false,
        display: this.state.display + value,
        done: false,
      })
      
    } else if (this.state.operator === '*') {
      this.setState({
        operator: value,
        operatorLast: true,
        oldNum: this.state.oldNum * this.state.newNum,
        newNum: 0,
        decimalPlaces: 0,
        decimal: false,
        display: this.state.display + value,
        done: false,
      })
    } else if (this.state.operator === '/') {
      this.setState({
        operator: value,
        operatorLast: true,
        oldNum: this.state.oldNum / this.state.newNum,
        newNum: 0,
        decimalPlaces: 0,
        decimal: false,
        display: this.state.display + value,
        done: false,
      })
    }
  }
  
  
  handleClick = (value) => {
    console.log(value)
    console.log(this.state);
    if (value === 'Clear') {
      this.setState({
        operator: '',
        operatorLast: false,
        oldNum: null,
        newNum: 0,
        display: '0',
        decimal: false,
        decimalPlaces: 0,
        done: false,
      })
    } else if (value === '+') {
      this.operator(value)

    } else if (value === '-') {
      this.operator(value)
      
    } else if (value === '*') {
      this.operator(value)
      
    } else if (value === '/') {
      this.operator(value)
      
    } else if (value === '.') {
      if (this.state.decimal === false) {
        this.setState({
          decimal: true,
          display: this.state.display + value
        })
      }

    }
    else if (value === '=') {
      this.equalify()
    }
    
    //below this is if digits are entered
    else if (this.state.display.toString().length < 10) {
      if (this.state.done === true) {
        this.setState({
          operatorLast: false,
          oldNum: null,
          newNum: value,
          display: value,
          done: false,
        })
      } else if (this.state.display[0] !== '0') {
        if (this.state.decimal === false) {
          this.setState({
            operatorLast: false,
            newNum: (this.state.newNum * 10) + value,
            display: this.state.display + value.toString()
          })
        } else {
          this.setState({
            operatorLast: false,
            decimalPlaces: this.state.decimalPlaces +1,
            newNum: this.state.newNum + (value * Math.pow(10, 0-(this.state.decimalPlaces + 1))),
            display: this.state.display + value.toString()
          })
        }
      } else {
        if (this.state.decimal === false) {
          this.setState({
            operatorLast: false,
            newNum: (this.state.newNum * 10) + value,
            display: value.toString()
          })
        } else {
          this.setState({
            operatorLast: false,
            decimalPlaces: this.state.decimalPlaces +1,
            display: this.state.display + value.toString()
          })
        }        
      }
    }
  }

  handleKeyPress = (event) => {
    
 
    if (event.key === 'c' || event.key === 'C') {
      this.handleClick('Clear')
    } else if (event.key === 'Enter') {
      this.handleClick('=')
    } else if (event.key === '+') {
      this.handleClick('+')
    } else if (event.key === '-') {
      this.handleClick('-')
    } else if (event.key === '*') {
      this.handleClick('*')
    } else if (event.key === '/') {
      this.handleClick('/')
    } else if (event.key === '=') {
      this.handleClick('=')
    } else if (event.key === '.') {
      this.handleClick('.')
    } else if (!isNaN(parseInt(event.key))){
      this.handleClick(parseInt(event.key))
    }
  }
  componentDidMount(){
    document.addEventListener("keypress", this.handleKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keypress", this.handleKeyPress, false);
  }
  render() {
    return (
      <div id='container'>
        <div id='display' onKeyPress={this.handleKeyPress} > {this.state.display} </div>
        <Key value={'Clear'} name={'clear'} handleClick={this.handleClick} />
        <Key value={'/'} name={'divide'} handleClick={this.handleClick} />
        <Key value={7} name={'seven'} handleClick={this.handleClick} />
        <Key value={8} name={'eight'} handleClick={this.handleClick} />
        <Key value={9} name={'nine'} handleClick={this.handleClick} />
        <Key value={'*'} name={'multiply'} handleClick={this.handleClick} />
        <Key value={4} name={'four'} handleClick={this.handleClick} />
        <Key value={5} name={'five'} handleClick={this.handleClick} />
        <Key value={6} name={'six'} handleClick={this.handleClick} />
        <Key value={'-'} name={'subtract'} handleClick={this.handleClick} />
        <Key value={1} name={'one'} handleClick={this.handleClick} />
        <Key value={2} name={'two'} handleClick={this.handleClick} />
        <Key value={3} name={'three'} handleClick={this.handleClick} />
        <Key value={'+'} name={'add'} handleClick={this.handleClick} />
        <Key value={0} name={'zero'} handleClick={this.handleClick} />
        <Key value={'.'} name={'decimal'} handleClick={this.handleClick} />
        <Key value={'='} name={'equals'} handleClick={this.handleClick} />    
      </div>
    )
  }
}

class Key extends React.Component {
  render() {
    return (
      <button id={this.props.name} className='button' onClick={() => {this.props.handleClick(this.props.value)}}>
        {this.props.value}
      </button>
    )
  }
}



export default App;
