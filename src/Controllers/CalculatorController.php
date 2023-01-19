<?php

require_once __DIR__ . "/./UserController.php";
require_once __DIR__ . '/./../Models/Scores.php';
require_once __DIR__ . '/./../Models/Users.php';
require_once __DIR__ . "/./../library/Calculator.php";

class CalculatorController
{

    public function __construct($props)
    {
        $this->props = $props;
        $filterAttributes = array_filter($props, fn ($e) => gettype($e) == "array");
        $courses = [];
        foreach ($filterAttributes["course"] as $key => $value) {
            array_push($courses, $value);
        }
        $this->courses = $courses;
        $this->auth();
    }

    public function auth()
    {
        $users = UserController::getDetails();

        if ($users["status"] == "grad") {
            // echo "graduated";
            return;
        }

        if (
            empty($users['semester']) ||
            empty($users['level']) ||
            empty($users['course_duration'])
        ) {
            echo json_encode(["msg" => "Kindly Complete Your Profile by filling the records at the application setup tab of the settings page to allow you to calculate your GPA.",  "status" => "error"]);
            return;
        }
        $courses = $this->courses;
        $empty = array_filter($courses, function ($e) {
            return empty($e["code"]) ||  empty($e["unit"]) || empty($e['score']);
        });
        if (count($empty) > 0) {
            echo json_encode(["msg" => "Kindly Fill all fields",  "status" => "error"]);
            return;
        }

        $codes = array_filter($courses, function ($el) {
            return !preg_match("/^[a-zA-Z]{3,} [\d ]{3,}$/", $el["code"]);
        });
        $scores = array_filter($courses, function ($el) {
            return !preg_match("/^[\d ]+$/", $el["score"]);
        });
        $units = array_filter($courses, function ($el) {
            return !preg_match("/^[\d ]+$/", $el["unit"]);
        });

        if (count($codes) > 0) {
            echo json_encode(["msg" => "A field contains an invalid Course Code",  "status" => "error"]);
            return;
        }
        if (count($units) > 0) {
            echo json_encode(["msg" => "A field contains an invalid Course Unit",  "status" => "error"]);
            return;
        }
        if (count($scores) > 0) {
            echo json_encode(["msg" => "A field contains an invalid Course Score",  "status" => "error"]);
            return;
        }
        $courseGrades = (new Calculator($this->courses))->getGpa();

        $courses = array_filter($courseGrades, fn ($el) => gettype($el) === "array");
        $filename = sprintf("\assets\courses\%s#%d#%d.txt", $users['id'], $users["semester"], $users["level"]);
        $path = $_SERVER["DOCUMENT_ROOT"] . "$filename";
        $handle = fopen($path, "w");
        foreach ($courses as $key => $item) {
            $text =  vsprintf("code.%s,score.%d,grade.%s,unit.%d\n", [$key, $item["score"], $item["grade"], $item["unit"]]);
            fwrite($handle, $text);
        }
        $data = [
            "userId" => $_SESSION["user"],
            "semester" => $users["semester"],
            "level" => $users["level"],
            "gpa" => $courseGrades["gpa"],
            "tcp" => $courseGrades["tcp"],
            "tlu" => $courseGrades["tlu"],
            "courses" => $filename
        ];


        $insert =  (new Scores())->insert($data);
        if ($insert) {
            $recordOld = ((new Scores())->fetchAll(["userId" => $_SESSION["user"]]));
            $ccp = 0;
            $clu = 0;
            foreach ($recordOld as $key => $value) {
                $ccp += $value["tcp"];
                $clu += $value["tlu"];
            }
            $cgpa = sprintf("%.2f", $ccp / $clu);
            $level = $users["level"];
            $semester = $users["semester"] + 1;
            $data = ["gpa" => $courseGrades["gpa"], "semester" => $semester, "level" => $level, "cgpa" => $cgpa];
            if ($users["level"] == $users["course_duration"] . "00" && $users["semester"] == 2) {
                $data["semester"] = 2;
                $data["status"] = "grad";
            } else if ($users["semester"] == 2) {
                $data["level"] = $users["level"] + 100;
                $data["semester"] = 1;
            }
            (new Users())->update($data, $_SESSION["user"]);
            echo json_encode(["msg" => "Record Sucessfully Saved", "status" => "success"]);
        } else {
            echo json_encode(["msg" => "An Error Occured", "status" => "error"]);
        }
    }


    public static function getRecords()
    {
        $details =  (new Scores())->fetchAll(["userId" => $_SESSION["user"]]);
        $levels = $records = [];
        foreach ($details as $key => $item) {
            if (in_array($item["level"], $levels))  continue;
            array_push($levels, $item["level"]);
        }

        foreach ($details as $key => $inner) {
            $path = $_SERVER["DOCUMENT_ROOT"] . $inner["courses"];
            $handle = fopen($path, "r");
            $text = trim(fread($handle, filesize($path)));
            fclose($handle);
            $coursesArray = [];
            foreach (explode("\n", $text) as $key => $item) {
                $tempArray = [];
                foreach (explode(",", $item) as $i => $value) {
                    $mini = explode(".", $value);
                    $tempArray[$mini[0]] = $mini[1];
                }
                array_push($coursesArray, $tempArray);
            }
            $inner["courses"] = $coursesArray;
            array_push($records, $inner);
        }
        $data = ["details" => $records, "levels" => $levels];
        echo json_encode($data);
    }

    public static function getLatestRecord()
    {
        $details =  (new Scores())->getLastRecords(["userId" => $_SESSION["user"]]);

        $levels = $records = [];
        foreach ($details as $key => $item) {
            if (in_array($item["level"], $levels))  continue;
            array_push($levels, $item["level"]);
        }

        foreach ($details as $key => $inner) {
            $path = $_SERVER["DOCUMENT_ROOT"] . $inner["courses"];
            $handle = fopen($path, "r");
            $text = trim(fread($handle, filesize($path)));
            fclose($handle);
            $coursesArray = [];
            foreach (explode("\n", $text) as $key => $item) {
                $tempArray = [];
                foreach (explode(",", $item) as $i => $value) {
                    $mini = explode(".", $value);
                    $tempArray[$mini[0]] = $mini[1];
                }
                array_push($coursesArray, $tempArray);
            }
            $inner["courses"] = $coursesArray;
            array_push($records, $inner);
        }
        $data = ["details" => $records, "levels" => $levels];
        echo json_encode($data);
    }
}