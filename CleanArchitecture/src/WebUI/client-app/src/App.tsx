import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Global
const Loading = lazy(() => import("./components/Loading"));

// Auth
const AuthLayout = lazy(() => import("./layouts/auth/index"));

// Admin
const AdminLayout = lazy(() => import("./layouts/admin/index"));
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMonitor from "./pages/admin/AdminMonitor";
import AdminUser from "./pages/admin/AdminUser";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminPartner from "./pages/admin/AdminPartner";
import AdminAboutMe from "./pages/admin/AdminAboutMe";
import AdminAds from "./pages/admin/AdminAds";
import AdminAffiliateLinks from "./pages/admin/AdminAffiliateLinks";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminNewPost from "./pages/admin/AdminNewPost";
import AdminReport from "./pages/admin/AdminReport";
import AdminSetting from "./pages/admin/AdminSetting";
import AdminMyAccount from "./pages/admin/AdminMyAccount";

//User
const UserLayout = lazy(() => import("./layouts/user/index"));
import UserHome from "./pages/user/UserHome";
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<AuthLayout />}></Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/" element={<AdminDashboard />}></Route>
          <Route path="/admin/monitor" element={<AdminMonitor />}></Route>
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
            path="/admin/new-posts-management"
            element={<AdminNewPost />}
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
          <Route path="/admin/my-account" element={<AdminMyAccount />}></Route>
        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<UserHome />}></Route>
        </Route>
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
