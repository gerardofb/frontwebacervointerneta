import React, { Component } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisplay, faXmark } from "@fortawesome/free-solid-svg-icons";
// styled
import StyledModalAlt from "./ModalAlt.css";
const modalRoot = document.getElementById("modal-root");
class ModalAlt extends Component {
  static defaultProps = {
    id: "",
    modalClass: "",
    modalSize: "md"
  };
  static propTypes = {
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    modalClass: PropTypes.string,
    modalSize: PropTypes.string
  };
  state = { fadeType: null };
  background = React.createRef();
  componentDidMount() {
    window.addEventListener("keydown", this.onEscKeyDown, false);
    //setTimeout(() => this.setState({ fadeType: "in" }), 0);
    //console.log('actualizando montaje');
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.setState({ fadeType: "in" });
    }
    else if(!this.props.isOpen && prevProps.isOpen){
      this.setState({fadeType:'out'});
    }
    //console.log('actualizando componente ', this.props.isOpen)
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscKeyDown, false);
  }
  transitionEnd = e => {
    if (e.propertyName !== "opacity" || this.state.fadeType === "in") return;
    if (this.state.fadeType === "out") {
      this.props.onClose();
    }
  };
  onEscKeyDown = e => {
    if (e.key !== "Escape") return;
    this.setState({ fadeType: "out" });
  };
  handleClick = e => {
    //console.log('cerrando modal');
    e.preventDefault();
    this.setState({ fadeType: "out" });
  };
  render() {
    return ReactDom.createPortal(
      <><StyledModalAlt
        id={this.props.id}
        className={`wrapper ${this.props.modalClass}`}
        role="dialog"
        size={this.props.modalSize}
        onTransitionEnd={this.transitionEnd}
        fadeType={this.state.fadeType}
      >
        <div className="box-dialog">
          <div className="box-header">
            <button onClick={this.handleClick} className="close">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h4 className="box-title">{this.props.title}</h4>
          </div>
          <div className="box-content">{this.props.children}</div>
          <div className="box-footer">
          </div>
        </div>

      </StyledModalAlt>
        </>,
      modalRoot
    );
  }
}
export default ModalAlt;