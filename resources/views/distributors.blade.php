@extends('layouts.app')

@section('content')
<div class="block-header">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <ul class="breadcrumb breadcrumb-style ">
                <li class="breadcrumb-item">
                    <h4 class="page-title">Distributor</h4>
                </li>
                <li class="breadcrumb-item bcrumb-1">
                    <a href="{{ url('/home') }}">
                        <i class="fas fa-home"></i> Home</a>
                </li>
                <li class="breadcrumb-item active">Distributor</li>
            </ul>
        </div>
    </div>
</div>
<div class="row clearfix">
    <!-- Task Info -->
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="card">
            <div class="header">
                <h2>Distributors List</h2>
                <ul class="header-dropdown">
                    <li class="dropdown">
                        <a href="#" onClick="return false;" class="dropdown-toggle"
                            data-bs-toggle="dropdown" role="button" aria-haspopup="true"
                            aria-expanded="false">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <ul class="dropdown-menu pull-right">
                            <li>
                                <a href="#" onClick="return false;">Add</a>
                            </li>
                            <li>
                                <a href="#" onClick="return false;">Edit</a>
                            </li>
                            <li>
                                <a href="#" onClick="return false;">Delete</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="tableBody">
                <div class="table-responsive">
                    <table class="table table-hover dashboard-task-infos">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Project Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="table-img">
                                    <img src="{{ asset('admin/assets/images/user/user1.jpg') }}" alt="">
                                </td>
                                <td>John Doe</td>
                                <td>xyz@email.com</td>
                                <td>
                                    <span class="label bg-green shadow-style">Active</span>
                                </td>
                                <td>ERP System</td>
                                <td>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-img">
                                    <img src="{{ asset('admin/assets/images/user/user2.jpg') }}" alt="">
                                </td>
                                <td>Sarah Smith</td>
                                <td>xyz@email.com</td>
                                <td>
                                    <span class="label bg-red shadow-style">Inactive</span>
                                </td>
                                <td>Abc Website</td>
                                <td>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-img">
                                    <img src="{{ asset('admin/assets/images/user/user3.jpg') }}" alt="">
                                </td>
                                <td>Airi Satou</td>
                                <td>xyz@email.com</td>
                                <td>
                                    <span class="label bg-green shadow-style">Active</span>
                                </td>
                                <td>Android App</td>
                                <td>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-img">
                                    <img src="{{ asset('admin/assets/images/user/user4.jpg') }}" alt="">
                                </td>
                                <td>Angelica Ramos</td>
                                <td>xyz@email.com</td>
                                <td>
                                    <span class="label bg-green shadow-style">Active</span>
                                </td>
                                <td>Ios App</td>
                                <td>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-img">
                                    <img src="{{ asset('admin/assets/images/user/user5.jpg') }}" alt="">
                                </td>
                                <td>Ashton Cox</td>
                                <td>xyz@email.com</td>
                                <td>
                                    <span class="label bg-red shadow-style">Inactive</span>
                                </td>
                                <td>Java Website</td>
                                <td>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-img">
                                    <img src="{{ asset('admin/assets/images/user/user6.jpg') }}" alt="">
                                </td>
                                <td>Cara Stevens</td>
                                <td>xyz@email.com</td>
                                <td>
                                    <span class="label bg-green shadow-style">Active</span>
                                </td>
                                <td>Desktop App</td>
                                <td>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">mode_edit</i>
                                    </button>
                                    <button class="btn tblActnBtn">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- #END# Task Info -->
</div>
@endsection
