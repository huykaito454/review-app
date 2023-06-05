import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Global
const Loading = lazy(() => import("./components/Loading"));
// Admin
const AdminLayout = lazy(() => import("./layouts/admin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUser = lazy(() => import("./pages/admin/AdminUser"));
const AdminCategory = lazy(() => import("./pages/admin/AdminCategory"));
const AdminPartner = lazy(() => import("./pages/admin/AdminPartner"));
const AdminAboutMe = lazy(() => import("./pages/admin/AdminAboutMe"));
const AdminAds = lazy(() => import("./pages/admin/AdminAds"));
const AdminAffiliateLinks = lazy(
  () => import("./pages/admin/AdminAffiliateLinks")
);
const AdminPosts = lazy(() => import("./pages/admin/AdminPosts"));
const AdminReport = lazy(() => import("./pages/admin/AdminReport"));
const AdminSetting = lazy(() => import("./pages/admin/AdminSetting"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/" element={<AdminDashboard />}></Route>
          <Route path="/admin/user-management" element={<AdminUser />}></Route>
          <Route
            path="/admin/category-management"
            element={<AdminCategory />}
          ></Route>
          <Route
            path="/admin/partner-management"
            element={<AdminPartner />}
          ></Route>
          <Route
            path="/admin/about-me-management"
            element={<AdminAboutMe />}
          ></Route>
          <Route path="/admin/ads-management" element={<AdminAds />}></Route>
          <Route
            path="/admin/affiliate-links-management"
            element={<AdminAffiliateLinks />}
          ></Route>
          <Route
            path="/admin/posts-management"
            element={<AdminPosts />}
          ></Route>
          <Route
            path="/admin/report-management"
            element={<AdminReport />}
          ></Route>
          <Route
            path="/admin/setting-management"
            element={<AdminSetting />}
          ></Route>
        </Route>
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
