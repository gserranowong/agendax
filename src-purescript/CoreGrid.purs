module CoreGrid where

import Data.Array (elem, fromFoldable, index, length, (..))
import Prelude (bind, map, pure, (&&), (||), (<=), (/=), (*), (+), div, min, max, not)

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


type DayTime = {
    hours :: Int,
    minutes :: Int
}


type WeekTimeRange = {
    week_day :: String,
    start_date :: DayTime,
    end_date :: DayTime
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


week_days :: Int
week_days = 7

getDayInfo :: Grid -> Int -> Int -> Int -> Int -> Array CellInfo
getDayInfo g di df dds ddv = do
                       d <- di .. df
                       i <- dds .. ddv
                       let element_index = d  + i * week_days
                       elem <- fromFoldable (index g element_index)
                       pure elem

