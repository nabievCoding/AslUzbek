import React, { useState, useEffect } from 'react';
import './editWord.css';

export const EditWord = ({ word, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    asluzb: '',
    zamon: '',
    izoh: ''
  });

  useEffect(() => {
    if (word) {
      setFormData({
        asluzb: word.asluzb || '',
        zamon: word.zamon || '',
        izoh: word.izoh || ''
      });
    }
  }, [word]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form ma\'lumotlari:', formData);
    onSave(formData);
  };

  return (
    <div className="edit-word-container">
      <div className="edit-word-card">
        <h2 className="edit-word-title">So'zni Tahrirlash</h2>
        
        <form onSubmit={handleSubmit} className="edit-word-form">
          <div className="input-group">
            <label htmlFor="asluzb" className="input-label">Asl so'z</label>
            <input
              type="text"
              id="asluzb"
              name="asluzb"
              placeholder="Als o'zbek"
              value={formData.asluzb}
              onChange={handleChange}
              className="edit-input"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="zamon" className="input-label">Kelgindi versiya</label>
            <input
              type="text"
              id="zamon"
              name="zamon"
              placeholder="Kelgindi"
              value={formData.zamon}
              onChange={handleChange}
              className="edit-input"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="izoh" className="input-label">Izoh</label>
            <input
              type="text"
              id="izoh"
              name="izoh"
              placeholder="izoh"
              value={formData.izoh}
              onChange={handleChange}
              className="edit-input"
            />
          </div>
          
          <div className="button-group">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Bekor qilish
            </button>
            <button type="submit" className="submit-btn">
              O'zgartirish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWord;