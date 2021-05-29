import React from 'react';

function renderCustomSection(props) {
  const {route, sectionId, params} = props;

  if (route === '/products') {
    return (
      <section
        style={{padding: 40, backgroundColor: '#ccc', border: '3px solid red'}}>
        <h2 style={{textAlign: 'center'}}>{`CustomSection ${sectionId}`}</h2>
      </section>
    );
  }

  return null;
}

export {renderCustomSection};
