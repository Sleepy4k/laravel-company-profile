<?php

namespace App\Services\Translate;

use App\Services\Service;

class LanguageService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $translate = [
            'lang' => app()->getLocale(),
        ];
        $backUrl = session()->get('translate.translate.url') ?? route('translate.index', ['table']);

        return compact('backUrl', 'translate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param array $request
     *
     * @return void
     */
    public function store(array $request): void
    {
        try {
            // Check if the language already set on this app
            if (app()->getLocale() === $request['lang']) {
                session()->flash('error', 'The language has already been set.');
                return;
            }

            // Change language on .lang file in storage
            $path = storage_path('.lang');
            $bytes = file_put_contents($path, $request['lang']);

            if ($bytes === false) {
                session()->flash('error', 'Failed to set the language.');
                return;
            }

            session()->flash('success', 'The language has been set.');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
