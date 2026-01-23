export const initialStore = () => {
  return {
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
