import { useState } from "react";
import { getUserId } from '@/app/utils/getUserId'


const ApiRequestForm = () => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = async () => {
    try {

      const response = await fetch("/api/guru", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputText,
          userid: getUserId()
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleSubmit}>Send POST request</button>
    </div>
  );
};

export default ApiRequestForm;
