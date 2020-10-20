module Test.Main where

import Prelude

import CoreGrid (initializeGrid, next,Status(ONSELECT),isInRange)
import Effect (Effect)
import Effect.Aff (launchAff_)
import Test.Spec (describe, it)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (runSpec)

main :: Effect Unit
main = launchAff_ $ runSpec [consoleReporter] do
  describe "CoreGrid defines basic state logic for grids." do
    
    describe "Grid Creation Tests" do
        it "1 create 1 1 grid cell" do
                                    let expectedcell = [{ is_active: false,is_selected: false, position: {h:0,v:0}}]
                                    expectedcell `shouldEqual` (initializeGrid 1 1)
    
        it "active 1 cell grid" do
                                let expectedcell = [{ is_active: false,is_selected: true, position: {h:0,v:0}}]
                                expectedcell `shouldEqual` ( next ONSELECT (initializeGrid 1 1) {begin : {h:0,v:0},end:{h:0,v:0}} )
        it "columns are well laid out" do
                                let expected_cell = [{ is_active: false,is_selected:false, position:{h:0,v:0}},{ is_active: false,is_selected:false, position:{h:0,v:1}}
                                                     ,{ is_active: false,is_selected:false, position:{h:1,v:0}},{ is_active: false,is_selected:false, position:{h:1,v:1}}]
                                expected_cell `shouldEqual` (initializeGrid 2 2)
    
    describe "Range tests" do
        
        it "single cell" do
                         true `shouldEqual` (isInRange {h:0,v:0} {begin:{h:0,v:0},end:{h:0,v:0}})
                         true `shouldEqual` (isInRange {h:2,v:2} {begin:{h:2,v:2},end:{h:2,v:2}})
                         true `shouldEqual` (isInRange {h:4,v:4} {begin:{h:4,v:4},end:{h:4,v:4}})
                         false `shouldEqual` (isInRange {h:4,v:4} {begin:{h:5,v:5},end:{h:5,v:5}})
                         
                         
        it "horizontal-range" do
                              true `shouldEqual` (isInRange {h:0,v:5} {begin:{h:0,v:0},end:{h:0,v:10}})
                              true `shouldEqual` (isInRange {h:0,v:7} {begin:{h:0,v:5},end:{h:0,v:10}})
                              true `shouldEqual` (isInRange {h:0,v:10} {begin:{h:0,v:0},end:{h:0,v:10}})

                              false `shouldEqual` (isInRange {h:0,v:22} {begin:{h:0,v:10},end:{h:0,v:20}})
                              false `shouldEqual` (isInRange {h:0,v:2} {begin:{h:1,v:0},end:{h:5,v:10}})
                              false `shouldEqual` (isInRange {h:0,v:12} {begin:{h:5,v:5},end:{h:0,v:10}})
                              false `shouldEqual` (isInRange {h:0,v:11} {begin:{h:10,v:0},end:{h:0,v:10}})

        it "vertical-range" do
                              true `shouldEqual` (isInRange {h:1,v:0} {begin:{h:0,v:0},end:{h:10,v:0}})
                              true `shouldEqual` (isInRange {h:5,v:0} {begin:{h:0,v:0},end:{h:10,v:0}})
                              true `shouldEqual` (isInRange {h:2,v:0} {begin:{h:0,v:0},end:{h:10,v:0}})

                              false `shouldEqual` (isInRange {h:1,v:2} {begin:{h:0,v:0},end:{h:10,v:0}})
                              false `shouldEqual` (isInRange {h:5,v:2} {begin:{h:0,v:0},end:{h:10,v:0}})
                              false `shouldEqual` (isInRange {h:2,v:2} {begin:{h:0,v:0},end:{h:10,v:0}})