import {parser} from "lezer-clojure"
import {styleTags, tags} from "@lezer/highlight"
import {flatIndent, continuedIndent, indentNodeProp, delimitedIndent, foldNodeProp, foldInside,
        LRLanguage, LanguageSupport} from "@codemirror/language"

/// A language provider based on the [Lezer Clojure](https://github.com/nextjournal/lezer-clojure), extended with
/// highlighting and indentation information.

export const clojureLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({NS: tags.keyword,
                 DefLike: tags.keyword,
                 "Operator/Symbol": tags.keyword,
                 "VarName/Symbol": tags.definition(tags.variableName),
                 Boolean: tags.atom,
                 "DocString/...": tags.emphasis,
                 "Discard!": tags.comment,
                 Number: tags.number,
                 StringContent: tags.string,
                 "\"\\\"\"": tags.string, // need to pass something, that returns " when being parsed as JSON
                 Keyword: tags.atom,
                 Symbol: tags.keyword,
                 "'": tags.keyword, // quote
                 Nil: tags.null,
                 LineComment: tags.lineComment,
                 RegExp: tags.regexp
      }),
      indentNodeProp.add({
      // TODO:
//         IfStatement: continuedIndent({except: /^\s*({|else\b)/}),
//         TryStatement: continuedIndent({except: /^\s*({|catch|finally)\b/}),
//         LabeledStatement: flatIndent,
//         SwitchBlock: context => {
//           let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after)
//           return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit
//         },
//         Block: delimitedIndent({closing: "}"}),
//         BlockComment: () => null,
//         Statement: continuedIndent({except: /^{/})
      }),
      foldNodeProp.add({["Vector Map List"]: foldInside})
    ]
  }),
  languageData: {
    commentTokens: {line: ";;"},
    indentOnInput: /^\s*(?:case |default:|\{|\})$/
  }
})

/// Java language support.
export function clojure() {
  return new LanguageSupport(clojureLanguage)
}
