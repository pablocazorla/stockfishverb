import React from "react";
import View from "components/view";
import classnames from "classnames";

const EndView = ({ visible, endType, newGame }) => {
  return (
    <View
      visible={visible}
      footer={[
        {
          text: "New game",
          action: () => {
            newGame();
          },
        },
      ]}
    >
      <div
        className={classnames("end-title", {
          mate: endType === "mate",
          draw: endType === "draw",
        })}
      >
        {endType === "mate" ? "Check Mate!" : "Draw"}
      </div>
    </View>
  );
};

export default EndView;
