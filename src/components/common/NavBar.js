import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import burger from "./assets/menu.svg";
import PropTypes from "prop-types";

const NabVarWrapper = styled.div`
  background: black;
  color: white;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  z-index: 100;
  position: ${props => (props.fixed ? "fixed" : "relative")};
`;

const NavBarHolder = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${props => props.maxWidth};
  margin: 0 auto;
  flex-direction: column;
  align-items: baseline;

  @media (min-width: ${props => props.breakpoint}px) {
    flex-direction: row;
    align-items: center;
  }
`;

export function NavBar(props) {
  const refContainer = useRef();
  const adjustPostition = () => {
    if (document.getElementById("GlobalNavigation")) {
      let paidoffset = 0;
      if (document.querySelector(".nad-asset-banner")) {
        paidoffset = document.querySelector(".nad-asset-banner").clientHeight;
      }
      refContainer.current.style.top =
        document.getElementById("GlobalNavigation").clientHeight +
        paidoffset +
        "px";
    } else if (document.getElementById("GlobalNavigation-Persistent")) {
      refContainer.current.style.top =
        document.getElementById("GlobalNavigation-Persistent").clientHeight +
        "px";
    } else {
      refContainer.current.style.top = 0 + "px";
    }
  };
  useEffect(() => {
    if (props.fixed) {
      const positionHandler = () => {
        adjustPostition();
        setTimeout(adjustPostition, 501); //Delay fix for carbon
      };
      document.addEventListener("scroll", positionHandler);
      document.addEventListener("resize", positionHandler);
      adjustPostition();
      return () => {
        document.removeEventListener("scroll", positionHandler);
        document.removeEventListener("resize", positionHandler);
      };
    }
  }, []);

  return (
    <div style={{ height: props.fixed ? props.offset : "auto" }}>
      <NabVarWrapper
        ref={refContainer}
        fixed={props.fixed}
        className={props.className}
      >
        <NavBarHolder breakpoint={props.breakpoint} maxWidth={props.maxWidth}>
          {props.children.length > 1
            ? props.children.map((child, i) =>
                React.cloneElement(child, {
                  breakpoint: props.breakpoint,
                  key: i
                })
              )
            : React.cloneElement(props.children, {
                breakpoint: props.breakpoint
              })}
        </NavBarHolder>
      </NabVarWrapper>
    </div>
  );
}
NavBar.propTypes = {
  children: PropTypes.any,
  breakpoint: PropTypes.number,
  maxWidth: PropTypes.string,
  className: PropTypes.string,
  fixed: PropTypes.bool,
  offset: PropTypes.number
};

NavBar.defaultProps = {
  maxWidth: "1290px",
  className: "",
  breakpoint: 760,
  fixed: false,
  offset: 68
};

const Toggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  position: absolute;
  right: 1rem;
  top: 1rem;
  @media (max-width: ${props => props.breakpoint}px) {
    display: block;
  }
`;
const BurgerMenu = styled.span`
  display: block;
  width: 40px;
  height: 40px;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: block;
    justify-content: space-around;
    min-width: 300px;
    margin-top: 1rem;
    margin-left: 1rem;
    @media (min-width: ${props => props.breakpoint}px) {
      margin-top: 0;
      margin-left: 0;
      display: flex;
    }
    li {
      display: block;
      padding: 1rem 0;
      @media (min-width: ${props => props.breakpoint}px) {
        display: inline-block;
        padding: 0;
      }
      a {
        color: white;
        text-decoration: none;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 1rem;
        display: block;
        line-height: 2rem;
        @media (min-width: ${props => props.breakpoint}px) {
          font-size: 0.8rem;
          line-height: 1rem;
        }
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;
const MenuHolder = styled.div`
  width: 100%;
  @media (min-width: ${props => props.breakpoint}px) {
    width: auto;
  }
`;

const UL = styled.ul`
  @media (max-width: ${props => props.breakpoint}px) {
    display: ${props => (props.show ? "block" : "none")} !important;
  }
`;

export function Menu(props) {
  const [show, setShow] = useState(false);
  return (
    <MenuHolder breakpoint={props.breakpoint} className={props.className}>
      <Toggle
        breakpoint={props.breakpoint}
        onClick={() => {
          setShow(!show);
        }}
      >
        <BurgerMenu dangerouslySetInnerHTML={{ __html: burger }} />
      </Toggle>
      <Nav breakpoint={props.breakpoint} className={props.className}>
        <UL show={show} breakpoint={props.breakpoint}>
          {props.data.map((menu, i) => (
            <li key={i}>
              <a
                {...{
                  ...menu.link,
                  onClick: () => {
                    menu.link.onClick();
                    setShow(false);
                  }
                }}
              >
                {menu.label}
              </a>
            </li>
          ))}
        </UL>
      </Nav>
    </MenuHolder>
  );
}
Menu.propTypes = {
  breakpoint: PropTypes.number,
  className: PropTypes.string,
  data: PropTypes.array
};
Menu.defaultProps = {
  className: ""
};
export function NavBarItem(props) {
  return <div>{props.children}</div>;
}
NavBarItem.propTypes = {
  children: PropTypes.any
};
