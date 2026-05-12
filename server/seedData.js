export const initialShipmentData = [];

export const initialConsigneeData = {};

export const initialAgentsData = [];

export const initialDocuments = [];

export const initialNotifications = [];

export const initialSettings = {
  darkMode: false,
  emailNotifications: true,
  pushNotifications: true,
  soundAlerts: false,
  autoRefresh: true,
  language: "en",
  dateFormat: "MMM-DD-YYYY",
  timezone: "Asia/Ho_Chi_Minh",
  tableFacingMode: "urgency",
  shipmentViewMode: "table",
  consigneeViewMode: "table",
  agentViewMode: "table",
  notificationViewMode: "table",
  hiddenShipmentColumns: [],
  tableSorts: {
    shipments: { key: "eta", direction: "asc" },
    agents: { key: "agent", direction: "asc" },
    consignees: { key: "consignee", direction: "asc" },
    notifications: { key: "time", direction: "desc" }
  }
};

export const buildInitialData = () => ({
  shipments: initialShipmentData,
  consignees: initialConsigneeData,
  agentsData: initialAgentsData,
  documents: initialDocuments,
  notifications: initialNotifications,
  settings: initialSettings,
  activityLogs: [],
  shipmentNotes: {}
});
