import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiTrash, BiGridVertical, BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Roulette from "./Roulette";
import {createFuzzyMatcher} from "../../util/util";

const FormularioTexto = () => {
  const [store, setStore] = useState([]);
  const [searchBox, setSearchBox] = useState('');
  const updateSearchBox = e => setSearchBox(e.target.value);

  useEffect(() => {
    axios.get('/api/Store')
        .then(response => {
            setStore(response.data);
        })
        .catch(error => {
            console.log(error);
        })
}, []);


  const [inputList, setInputList] = useState([
    {
      store_id: "example",
      store_name: ""
    }
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (id, name, event) => {

    if(inputList[0]["store_name"] == "") {
      inputList.shift();
    }
  
    inputList.forEach(o => {
      if (o.store_name == name) {
        alert('이미 선택된 가게입니다.')
        event.preventDefault();
      }
    })
    
    setInputList([...inputList, {store_id: id, store_name: name}]);  

  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(inputList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputList(items);
  }

  return (
    <div className="d-flex p-5">
      <div className="main-form">
        <div className="text-title">
          <h2 className="text-center">Roulette Title</h2>
        </div>

        <Roulette data={inputList} />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="items">
            {(provided) => (
              <ul
                className="items"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ listStyle: "none" }}
              >
                {inputList.map((x, index) => {
                  return (
                    <Draggable key={x.store_id} draggableId={x.store_id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list-item"
                        >
                          <div className="item">
                            <BiGridVertical />
                            <input
                              name="text"
                              placeholder="Add Store"
                              value={x.store_name}
                              onChange={(e) => handleInputChange(e, index)}
                              className="input"
                            />
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <button
                                  className="button"
                                  onClick={() => handleRemoveClick(index)}
                                >
                                  <BiTrash />
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="store-list">
        <h4 className="p-2">가게를 선택하세요</h4>
        <div>
            <div className="d-flex w-50 p-2">
                <input className="form-control w-75" id="searchArea" value={searchBox}
                      onChange={updateSearchBox}
                      placeholder="검색할 가게를 입력하세요."/>
                <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>초기화
                </button>
            </div>

            <div className="row row-cols-1 row-cols-xl-2 row-cols-xxl-3 g-4 w-100 m-auto">
                {store.filter(v => createFuzzyMatcher(searchBox).test(v.store_name.toLowerCase())).map(v =>
                        <div className="col" key={v.store_id} onClick={() => handleAddClick(v.store_id, v.store_name)}>
                            <div className="card shadow">
                                <div className="row g-2">
                                    <div className="col-6">
                                        <img src={`/image/${v.store_id}`} className="rounded-start img-fluid h-100"
                                            style={{objectFit: "cover"}}/>
                                    </div>
                                    <div className="col-5">
                                        <div className="card-body d-flex flex-column justify-content-evenly h-100">
                                            <h5 className="card-title fw-bold w-100">{v.store_name}</h5>
                                            {/*<p className="card-text mb-5">{v.address}</p>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ,)}

            </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default FormularioTexto;
