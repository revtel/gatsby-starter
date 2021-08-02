import React from 'react';

function renderCustomSection(props) {
  const {name, type, context} = props;

  if (type === 'form' && name === 'AdminForm') {
    return (
      <div
        style={{
          padding: 15,
          margin: '10px 0',
          borderRadius: 8,
          maxWidth: 800,
          backgroundColor: '#ccc',
        }}>
        <h2>{`custom ${context.position} section`}</h2>
      </div>
    );
  }
  return null;
}

function renderCustomCol(props) {
  const {col, record} = props;
  return null;
}

export {renderCustomSection, renderCustomCol};
