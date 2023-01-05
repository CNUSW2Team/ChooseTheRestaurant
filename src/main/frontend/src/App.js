import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [store, list] = useState('')

  useEffect(() => {
    axios.get('/store/list')
        .then(response => list(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
      <div>
          <h1>Stores</h1>
          {<textarea rows={7} cols={20} value={JSON.stringify(store, null, 2)} readOnly={true} />}
      </div>
  );
}

export default App;