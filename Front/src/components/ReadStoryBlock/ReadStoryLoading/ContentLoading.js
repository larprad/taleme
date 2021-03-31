import React from 'react';

import { Placeholder } from 'semantic-ui-react';

function ContentLoading() {
  return (
    <Placeholder fluid inverted style={{ width: 'clamp(320px, 100%, 1400px)', margin: '0 auto' }}>
      <Placeholder.Image style={{ height: '50vh' }} />
    </Placeholder>
  );
}

export default ContentLoading;
