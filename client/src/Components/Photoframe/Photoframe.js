//css
import "./photoframe.css";

const Photoframe = (props)=>{
    return(
        <div style={{top:"10px", left:props.left, height:"5rem", width:"4rem"}} className="frame">
            <img style={{height:"5rem", width:"4rem"}} src={props.image} alt="" />
        </div>
    );
}

export default Photoframe;