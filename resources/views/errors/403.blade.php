@extends('errors::minimal')

@section('title', 'Forbidden Access')
@section('code', '403')
@section('description', config('app.debug') ? $exception->getMessage() : 'Forbidden Access due invalid credential or access')
