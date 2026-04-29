// @ts-nocheck

import React, {Component} from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  changeDetail = () => {
    this.setState({
        color: "blue", 
        brand: "Tesla", 
        model: "Model S", 
        year: "2025"});
  }

  componentDidMount() {
      console.log("Component did mount")
      //run after first render => Retrieve data from backend server
  }

  componentWillUnmount(){
      console.log("Component will unmount");
      //runs before component umount
  }

  componentDidUpdate(){
      
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
       Color {this.state.color} - Model {this.state.model}
          from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeDetail}
        >Change detail</button>
      </div>
    );
  }
}


export default Test;