<?php

namespace App\Http\Controllers;

use App\Trait\SystemLog;
use App\Enum\ReportLogType;

abstract class Controller
{
    use SystemLog;

    /**
     * Handler try catch error.
     *
     * @param \Throwable $error
     *
     * @return \Illuminate\Http\Response
     */
    protected function redirectError(\Throwable $error)
    {
        $this->sendReportLog(ReportLogType::ERROR, $error->getMessage());

        return back()->withErrors([
            'error' => $error->getMessage()
        ])->withInput();
    }
}
