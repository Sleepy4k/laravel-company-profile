<?php

namespace App\Http\Controllers\Account;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Account\ProfileService;
use App\Http\Requests\Account\UpdateProfileRequest;
use App\Http\Requests\Account\DestroyProfileRequest;

class ProfileController extends Controller
{
    /**
     * @var ProfileService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(ProfileService $service)
    {
        $this->service = $service;
    }

    /**
     * Display the user's profile form.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function edit(Request $request): Response
    {
        return inertia('Profile/Edit', $this->service->edit());
    }

    /**
     * Update the user's profile information.
     */
    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        try {
            $this->service->update($request);

            session()->flash('success', 'Profile updated successfully.');

            return to_route('profile.edit');
        } catch (\Throwable $th) {
            session()->flash('error', 'Failed to update current profile');

            return $this->redirectError($th);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(DestroyProfileRequest $request): RedirectResponse
    {
        try {
            $this->service->destroy($request);

            return redirect('/');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
