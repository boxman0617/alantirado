export enum Theme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}
export enum ThemeTypes {
  COLOR = "COLOR",
}
export enum ThemePart {
  BACKGROUND = "BACKGROUND",
  TEXT = "TEXT",
  BORDER = "BORDER",
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}
export enum ThemeColorTypes {}

const darkPallet = {
  WHITE: "#FFFFFF",
  GREY: "#595959",
  BLACK: "#1C3041",
  PRIMARY: "#FD74A0",
  SECONDARY: "#8390FA",
}
const lightPallet = {
  WHITE: "#FFFFFF",
  GREY: "#60656F",
  BLACK: "#201D1E",
  PRIMARY: "#FD86AC",
  SECONDARY: "#B1B9FC",
}

interface ThemeDefinitionColor {
  [ThemePart.BACKGROUND]: string
  [ThemePart.TEXT]: string
  [ThemePart.BORDER]: string
  [ThemePart.PRIMARY]: string
  [ThemePart.SECONDARY]: string
}
interface ThemeDefinition {
  [ThemeTypes.COLOR]: ThemeDefinitionColor
  type: Theme
}
export const THEME_DEFINITIONS: {
  [Theme.DARK]: ThemeDefinition
  [Theme.LIGHT]: ThemeDefinition
} = {
  [Theme.DARK]: {
    type: Theme.DARK,
    [ThemeTypes.COLOR]: {
      [ThemePart.BACKGROUND]: darkPallet.BLACK,
      [ThemePart.TEXT]: darkPallet.WHITE,
      [ThemePart.BORDER]: darkPallet.GREY,
      [ThemePart.PRIMARY]: darkPallet.PRIMARY,
      [ThemePart.SECONDARY]: darkPallet.SECONDARY,
    },
  },
  [Theme.LIGHT]: {
    type: Theme.LIGHT,
    [ThemeTypes.COLOR]: {
      [ThemePart.BACKGROUND]: lightPallet.WHITE,
      [ThemePart.TEXT]: lightPallet.BLACK,
      [ThemePart.BORDER]: lightPallet.GREY,
      [ThemePart.PRIMARY]: lightPallet.PRIMARY,
      [ThemePart.SECONDARY]: lightPallet.SECONDARY,
    },
  },
}

export const th = (type: ThemeTypes, part: ThemePart) => ({
  theme,
}: {
  theme: ThemeDefinition
}) => theme[type][part]
export const thColor = (
  colorPart: keyof ThemeDefinitionColor,
  modifier?: (value: string, theme: ThemeDefinition) => string
) => {
  const thCb = th(ThemeTypes.COLOR, colorPart)
  return ({ theme }: { theme: ThemeDefinition }) => {
    if (modifier) return modifier(thCb({ theme }), theme)
    return thCb({ theme })
  }
}
