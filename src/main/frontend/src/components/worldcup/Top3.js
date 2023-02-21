import React from "react";

function Top3(props){
    const store = props.store;
    return(
        <div className="d-flex w-100 align-items-end p-3">
            <div className="text-center" style={{width:"25%"}}>
                <h3>2위</h3>
                <div className="card w-auto m-1 overflow-hidden" >
                    {store[1] && <img src={`/image/${store[1].store_id}`} alt="..." />}
                    <div className="carousel-caption" style={{height:"1rem"}}>
                        <p>{store[1] && store[1]["store_name"]}</p>
                    </div>
                </div>
                {/*{store[1] && <img src={`/image/${store[1].store_id}`}/>}*/}
            </div>
            <div className="text-center" style={{width:"50%"}}>
                <h3>1위</h3>
                <div className="card w-auto m-1 overflow-hidden">
                    {store[0] && <img src={`/image/${store[0].store_id}`} alt="..." />}
                    <div className="carousel-caption" style={{height:"1rem"}}>
                        <p>{store[0] && store[0]["store_name"]}</p>
                    </div>
                </div>
                {/*{store[0] && <img src={`/image/${store[0].store_id}`}/>}*/}
            </div>
            <div className="text-center" style={{width:"25%"}}>
                <h3>3위</h3>
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