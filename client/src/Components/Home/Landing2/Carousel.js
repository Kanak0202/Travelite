import { data } from "../../../Components Data/landingSlide";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
    const [index, setIndex] = useState(0);
    const [item, setItem] = useState(data);


    useEffect(()=>{
        const lastIndex = item.length-1;
        if(index<0){
          setIndex(lastIndex);
        }
        if(index>lastIndex){
          setIndex(0);
        }
      },[index,item])
    
    useEffect(()=>{
      let slider = setInterval(()=>{
        setIndex(index+1);
      },3000);
      return ()=> clearInterval(slider);
    }, [index])

    const navigate = useNavigate();
    const goToExplore = ()=>{
        navigate('/explore');
      }
    
  return (
    <div className="all-slides-container">
      {item.map((dataItem, itemIndex) => {
        return (
            <article className = {itemIndex === index ? "slide-container" : "slide-container slide-hidden"} key={itemIndex}>
            <img src={dataItem.img} alt="" className="slide-img" />
            <div className="slide-content">
              <p style={{ textAlign: "left", fontSize: "2vw", margin: 0 }}>
                Welcome to
              </p>
              <p style={{ fontWeight: 800, fontSize: "12vw", margin: 0 }} className="main-name">
                {dataItem.name}
              </p>
              <p style={{ fontSize: "2vw", margin: 0, fontWeight: 700 }} className="tagline">
                {dataItem.tagline}
              </p>
              <button className="explore-btn btn-jmp" onClick={goToExplore}>Explore now</button>
            </div>
            <div
              className="gradient"
              style={{ backgroundColor: dataItem.hueColor }}
            ></div>
            <ArrowBackIosIcon className="arrow prev" onClick={()=> setIndex(index-1)}/>
            <ArrowForwardIosIcon className="arrow next" onClick={()=>setIndex(index+1)}/>
          </article>
        );
      })}
    </div>
  );
};

export default Carousel;
