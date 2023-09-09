function startCacheAndNotifications() {
    const fetchAndStoreNewQuote = async () => {
      try {
        const { content, author } = await getQuote();
        const quoteData = { content, author };
        localStorage.setItem("quoteData", JSON.stringify(quoteData));
        const timestamp = new Date().getTime();
        localStorage.setItem("lastUpdateTimestamp", timestamp);
      } catch (error) {
        console.error(`Error fetching and storing quote: ${error}`);
      }
    };
  
    const checkAndUpdateQuote = () => {
        const storedTimestamp = localStorage.getItem("lastUpdateTimestamp");
        if (storedTimestamp) {
          const lastUpdateDate = new Date(parseInt(storedTimestamp, 10));
          const currentDate = new Date();
      
          // Check if it's a different day and it's either 7 AM or 8 PM
          if (
            currentDate.getDate() !== lastUpdateDate.getDate() &&
            ((currentDate.getHours() === 7 && currentDate.getMinutes() >= 0) ||
            (currentDate.getHours() === 19 && currentDate.getMinutes() >= 15))
          ) {
            // It's time to update the quote
      
            // Request notification permission if not granted
            if (Notification.permission !== "granted") {
              Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                  console.log("Notification permission granted");
                }
              });
            }
      
            // Send a notification
            if (Notification.permission === "granted") {
              const notification = new Notification("New Quote", {
                body: "A new quote is available!",
              });
            }
          }
        }
      };
        
  
    const scheduleDailyUpdate = () => {
      // Schedule checks every minute
      setInterval(checkAndUpdateQuote, 60000);
    };
  
    fetchAndStoreNewQuote(); // Fetch and store a new quote immediately
    scheduleDailyUpdate();   // Schedule daily update checks
  }
  
  startCacheAndNotifications();  