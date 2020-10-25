import React from "react";
import PropTypes from "prop-types";
import {setFilter} from "../action";
import {connect} from "react-redux";

const Link = ({active, children, onClick}) => {
  if (active) {
    return (
      <b className={"filter selected"}>{children}</b>
    )
  } else {
    return (
      <a href="#" className={"filter not-selected"} onClick={
        (ev) => {
          ev.preventDefault();
          onClick();
        }
      }>
        {children}
      </a>
    );
  }
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  // 子元素是node
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
}

// 第二个参数代表传入的props
const mapStateToProps = (state, ownProps) => {
  return {
    active: state.filter === ownProps.filter
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setFilter(ownProps.filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);