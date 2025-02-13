import React from 'react';
import StarRating from './StarRating';


const App = () => {
    return (
        <div>
      <h1 className='heading'>Star Rating Component</h1>
      <StarRating totalStars={5} /> 
    </div>
    );
};

export default App;
