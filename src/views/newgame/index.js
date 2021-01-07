import React, { useState } from "react";
import classnames from "classnames";
import View from "components/view";
import Piece from "components/piece";

const NewGame = ({ visible, actionStartNewGame, onCancel }) => {
  const [humanColor, setHumanColor] = useState("white");
  const [depth, setDepth] = useState("15");

  return (
    <View
      visible={visible}
      onClose={onCancel}
      footer={[
        {
          text: "Start Game",
          action: () => {
            if (actionStartNewGame) actionStartNewGame({ humanColor, depth });
          },
        },
      ]}
    >
      <div className="view__new-game">
        <div className="view-title">New Game</div>
        <div className="color-selector">
          <div className="title-sec">Play with:</div>
          <div className="color-selector-row">
            <div
              className={classnames("c-selector white", {
                selected: humanColor === "white",
              })}
              onClick={() => {
                setHumanColor("white");
              }}
            >
              <Piece color="white" />
              <div className="title">White</div>
            </div>
            <div
              className={classnames("c-selector black", {
                selected: humanColor === "black",
              })}
              onClick={() => {
                setHumanColor("black");
              }}
            >
              <Piece color="black" />
              <div className="title">Black</div>
            </div>
          </div>
        </div>
        <div className="depth-selector">
          <div className="title-sec">Difficulty:</div>
          <div className="depth-selector-num">
            <div className="depth-selector-num_row">
              <div className="depth-selector-num_col wide">
                <input
                  type="range"
                  value={depth}
                  min="5"
                  max="25"
                  onChange={(e) => {
                    setDepth(e.target.value);
                  }}
                />
              </div>
              <div className="depth-selector-num_col">
                <div className="num_result">{depth}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default NewGame;
