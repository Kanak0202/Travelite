//css
import "./photoframe.css";

const Photoframe = (props)=>{
    return(
        <div style={{top:"25px", left:props.left, height:"8rem", width:"7rem"}} className="frame">
            <img style={{height:"8rem", width:"7rem"}} src={props.image} alt="" />
        </div>
    );
}

export default Photoframe;