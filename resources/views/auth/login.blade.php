@extends('layouts.app-login')

@section('content')
<form method="POST" action="{{ route('login') }}" class="login100-form validate-form">
    @csrf
    <span class="login100-form-title p-b-45">
        Login
    </span>
    <div class="error">
        @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror
        
        @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror
    </div>
    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
        <input id="email" type="email" name="email" value="{{ old('email') }}" class="input100" placeholder="Enter Email" required autocomplete="email"/>
        <span class="focus-input100"></span>
        <span class="label-input100">{{ __('E-Mail Address') }}</span>
    </div>
    <div class="wrap-input100 validate-input" data-validate="Password is required">
        <input id="password" type="password" name="password" class="input100" placeholder="Enter Password" required autocomplete="current-password"/>
        <span class="focus-input100"></span>
        <span class="label-input100">{{ __('Password') }}</span>
    </div>
    <div class="flex-sb-m w-full p-t-15 p-b-20">
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}> {{ __('Remember Me') }}
                <span class="form-check-sign">
                    <span class="check"></span>
                </span>
            </label>
        </div>
        <div>
            @if (Route::has('password.request'))
                <a class="btn btn-link" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                </a>
            @endif
        </div>
    </div>
    <div class="container-login100-form-btn">
        <button class="login100-form-btn">
            {{ __('Login') }}
        </button>
    </div>
</form>
<div class="login100-more" style="background-image: url('admin/assets/images/pages/bg-01.png');">
</div>
@endsection
