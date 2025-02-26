import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/PaymentPage.css';

const PaymentPage = () => {
  const [savedCards, setSavedCards] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchSavedCards();
  }, []);

  const fetchSavedCards = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/user/card');
      setSavedCards(response.data);
    } catch (err) {
      setError('Failed to fetch saved cards');
      console.error('Error fetching cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/user/card', newCard);
      setShowAddCard(false);
      setNewCard({
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: ''
      });
      fetchSavedCards();
    } catch (err) {
      setError('Failed to add card');
      console.error('Error adding card:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      setLoading(true);
      await axios.delete(`/user/card/${cardId}`);
      fetchSavedCards();
    } catch (err) {
      setError('Failed to delete card');
      console.error('Error deleting card:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="payment-page">
      <h2>Payment Method</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="saved-cards">
        <h3>Saved Cards</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="cards-list">
            {savedCards.map(card => (
              <div key={card.id} className="card-item">
                <div className="card-info">
                  <span>•••• •••• •••• {card.card_no.slice(-4)}</span>
                  <span>{card.name_on_card}</span>
                  <span>{card.expire_month}/{card.expire_year}</span>
                </div>
                <button 
                  onClick={() => handleDeleteCard(card.id)}
                  className="delete-card-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        className="add-card-btn"
        onClick={() => setShowAddCard(!showAddCard)}
      >
        {showAddCard ? 'Cancel' : 'Add New Card'}
      </button>

      {showAddCard && (
        <form onSubmit={handleAddCard} className="add-card-form">
          <div className="form-group">
            <label htmlFor="card_no">Card Number</label>
            <input
              type="text"
              id="card_no"
              name="card_no"
              value={newCard.card_no}
              onChange={handleInputChange}
              pattern="[0-9]{16}"
              maxLength="16"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expire_month">Expiry Month</label>
              <input
                type="number"
                id="expire_month"
                name="expire_month"
                value={newCard.expire_month}
                onChange={handleInputChange}
                min="1"
                max="12"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expire_year">Expiry Year</label>
              <input
                type="number"
                id="expire_year"
                name="expire_year"
                value={newCard.expire_year}
                onChange={handleInputChange}
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 10}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name_on_card">Name on Card</label>
            <input
              type="text"
              id="name_on_card"
              name="name_on_card"
              value={newCard.name_on_card}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Card'}
          </button>
        </form>
      )}

      <div className="navigation-buttons">
        <button onClick={() => history.push('/checkout/address')} className="back-btn">
          Back to Address
        </button>
        <button onClick={() => history.push('/checkout/review')} className="next-btn">
          Continue to Review
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
