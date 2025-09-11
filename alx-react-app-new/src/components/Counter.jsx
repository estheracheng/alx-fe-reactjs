import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Initialize state

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <p style={{ fontSize: '24px' }}>Current Count: {count}</p>

      <button
        onClick={() => setCount(count + 1)}
        style={{ margin: '5px', padding: '10px 15px' }}
      >
        Increment
      </button>

      <button
        onClick={() => setCount(count - 1)}
        style={{ margin: '5px', padding: '10px 15px' }}
      >
        Decrement
      </button>

      <button
        onClick={() => setCount(0)}
        style={{ margin: '5px', padding: '10px 15px' }}
      >
        Reset
      </button>
    </div>
  );
}

export default Counter;
