import React, {Component} from "react";
import ArbeidsgiverPeriodeTabell from "./ArbeidsgiverPeriodeTabell";

class App extends Component {

  render(){
    return <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <ArbeidsgiverPeriodeTabell />
        </div>
      </div>
    </div>
  }

}

export default App;
