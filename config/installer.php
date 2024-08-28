<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Server/PHP Requirements
    |--------------------------------------------------------------------------
    |
    */
    'core' => [
        'minPhpVersion' => '8.2',
    ],

    'requirements' => [
        'php' => [
            'bcmath',
            'ctype',
            'mbstring',
            'openssl',
            'pdo',
            'tokenizer',
            'cURL',
            'iconv',
            'gd',
            'fileinfo',
            'dom',
        ],

        'apache' => [],

        'functions' => [
            'symlink',
            'tmpfile',
            'file', // dompdf
            'ignore_user_abort',
            'fpassthru',
            'highlight_file',
        ],

        'recommended' => [
            'php' => [],

            'functions' => [
                'proc_open',
                'proc_close',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Folders Permissions
    |--------------------------------------------------------------------------
    |
    | This is the default Laravel folders permissions, if your application
    | requires more permissions just add them to the array list bellow.
    |
    */
    'permissions' => [
        'storage/app/' => '755',
        'storage/framework/' => '755',
        'storage/logs/' => '755',
        'bootstrap/cache/' => '755',
    ],
];
