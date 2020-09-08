import React, { useContext } from "react"
import styled from "styled-components"
import { thColor, Theme, ThemePart } from "../theme"
import { darken, lighten } from "polished"
import { ThemeSwitchContext } from "./theme-switch"

const thColorIntro = thColor(ThemePart.BACKGROUND, (v, { type }) =>
  type === Theme.DARK ? lighten(0.1, v) : darken(0.1, v)
)
const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  position: relative;
  padding: 25px;
  background-color: ${thColorIntro};

  h1 {
    padding: 0;
    margin: 0 0 30px;
    font-size: 58px;
    line-height: 60px;
  }
  h3 {
    padding: 0;
    margin: 0;
    font-size: 22px;
    color: ${thColor(ThemePart.TEXT, (v, { type }) =>
      type === Theme.DARK ? darken(0.2, v) : lighten(0.2, v)
    )};
  }
`

const SunOrMoonContainer = styled.div``
const wh = (size: string) =>
  ["width", "height"].reduce((acc, item) => {
    return `${acc}${item}: ${size};\n`
  }, "")
const CelestialBody = styled.div`
  border-radius: 50%;
  position: absolute;
`
const Sun = styled(CelestialBody)`
  ${wh("90px")};
  top: -28px;
  right: -10px;
  background-color: #fee440;

  mask-image: radial-gradient(rgba(0, 0, 0, 1) 40%, transparent 65%);

  &:after,
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center;
    border-radius: 50%;
    background: radial-gradient(
      #fee440,
      #ffa500 27%,
      transparent calc(27% + 3px) 100%
    );
  }
  &:before {
    background: repeating-conic-gradient(
      from 0deg,
      #fee440 0deg 20deg,
      transparent 20deg 40deg
    );
    animation: rotate 720s linear, scale 3s linear infinite;
  }
  &:after {
    background: radial-gradient(
        #fee440,
        #ffa500 27%,
        transparent calc(27% + 3px) 100%
      ),
      radial-gradient(#ffd700, transparent 70%),
      repeating-conic-gradient(
        from 0deg,
        #ffd700 0deg 5deg,
        transparent 5deg 10deg
      );
    transform: rotate(15deg);
    animation: rotate 360s linear;
  }
`
const Moon = styled(CelestialBody)`
  ${wh("50px")};
  top: -60px;
  right: 80px;
  background-color: ${thColor(ThemePart.BACKGROUND)};
  box-shadow: 16px 4px 0 0 ${thColor(ThemePart.TEXT)};
`
const SunOrMoon = () => {
  const { theme } = useContext(ThemeSwitchContext)
  return (
    <SunOrMoonContainer>
      {theme === Theme.DARK ? <Moon /> : <Sun />}
    </SunOrMoonContainer>
  )
}

const Intro = () => (
  <IntroContainer>
    <SunOrMoon />
    <h1>Hi, I'm Alan Tirado.</h1>
    <h3>You have reached my plane of existence.</h3>
  </IntroContainer>
)

export default Intro
