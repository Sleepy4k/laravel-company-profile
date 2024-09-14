<?php

namespace App\Http\Controllers\Translate;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Policies\Translate\LanguagePolicy;
use App\Services\Translate\LanguageService;
use App\Http\Requests\Translate\StoreLanguageRequest;

class LanguageController extends Controller
{
    /**
     * @var LanguageService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(LanguageService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', LanguagePolicy::class);

        try {
            return inertia('Translate/Language/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLanguageRequest $request)
    {
        Gate::authorize('store', LanguagePolicy::class);

        try {
            $this->service->store($request->validated());

            return to_route('translate.language.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
