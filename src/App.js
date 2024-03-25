import './App.css';
import { Batch } from './components/Batch';
import Test from './components/Test';
import UI from './components/UI';
import UI1 from './components/UI1';
const data = require("../src/student.json");



function App() {
  
  return (

    <div className="App">
      {/* <Test/>  */}
      <UI1 data={data}/>  
      {/* <UI data={data}/> */}
      {/* <Batch/> */}
    </div>
  );
}

export default App;
