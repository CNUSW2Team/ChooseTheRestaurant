import React, { useState, useEffect, useRef } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = ({ data }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState(data);
  const spinningRef = useRef(null);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    spinningRef.current.disabled = false;
  };

  useEffect(() => {
    const addShortString = data.map((item) => {
      return {
        completeOption: item.store_name,
        option:
          item.store_name.length >= 30
            ? item.store_name.substring(0, 30).trimEnd() + "..."
            : item.store_name
      };
    });
    setRouletteData(addShortString);
  }, [data]);



  
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
      <h2 ref={spinningRef} className="text-center m-3 d-none">
        {!mustSpin ? rouletteData[prizeNumber].completeOption : "맛집 고르는 중..."}
      </h2>
    </>
  );
};

export default Roulette;
