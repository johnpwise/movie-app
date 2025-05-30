/// Components
import BaseButton from '~/components/buttons/baseButton';
import Modal from 'react-bootstrap/Modal';

/// Interfaces
interface BaseModalProps {
    dataId: string;
    title: string;
    cancelText?: string;
    saveText?: string;
    showModal: boolean;
    handleClose?: () => void;
    handleSave?: () => void;
    children?: React.ReactNode;
}

function BaseModal({
    dataId,
    title,
    cancelText,
    saveText,
    showModal,
    handleClose,
    handleSave,
    children }: BaseModalProps) {
    /// Render
    return (
        <div
            data-id={dataId}
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {children}
                </Modal.Body>

                <Modal.Footer>
                    <BaseButton
                        variant="secondary"
                        text={cancelText || 'Cancel'}
                        onClick={handleClose}
                        dataId={`${dataId}-cancel`}
                    />

                    <BaseButton
                        variant="primary"
                        text={saveText || 'Save'}
                        onClick={handleSave}
                        dataId={`${dataId}-save`}
                    />
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BaseModal;