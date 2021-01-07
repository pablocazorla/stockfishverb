import React from "react";
import View from "components/view";
import Board from "components/board";

const ViewBoard = ({ visible, fen, humanColor, onCancel, setBoard }) => {
  return (
    <View visible={visible} onClose={onCancel}>
      <div className="view_board">
        <Board
          fen={fen}
          humanColor={humanColor}
          visible={visible}
          onCancel={onCancel}
          setBoard={setBoard}
        />
      </div>
    </View>
  );
};

export default ViewBoard;
