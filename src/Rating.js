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