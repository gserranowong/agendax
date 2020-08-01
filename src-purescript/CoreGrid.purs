module CoreGrid where
import Prelude(bind, map, pure, (&&),(||), (<=), (/=), min, max, not)
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
data Status = INACTIVE | ONSELECT | FORCE Boolean

initializeGrid :: Int -> Int -> Grid
initializeGrid h v = do
                        a <- 1 .. h
                        b <- 1 .. v
                        pure { is_active: false,
                               is_selected: false,
                               position: {
                                 h: a,
                                 v: b
                                        }
                             }

next :: Status -> Grid -> Range -> Grid
next s g r = map f g
           where
             f = nextCell s g r

isInRange :: Position -> Range -> Boolean
isInRange p range = between_h && between_v
                               where
                                  min_h = min range.begin.h range.end.h
                                  max_h = max range.begin.h range.end.h
                                  min_v = min range.begin.v range.end.v
                                  max_v = max range.begin.v range.end.v
                                  between_h = min_h <= p.h && p.h <= max_h
                                  between_v= min_v <= p.v && p.v <= max_v

nextCell :: Status -> Grid -> Range -> CellInfo -> CellInfo
nextCell status grid range cell = {
  is_active : is_active,
  is_selected: is_selected,
  position: cell.position
                     }
                     where
                       in_range = isInRange (cell.position) range
                       is_selected = case status of
                                        ONSELECT -> in_range
                                        INACTIVE -> false
                                        FORCE b -> false
                       is_active = case status of
                                        ONSELECT -> cell.is_active
                                        INACTIVE -> cell.is_active /= cell.is_selected
                                        FORCE b ->  (in_range && b) || ( (not in_range) && cell.is_active )