<?php

namespace App\Services\Account;

use App\Services\Service;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Account\UpdateProfileRequest;
use App\Http\Requests\Account\DestroyProfileRequest;

class ProfileService extends Service
{
    /**
     * Show the form for editing the specified resource.
     *
     * @return array
     */
    public function edit(): array
    {
        return [];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProfileRequest $request
     *
     * @return void
     */
    public function update(UpdateProfileRequest $request): void
    {
        try {
            $request->user()->fill($request->validated());
            $request->user()->save();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param DestroyProfileRequest $request
     *
     * @return void
     */
    public function destroy(DestroyProfileRequest $request): void
    {
        $request->validated();
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
