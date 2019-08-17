# resource-react-hook

This project provides a hook for React component to use a [resource](https://www.npmjs.com/package/resourcex).

```bash
npm install --save resource-react-hook
```

## Example

```javascript
// api.js
export async function getProfile() {
  return { uid: 10086, name: 'ResouceX' };
}

export async function setName(name) {
  return { success: true };
}

// resources.js
import { Resource } from 'resourcex';
import { getProfile, setName } from './api';

export const Profile = Resource(
  { uid: 0, name: '', version: 0 },
  {
    async get() {
      const profile = await getProfile();
      return { ...profile, version: 1 };
    },
    increaseVersion({ version }) {
      return { version: version + 1 };
    },
    async setName(_, name) {
      const { success } = await setName(name);
      if (success) return { name };
      else throw Error('update-failed');
    },
  },
);

// main.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import useResource from 'resource-react-hook';
import { Profile } from '../resources';

const App = () => {
  const profile$ = useResource(Profile);

  // on creation do a round of fetch
  useEffect(() => {
    Profile.get();
  }, []);

  return (
    <div>
      <h1>Hello, {profile$.name}!</h1>
      <h2>
        {profile$.uid} called {profile$.version} times
      </h2>
      <button onClick={() => Profile.setName('New Name')}>Set New Name</button>
      <button onClick={Profile.increaseVersion}>Bump Version</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
```
