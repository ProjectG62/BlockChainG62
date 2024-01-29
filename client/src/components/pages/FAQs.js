// src/components/pages/FAQs.js

import React, { useState } from 'react';
import './FAQs.css';

const FAQs = () => {
  const faqsData = [
    { question: 'What is a CryptoEstate?', answer: 'A blockchain-based real estate platform leverages blockchain technology to facilitate secure, transparent, and efficient property transactions. It uses a decentralized and tamper-resistant ledger to record and verify real estate transactions.' },
    { question: 'How does blockchain enhance security in real estate transactions?', answer: 'Blockchain ensures security by employing cryptographic principles and decentralization. Transactions are recorded in blocks, and once added to the blockchain, they are extremely difficult to alter, providing a high level of security and transparency.' },
    { question: 'How does blockchain impact property ownership and title transfer?', answer: 'Blockchain simplifies the process of transferring property ownership by providing a transparent and immutable record of ownership history. This can reduce the risk of title disputes and streamline the overall transfer process.' },
    { question: 'How do users add funds to their MetaMask wallet?', answer: 'Users can add funds to their MetaMask wallet by purchasing Ethereum from a cryptocurrency exchange or receiving transfers from others. MetaMask provides an address for receiving funds.' },
    { question: 'Why do users have to make two transactions to buy a property?', answer: 'One transaction involves making a payment to ThirdWeb to facilitate the transfer of ownership while the second transaction entails transferring the corresponding amount to the owner.'},
    { question: 'Why do the users have to make a payment for liking a property?', answer: 'To ensure transparency, all user activities are recorded on the blockchain network. However, adding these events to the blockchain requires payment of gas fees.'},
    //{ question: '', answer: '' },

    // Add more FAQs as needed
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <ul className="faq-list">
        {faqsData.map((faq, index) => (
          <li key={index} className="faq-item">
            <div className="faq-question" onClick={() => handleToggle(index)}>
              <strong className="faq-question-text">{faq.question}</strong>
              <span className={`arrow ${openIndex === index ? 'open' : ''}`}>&#9660;</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQs;
