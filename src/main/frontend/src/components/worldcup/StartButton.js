import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

function StartButton(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selected, setSelected] = useState(Math.log2(props.num_of_stores)-1);
    const handleChangeSelect = e => {setSelected(e.target.value);}
    const num_of_stores = props.num_of_stores;

    return (
        <>
            <button className="btn btn-outline-primary" onClick={handleShow}>{props.value}</button>
            <Modal show={show} onHide={handleClose} centered={true} className="modal-dialog-centered">
                <Modal.Header>
                    <Modal.Title>충대맛집 월드컵</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5 className="mb-4 d-flex">선택한 월드컵: <div className="ms-1 text-primary">{props.category_name}</div></h5>
                    <div className="mb-2">라운드를선택하세요</div>
                    <select className="form-select form-select-sm" onChange={handleChangeSelect}>
                        {num_of_stores >= 64 ? <option value="5">64강</option> : null}
                        {num_of_stores >= 32 ? <option value="4">32강</option> : null}
                        {num_of_stores >= 16 ? <option value="3">16강</option> : null}
                        {num_of_stores >= 8 ? <option value="2">8강</option> : null}
                        {num_of_stores >= 4 ? <option value="1">4강</option> : null}
                    </select>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-outline-primary"
                            onClick={() => window.location.href = `/Round/${props.category_id}/${Math.pow(2,(parseInt(selected)+1))}`}>
                        시작하기
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StartButton;