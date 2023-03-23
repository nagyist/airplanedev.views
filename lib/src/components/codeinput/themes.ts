/**
 * Adapted from @uiw/codemirror-themes, @uiw/codemirror-theme-dracula, and
 * @uiw/codemirror-theme-github
 */
import {
  HighlightStyle,
  TagStyle,
  syntaxHighlighting,
} from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { StyleSpec } from "style-mod";

export interface CreateThemeOptions {
  /**
   * Theme inheritance. Determines which styles CodeMirror will apply by default.
   */
  theme: "light" | "dark";
  /**
   * Settings to customize the look of the editor, like background, gutter, selection and others.
   */
  settings: Settings;
  /** Syntax highlighting styles. */
  styles: TagStyle[];
}

export interface Settings {
  /** Editor background. */
  background: string;
  /** Default text color. */
  foreground: string;
  /** Caret color. */
  caret?: string;
  /** Selection background. */
  selection?: string;
  /** Selection match background. */
  selectionMatch?: string;
  /** Background of highlighted lines. */
  lineHighlight?: string;
  /** Gutter background. */
  gutterBackground?: string;
  /** Text color inside gutter. */
  gutterForeground?: string;
  /** Text active color inside gutter. */
  gutterActiveForeground?: string;
  /** set editor font */
  fontFamily?: string;
}

export const createTheme = ({
  theme,
  settings,
  styles,
}: CreateThemeOptions) => {
  const themeOptions: Record<string, StyleSpec> = {
    "&": {
      backgroundColor: settings.background,
      backgroundClip: "padding-box",
      color: settings.foreground,
    },
    ".cm-gutters": { borderRight: "none" },
    "&.cm-editor.cm-focused": { outline: "none" },
    "&.cm-editor .cm-scroller": { fontSize: "14px" },
    ".cm-tooltip": { fontSize: "14px" },
  };

  if (settings.fontFamily) {
    themeOptions["&.cm-editor .cm-scroller"]["fontFamily"] =
      settings.fontFamily;
  }
  if (settings.gutterBackground) {
    themeOptions[".cm-gutters"].backgroundColor = settings.gutterBackground;
  }
  if (settings.gutterForeground) {
    themeOptions[".cm-gutters"].color = settings.gutterForeground;
  }

  if (settings.caret) {
    themeOptions[".cm-content"] = {
      caretColor: settings.caret,
    };
    themeOptions[".cm-cursor, .cm-dropCursor"] = {
      borderLeftColor: settings.caret,
    };
  }
  const activeLineGutterStyle: StyleSpec = {};
  if (settings.gutterActiveForeground) {
    activeLineGutterStyle.color = settings.gutterActiveForeground;
  }
  if (settings.lineHighlight) {
    themeOptions[".cm-activeLine"] = {
      backgroundColor: settings.lineHighlight,
    };
    activeLineGutterStyle.backgroundColor = settings.lineHighlight;
  }
  themeOptions[".cm-activeLineGutter"] = activeLineGutterStyle;

  if (settings.selection) {
    themeOptions[
      "&.cm-focused .cm-selectionBackground, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"
    ] = {
      backgroundColor: settings.selection,
    };
  }
  if (settings.selectionMatch) {
    themeOptions["& .cm-selectionMatch"] = {
      backgroundColor: settings.selectionMatch,
    };
  }
  const themeExtension = EditorView.theme(themeOptions, {
    dark: theme === "dark",
  });

  const highlightStyle = HighlightStyle.define(styles);
  const extension = [themeExtension, syntaxHighlighting(highlightStyle)];

  return extension;
};

export const github = createTheme({
  theme: "light",
  settings: {
    background: "#fff",
    foreground: "#24292e",
    selection: "#BBDFFF",
    selectionMatch: "#BBDFFF",
    gutterBackground: "#fff",
    gutterForeground: "#6e7781",
    fontFamily:
      "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
  },
  styles: [
    { tag: [t.comment, t.bracket], color: "#6a737d" },
    { tag: [t.className, t.propertyName], color: "#6f42c1" },
    {
      tag: [t.variableName, t.attributeName, t.number, t.operator],
      color: "#005cc5",
    },
    {
      tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
      color: "#d73a49",
    },
    { tag: [t.string, t.meta, t.regexp], color: "#032f62" },
    { tag: [t.name, t.quote], color: "#22863a" },
    { tag: [t.heading], color: "#24292e", fontWeight: "bold" },
    { tag: [t.emphasis], color: "#24292e", fontStyle: "italic" },
    { tag: [t.deleted], color: "#b31d28", backgroundColor: "ffeef0" },
  ],
});

export const dracula = createTheme({
  theme: "dark",
  settings: {
    background: "#282a36",
    foreground: "#f8f8f2",
    caret: "#f8f8f0",
    selection: "rgba(255, 255, 255, 0.1)",
    selectionMatch: "rgba(255, 255, 255, 0.2)",
    gutterBackground: "#282a36",
    gutterForeground: "#6D8A88",
    lineHighlight: "rgba(255, 255, 255, 0.1)",
    fontFamily:
      "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
  },
  styles: [
    { tag: t.comment, color: "#6272a4" },
    { tag: t.string, color: "#f1fa8c" },
    { tag: t.atom, color: "#bd93f9" },
    { tag: t.meta, color: "#f8f8f2" },
    { tag: [t.keyword, t.operator, t.tagName], color: "#ff79c6" },
    { tag: [t.function(t.propertyName), t.propertyName], color: "#66d9ef" },
    {
      tag: [
        t.definition(t.variableName),
        t.function(t.variableName),
        t.className,
        t.attributeName,
      ],
      color: "#50fa7b",
    },
    { tag: t.atom, color: "#bd93f9" },
  ],
});
