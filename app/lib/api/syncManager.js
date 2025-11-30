"use client";

/**
 * SyncManager - Handles real-time synchronization between Owner and Contractor dashboards
 * Uses localStorage events and custom event dispatching for cross-tab/dashboard sync
 */

const SYNC_EVENT = "finflow_data_sync";
const PROJECT_STORAGE_KEY = "finflow_project_tracker";

class SyncManager {
  constructor() {
    this.listeners = new Set();
    this.isInitialized = false;
  }

  /**
   * Initialize the sync manager (call once per app)
   */
  init() {
    if (this.isInitialized || typeof window === "undefined") return;
    
    // Listen for storage events (cross-tab sync)
    window.addEventListener("storage", this.handleStorageEvent.bind(this));
    
    // Listen for custom events (same-tab sync between dashboards)
    window.addEventListener(SYNC_EVENT, this.handleCustomEvent.bind(this));
    
    this.isInitialized = true;
  }

  /**
   * Handle storage events from other tabs/windows
   */
  handleStorageEvent(event) {
    if (event.key === PROJECT_STORAGE_KEY && event.newValue) {
      try {
        const updatedProject = JSON.parse(event.newValue);
        this.notifyListeners(updatedProject, "storage");
      } catch (error) {
        console.error("Failed to parse storage event:", error);
      }
    }
  }

  /**
   * Handle custom events from same tab
   */
  handleCustomEvent(event) {
    if (event.detail?.project) {
      this.notifyListeners(event.detail.project, "custom");
    }
  }

  /**
   * Subscribe to project updates
   * @param {Function} callback - Called when project data changes
   * @returns {Function} unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners of project changes
   */
  notifyListeners(project, source) {
    this.listeners.forEach((callback) => {
      try {
        callback(project, source);
      } catch (error) {
        console.error("Listener error:", error);
      }
    });
  }

  /**
   * Broadcast a project update to all listeners
   */
  broadcast(project) {
    if (typeof window === "undefined") return;
    
    // Dispatch custom event for same-tab sync
    const event = new CustomEvent(SYNC_EVENT, {
      detail: { project, timestamp: Date.now() },
    });
    window.dispatchEvent(event);
  }

  /**
   * Cleanup
   */
  destroy() {
    if (typeof window === "undefined") return;
    
    window.removeEventListener("storage", this.handleStorageEvent);
    window.removeEventListener(SYNC_EVENT, this.handleCustomEvent);
    this.listeners.clear();
    this.isInitialized = false;
  }
}

// Singleton instance
const syncManager = new SyncManager();

export default syncManager;
