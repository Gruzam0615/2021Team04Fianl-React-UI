import BtnImg from "../../imgs/current.png";
import "./CurrentBtn.css";

const CurrentBtn = (props) => {
    return(
        <div className="crntBtn" onClick={props.func1} >
            <img className="crntBtnImg" src={BtnImg} />
        </div>
    );
}
export { CurrentBtn }