import React, { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { thColor, Theme, ThemePart } from "../theme"

export const ThemeSwitchContext = React.createContext<{
  theme: Theme
  setThemeType?: Dispatch<SetStateAction<Theme>>
}>({ theme: Theme.DARK })

const ThemeSwitchContainer = styled.div``
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${thColor(ThemePart.BORDER)};
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: ${thColor(ThemePart.PRIMARY)};
    transition: 0.4s;
  }
`
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 38px;
  height: 21px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${Slider} {
      background-color: ${thColor(ThemePart.SECONDARY)};
    }

    &:focus + ${Slider} {
      box-shadow: 0 0 1px ${thColor(ThemePart.SECONDARY)};
    }

    &:checked + ${Slider}:before {
      transform: translateX(18px);
    }
  }
`

const ThemeSwitch = () => (
  <ThemeSwitchContext.Consumer>
    {({ setThemeType, theme }) => (
      <ThemeSwitchContainer>
        <Switch>
          <input
            type="checkbox"
            checked={Theme.DARK === theme}
            onChange={({ target: { checked } }) => {
              if (setThemeType) {
                setThemeType(checked ? Theme.DARK : Theme.LIGHT)
              }
            }}
          />
          <Slider />
        </Switch>
      </ThemeSwitchContainer>
    )}
  </ThemeSwitchContext.Consumer>
)

export default ThemeSwitch
