module CoreGrid where

import Data.Tuple

import Data.Array (cons, drop, dropWhile, filter, fromFoldable, head, index, last, length, takeWhile, (..))
import Data.Maybe (Maybe)
import Prelude (bind, map, pure, (&&), (||), (<=), (>=), (*), (+), (-), div, min, max, not, mod)

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
    start :: DayTime,
    end :: DayTime
}

type Grid = Array CellInfo
data Status = INACTIVE | ONSELECT | FORCE Boolean | TOGGLE

initializeGrid :: Int -> Int -> Grid
initializeGrid h v = do  
                        a <- 0 .. (h - 1)
                        b <- 0 .. (v - 1)
                        pure { is_active: false,
                               is_selected: false,
                               position: {
                                 h: a,
                                 v: b
                                        }
                             }


days :: Array String
days = ["L","M","MI","J","V","S","D"]                          

isInRange :: Position -> Range -> Boolean
isInRange p range = between_h && between_v
                               where
                                  min_h = min range.begin.h range.end.h
                                  max_h = max range.begin.h range.end.h
                                  min_v = min range.begin.v range.end.v
                                  max_v = max range.begin.v range.end.v
                                  between_h = min_h <= p.h && p.h <= max_h
                                  between_v= min_v <= p.v && p.v <= max_v


isMostlyActive :: Grid -> Range -> Boolean                                  
isMostlyActive g r =  actives >= (all - actives)
                     where
                       min_h = min r.begin.h r.end.h
                       max_h = max r.begin.h r.end.h
                       min_v = min r.begin.v r.end.v
                       max_v = max r.begin.v r.end.v
                       cells = do 
                         h <- min_h .. max_h
                         v <- min_v .. max_v
                         cell <- fromFoldable (index g ( h * week_days + v))
                         pure cell
                       is_active = \c -> c.is_active
                       active_cell = filter is_active cells
                       actives = length active_cell
                       all = length cells

next :: Status -> Grid -> Range -> Grid
next s g r = map f g
           where
             mactive = isMostlyActive g r
             f = nextCell s mactive g r                       

nextCell :: Status -> Boolean -> Grid -> Range -> CellInfo -> CellInfo
nextCell status ma grid range cell = {
  is_active : is_active,
  is_selected: is_selected,
  position: cell.position
                     }
                     where
                       in_range = isInRange (cell.position) range
                       is_selected = case status of
                                        ONSELECT -> in_range
                                        otherwise -> false
                       is_active = case status of
                                        ONSELECT -> cell.is_active
                                        INACTIVE -> (in_range && (not ma) ) || ( (not in_range ) && cell.is_active)
                                        FORCE b ->  (in_range && b) || ( (not in_range) && cell.is_active )
                                        TOGGLE -> (in_range && (not ma ) ) || ( (not in_range) && cell.is_active )


week_days :: Int
week_days = 7

getDayInfo :: Grid -> Int -> Int -> Int -> Int -> Array CellInfo
getDayInfo g t1 t2 d1 d2 = do
                       d <- d1 .. d2
                       i <- t1 .. t2
                       let element_index = d  + i * week_days
                       elem <- fromFoldable (index g element_index)
                       pure elem

get_time :: Int -> DayTime
get_time index = {
                  hours:  index `div` 2,
                  minutes: (index `mod` 2) * 30
                }

getNextRange :: Array CellInfo -> Int -> Maybe (Tuple (Array CellInfo) WeekTimeRange)
getNextRange g day_i = do let
                            is_inactive = \c -> not c.is_active
                            is_active = \c -> c.is_active
                            l1 = dropWhile is_inactive g
                            l2 = takeWhile is_active l1
                            remaining = drop (length g - length l1 + length l2) g
                          t1 <- head l2
                          t2 <- last l2
                          day <- index days day_i
                          pure (Tuple remaining {
                                          start: get_time t1.position.h,
                                          end : get_time (t2.position.h+1),
                                          week_day : day
                                         })


getDayRange :: Array CellInfo -> Int -> Array WeekTimeRange
getDayRange  g day_i = do
                         Tuple a t <- fromFoldable (getNextRange g day_i)
                         cons t (getDayRange a day_i)

getAllInfo :: Grid  -> Array WeekTimeRange
getAllInfo g = do
                 day <- 0 .. 6
                 let day_ranges = getDayInfo g 0 48 day day
                 range <- getDayRange day_ranges day 
                 pure range
                 
