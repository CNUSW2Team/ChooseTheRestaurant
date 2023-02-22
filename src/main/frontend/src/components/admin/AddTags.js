import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function AddTags(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selected, setSelected] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('/api/Tag')
            .then(response => {
                setTags(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const updateSelect = (e, value) => {
        selected.includes(value) ?
            setSelected(selected.filter((selected) => selected !== value)) :
            setSelected([...selected, value]);
    }

    function saveTag(){
        props.setNewMenu(props.newMenu.map((item) => {
            return item.idx === parseInt(props.idx) ? {...item, tag: selected} : item;
        }));
        handleClose();
    }

    return (
        <>
            <button className="btn btn-sm btn-outline-primary me-2" onClick={handleShow}>태그 선택</button>
            <Modal show={show} onHide={handleClose} centered={true} className="modal-dialog-centered">
                <Modal.Header>
                    <Modal.Title>태그 선택</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="p-2">
                        {tags && tags.map((v) =>
                            <button
                                className={"btn btn-sm rounded-4 m-1 " + (selected.includes(v.tag) ? "btn-primary" : "btn-secondary")}
                                onClick={(e) => updateSelect(e, v.tag)}>#{v.tag}</button>
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-outline-primary"
                            onClick={() => saveTag()}>
                        저장하기
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTags;