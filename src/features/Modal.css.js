import styled from "styled-components";
const StyledModal = styled.div`
  position: absolute;
  left: 0;
  top:18%;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 2000;
  overflow-y:auto;
  
  width: ${props => {
    switch (props.size) {
      case "lg":
        return "800";
      default:
        return "480";
    }
  }}px;
  opacity: ${props => {
    switch (props.fadeType) {
      case "in":
        return "1";
      default:
        return "0";
    };
  }};
  transition: ${props => {
    switch (props.fadeType) {
      case "in":
        return `opacity linear 0.25s;`;
      case "out":
        return `opacity linear 0.25s;`;
      default:
        return "";
    }
  }};
  margin: 20px auto;
`;
export default StyledModal;