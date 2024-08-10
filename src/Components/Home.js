import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index.js";

function Home() {
  const [decks, setDecks] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function loadDecks() {
      const abortController = new AbortController();
      try {
        const deckResponse = await listDecks(abortController.signal);
        setDecks(deckResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    loadDecks();
  }, []);

  const deleteHandler = async (deck) => {
    const deleteConf = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (deleteConf) {
      await deleteDeck(deck);
      nav(0);
    }
  };

  const decksMap = decks.map((deck) => (
    <div
      key={deck.id}
      className="card"
      style={{ width: "100%", marginTop: "1em" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4 className="card-title">{deck.name}</h4>
          <p>{deck.cards.length} cards</p>
        </div>
        <p className="card-text text-secondary">{deck.description}</p>
        <div className="d-flex justify-content-between mt-4">
          <div>
            <Link to={`/decks/${deck.id}`} className="card-link">
              <button
                className="btn btn-secondary"
                onClick={() => nav(`/decks/${deck.id}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
                View
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="card-link">
              <button
                className="btn btn-primary"
                onClick={() => nav(`/decks/${deck.id}/study`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-journal-bookmark-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
                  />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                </svg>
                Study
              </button>
            </Link>
          </div>
          <Link to="#" className="card-link">
            <button
              className="btn btn-danger"
              onClick={() => deleteHandler(deck.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <Link to={`/decks/new`} className="mb-4 d-block">
        <button className="btn btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
          Create Deck
        </button>
      </Link>
      {decks.length > 0 ? <div>{decksMap}</div> : <p>Loading...</p>}
    </div>
  );
}

export default Home;
