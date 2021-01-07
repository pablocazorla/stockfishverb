import React from "react";
import img_white_pawn from "assets/img/chesspieces/wP.png";
import img_black_pawn from "assets/img/chesspieces/bP.png";
import img_white_knight from "assets/img/chesspieces/wN.png";
import img_black_knight from "assets/img/chesspieces/bN.png";
import img_white_bishop from "assets/img/chesspieces/wB.png";
import img_black_bishop from "assets/img/chesspieces/bB.png";
import img_white_rook from "assets/img/chesspieces/wR.png";
import img_black_rook from "assets/img/chesspieces/bR.png";
import img_white_queen from "assets/img/chesspieces/wQ.png";
import img_black_queen from "assets/img/chesspieces/bQ.png";
import img_white_king from "assets/img/chesspieces/wK.png";
import img_black_king from "assets/img/chesspieces/bK.png";

const imgs = {
  P: {
    white: img_white_pawn,
    black: img_black_pawn,
  },
  N: {
    white: img_white_knight,
    black: img_black_knight,
  },
  B: {
    white: img_white_bishop,
    black: img_black_bishop,
  },
  R: {
    white: img_white_rook,
    black: img_black_rook,
  },
  Q: {
    white: img_white_queen,
    black: img_black_queen,
  },
  K: {
    white: img_white_king,
    black: img_black_king,
  },
};

const Piece = ({ piece = "K", className, color = "white" }) => {
  return <img src={imgs[piece][color]} alt="Piece" className={className} />;
};

export default Piece;
