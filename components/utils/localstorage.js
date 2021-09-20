const storage = (name) => {
  let result = "";
  switch (name) {
    case "Email":
      result = window.localStorage.getItem(name);
      break;
    default:
      alert("localStorage type undefined");
      break;
  }
  return result;
};

export default storage;
