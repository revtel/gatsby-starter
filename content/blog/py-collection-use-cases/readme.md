---
title: Python Collection Use Cases
created: 2021-01-01
---

## collection.deque

When we need a real queue data structure, we might want to use normal list:

```python
li = ['b', 'c', 'd']
li.pop() # get the last
li.insert(0,  'a') # not efficient
```

it's better to use `collection.deque`

```python
from collections import deque

dq = deque(['b', 'c', 'd'])
dq.pop()
dq.appendleft('a')
```

When we need a stack with fixed length, and old items can be ignored

```python
from collections import deque

dq = deque(['a', 'b', 'c'], maxlen=5)
dq.append('d')
dq.append('e')
dq.append('f') # ['b', 'c', 'd', 'e', 'f']
```

## collection.namedtuple

When we want a read-only data structure, with attr access

```python
from collections import namedtuple

Person = namedtuple('Person', 'name age')
p = Person(name='Jordan', age=23)
p.name # 'Jordan
p.age # 23
p.age = 18 # AttributeError
young_jordan = p._replace(age=18) # it's fine
```

When we need to read dict as raw data, and we want to use attr access.

```python
from collections import namedtuple

Person = namedtuple('Person', 'name age')
raw_data = {'name': 'Jordan', 'age': 23}
p = Person(**raw_data)
p.name # 'Jordan
p.age # 23
```

When we need to read lots of positional data as source, such as csv. However, use index to trace field is very error-prone.

```python
from collections import namedtuple

Record = namedtuple('Record', 'id field1 field2 field3 field4 field5')
row = ['001', 1, 2, 3, 4, 5]
r = Record(*row)
r.id # 001
r.field3 # 3
```

When we use positional data as input, but also want to export as dict

```python
from collections import namedtuple

Person = namedtuple('Person', 'name age')
row = ['Jordan', 23]
r = Record(*row)
r._asdict() # {'name': 'Jordan', 'age': 23}
```

