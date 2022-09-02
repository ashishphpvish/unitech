<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class DistributorController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $users = new User();
        $distributor = $users->getAllDistributor();
        print_r($users);
        return view('distributors');
    }
}
