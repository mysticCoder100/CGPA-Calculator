<?php
//function to flush user inputs
function sanitizeString($input)
{
    $input = strip_tags($input);
    $input = htmlentities($input);
    $input = htmlspecialchars($input);
    $input = stripslashes($input);
    return $input;
}
/**
 * Function location
 *function to redirect using header
 *
 * @param string $location [explicite description]
 *
 * @return void
 */
function redirect($location)
{
    header("Location: $location");
    exit();
}

function location($location)
{
    header("Location: $location");
    exit();
}

//function to get input through POST and flush user input
function post($input)
{

    $input = $_POST[$input];
    $input = sanitizeString($input);
    return $input;
}

//function to get input through GET and flush user input
function get($input)
{

    $input = $_GET[$input];
    $input = sanitizeString($input);
    return $input;
}
