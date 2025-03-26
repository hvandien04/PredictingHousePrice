import React, { useState } from 'react';
import '../styles/Feedback.css';

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to send feedback
    console.log('Feedback submitted:', { rating, comment });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setRating(0);
      setComment('');
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <button 
        className="feedback-button"
        onClick={() => setIsOpen(true)}
      >
        Feedback
      </button>

      {isOpen && (
        <div className="feedback-overlay">
          <div className="feedback-modal">
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <h2>Your Feedback</h2>
                <div className="rating-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= rating ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  placeholder="Tell us what you think..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button type="submit" className="submit-button">
                  Submit Feedback
                </button>
              </form>
            ) : (
              <div className="success-message">
                <h2>Thank You!</h2>
                <p>Your feedback has been submitted successfully.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback; 