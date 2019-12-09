import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { exampleCopy, exampleDecrement, exampleIncrement } from "../store/example/actions";
import { RootState } from "../store/rootState";

interface OwnProps {

}

type StateProps = {
  counter: number
  copies: number[]
}

type DispatchProps = {
  exampleIncrement: () => void
  exampleDecrement: () => void
  exampleCopy: () => void
}

type Props = OwnProps & StateProps & DispatchProps;

class App extends Component<Props> {
  render() {
    const { counter, copies, exampleIncrement, exampleDecrement, exampleCopy } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>{counter}</div>
          <button onClick={exampleIncrement}>Increase</button>
          <button onClick={exampleDecrement}>Decrease</button>
          <button onClick={exampleCopy}>Copy</button>
          {
            copies.map((copy: number, index: number) => <div key={index}>{copy}</div>)
          }
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  counter: state.exampleState.counter,
  copies: state.exampleState.copies,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  exampleIncrement: exampleIncrement,
  exampleDecrement: exampleDecrement,
  exampleCopy: exampleCopy,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);