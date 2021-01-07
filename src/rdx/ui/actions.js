export const actName = {
  SET_UI: "SET_UI",
};

const Actions = {
  setUI: (ui) => {
    return (dispatch) => {
      dispatch({
        type: actName.SET_UI,
        ui,
      });
    };
  },
};

export default Actions;
