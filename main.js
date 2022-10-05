import './style.css'
import {EditorView, basicSetup, minimalSetup} from 'codemirror'
import {clojure} from './src/clojure.ts'

new EditorView({
  doc: `(ns foo.bar
  "this is a nice ns"
  (:require [cloure.string :as str]))

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
    'else nil)`,

  extensions: [basicSetup,
               clojure()],
  parent: document.querySelector('#app')
}).focus()
