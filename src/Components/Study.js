import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    loadDeck();
  }, []);

  const [cardNumber, setCardNumber] = useState(1);
  const [front, isFront] = useState(true);

  function nextCardHandler(index, total) {
    if (index < total) {
      setCardNumber((prevCardNumber) => prevCardNumber + 1);
      isFront(true);
    } else {
      const restart = window.confirm(
        "Restart cards? Click 'Cancel' to return to the home page."
      );

      if (restart) {
        setCardNumber(1);
        isFront(true);
      } else {
        nav("/");
      }
    }
  }

  function flipCardHandler() {
    isFront(!front);
  }

  function showNextButton(cards, index) {
    if (front) {
      return null;
    }
    return (
      <button
        onClick={() => nextCardHandler(index + 1, cards.length)}
        className="btn btn-primary mx-1"
      >
        Next
      </button>
    );
  }

  function enoughCards() {
    const currentCard = cards[cardNumber - 1];

    if (!currentCard) return null;

    return (
      <div className="card">
        <div className="card-body" key={currentCard.id}>
          <h5 className="card-title">{`Card ${cardNumber} of ${cards.length}`}</h5>
          <p className="card-text">
            {front ? currentCard.front : currentCard.back}
          </p>
          <button onClick={flipCardHandler} className="btn btn-secondary mx-1">
            Flip
          </button>
          {showNextButton(cards, cardNumber - 1)}
        </div>
      </div>
    );
  }

  function notEnoughCards() {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg me-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
          Add Cards
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-house-door-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
            </svg>
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Study</li>
      </ol>
      <div>
        <h1>{`Study: ${deck.name}`}</h1>
        <div>{cards.length >= 3 ? enoughCards() : notEnoughCards()}</div>
      </div>
    </div>
  );
}

export default Study;
