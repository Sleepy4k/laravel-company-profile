<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Auth\PasswordRequest;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function __invoke(PasswordRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();

            $request->user()->update([
                'password' => Hash::make($data['password']),
            ]);

            session()->flash('success', 'Password updated successfully.');

            return back();
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
