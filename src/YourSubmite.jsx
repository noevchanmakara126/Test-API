import React, { useEffect, useState } from "react";
import axios from "axios";

export default function YourSubmite() {
  const [submissions, setSubmissions] = useState([]);
  const botToken = "7163026808:AAFuwDttcvvWd0pqYKz9GadNEwKpoH7N9JE"; // Replace with your bot's token
  const groupChatId = "-4553597258"; // Replace with your chat ID or group ID

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        // Fetch updates from the bot
        const response = await axios.get(
          `https://api.telegram.org/bot${botToken}/getUpdates`
        );
        const updates = response.data.result;

        console.log("Fetched updates:", updates); // Log updates for debugging

        // Filter updates for messages in the specified group chat
        const groupMessages = await Promise.all(
          updates
            .filter(
              (update) =>
                update.message &&
                update.message.chat.id === parseInt(groupChatId)
            )
            .map(async (update) => {
              const message = update.message;
              const text = message.text || "No text";
              let imageUrl = null;

              // Check if message contains a photo
              if (message.photo && message.photo.length > 0) {
                const fileId = message.photo[message.photo.length - 1].file_id;
                const fileResponse = await axios.get(
                  `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
                );
                console.log("File response:", fileResponse); // Log file response for debugging
                imageUrl = `https://api.telegram.org/file/bot${botToken}/${fileResponse.data.result.file_path}`;
              }

              return { text, image: imageUrl };
            })
        );

        console.log("Group messages:", groupMessages); // Log group messages for debugging
        setSubmissions(groupMessages);
      } catch (error) {
        console.error("Error fetching confessions:", error);
      }
    };

    fetchConfessions();
  }, [botToken, groupChatId]);

  return (
    <div className="w-full h-full items-center justify-center rounded-lg bg-gray-100 m-auto mt-5 flex flex-col p-5">
      <div className="w-[1440px] h-full border flex flex-col">
        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          submissions.map((submission, index) => (
            <div
              key={index}
              className="gap-5 border-gray-300 rounded-lg flex flex-row p-2 mb-2"
            >
              <div className="flex flex-col">
                <p className="mb-2">{submission.text}</p>
                {submission.image && (
                  <img
                    src={submission.image}
                    className="w-[500px] h-[180px]"
                    alt={`Submitted ${index}`}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
