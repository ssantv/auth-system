export const initialStore = () => {
  return {
    url: "https://stunning-palm-tree-wvr75prrpv63v67q-3001.app.github.dev",
    token: null,
    username: "",
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
  }
}
