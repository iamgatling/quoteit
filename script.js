const endpoint = "https://api.quotable.io/random";

const getQuote = async () => {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching quote: ${error}`);
    }
};

const displayQuote = async () => {
    const { content, author } = await getQuote();
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    quoteElement.textContent = content;
    authorElement.textContent = `- ${author}`;
};

const newQuoteButton = document.getElementById("new-quote");
newQuoteButton.addEventListener("click", displayQuote);

displayQuote();