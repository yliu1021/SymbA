import {useState} from "react";
import "./Calculator.css";
import {eval as casEval} from "./js_cas/js_cas.js"

function Calculator({wsURL, onSubmit}) {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("0");
    const [outputUpdated, setOutputUpdated] = useState(true);

    function onChange(e) {
        const val = e.target.value;
        setInput(val);
        if (val === "") {
            setOutput("0");
            setOutputUpdated(true);
        } else {
            const casRes = JSON.parse(casEval(val));
            console.log(casRes);
            if (casRes["success"] && casRes["number"] != null) {
                const resNumber = casRes["number"];
                setOutput(resNumber);
                setOutputUpdated(true);
            } else {
                setOutputUpdated(false);
            }
        }
    }

    function onEnter() {
        if (outputUpdated && input !== "") {
            onSubmit(input, output);
            setInput(output);
        }
    }

    const outputStyle = {
        color: outputUpdated ? "black" : "lightgray"
    };
    return (
        <div className={"Calculator"}>
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
