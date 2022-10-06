import './style.css'
import {EditorView, basicSetup, minimalSetup} from 'codemirror'
import {clojure, clojureLanguage} from './../src/clojure.ts'

// test published package, add "lang-clojure": "0.1.0-alpha.1" to package.json
//import {clojure, clojureLanguage} from 'lang-clojure'

console.log(clojure, clojureLanguage)

const doc = `(ns foo.bar
  "this is a nice ns"
  (:require [cloure.string :as str]))

['a
 'b
 'c]

{:a 1
 :b 2
 :c [3 4]}

;; # TODO:
;; - [x] basic syntax
;; - [x] syntax highlighting
;; - [ ] fold
;; - [ ] indent

#_ #readme 123

#readme 123

(defn hello
  "Some docstring"
  [a b c]
  (cond
    a b
    true false
    :always 2
    'else nil)`


new EditorView({
  doc: doc,
  extensions: [basicSetup, clojure()],
  parent: document.querySelector('#app')
}).focus()
