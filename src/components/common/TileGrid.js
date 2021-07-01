import React from "react";
import styled from "styled-components";
import PropType from "prop-types";

const breakpoints = { xs: 320, sm: 760, md: 960, lg: 1520, xl: 1920 };
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: ${props => props.maxWidth};
  margin: 0 auto;
`;

export function TileGrid(props) {
  return (
    <Grid {...props}>
      {props.children.map((child, i) =>
        React.cloneElement(child, {
          xsCols: props.xsCols,
          smCols: props.smCols,
          mdCols: props.mdCols,
          lgCols: props.lgCols,
          xlCols: props.xlCols,
          margin: props.margin,
          key: i
        })
      )}
    </Grid>
  );
}

TileGrid.propTypes = {
  xsCols: PropType.number.isRequired,
  smCols: PropType.number.isRequired,
  mdCols: PropType.number.isRequired,
  lgCols: PropType.number.isRequired,
  xlCols: PropType.number.isRequired,
  margin: PropType.number.isRequired,
  children: PropType.array.isRequired
};

const TileDiv = styled.div`
  width: ${props => 100 / props.xsCols + "%"};
  margin: ${props => props.margin + "px"};
  @media (min-width: ${breakpoints.xs}px) {
    width: ${props =>
      "calc(" + 100 / props.smCols + "% - " + props.margin * 2 + "px)"};
  }
  @media (min-width: ${breakpoints.sm}px) {
    width: ${props =>
      "calc(" + 100 / props.mdCols + "% - " + props.margin * 2 + "px)"};
  }
  @media (min-width: ${breakpoints.md}px) {
    width: ${props =>
      "calc(" + 100 / props.lgCols + "% - " + props.margin * 2 + "px)"};
  }
  @media (min-width: ${breakpoints.lg}px) {
    width: ${props =>
      "calc(" + 100 / props.xlCols + "% - " + props.margin * 2 + "px)"};
  }
`;

export function Tile(props) {
  return <TileDiv {...props}>{props.children}</TileDiv>;
}

Tile.propTypes = {
  children: PropType.any
};
