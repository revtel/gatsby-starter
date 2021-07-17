function getBool({values, name}) {
  const idx = values.findIndex((v) => v.name === name);
  return idx > -1;
}

function getSingle({values, name}) {
  const opt = values.find((v) => v.name === name);
  return opt?.choice || '';
}

function setBool({setValues, values, name, checked}) {
  const nextValues = [...values];
  if (checked) {
    nextValues.push({name});
  } else {
    const idx = values.findIndex((v) => v.name === name);
    if (idx > -1) {
      nextValues.splice(idx, 1);
    }
  }
  setValues(nextValues);
}

function setSingle({setValues, values, name, choice}) {
  const nextValues = [...values];
  const idx = values.findIndex((v) => v.name === name);
  if (idx === -1) {
    nextValues.push({name, choice});
  } else {
    nextValues[idx] = {name, choice};
  }
  setValues(nextValues);
}

export {getBool, getSingle, setBool, setSingle};
