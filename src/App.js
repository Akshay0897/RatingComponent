import { useState } from 'react';
import './App.scss';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { useLocalStorageState } from './useLocalStorageHook';

function AddNewUser(props) {
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

export const Rating = ({ star = 1, name = '', setRating, style = {} }) => {
  var stars = [];

  for (let i = 1; i < 6; i++) {
    var klass = 'star-rating__star';

    if (star >= i && star != null) {
      klass += ' is-selected';
    }

    stars.push(
      <label className={klass} onClick={() => setRating(i, name)}>
        ★
      </label>
    );
  }

  return (
    <div className="star-rating" {...style}>
      {stars} {name}
    </div>
  );
};

export default function App() {
  const [sort, setSort] = useLocalStorageState('direction', 'desc');

  const [userData, setUserData] = useLocalStorageState('userdata', [
    {
      name: 'messi',
      rating: 5,
    },
    {
      name: 'CR7',
      rating: 4,
    },
    {
      name: 'Kohli',
      rating: 5,
    },
    {
      name: 'akshay',
      rating: 3,
    },
  ]);

  //we should use some good naming convention here instead of name
  //we can say like key ?
  const handleRatingChange = (rating, name) => {
    let tempData = [...userData];
    tempData = tempData.map((user) => {
      if (user.name === name) {
        return { ...user, rating: rating };
      } else {
        return user;
      }
    });

    setUserData([...tempData]);
    sortData(sort, tempData);
  };

  const addUserData = (userName, rating) => {
    const newUserDataList = [...userData, { name: userName, rating }];
    setUserData(newUserDataList);
    sortData(sort, newUserDataList);
  };

  const sortData = (direction = sort, data) => {
    const tempData = !data ? [...userData] : [...data];
    if (direction === 'asc') {
      tempData.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
    } else {
      tempData.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }
    setUserData([...tempData]);
  };

  const handleChange = (e = null) => {
    const sortBy = e?.target?.value;
    setSort(sortBy);
    sortData(sortBy);
  };

  return (
    <div className="App">
      <h2>Star rating component</h2>
      <div style={{ display: 'flex', flexDirection: 'row', backgroundColor:"lightGrey", padding: "10px" }}>
        <div>sort by: </div>
        <div>
          <label>
            <input
              type="radio"
              value="asc"
              checked={sort === 'asc'}
              onChange={handleChange}
            />
            asc
          </label>

          <label>
            <input
              type="radio"
              value="desc"
              checked={sort === 'desc'}
              onChange={handleChange}
            />
            desc
          </label>
        </div>

        <AddNewUser
          additionalStyles={{ marginLeft: '100px' }}
          onSave={addUserData}
          sortFn={sortData}
        />
      </div>

      {userData.map((userData, index) => {
        return (
          <Rating
            key={index}
            star={userData.rating}
            name={userData.name}
            setRating={handleRatingChange}
          />
        );
      })}
    </div>
  );
}
