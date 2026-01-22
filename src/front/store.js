export const initialStore = () => {
  return {
    url: "https://ideal-space-yodel-q7xjp45rpj4gc496j-3001.app.github.dev",
    token: null,
    username: "",
    secrets: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      return {
        ...store,
        token: action.payload.token,
        username: action.payload.username,
      };

    case "logout":
      return {
        ...store,
        token: null,
        username: null,
      };

    case "set_secrets":
      return { ...store, secrets: action.payload };
  }
}
