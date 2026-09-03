const questionInput = document.getElementById("question");
const submitBtn = document.getElementById("submitBtn");
const answer = document.getElementById("answer");

submitBtn.addEventListener("click", async () => {

    const question = questionInput.value.trim();

    if(question === ""){
        answer.textContent= "Please eneter a question";
        return;
    }

    submitBtn.disabled= true;

    answer.textContent = "Gemini is thinking...";

    try {

        const response = await fetch("https://ask-gemini-tx0k.onrender.com/ask", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        console.log("Backend response:", data);


    

        if(!response.ok) {
            throw new Error(data.Error||"something went wrong");
        }

        answer.textContent = data.answer;

    } catch (error) {

        console.error("Error:", error);

        answer.textContent = "Something went wrong!";
    } finally {

        submitBtn.textContent = "Ask";
        submitBtn.disabled = false;
    }
});
