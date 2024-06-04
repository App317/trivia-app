//Custom sort to allow the correct answer for a question to shuffle its posistion
export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
