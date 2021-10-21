import {useEffect, useState} from "react";
import "./Calculator.css";

let ws = undefined;

function Calculator({wsURL, onSubmit}) {
    const [connected, setConnected] = useState(false);
    const [input, setInput] = useState("");
    const [casResponse, setCASResponse] = useState({"query": "", "response": "0"});
    const [output, setOutput] = useState("0");
    const [outputUpdated, setOutputUpdated] = useState(true);

    useEffect(() => {
        ws = new WebSocket(wsURL);
        ws.onopen = () => {
            setConnected(true);
        };
        ws.onmessage = (msg) => {
            setCASResponse(JSON.parse(msg.data));
        };
        ws.onclose = () => {
            setConnected(false);
        };
        return () => {
            if (ws && (ws.readyState !== WebSocket.CLOSED || ws.readyState !== WebSocket.CLOSING)) {
                setConnected(false);
                ws.onclose = () => {
                };
                ws.close();
                ws = undefined;
            }
        }
    }, [wsURL]);

    useEffect(() => {
        if (input === "") {
            setOutput("0");
            setOutputUpdated(true);
        } else if (casResponse["query"] === input && !isNaN(parseFloat(casResponse["response"]))) {
            setOutput(casResponse["response"]);
            setOutputUpdated(true);
        } else {
            setOutputUpdated(false);
        }
    }, [casResponse, input]);

    function onChange(e) {
        const val = e.target.value;
        setInput(val);
        if (val === "") {
            setOutput("0");
            setOutputUpdated(true);
        } else if (ws.readyState === WebSocket.OPEN) {
            setOutputUpdated(false);
            ws.send(val);
        }
    }

    function onEnter() {
        if (outputUpdated && input !== "") {
            onSubmit(input, output);
            setInput(output);
        }
    }

    const calculatorStyle = {
        borderColor: connected ? "green" : "red"
    };
    const outputStyle = {
        color: outputUpdated ? "black" : "lightgray"
    };
    return (
        <div className={"Calculator"} style={calculatorStyle}>
            <input
                className={"UserInput"}
                value={input}
                autoFocus
                onChange={onChange}
                onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                        onEnter();
                    }
                }}
                placeholder={"Enter an expression"}/>
            <hr className={"Divider"}/>
            <p className={"UserOutput"} style={outputStyle}>
                {output}
            </p>
        </div>
    )
}

export default Calculator;
