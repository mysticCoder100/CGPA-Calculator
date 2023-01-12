<?php

class Filter
{
    public static function remove($array, $removed)
    {
        $newArray = [];
        foreach ($array as $key => $item) {
            if (in_array($key, $removed)) continue;
            $newArray[$key] = $item;
        }
        return $newArray;
    }
}
