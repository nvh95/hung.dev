const getRandomElement = <T>(array: Array<T>) =>
  array[Math.floor(Math.random() * array.length)];

export default getRandomElement;
