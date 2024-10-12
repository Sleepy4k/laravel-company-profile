<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@yield('code') @yield('title') - {{ config('app.name') }}</title>

        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="antialiased">
        <div class="flex items-center justify-center min-h-screen p-5 text-indigo-100 bg-gray-800">
            <div class="w-full max-w-md">
                <h1 class="text-3xl">@yield('code') @yield('title')</h1>
                <p class="mt-3 text-lg leading-tight">@yield('description')</p>
                <div class="mt-5">
                    <a href="{{ url('/') }}" class="mt-5 btn btn-primary">
                        Back to home
                    </a>
                </div>
            </div>
        </div>
    </body>
</html>
