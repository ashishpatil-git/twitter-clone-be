export const generateID = () => {
  return new Date(Date.now()).getTime() + Math.floor(Math.random() * 9000 + 10);
};
