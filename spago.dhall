{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "grid-core"
, dependencies = [ "console", "effect", "lists", "psci-support","arrays","spec","tuples"]
, packages = ./packages.dhall
, sources = [ "src-purescript/**/*.purs", "test/**/*.purs" ]
}
