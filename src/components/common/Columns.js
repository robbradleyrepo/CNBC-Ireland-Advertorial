import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Con = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${props => props.maxWidth};
  margin: 0 auto;
  @media (min-width: ${props => props.mobileBreak + "px"}) {
    flex-direction: row;
  }
`;

export function ColumnContainer(props) {
  return (
    <Con {...props}>
      {props.children.length > 1
        ? props.children.map((child, i) =>
            React.cloneElement(child, {
              mobileBreak: props.mobileBreak,
              key: i
            })
          )
        : React.cloneElement(props.children, {
            mobileBreak: props.mobileBreak
          })}
    </Con>
  );
}

ColumnContainer.defaultProps = {
  mobileBreak: 760
};

ColumnContainer.propTypes = {
  mobileBreak: PropTypes.number,
  children: PropTypes.any.isRequired
};

const Col = styled.div`
  @media (min-width: ${props => props.mobileBreak + "px"}) {
    width: ${props => props.width};
  }
  margin: 0;
`;

export function Column(props) {
  return <Col {...props}>{props.children}</Col>;
}
Column.propTypes = {
  children: PropTypes.any.isRequired
};
