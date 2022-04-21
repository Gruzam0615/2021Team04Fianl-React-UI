import { useState } from "react";

import "./ResultItem.css";

const ResultItem = (props) => {
    let title = props.title;
    title = title.replace(/(<([^>]+)>)/ig,"");
    title = title.replace(/&amp;/ig,"");

    return(
        <li key={props.index}>
            {`${title}`}
        </li>
    );
}
export { ResultItem }