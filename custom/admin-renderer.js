import React from 'react';

function renderCustomSection(props) {
  const {name, section, context} = props;

  if (name === 'AdminForm') {
    return (
      <div
        style={{
          padding: 15,
          margin: '10px 0',
          borderRadius: 8,
          maxWidth: 800,
          backgroundColor: '#ccc',
        }}>
        <h2>{`Custom Section ${section}`}</h2>
      </div>
    );
  }
  return null;
}

export {renderCustomSection};
