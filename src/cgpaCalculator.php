<?php

class CgpaCalculator
{

    public function __construct($attributes)
    {
        $this->attributes = $attributes;
    }

    public function getGpa()
    {
        $courses = $this->attributes;
        $courseGrades = [];
        $units = [];

        foreach ($courses as $key => $item) {
            if (array_key_exists($item['unit'], $units)) {
                ++$units[$item['unit']];
            } else {
                $units[$item['unit']] = 1;
            }
            $courseGrades[$item['code']] = [
                'score' => $this->getGrade($item['score'])['score'],
                'grade' => $this->getGrade($item['score'])['grade'],
                'point' => $this->getGrade($item['score'])['point'],
                'unit' => $item['unit']
            ];
        }

        $courseGrades['tlu'] = $this->getTlu($units);
        $courseGrades['tcp'] = $this->getTcp($courseGrades);
        $courseGrades['gpa'] = sprintf('%0.2f', $this->calculateGpa(
            $courseGrades['tlu'],
            $courseGrades['tcp']
        ));
        return $courseGrades;
    }

    private function calculateGpa($tlu, $tcp)
    {
        return (float) $tcp / $tlu;
    }

    private function getTcp($data)
    {
        array_pop($data);
        $tcp = 0;
        foreach ($data as $key => $value) {
            $tcp += $value['unit'] * $value['point'];
        }

        return (float) $tcp;
    }

    private function getTlu($units)
    {
        $tlu = 0;
        foreach ($units as $key => $value) {
            $tlu += $key * $value;
        }
        return (float) $tlu;
    }

    private function getGrade($score)
    {
        if ($score <= 100 && $score >= 70) {
            $grade = ['score' => $score, 'grade' => 'A', 'point' => 5.0];
        } else if ($score >= 60) {
            $grade = ['score' => $score, 'grade' => 'B', 'point' => 4.0];
        } else if ($score >= 50) {
            $grade = ['score' => $score, 'grade' => 'B', 'point' => 3.0];
        } else if ($score >= 45) {
            $grade = ['score' => $score, 'grade' => 'D', 'point' => 2.0];
        } else {
            $grade = ['score' => $score, 'grade' => 'F', 'point' => 0.0];
        }
        return $grade;
    }
}
