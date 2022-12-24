import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {


  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Medicaid</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${isActive && "active-menu-item"
                    }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}




            {
              role === "User" && (
                <div className={`d-flex menu-item`}>
                  <i className="ri-file-chart-fill"></i>
                  {!collapsed && <a href="https://strong-truffle-c55cc1.netlify.app/?room_id=6tgqgo7cm">Share Report</a>}
                </div>
              )

            }
            {
              role === "Doctor" && (
                <div className={`d-flex menu-item`}>
                  <i className="ri-file-chart-fill"></i>
                  {!collapsed && <a href="https://strong-truffle-c55cc1.netlify.app/?room_id=6tgqgo7cm">Upload Prescription</a>}
                </div>
              )

            }


            {
              (role === "Doctor" || role === 'Admin') && (
                <div
                  className={`d-flex menu-item `}
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <i className="ri-logout-circle-line"></i>
                  {!collapsed && <Link to="/login">Logout</Link>}
                </div>
              )
            }


            {
              role === "User" && (
                <div
                  className={`d-flex menu-item `}
                  onClick={() => {
                    localStorage.clear();
                    navigate("/testpage");
                  }}
                >
                  <i className="ri-logout-circle-line"></i>
                  {!collapsed && <Link to="/testpage">Logout</Link>}
                </div>
              )
            }



          </div>
        </div>

        <div className="content">
          <div className="header">


            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            {
              role === "User" &&
              (<i className="ri-hospital-line"> <a href="https://ann29-tdk.github.io/hwmAnimatedIntro/">Feeling Depressed?</a></i>)
            }

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>


          <div className="footer" onClick={() => {
            window.open("https://chatdoc.netlify.app/", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=280,width=400,height=400");
          }}>
            <a className="chat-bot">
              <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            </a>
          </div>

        </div>
      </div>
    </div >
  );
}

export default Layout;
