<?php

namespace App\Http\Controllers\User;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Profile\UpdateRequest;
use App\Http\Requests\Profile\DestroyRequest;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function edit(Request $request): Response
    {
        return inertia('Profile/Edit');
    }

    /**
     * Update the user's profile information.
     */
    public function update(UpdateRequest $request): RedirectResponse
    {
        try {
            $request->user()->fill($request->validated());
            $request->user()->save();
            session()->flash('success', 'Profile updated successfully.');

            return to_route('profile.edit');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(DestroyRequest $request): RedirectResponse
    {
        try {
            $request->validated();
            $user = $request->user();

            Auth::logout();

            $user->delete();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect('/');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
