import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Submitted({ openModal, setOpenModal, onConfirm }) {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center m-5">
          <img src="src\image\download (1).gif" alt="" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to submit this confession?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="green"
              onClick={() => {
                onConfirm(); // Call the onConfirm function to submit
                setOpenModal(false); // Close the modal
              }}
            >
              Yes, I'm sure
            </Button>
            <Button color="red" onClick={() => setOpenModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
