"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import useWidgetStore from "@/Store/widgetStore";

export default function Layout({ children }) {
  // Get needed state from Zustand store
  const { isCollapsed, isMobileMenuOpen } = useWidgetStore();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Top Searchbar */}
        <Searchbar />

        {/* Page Content */}
        <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
      </div>

      {/* Mobile overlay backdrop */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
          onClick={() => useWidgetStore.getState().setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
