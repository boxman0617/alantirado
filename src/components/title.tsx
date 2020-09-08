import React from "react"
import styled from "styled-components"
import ThemeSwitch from "./theme-switch"
import { thColor, ThemePart } from "../theme"

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0 30px;
`
const Name = styled.a`
  font-family: "Anton", sans-serif;
  font-size: 20px;
  font-weight: bold;

  text-decoration: none;

  color: ${thColor(ThemePart.PRIMARY)};
  &:visited {
    color: ${thColor(ThemePart.PRIMARY)};
  }
`

const Title = () => (
  <TitleContainer>
    <Name href="/">alantirado</Name>
    <ThemeSwitch />
  </TitleContainer>
)

export default Title
