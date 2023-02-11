import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

function StartButton(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selected, setSelected] = useState(8);
    const handleChangeSelect = e => setSelected(e.target.value);
    const num_of_stores = props.num_of_stores;
    const num_of_type = 4;
    const type = num_of_type-parseInt(num_of_stores/8);
    const num_of_round = [<option value="64">64강</option>, <option value="32">32강</option>,
        <option value="16">16강</option>,
        <option value="8">8강</option>];

    return (
        <>
            <button className="btn btn-outline-primary" onClick={handleShow}>{props.value}</button>
            <Modal show={show} onHide={handleClose} centered={true} className="modal-dialog-centered">
                <Modal.Header>
                    <Modal.Title>충대맛집 월드컵</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5 className="mb-4 d-flex">선택한 월드컵: <div className="ms-1 text-primary">{props.category_name}</div></h5>
                    <div className="mb-2">라운드를선택하세요(최소 8강)</div>
                    <select className="form-select form-select-sm" onChange={handleChangeSelect}>
                        {num_of_round.slice(type)}
                        {/*<option value="64">64강</option>*/}
                        {/*<option value="32">32강</option>*/}
                        {/*<option value="16">16강</option>*/}
                        {/*<option value="8">8강</option>*/}
                    </select>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-outline-primary"
                            // onClick={() => window.location.replace(`/Round/${props.category_id}/${selected}`)}>
                            onClick={() => window.location.href = `/Round/${props.category_id}/${selected}`}>
                        시작하기
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StartButton;