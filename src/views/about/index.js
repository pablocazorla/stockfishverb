import React from "react";
import View from "components/view";
import stf_logo from "assets/img/stf_logo.svg";

const About = ({ visible, onCancel }) => {
  return (
    <View visible={visible} onClose={onCancel}>
      <div className="view_presentation">
        <div className="presentation-logo">
          <img src={stf_logo} alt="" />
        </div>
        <div className="presentation-title">Stockfish Verbose</div>
        <div className="presentation-text">
          v1.0
          <br />
          by Davicazu
        </div>
      </div>
    </View>
  );
};

export default About;
