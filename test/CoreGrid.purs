module Test.Main where

import Prelude

import CoreGrid (initializeGrid, next)
import Effect (Effect)
import Effect.Aff (launchAff_)
import Test.Spec (describe, it)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (runSpec)

main :: Effect Unit
main = launchAff_ $ runSpec [consoleReporter] do
  describe "CoreGrid defines basic state logic for grids." do
    
    
    it "1 create 1 1 grid cell" do
                                let expectedcell = [{ is_active: false,is_selected: false, position: {h:1,v:1}}]
                                expectedcell `shouldEqual` (initializeGrid 1 1)

    it "active 1 cell grid" do
                            let expectedcell = [{ is_active: true,is_selected: true, position: {h:1,v:1}}]
                            expectedcell `shouldEqual` ( next (initializeGrid 1 1) {begin : {h:1,v:1},end:{h:1,v:1}} )
