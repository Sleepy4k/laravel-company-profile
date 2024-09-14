<?php

namespace App\Http\Controllers\Translate;

use App\Models\Translate;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Services\Translate\TranslateService;
use App\Http\Requests\Translate\StoreTranslateRequest;
use App\Http\Requests\Translate\UpdateTranslateRequest;

class TranslateController extends Controller
{
    /**
     * @var TranslateService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(TranslateService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(string $mode)
    {
        Gate::authorize('viewAny', [Translate::class, $mode]);

        try {
            session()->put('translate.translate.url', request()->fullUrl());

            return inertia('Translate/Translate/Home', $this->service->index($mode));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Translate::class);

        try {
            return inertia('Translate/Translate/Create', $this->service->create());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTranslateRequest $request)
    {
        Gate::authorize('store', Translate::class);

        try {
            $this->service->store($request->validated());

            return session()->has('translate.translate.url')
                ? redirect(session()->get('translate.translate.url'))
                : to_route('translate.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Translate $list)
    {
        Gate::authorize('view', $list);

        try {
            return inertia('Translate/Translate/Show', $this->service->show($list));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Translate $list)
    {
        Gate::authorize('edit', $list);

        try {
            return inertia('Translate/Translate/Edit', $this->service->edit($list));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTranslateRequest $request, Translate $list)
    {
        Gate::authorize('update', $list);

        try {
            $this->service->update($request->validated(), $list->id);

            return session()->has('translate.translate.url')
                ? redirect(session()->get('translate.translate.url'))
                : to_route('translate.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Translate $list)
    {
        Gate::authorize('delete', $list);

        try {
            $this->service->destroy($list->id);

            return session()->has('translate.translate.url')
                ? redirect(session()->get('translate.translate.url'))
                : to_route('translate.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
