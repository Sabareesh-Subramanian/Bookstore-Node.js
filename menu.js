const readLine = require("readline");
// console.log("readLine:", readLine);

const EventEmitter = require("events");
const eventListener = new EventEmitter();

const createdInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// console.log("createdInterface:", createdInterface);

let bookArray = ["Atomic Habits", "Mindset", "Davinci Code", "Angles & Demons"];

createdInterface.on("close", () => {
  console.log("\nThanks for Visiting!");
  console.log("Bye Bye!");
});

AskQuestion = () => {
  createdInterface.question(
    "\nWelcome to BookStore! \nPlease select your desired action: \nPress '1' to view available books \nPress '2' to add a new book \nPress '3' to quit \n\n",
    (res) => {
      //   console.log(`\n${res} is the response \n`);
      if (res == 1) {
        eventListener.emit("DisplayBooks");
      } else if (res == 2) {
        eventListener.emit("AddNewBook");
      } else if (res == 3) {
        eventListener.emit("QuitMenu");
      } else {
        eventListener.emit("InvalidSelection");
      }
    }
  );
};

DisplayBooks = () => {
  console.log(`Available Books are: `);
  bookArray.forEach((el) => {
    console.log(el);
  });
  setTimeout(AskQuestion, 1000);
  // AskQuestion();
};

AddBook = () => {
  createdInterface.question("\nPlease enter a book name: \n", (book) => {
    //console.log(book);
    //console.log(bookArray, "Before");
    bookArray.push(book);
    //console.log(bookArray, "Before");
    setTimeout(() => {
      console.log(`${book} has been successfully added to the list.`);
    }, 500);
    setTimeout(AskQuestion, 1000);
    // AskQuestion();
  });
};

QuitAction = () => {
  createdInterface.question(
    "\nAre you sure you want to quit - press Y/N\n",
    (ans) => {
      if (ans == "Y" || ans == "y") {
        createdInterface.close();
      } else if (ans == "N" || ans == "n") {
        setTimeout(AskQuestion, 1000);
        // AskQuestion();
      }
    }
  );
};

InvalidOption = () => {
  console.log(
    "You have entered an invalid choice. Please enter a value within the available options."
  );
  setTimeout(AskQuestion, 500);
  // AskQuestion();
};

eventListener.on("DisplayBooks", DisplayBooks);
eventListener.on("AddNewBook", AddBook);
eventListener.on("QuitMenu", QuitAction);
eventListener.on("InvalidSelection", InvalidOption);

AskQuestion();
