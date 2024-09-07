<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ $app_name }}</title>
        <meta name="base-title" content="{{ $app_name }}">

        {{-- Meta --}}
        <meta name="author" content="{{ isset($app_author) ? $app_author : $app_name }}">
        <meta name="keywords" content="{{ isset($app_keyword) ? $app_keyword : $app_name }}">
        <meta name="description" content="{{ isset($app_description) ? $app_description : $app_name }}">

        {{-- Icon --}}
        @if (isset($app_favicon) && !empty($app_favicon))
            <link rel="apple-touch-icon" href="{{ $app_favicon }}" />
            <link rel="icon" href="{{ $app_favicon }}" type="image/png" />
            <link rel="icon" href="{{ $app_favicon }}" type="image/x-icon" />
        @endif

        {{-- Logo --}}
        @if (isset($app_logo) && !empty($app_logo))
            <meta property="og:logo" content="{{ $app_logo }}" />
            <meta property="og:image" content="{{ $app_logo }}" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="{{ $app_name }}" />
        @endif

        {{-- Misc Meta --}}
        <meta property="og:site_name" content="{{ $app_name }}">
        <meta property="og:description" content="{{ isset($app_description) ? $app_description : $app_name }}">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">
        <meta property="og:url" content="{{ config('app.url') }}">

        {{-- Fonts --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        {{-- Scripts --}}
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
