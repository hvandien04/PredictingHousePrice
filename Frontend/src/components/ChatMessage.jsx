import React, { useState, useEffect } from 'react';
import '../styles/ChatMessage.css';
import supportAdmin from '../assets/pngtree-support-admin-line-icon-png-image_9009381.png';

const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const safeText = typeof text === 'string' ? text : '';
    let index = 0;
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (index < safeText.length) {
        setDisplayedText(safeText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

const ChatMessage = ({ 
  predictedPrice, 
  confidenceScore, 
  hasPrediction, 
  typeDefault = "",
  comparisonResults = [],
  bubbleWidth = "400px" // Thêm prop mới để điều chỉnh width
}) => {
  return (
    <div className="chat-message-container">
      <div className="character">
        <img src={supportAdmin} alt="Character" className="character-image" />
      </div>

      {/* Thêm style trực tiếp với max-width từ prop */}
      <div className="speech-bubble" style={{ maxWidth: bubbleWidth }}>
        {hasPrediction ? (
          <>
            <p>
              Giá dự đoán:{' '}
              <TypingEffect text={predictedPrice ? `${predictedPrice} tỷ` : 'Không có dữ liệu'} />
            </p>
            {confidenceScore !== null && (
              <p>
                Tỉ lệ chính xác:{' '}
                <TypingEffect text={confidenceScore ? `${confidenceScore}%` : 'Không có dữ liệu'} />
              </p>
            )}
          </>
        ) : (
          <div className="message-content">
            {typeDefault && <TypingEffect text={typeDefault} />}
            
            {comparisonResults.length > 0 && (
              <div className="comparison-results">
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  {comparisonResults.map((result, index) => (
                    <li key={index}>
                      <TypingEffect text={`${result}`} speed={30} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;