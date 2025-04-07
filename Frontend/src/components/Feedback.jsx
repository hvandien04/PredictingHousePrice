import React, { useState } from 'react';
import '../styles/Feedback.css';

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to send feedback
    console.log('Feedback submitted:', { title, comment });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setTitle('');
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
        Phản Hồi
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
                <h2>Phản hồi</h2>
                <div className="feedback-form-group">
                  <input
                    type="text"
                    placeholder="Tiêu đề phản hồi"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <textarea
                  placeholder="Nội dung phản hồi..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button type="submit" className="submit-button">
                  Gửi phản hồi
                </button>
              </form>
            ) : (
              <div className="success-message">
                <h2>Cảm ơn bạn!</h2>
                <p>Phản hồi của bạn đã được gửi thành công.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback; 