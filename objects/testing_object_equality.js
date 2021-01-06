// Rules:
//   Input: 2 objects with 0 or more key value pairs
//   Output: A boolean depending on whether or not those objects share the same key value pairs.

//   Considerations:
//     - Objects can be empty
//     - 2 empty objects should return true
//     - If an object has 2 matching keys with different values, return false
//     - A key set to explicitly reference undefined should not match a non-existent property that return undefined when referenced.
//     - If any key or value is different across the two objects, return false

//   Steps:
//     - Examine each pair of keys and values
//     - If any key value pair doesn't match return false
//     - If either object has more or fewer properties than the other, return false
//     - If all pairs match, return true

// Data Structures:
//   - Objects as inputs
//   - Arrays of keys and/or values to make for more easy comparison.
//   - Strings as the keys of the input objects
  
// Algorithm;
//   - Get the keys of both objects
//   - If key arrays aren't the same size, return false
//   - Sort the key arrays
//   - Iterate over the keys by index (for loop)
//     - If keys at current index don't  match or objects[key] don't match return false
//   - If we make it to the end, return true

function objectsEqual(ob1, ob2) {
  let ob1Keys = Object.keys(ob1).sort();
  let ob2Keys = Object.keys(ob2).sort();
  let ob1Values = Object.values(ob1).sort();
  let ob2Values = Object.values(ob2).sort();

  if (ob1Keys.length !== ob2Keys.length) {
    return false;
  }

  ob1Keys.sort();
  ob2Keys.sort();

  if (compareKeys(ob1Keys, ob2Keys) && compareValues(ob1Values, ob2Values)) {
    return true;
  } 

  return false;
}

function compareKeys(keys1, keys2) {
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) {
      return false;
    }
  }
  
  return true;
}

function compareValues(values1, values2) {
  for (let i = 0; i < values1.length; i++) {
    if (typeof values1[i] === 'object' && typeof values2[i] === 'object') {
      if (!objectsEqual(values1[i], values2[i])) {
        return false;
      } 
    } else if (values1[i] !== values2[i]) {
      return false;
    }
  }
  
  return true;
}

// Test Cases:
console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo'}));  // false
console.log(objectsEqual({a: 'foo', b: 'cheese'}, {a: 'foo', b: 'crackers'}));  // false
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: undefined}));  // false
console.log(objectsEqual({b: 'foo', a: undefined}, {c: 'foo', a: undefined}));  // false
console.log(objectsEqual({b: 'foo', a: {one: 1, two: {hi: 'bye', ar: [1,2,3]}}}, {b: 'foo', a: {one: 1, two: {hi: 'bye', ar: [1,2,3]}}}));  // true


