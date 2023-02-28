import React, { useState, useEffect, useRef } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = ({ data }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState(data);
  const popUpRef = useRef(null);
  const popupBoxRef = useRef(null);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);

    if(rouletteData.length <= 1){
      alert("2개 이상의 가게를 선택해주세요.")
      setMustSpin(false);
    } else {
      setMustSpin(true);
      setTimeout(()=>{ 
        popUpRef.current.classList.remove('hidden')
        popupBoxRef.current.classList.add('fade-in') 
      }, 2000); 
    }
  };

  useEffect(() => {
    const addShortString = data.map((item) => {
      return {
        completeOption: item.store_name,
        completeOptionId: item.store_id,
        option:
          item.store_name.length >= 30
            ? item.store_name.substring(0, 30).trimEnd() + "..."
            : item.store_name
      };
    });
    setRouletteData(addShortString);
  }, [data]);

  const handlePopupClose = () => {
    popUpRef.current.classList.add('hidden')
  }

  return (
    <>
      <div align="center" className="roulette-container">
        <Wheel
          mustStartSpinning={mustSpin}
          spinDuration={[0.2]}
          prizeNumber={prizeNumber}
          data={rouletteData}
          outerBorderColor={["#ccc"]}
          outerBorderWidth={[7]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["tranparent"]}
          radiusLineWidth={[1]}
          textColors={["#f5f5f5"]}
          textDistance={55}
          fontSize={[12]}
          backgroundColors={[
            "#3f297e",
            "#175fa9",
            "#169ed8",
            "#239b63",
            "#64b031",
            "#efe61f",
            "#f7a416",
            "#e6471d",
            "#dc0936",
            "#e5177b",
            "#be1180",
            "#871f7f"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className="button roulette-button" onClick={handleSpinClick}>
          Start
        </button>
      </div>

      {/* popup */}
      <div ref={popUpRef} className="pop-up hidden">
        <div ref={popupBoxRef} className="popup-box">
          <h1>Result</h1>
          <div>
            <h3>{rouletteData[prizeNumber].completeOption}</h3>
            <img style={{width:350, borderRadius: "5px"}} src={`/image/${rouletteData[prizeNumber].completeOptionId}`}/>
          </div>
          
          <div className="btn-wrap">
            <button class="btn btn-light" onClick={() => window.location.href = `/Store/${rouletteData[prizeNumber].completeOptionId}`}>가게로 이동</button>
            <button class="btn btn-light" onClick={handlePopupClose}>Close</button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Roulette;

