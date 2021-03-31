import React from 'react';

import { Placeholder } from 'semantic-ui-react';

function HeaderLoading() {
  return (
    <Placeholder fluid inverted style={{ width: 'clamp(320px, 100%,  1400px)', margin: '0 auto' }}>
      <Placeholder.Header>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
    </Placeholder>
  );
}

export default HeaderLoading;
