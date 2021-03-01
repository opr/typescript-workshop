import React from 'react';
import ReactDOM from 'react-dom';
import {TeamMember} from "./TeamMember";

const App = () => {
  return <div>
    <TeamMember firstName="Thomas" surname="Roberts" />
  </div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
