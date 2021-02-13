import './App.scss';
import { useLocalStorageState } from './useLocalStorageHook';
import { Rating } from './Rating';
import { AddNewUser } from './AddNewUserForm';

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'lightGrey',
          padding: '10px',
        }}
      >
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
