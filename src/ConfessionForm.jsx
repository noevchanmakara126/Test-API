import React, { useState } from "react";
import Submitted from "./Submitted";
import { Button } from "flowbite-react";
import axios from "axios"; // Import axios to make HTTP requests

export default function ConfessionForm() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [submittedText, setSubmittedText] = useState("");
  const [submissionDone, setSubmissionDone] = useState(false);

  const botToken = "7163026808:AAFuwDttcvvWd0pqYKz9GadNEwKpoH7N9JE"; // Replace with your bot's token
  const chatId = "-4553597258"; // Replace with your chat ID or group ID

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the file object itself
    }
  };

  const handleTextChange = (e) => {
    setSubmittedText(e.target.value);
  };

  const handleConfirm = async () => {
    setSubmissionDone(true);
    setOpenModal(false);

    // Send text to Telegram
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: `Confession: ${submittedText}`,
    });

    // Send image to Telegram (if any)
    if (selectedImage) {
      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append("photo", selectedImage); // Use the actual file object

      await axios.post(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    // Clear form fields
    setSelectedImage(null);
    setSubmittedText("");
    setSubmissionDone(false);
  };

  return (
    <div className="md:w-[500px] md:h-[500px] items-center justify-center rounded-lg bg-slate-500 m-auto mt-20 flex flex-col">
      <div className="grid grid-flow-row">
        <img
          src="src\\image\\2.gif"
          className="w-[100px] h-[100px] rounded-lg justify-center items-center m-auto mb-5"
          alt="Selected or Placeholder"
        />
        <input
          type="text"
          className="w-[300px] h-[70px] items-center m-auto rounded-lg"
          placeholder="What's in your mind?"
          onChange={handleTextChange}
          value={submittedText}
        />
      </div>
      <div>
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            className="w-[100px] h-[100px]"
            alt="Preview"
          />
        )}
      </div>
      {!submissionDone ? (
        <div className="flex flex-row mt-5 gap-5 align-middle justify-center">
          <div className="flex flex-col gap-5">
            <form>
              <input
                className="rounded-md"
                type="file"
                onChange={handleImageChange}
              />
            </form>
            <Button color="blue" onClick={() => setOpenModal(true)}>
              Submit Confession
            </Button>
          </div>
          <Submitted
            openModal={openModal}
            setOpenModal={setOpenModal}
            onConfirm={handleConfirm}
          />
        </div>
      ) : (
        <div className="text-center text-green-500 mt-5">
          Submitted Successfully
        </div>
      )}
    </div>
  );
}
