import React, { PropsWithChildren, useState } from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
import { thColor, Theme, THEME_DEFINITIONS, ThemePart } from "../theme"
import { darken } from "polished"
import { ThemeSwitchContext } from "./theme-switch"

// noinspection JSIgnoredPromiseFromCall
deckDeckGoHighlightElement()

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${thColor(ThemePart.BACKGROUND)};
    color: ${thColor(ThemePart.TEXT, v => darken(0.1, v))};
    
    font-size: 16px;
    line-height: 28px;
    
    padding: 0;
    margin: 0;
    
    font-family: 'Oswald', sans-serif;
  }

  h1,
  h2 {
    color: ${thColor(ThemePart.TEXT)};
  }
  h1 {
    font-size: 26px;
  }
  h2 {
    font-size: 24px;
  }
  p {}
  a {
    color: ${thColor(ThemePart.PRIMARY)};
    
    &:visited {
      color: ${thColor(ThemePart.SECONDARY)};
    }
  }

  blockquote {
    padding: 0 0 0 18px;
    margin: 0 18px 18px -18px;
    font-size: 18px;
    line-height: 22px;
    font-style: italic;
    border-left: 4px solid ${thColor(ThemePart.TEXT, v => darken(0.2, v))};
    opacity: 0.8;
  }

  deckgo-highlight-code {
    margin: 28px 20px 42px;
  }
`

const LayoutContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;

  @media only screen and (max-width: 640px) {
    margin: 0 12px;
    max-width: 640px;
  }

  @media only screen and (max-width: 320px) {
    margin: 0;
    max-width: 320px;
  }
`
const LayoutFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${thColor(ThemePart.BORDER)};
  padding: 30px 0;
  margin: 45px 0 0;
`

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [themeType, setThemeType] = useState(Theme.DARK)

  return (
    <ThemeSwitchContext.Provider
      value={{
        theme: themeType,
        setThemeType,
      }}
    >
      <ThemeSwitchContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={THEME_DEFINITIONS[theme]}>
            <>
              <GlobalStyle />
              <LayoutContainer>
                {children}
                <LayoutFooter>
                  <div>
                    <a
                      href="https://twitter.com/asInMyInitials"
                      target="_blank"
                    >
                      twitter
                    </a>{" "}
                    -{" "}
                    <a href="https://github.com/boxman0617" target="_blank">
                      github
                    </a>
                  </div>
                  <div>
                    Copyright © {new Date().getFullYear()}. All rights reserved.
                  </div>
                </LayoutFooter>
              </LayoutContainer>
            </>
          </ThemeProvider>
        )}
      </ThemeSwitchContext.Consumer>
    </ThemeSwitchContext.Provider>
  )
}

export default Layout
