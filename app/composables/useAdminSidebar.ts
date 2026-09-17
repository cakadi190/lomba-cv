export function useAdminSidebar() {
  const isCollapsed = useCookie<boolean>("admin-sidebar-collapsed", { default: () => false });
  const isMobileOpen = useState<boolean>("admin-sidebar-mobile-open", () => false);

  function toggleSidebar() {
    if (import.meta.client && window.innerWidth < 992) {
      isMobileOpen.value = !isMobileOpen.value;
      return;
    }

    isCollapsed.value = !isCollapsed.value;
  }

  function closeMobileSidebar() {
    isMobileOpen.value = false;
  }

  return {
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    closeMobileSidebar,
  };
}
