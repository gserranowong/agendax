module CoreGrid where
import Prelude(bind, map, otherwise, pure, (&&), (<=), (>=))
import Data.Array((..))

type Position = {
  h :: Int,
  v :: Int
                }

type CellInfo = {
   is_active :: Boolean,
   is_selected:: Boolean,
   position :: Position
}

type Range = {
  begin :: Position,
  end :: Position
             }

type Grid = Array CellInfo

initializeGrid :: Int -> Int -> Grid
initializeGrid h v = do a <- 1 .. h
                        b <- 1 .. v
                        pure { is_active: false,
                               is_selected: false,
                               position: {
                                 v: a,
                                 h:b
                                        }
                             }

next :: Grid -> Range -> Grid
next g r = map f g
           where
             f = nextCell g r

isInRange :: Position -> Range -> Boolean
isInRange p range = gte_h && lte_h && gte_v && lte_v
                               where
                                 lte_h = range.begin.h <= p.h
                                 lte_v = range.begin.v <= p.v
                                 gte_h = range.end.h >= p.h
                                 gte_v = range.end.v >= p.v

nextCell :: Grid -> Range -> CellInfo -> CellInfo
nextCell grid range cell = {
  is_active : is_active,
  is_selected: is_selected,
  position: cell.position
                     }
                     where
                       is_selected = isInRange (cell.position) range
                       is_active | is_selected = true
                                 | otherwise = false
