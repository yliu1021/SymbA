import './App.css';
import Calculator from "./Calculator";
import History from "./History";
import {useState} from "react";

function App() {
    const [history, setHistory] = useState([]);

    function onSubmit(input, output) {
        setHistory(history.concat([{"id": history.length, input, output}]));
        console.log(`Input: ${input} Output: ${output}`);
    }

    return (
        <div className="App">
            <History history={history}/>
            <Calculator wsURL={"wss://api.yuhanliu.me/ocaml_cas/ws"} onSubmit={onSubmit}/>
        </div>
    );
}

export default App;
