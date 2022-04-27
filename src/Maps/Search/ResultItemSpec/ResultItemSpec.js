const ResultItemSpec = (props) => {
    return(
        <div>
            <div className="SpecButtonDiv">
                    <button>X</button>
                </div>
                <header>
                    <h3 className="SpecTitle"></h3>
                </header>
                <figure>
                    <div className="SpecThumbnail"></div>
                </figure>
                <summary>
                    <p className="SpecPhone"></p>
                </summary>
                <summary >
                    <p className="SpecAddress"></p>
                </summary>
        </div>
    )
}
export default ResultItemSpec;