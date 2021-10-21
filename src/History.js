import "./History.css";

function History({history}) {
    const historyItems = history.slice(0).reverse().map(({id, input, output}) => {
        return (
            <p key={id}><i>[{id}]</i> {input} = {output}</p>
        );
    });
    return (
        <div className={"History"}>
            {historyItems}
        </div>
    );
}

export default History;
