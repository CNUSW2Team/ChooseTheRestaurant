import React from "react";

function Top3(props){
    const store = props.store;
    return(
        <div className="d-flex w-50 align-items-end m-1">
            <div className="text-center" style={{width:"30%"}}>
                <h3>Top2!</h3>
                <div className="card w-auto m-1 overflow-hidden" >
                    {store[1] && <img src={`/image/${store[1].store_id}`} alt="..." />}
                    <div className="carousel-caption" style={{height:"1rem"}}>
                        <p>{store[1] && store[1]["store_name"]}</p>
                    </div>
                </div>
                {/*{store[1] && <img src={`/image/${store[1].store_id}`}/>}*/}
            </div>
            <div className="text-center" style={{width:"50%"}}>
                <h3>Top1!</h3>
                <div className="card w-auto m-1 overflow-hidden">
                    {store[0] && <img src={`/image/${store[0].store_id}`} alt="..." />}
                    <div className="carousel-caption" style={{height:"1rem"}}>
                        <p>{store[0] && store[0]["store_name"]}</p>
                    </div>
                </div>
                {/*{store[0] && <img src={`/image/${store[0].store_id}`}/>}*/}
            </div>
            <div className="text-center" style={{width:"20%"}}>
                <h3>Top3!</h3>
                <div className="card w-auto m-1 overflow-hidden">
                    {store[2] && <img src={`/image/${store[2].store_id}`} alt="..." />}
                    <div className="carousel-caption" style={{height:"1rem"}}>
                        <p>{store[2] && store[2]["store_name"]}</p>
                    </div>
                </div>
                {/*{store[2] && <img src={`/image/${store[2].store_id}`}/>}*/}
            </div>
            {/*{store[1] && <img src={`/image/${store[1].store_id}`}/>}*/}
            {/*{store[0] && <img src={`/image/${store[0].store_id}`}/>}*/}
            {/*{store[2] && <img src={`/image/${store[2].store_id}`}/>}*/}
        </div>
    )
}
export default Top3;