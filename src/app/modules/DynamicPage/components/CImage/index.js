import React, {useState} from "react";
import {Image, Modal} from "react-bootstrap";

export function CImage({config}) {
    const [modal, setModal] = useState(false);

    const click = (e) => {
        e.preventDefault();
        setModal(true);
    }

    return (
        <>
            <a
                className='embed-responsive'
                style={{cursor: 'pointer'}}
                onClick={click}
            >
                <Image
                    src={config.value}
                    alt={'IMAGE'}
                    fluid
                />
            </a>
            {modal && <Modal
                size="lg"
                show={true}
                onHide={() => setModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Image Viewer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image
                        src={config.value}
                        alt={'IMAGE'}
                        fluid
                    />
                </Modal.Body>
            </Modal>}
        </>
    );
}