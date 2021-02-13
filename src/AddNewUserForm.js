import React, { useState } from 'react';
import '@reach/dialog/styles.css';
import { Dialog } from '@reach/dialog';
import { Rating } from './Rating';

export function AddNewUser(props) {
  const [showDialog, setShowDialog] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(1);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const handleSave = () => {
    if (userName !== '' && userName !== null && userRating !== 0) {
      props.onSave(userName, userRating);
      setUserName('');
      setUserRating(0);
      close();
    } else {
      alert('Please provide username and rating both');
    }
  };

  return (
    <div style={props.additionalStyles}>
      <button onClick={open}>Add New</button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <h2>Add User</h2>
        <label htmlFor="userName">userName: </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.currentTarget.value)}
        />
        <div
          style={{ display: 'flex', direction: 'column', marginTop: '20px' }}
        >
          <p style={{ marginTop: '6px' }}>rating</p>
          <Rating star={userRating} setRating={setUserRating} />
        </div>
        <button onClick={close}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </Dialog>
    </div>
  );
}
