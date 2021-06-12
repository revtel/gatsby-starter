---
title: Class Free JavaScript
created: 2021-03-03
---

Eliminate the OOP with `class`, by using a more functional approach.

> The whole idea is from the book `How JavaScript Works` by `Douglas Crockford`, chapter 18.

```javascript
function Person(spec={}) {
  const {name} = spec;

  function sayHi() {
    console.log(`My name is ${name}`);
  }

  function eat(food) {
    console.log(`${name} eats`);
  }

  function drink() {
    console.log(`${name} drinks`);
  }

  return Object.freeze({
    name,
    sayHi,
    eat,
    drink,
  });
}

jack = Person({name: 'Jack'});
jack.sayHi();
jack.eat();
jack.drink();

function Developer(spec={}) {
  const base = Person(spec);

  // extends
  function code() {
    console.log(`${base.name} writes some codes`);
  }

  // override
  function drink() {
    console.log(`${base.name} only needs coffee`);
  }

  // delegate
  function eat() {
    base.eat();
    console.log('but still wants some coffee');
  }

  return Object.freeze({
    ...base, // reuse
    code, 
    drink,
    eat,
  });
}

richie = Developer({ name: 'Richie' });
richie.sayHi();
richie.code();
richie.drink();
richie.eat();
```
