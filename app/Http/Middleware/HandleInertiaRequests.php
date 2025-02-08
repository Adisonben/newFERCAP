<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Middleware;
use Throwable;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'role_name' => $request->user() ? optional($request->user()->userRole)->codename : null,
            ],
            'flash' => [
                'error' => Session::get('error'),
                'success' => Session::get('success'),
            ],
            'csrf_token' => csrf_token(),
            'role_name' => $request->user() ? optional($request->user()->userRole)->codename : null,
        ];
    }
}
