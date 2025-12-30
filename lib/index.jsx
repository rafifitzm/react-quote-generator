const Quote = ({ quote }) => {
  if (quote === null) {
    return (
      <div className="card p-3 my-3 bg-primary-subtle">
        <p className="text-primary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="card p-3 my-3 bg-primary-subtle">
      <p className="text-primary">
        <span>"</span>
        {quote.content}
        <span>"</span>
      </p>
      <span>- {quote.author}</span>
    </div>
  );
};

const App = () => {
  const message = "If you see this message in your browser, that means React is successfully mounted! 🙌";

  const [quotes, setQuotes] = React.useState([]);
  const [currentQuote, setCurrentQuote] = React.useState(null);
  console.log("Quotes: ", quotes);

  const getRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  const getNewQuote = (quotes) => {
    const newQuote = getRandomQuote(quotes);
    setCurrentQuote(newQuote);
  }

  React.useEffect(() => {
    fetch('https://quotable.vercel.app/quotes')
      .then(response => response.json())
      .then((data) => {
        setQuotes(data.results);
        getNewQuote(data.results);
      });
  }, []);


  return (
    <div id="quoteGeneratorContainer" className="container">
      <Quote quote={currentQuote} />
      <button className="btn btn-primary" onClick={() => getNewQuote(quotes)}>More inspiration</button>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
