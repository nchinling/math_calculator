import { Textfit } from 'react-textfit';
import "./Screen.css";
function Screen({ value }) {
    return (
        <Textfit className="screen" mode="single" max={70}>
            {value}
        </Textfit>


    );
}

export default Screen;