<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1" name="viewport" />

	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>Lorax - Bootstrap 5 Admin Dashboard Template</title>
	<!-- Favicon-->
	<link rel="icon" href="{{ asset('admin/assets/images/favicon.ico') }}" type="image/x-icon">
	<!-- Plugins Core Css -->
	<link href="{{ asset('admin/assets/css/common.min.css') }}" rel="stylesheet">
	<!-- Custom Css -->
	<link href="{{ asset('admin/assets/css/style.css') }}" rel="stylesheet" />
	<link href="{{ asset('admin/assets/css/pages/authentication.css') }}" rel="stylesheet" />

  <style>
      .error {
          font-size: 12px;
          color: #FF0000;
          padding-bottom: 10px;
          text-align: center;
      }
  </style>
</head>

<body>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
        		@yield('content')
			</div>
		</div>
	</div>
	<!-- Plugins Js -->
	<script src="{{ asset('admin/assets/js/common.min.js') }}"></script>
	<script src="{{ asset('admin/assets/js/pages/examples/pages.js') }}"></script>
</body>
</html>