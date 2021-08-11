import React from 'react';

function renderCustomSection(props) {
  const {path, type, context} = props;

  if (type === 'form' && path === '/admin/products') {
    const {
      position,
      instance,
      values,
      setValues,
      extValues,
      setExtValues,
    } = context;

    if (instance) {
      return (
        <div
          style={{
            padding: 15,
            margin: '10px 0',
            borderRadius: 8,
            maxWidth: 800,
            backgroundColor: '#ccc',
          }}>
          <h2>{`${values.name || '---'} ${position}`}</h2>
        </div>
      );
    }
  }

  if (type === 'list' && path === '/admin/products') {
    return (
      <div
        style={{
          padding: 15,
          margin: '10px 0',
          borderRadius: 8,
          maxWidth: 800,
          backgroundColor: '#ccc',
        }}>
        <h2>Custom Area</h2>
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
