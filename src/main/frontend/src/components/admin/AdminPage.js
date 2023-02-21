import React from 'react';

function AdminPage() {
    return (
        <div className='min-vh-100'>
            <main className="position-absolute top-50 start-50 translate-middle text-center d-flex flex-column">
                <a href="/admin/AllStore" className="btn btn-lg btn-secondary fw-bold border-white ">가게 관리</a>
                <a href="/admin/AllCategory" className="btn btn-lg btn-secondary fw-bold border-white ">카테고리 관리</a>
            </main>
        </div>
    );
}

export default AdminPage;