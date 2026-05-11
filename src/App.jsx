import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Ship, Plane, Package, X, Search, Filter, Plus, Edit2, Save, User, Building, Phone, Mail, MapPin, FileText, Trash2, Menu, LayoutGrid, Table, Home, Users, Settings, BarChart3, FileBox, Bell, HelpCircle, LogOut, ChevronLeft, ChevronRight, TrendingUp, Calendar, Globe, AlertCircle, CheckCircle, Clock, Download, Upload, Printer, FileSpreadsheet, FilePlus, BellRing, BellOff, Moon, Sun, Lock, Database, Palette, Volume2, VolumeX, Briefcase, Flag, Hash, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const initialShipmentData = [
  { id: 1, mbl: "JJCSHSGY404651", hbl: "NEOSHA24100133", type: "40'DC HQ", pol: "SHANGHAI, CHINA", pod: "CATLAI, HCM", shipper: "ANJI ZIRUI TRADING CO.,LTD", cnee: "HERUI", etd: "2025-10-22", eta: "2025-10-28", term: "FOB", status: "DONE!", agent: "NEO SHA", year: 2025 },
  { id: 2, mbl: "ESSASEL24112560", hbl: "LINK2411008", type: "LCL", pol: "BUSAN, KOREA", pod: "CATLAI, HCM", shipper: "DK FINECHEMICAL", cnee: "AN KIEN THANH", etd: "2025-11-29", eta: "2025-12-06", term: "CIF", status: "DONE!", agent: "LINKONE KOR", year: 2025 },
  { id: 3, mbl: "AMIGL240578329A", hbl: "NEOSHA24120058", type: "LCL", pol: "SHANGHAI, CHINA", pod: "CATLAI, HCM", shipper: "RICH SILK", cnee: "LIM VINA PRO", etd: "2025-12-09", eta: "2025-12-12", term: "FOB", status: "SOA - DONE!", agent: "NEO SHA", year: 2025 },
  { id: 4, mbl: "AMIGL240586898A", hbl: "NEOSHA24120117", type: "LCL", pol: "SHANGHAI, CHINA", pod: "CATLAI, HCM", shipper: "SUZHOU HENGYUAN", cnee: "LIM VINA PRO", etd: "2025-12-12", eta: "~17 Dec", term: "FOB", status: "SOA - DONE!", agent: "NEO SHA", year: 2025 },
  { id: 5, mbl: "NSSLBSHPC2402307", hbl: "LINK2412007", type: "20DC x 20", pol: "BUSAN, KOREA", pod: "HAI PHONG", shipper: "TKG HUCHEMS CO., LTD", cnee: "13 MECHANIC / HUNGAN", etd: "2025-12-15", eta: "2025-12-24", term: "CIF", status: "DONE!", agent: "LINKONE KOR", year: 2025 },
  { id: 6, mbl: "AMIGL240612288A", hbl: "NEOSHA24120229", type: "LCL", pol: "SHANGHAI, CHINA", pod: "CATLAI, HCM", shipper: "SUZHOU HENGYUAN", cnee: "LIM VINA PRO", etd: "2025-12-28", eta: "2025-12-31", term: "FOB", status: "DONE! - DELIVERED 06 Jan", agent: "NEO SHA", year: 2025 },
  { id: 7, mbl: "738-00224733", hbl: "NEASH2501002", type: "AIR", pol: "PVG - SHANGHAI", pod: "SGN, HCM", shipper: "SUZHOU HENGYUAN", cnee: "LIM VINA PRO", etd: "2025-01-03", eta: "2025-01-03", term: "CIF", status: "DONE!", agent: "NEO SHA", year: 2025 },
  { id: 8, mbl: "NSSLBSHPC2500054", hbl: "LINK2501003", type: "20DC x 15", pol: "BUSAN, KOREA", pod: "HAI PHONG", shipper: "TKG HUCHEMS CO., LTD", cnee: "HUNGAN", etd: "2025-01-14", eta: "2025-01-22", term: "CIF", status: "Done!", agent: "LINKONE KOR", year: 2025 },
  { id: 9, mbl: "AMIGL250004345A", hbl: "NEOSHA25010123", type: "LCL", pol: "SHANGHAI, CHINA", pod: "CATLAI, HCM", shipper: "SUZHOU HENGYUAN", cnee: "LIM VINA PRO", etd: "2025-01-14", eta: "2025-01-23", term: "FOB", status: "DONE!", agent: "NEO SHA", year: 2025 },
  { id: 10, mbl: "NSSLBSHPC2500066", hbl: "LINK2501004", type: "20DC x 10", pol: "BUSAN, KOREA", pod: "HAI PHONG", shipper: "GREENCHEM CORP", cnee: "AHH JOINT STOCK", etd: "2025-01-16", eta: "2025-01-22", term: "CIF", status: "Done!", agent: "LINKONE KOR", year: 2025 },
  { id: 22, mbl: "NSSLBSHPC2500642", hbl: "LINK2504002", type: "20DC x 15", pol: "BUSAN, KOREA", pod: "HP-> HCM", shipper: "GREENCHEM CORP", cnee: "AHH JOINT STOCK", etd: "2026-04-03", eta: "2026-04-08", term: "CIF", status: "DELIVERING", agent: "LINKONE KOR", year: 2026 },
  { id: 23, mbl: "NSSLBSHPC2500711", hbl: "LINK2504005", type: "20DC x 5", pol: "BUSAN, KOREA", pod: "HP-> HCM", shipper: "GREENCHEM CORP", cnee: "AHH JOINT STOCK", etd: "2026-04-10", eta: "2026-04-18", term: "CIF", status: "IN TRANSIT", agent: "LINKONE KOR", year: 2026 },
  { id: 46, mbl: "HASLK01251107311", hbl: "LSTN2512001", type: "1X40'H", pol: "BUSAN, KOREA", pod: "CATLAI, HCM", shipper: "SYPOLYTECH CO., LTD", cnee: "LS CABLE & SYSTEM", etd: "2025-12-03", eta: "2025-12-08", term: "CIF", status: "DONE", agent: "LOGISTONE", year: 2025 },
  { id: 53, mbl: "HASLK01260103549", hbl: "ANCLSGN26010001", type: "1X20FT + 2X40'HQ", pol: "BUSAN, KOREA", pod: "CATLAI, HCM", shipper: "DAECHANG CORP", cnee: "THANG LOI IMPORT-EXPORT", etd: "2026-01-31", eta: "2026-02-05", term: "CIF", status: "DONE", agent: "ANC INTL", year: 2026 },
  { id: 63, mbl: "HASLK01260400018", hbl: "LSTN26040002", type: "1x20GP", pol: "PYEONGTAEK, KOREA", pod: "HAI PHONG", shipper: "SY POLYTECH CO., LTD.", cnee: "LS-VINA CABLE", etd: "2026-04-13", eta: "2026-04-18", term: "CIF", status: "IN PROGRESS", agent: "LOGISTONE", year: 2026 },
  { id: 66, mbl: "KMTCINC5342250", hbl: "DSN26040038", type: "1X40'H", pol: "INCHEON, KOREA", pod: "CATLAI, HCM", shipper: "KCONN CO., LTD.", cnee: "KM TECH ELECTRONICS CO,LTD", etd: "2026-04-18", eta: "2026-04-29", term: "DAP", status: "DONE", agent: "DAESUNG-DSL", year: 2026 },
  { id: 68, mbl: "POBUPUS260481036", hbl: "ANCLSGN26040002", type: "4x40'H", pol: "BUSAN, KOREA", pod: "CATLAI, HCM", shipper: "DAECHANG CORP", cnee: "THANG LOI IMPORT-EXPORT", etd: "2026-04-26", eta: "2026-05-02", term: "CIF", status: "IN PROGRESS", agent: "ANC INTL", year: 2026 },
  { id: 69, mbl: "AMIGL260181014A", hbl: "NEOSHA26040170", type: "LCL", pol: "SHANGHAI, CHINA", pod: "CATLAI, HCM", shipper: "RICH SILK TEXTILES LIMITED", cnee: "LIM VINA PRO", etd: "2026-05-06", eta: "2026-05-10", term: "FOB", status: "IN PROGRESS", agent: "NEO SHA", year: 2026 },
  { id: 70, mbl: "HASLK01260406548", hbl: "LSTN26050001", type: "1X40'H", pol: "BUSAN, KOREA", pod: "CATLAI, HCM", shipper: "SYPOLYTECH CO., LTD", cnee: "LS CABLE & SYSTEM", etd: "2026-05-09", eta: "2026-05-15", term: "CIF", status: "PENDING", agent: "LOGISTONE", year: 2026 },
  { id: 71, mbl: "AMIGL260202415A", hbl: "NEOSHA26050050", type: "LCL", pol: "SHANGHAI, CHINA", pod: "HAI PHONG", shipper: "MEIFAN INTL", cnee: "PGS VINA CO., LTD", etd: "2026-05-09", eta: "2026-05-16", term: "CNF", status: "PENDING", agent: "NEO SHA", year: 2026 },
];

const initialConsigneeData = {
  "LIM VINA PRO": { id: 1, name: "LIM VINA PRO", contact: "Mr. Lim", phone: "+84 28 1234 5678", email: "contact@limvina.com", address: "123 Industrial Zone, Binh Duong", taxId: "0123456789", notes: "Regular customer, prefers morning delivery", totalShipments: 25, lastShipment: "2026-05-10", status: "active" },
  "LS CABLE & SYSTEM": { id: 2, name: "LS CABLE & SYSTEM", contact: "Ms. Nguyen", phone: "+84 28 9876 5432", email: "import@lscable.vn", address: "456 Tech Park, HCMC", taxId: "9876543210", notes: "Large volume customer", totalShipments: 12, lastShipment: "2026-05-15", status: "active" },
  "HUNGAN": { id: 3, name: "HUNGAN", contact: "Mr. Hung", phone: "+84 24 5555 1234", email: "hungan@company.vn", address: "789 Hai Phong Industrial", taxId: "5555666677", notes: "", totalShipments: 8, lastShipment: "2026-01-22", status: "active" },
  "AHH JOINT STOCK": { id: 4, name: "AHH JOINT STOCK", contact: "Ms. Anh", phone: "+84 28 7777 8888", email: "import@ahh.vn", address: "District 7, HCMC", taxId: "1234567890", notes: "Chemical imports", totalShipments: 15, lastShipment: "2026-04-18", status: "active" },
  "THANG LOI IMPORT-EXPORT": { id: 5, name: "THANG LOI IMPORT-EXPORT", contact: "Mr. Thang", phone: "+84 28 3333 4444", email: "import@thangloi.vn", address: "District 2, HCMC", taxId: "2233445566", notes: "Steel and metal imports", totalShipments: 6, lastShipment: "2026-05-02", status: "active" },
  "PGS VINA CO., LTD": { id: 6, name: "PGS VINA CO., LTD", contact: "Ms. Phuong", phone: "+84 24 6666 7777", email: "logistics@pgsvina.com", address: "Hai Phong Port Area", taxId: "3344556677", notes: "Textile materials", totalShipments: 5, lastShipment: "2026-05-16", status: "active" },
  "BUMHAN CABLE": { id: 7, name: "BUMHAN CABLE", contact: "Mr. Kim", phone: "+84 236 888 9999", email: "import@bumhan.vn", address: "Da Nang Industrial Zone", taxId: "4455667788", notes: "Cable and wire imports", totalShipments: 4, lastShipment: "2025-12-17", status: "inactive" },
  "KM TECH ELECTRONICS CO,LTD": { id: 8, name: "KM TECH ELECTRONICS CO,LTD", contact: "Mr. Minh", phone: "+84 28 2222 3333", email: "procurement@kmtech.vn", address: "Thu Duc City, HCMC", taxId: "5566778899", notes: "Electronic components", totalShipments: 1, lastShipment: "2026-04-29", status: "active" },
};

const initialAgentsData = [
  { id: 1, name: "NEO SHA", code: "NEOSHA", country: "China", city: "Shanghai", contact: "Mr. Wang", phone: "+86 21 5555 1234", email: "operations@neosha.cn", address: "Room 1205, Shipping Tower, Pudong, Shanghai", services: ["LCL", "FCL", "AIR"], status: "active", colorKey: "blue" },
  { id: 2, name: "LINKONE KOR", code: "LINK", country: "Korea", city: "Busan", contact: "Mr. Park", phone: "+82 51 777 8888", email: "booking@linkone.kr", address: "15F, Marine Center, Busan Port", services: ["FCL", "LCL"], status: "active", colorKey: "emerald" },
  { id: 3, name: "LOGISTONE", code: "LSTN", country: "Korea", city: "Busan/Pyeongtaek", contact: "Ms. Kim", phone: "+82 31 555 6666", email: "import@logistone.kr", address: "Logistics Hub, Pyeongtaek Port", services: ["FCL", "LCL"], status: "active", colorKey: "purple" },
  { id: 4, name: "ANC INTL", code: "ANCL", country: "Korea", city: "Busan", contact: "Mr. Lee", phone: "+82 51 333 4444", email: "sales@anc-intl.kr", address: "Trade Center, Busan", services: ["FCL", "LCL", "AIR"], status: "active", colorKey: "orange" },
  { id: 5, name: "DAESUNG-DSL", code: "DSN", country: "Korea", city: "Incheon", contact: "Mr. Choi", phone: "+82 32 888 9999", email: "ops@daesung-dsl.kr", address: "Port Office Building, Incheon", services: ["FCL"], status: "active", colorKey: "rose" },
  { id: 6, name: "NEO SHENZHEN", code: "NEOSZX", country: "China", city: "Shenzhen", contact: "Ms. Chen", phone: "+86 755 2222 3333", email: "shenzhen@neo.cn", address: "Shekou Port Area, Shenzhen", services: ["LCL", "FCL"], status: "active", colorKey: "cyan" },
  { id: 7, name: "WOOSUNG A&S", code: "WSAS", country: "Korea", city: "Busan", contact: "Mr. Jung", phone: "+82 51 444 5555", email: "info@woosung-as.kr", address: "Maritime Building, Busan", services: ["FCL", "LCL"], status: "inactive", colorKey: "amber" },
];

const initialDocuments = [
  { id: 1, name: "Bill of Lading - NEOSHA26040170", type: "B/L", shipmentHbl: "NEOSHA26040170", uploadDate: "2026-05-01", size: "245 KB", status: "verified" },
  { id: 2, name: "Commercial Invoice - LSTN26050001", type: "Invoice", shipmentHbl: "LSTN26050001", uploadDate: "2026-05-08", size: "128 KB", status: "pending" },
  { id: 3, name: "Packing List - LINK2504005", type: "Packing List", shipmentHbl: "LINK2504005", uploadDate: "2026-04-05", size: "89 KB", status: "verified" },
  { id: 4, name: "Certificate of Origin - ANCLSGN26040002", type: "C/O", shipmentHbl: "ANCLSGN26040002", uploadDate: "2026-04-20", size: "156 KB", status: "verified" },
  { id: 5, name: "Insurance Certificate - NEOSHA26050050", type: "Insurance", shipmentHbl: "NEOSHA26050050", uploadDate: "2026-05-07", size: "112 KB", status: "pending" },
  { id: 6, name: "Customs Declaration - LSTN26040002", type: "Customs", shipmentHbl: "LSTN26040002", uploadDate: "2026-04-15", size: "198 KB", status: "verified" },
];

const initialNotifications = [
  { id: 1, type: "arrival", title: "Shipment Arriving Soon", message: "LSTN26050001 ETA: May 15, 2026", time: "2 hours ago", read: false, shipmentId: 70 },
  { id: 2, type: "status", title: "Status Updated", message: "NEOSHA26040170 changed to IN PROGRESS", time: "5 hours ago", read: false, shipmentId: 69 },
  { id: 3, type: "document", title: "Document Required", message: "Missing C/O for ANCLSGN26040002", time: "1 day ago", read: true, shipmentId: 68 },
  { id: 4, type: "delay", title: "Potential Delay", message: "LINK2504005 may be delayed due to port congestion", time: "2 days ago", read: true, shipmentId: 23 },
  { id: 5, type: "completed", title: "Shipment Completed", message: "DSN26040038 successfully delivered", time: "3 days ago", read: true, shipmentId: 66 },
  { id: 6, type: "alert", title: "Payment Reminder", message: "Invoice due for LSTN26040002", time: "4 days ago", read: true, shipmentId: 63 },
];

const defaultSettings = {
  darkMode: false,
  emailNotifications: true,
  pushNotifications: true,
  soundAlerts: false,
  autoRefresh: true,
  language: "en",
  dateFormat: "DD-MM-YYYY",
  timezone: "Asia/Ho_Chi_Minh",
  tableFacingMode: "urgency",
  shipmentViewMode: "table",
  consigneeViewMode: "table",
  agentViewMode: "table",
  notificationViewMode: "table",
  tableSorts: {
    shipments: { key: "eta", direction: "asc" },
    agents: { key: "agent", direction: "asc" },
    consignees: { key: "consignee", direction: "asc" },
    notifications: { key: "time", direction: "desc" }
  }
};

const colorOptions = [
  { key: "blue", bg: "bg-blue-500", light: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  { key: "emerald", bg: "bg-emerald-500", light: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
  { key: "purple", bg: "bg-purple-500", light: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  { key: "orange", bg: "bg-orange-500", light: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  { key: "rose", bg: "bg-rose-500", light: "bg-rose-50", border: "border-rose-200", text: "text-rose-700" },
  { key: "cyan", bg: "bg-cyan-500", light: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700" },
  { key: "amber", bg: "bg-amber-500", light: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
  { key: "indigo", bg: "bg-indigo-500", light: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" },
  { key: "teal", bg: "bg-teal-500", light: "bg-teal-50", border: "border-teal-200", text: "text-teal-700" },
  { key: "pink", bg: "bg-pink-500", light: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
];

const getAgentColors = (colorKey) => {
  const color = colorOptions.find(c => c.key === colorKey) || colorOptions[0];
  return color;
};

const getStableAgentColors = (seed) => {
  const normalized = (seed || '').toString().trim().toLowerCase();
  if (!normalized) return colorOptions[0];

  let hash = 0;
  for (let index = 0; index < normalized.length; index += 1) {
    hash = (hash * 31 + normalized.charCodeAt(index)) >>> 0;
  }

  return colorOptions[hash % colorOptions.length];
};

const getStatusColor = (status) => {
  const s = status.toLowerCase();
  if (s.includes('done') || s.includes('delivered')) return 'bg-green-100 text-green-800 border-green-200';
  if (s.includes('progress') || s.includes('delivering') || s.includes('transit')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (s.includes('pending')) return 'bg-gray-100 text-gray-800 border-gray-200';
  return 'bg-blue-100 text-blue-800 border-blue-200';
};

const getShipmentIcon = (type) => {
  if (type.toUpperCase().includes('AIR')) return <Plane className="w-4 h-4" />;
  if (type.includes('LCL')) return <Package className="w-4 h-4" />;
  return <Ship className="w-4 h-4" />;
};

const isCompleted = (status) => {
  const s = status.toLowerCase();
  return s.includes('done') || s.includes('delivered') || s.includes('completed');
};

const formatDate = (dateString, format = 'YYYY-MM-DD') => {
  // Handle relative time strings (e.g., "2 hours ago", "1 day ago")
  if (dateString && (dateString.includes('ago') || dateString.includes('hour') || dateString.includes('day'))) {
    return dateString;
  }
  
  if (!dateString) return '';
  
  try {
    // Parse the date - assuming input format is YYYY-MM-DD or similar ISO format
    const date = new Date(dateString + 'T00:00:00Z');
    if (isNaN(date.getTime())) return dateString;
    
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    if (format === 'DD-MM-YYYY') {
      return `${day}-${month}-${year}`;
    } else if (format === 'DD/MM/YYYY') {
      return `${day}/${month}/${year}`;
    } else if (format === 'MM/DD/YYYY') {
      return `${month}/${day}/${year}`;
    } else {
      // Default to YYYY-MM-DD
      return `${year}-${month}-${day}`;
    }
  } catch (e) {
    return dateString;
  }
};

const getTimeRemaining = (etaString, status) => {
  // If shipment is already completed, show "Completed"
  if (status && isCompleted(status)) {
    return 'Completed';
  }
  
  if (!etaString) return '-';
  
  try {
    // Parse the ETA date
    const etaDate = new Date(etaString + 'T00:00:00Z');
    if (isNaN(etaDate.getTime())) return '-';
    
    // Get current date/time in UTC
    const now = new Date();
    const currentUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    
    // Calculate difference in milliseconds
    const diffMs = etaDate - currentUTC;
    
    // If already passed
    if (diffMs < 0) {
      return 'Overdue';
    }
    
    // Convert to days, hours, minutes
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    // Return appropriate format
    if (diffDays >= 1) {
      return `${diffDays}d`;
    } else if (diffHours > 0) {
      return `${diffHours}h`;
    } else {
      return `${diffMinutes}m`;
    }
  } catch (e) {
    return '-';
  }
};

const toSearchText = (value) => (value ?? '').toString().trim().toLowerCase();

const normalizeSettings = (value) => {
  const incoming = value && typeof value === 'object' ? value : {};
  return {
    ...defaultSettings,
    ...incoming,
    tableSorts: {
      ...defaultSettings.tableSorts,
      ...(incoming.tableSorts && typeof incoming.tableSorts === 'object' ? incoming.tableSorts : {})
    }
  };
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizeClasses = {
    sm: "w-[min(96vw,34rem)]",
    md: "w-[min(96vw,48rem)]",
    lg: "w-[min(96vw,64rem)]",
    xl: "w-[min(96vw,78rem)]"
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className={`${sizeClasses[size]} max-h-[calc(100vh-1.5rem)] overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl shadow-slate-900/30 animate-in zoom-in-95 duration-300`}> 
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Shipment workspace</p>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-[calc(100vh-7rem)] overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText, confirmColor }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-2xl border border-white/70 bg-white p-6 shadow-2xl shadow-slate-900/25">
        <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mb-6 text-slate-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100">Cancel</button>
          <button onClick={onConfirm} className={`rounded-lg px-4 py-2 text-white ${confirmColor || 'bg-blue-600 hover:bg-blue-700'}`}>{confirmText || 'Confirm'}</button>
        </div>
      </div>
    </div>
  );
};

export default function ShipmentTracker() {
  const [shipments, setShipments] = useState(initialShipmentData);
  const [consignees, setConsignees] = useState(initialConsigneeData);
  const [agentsData, setAgentsData] = useState(initialAgentsData);
  const [documents, setDocuments] = useState(initialDocuments);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activityLogs, setActivityLogs] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showActive, setShowActive] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [consigneeSearch, setConsigneeSearch] = useState('');
  const [agentSearch, setAgentSearch] = useState('');

  const [showConsigneeModal, setShowConsigneeModal] = useState(false);
  const [selectedConsignee, setSelectedConsignee] = useState(null);
  const [editingConsignee, setEditingConsignee] = useState(null);
  const [consigneeForm, setConsigneeForm] = useState({ name: '', contact: '', phone: '', email: '', address: '', taxId: '', notes: '', status: 'active' });

  const [showShipmentModal, setShowShipmentModal] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);
  const [shipmentForm, setShipmentForm] = useState({ mbl: '', hbl: '', type: 'LCL', pol: '', pod: '', shipper: '', cnee: '', etd: '', eta: '', term: 'FOB', status: 'PENDING', agent: '', year: 2026 });

  const [showAgentModal, setShowAgentModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [agentForm, setAgentForm] = useState({ name: '', code: '', country: '', city: '', contact: '', phone: '', email: '', address: '', services: [], status: 'active', colorKey: 'blue' });

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null, confirmText: '', confirmColor: '' });
  const [settings, setSettings] = useState(() => ({ ...defaultSettings }));
  const [isHydrated, setIsHydrated] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [highlightedShipmentId, setHighlightedShipmentId] = useState(null);
  const [highlightedAgentId, setHighlightedAgentId] = useState(null);
  const [highlightedConsigneeName, setHighlightedConsigneeName] = useState(null);
  const fileInputRef = useRef(null);

  const viewMode = settings.shipmentViewMode || 'card';
  const consigneeViewMode = settings.consigneeViewMode || 'card';
  const agentViewMode = settings.agentViewMode || 'card';
  const notificationViewMode = settings.notificationViewMode || 'card';
  const tableFacingMode = settings.tableFacingMode || 'customer';
  const isUrgencyFacing = tableFacingMode === 'urgency';
  const tableSorts = settings.tableSorts || defaultSettings.tableSorts;

  const sortItems = (items, sortConfig, getValue) => {
    const list = [...items];
    const key = sortConfig?.key;
    const direction = sortConfig?.direction === 'desc' ? 'desc' : 'asc';
    if (!key) return list;

    list.sort((left, right) => {
      const leftValue = getValue(left, key);
      const rightValue = getValue(right, key);

      const leftNumber = typeof leftValue === 'number' ? leftValue : Number.NaN;
      const rightNumber = typeof rightValue === 'number' ? rightValue : Number.NaN;
      let comparison = 0;

      if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
        comparison = leftNumber - rightNumber;
      } else {
        const leftText = toSearchText(leftValue);
        const rightText = toSearchText(rightValue);
        comparison = leftText.localeCompare(rightText);
      }

      return direction === 'desc' ? -comparison : comparison;
    });

    return list;
  };

  const updateTableSort = (tableName, sortKey) => {
    setSettings(prev => {
      const previousSort = prev.tableSorts?.[tableName] || defaultSettings.tableSorts[tableName] || { key: sortKey, direction: 'asc' };
      const nextDirection = previousSort.key === sortKey && previousSort.direction === 'asc' ? 'desc' : 'asc';
      return {
        ...prev,
        tableSorts: {
          ...defaultSettings.tableSorts,
          ...(prev.tableSorts || {}),
          [tableName]: { key: sortKey, direction: nextDirection }
        }
      };
    });
  };

  const renderSortArrow = (tableName, sortKey) => {
    const active = tableSorts?.[tableName]?.key === sortKey;
    if (!active) return null;
    return tableSorts[tableName]?.direction === 'desc'
      ? <ChevronDown className="w-4 h-4 text-blue-600" />
      : <ChevronUp className="w-4 h-4 text-blue-600" />;
  };

  const buildPayload = () => ({
    shipments,
    consignees,
    agentsData,
    documents,
    notifications,
    settings,
    activityLogs
  });

  useEffect(() => {
    const loadFromApi = async () => {
      try {
        const res = await fetch('/api/data');
        if (!res.ok) throw new Error('Failed to load data from API');
        const data = await res.json();
        setShipments(Array.isArray(data.shipments) ? data.shipments : initialShipmentData);
        setConsignees(data.consignees && typeof data.consignees === 'object' ? data.consignees : initialConsigneeData);
        setAgentsData(Array.isArray(data.agentsData) ? data.agentsData : initialAgentsData);
        setDocuments(Array.isArray(data.documents) ? data.documents : initialDocuments);
        setNotifications(Array.isArray(data.notifications) ? data.notifications : initialNotifications);
        setActivityLogs(Array.isArray(data.activityLogs) ? data.activityLogs : []);
        setSettings(normalizeSettings(data.settings));
      } catch (error) {
        setSyncMessage(error.message || 'Using local data because backend load failed.');
      } finally {
        setIsHydrated(true);
      }
    };

    loadFromApi();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const timeoutId = setTimeout(async () => {
      try {
        await fetch('/api/data', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildPayload())
        });
      } catch {
        setSyncMessage('Auto-save failed. Changes are still in memory.');
      }
    }, 450);

    return () => clearTimeout(timeoutId);
  }, [shipments, consignees, agentsData, documents, notifications, settings, activityLogs, isHydrated]);

  useEffect(() => {
    if (!syncMessage) return undefined;

    const timeoutId = setTimeout(() => setSyncMessage(''), 2500);
    return () => clearTimeout(timeoutId);
  }, [syncMessage]);

  useEffect(() => {
    if (activeMenu === 'shipments') {
      setSelectedAgent(null);
    }
  }, [activeMenu]);

  const handleExportData = async () => {
    const response = await fetch('/api/export');
    if (!response.ok) {
      setSyncMessage('Export failed.');
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shipment-tracker-export-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const response = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });

      if (!response.ok) throw new Error('Import failed. Check JSON format.');
      const { data } = await response.json();

      setShipments(Array.isArray(data.shipments) ? data.shipments : []);
      setConsignees(data.consignees && typeof data.consignees === 'object' ? data.consignees : {});
      setAgentsData(Array.isArray(data.agentsData) ? data.agentsData : []);
      setDocuments(Array.isArray(data.documents) ? data.documents : []);
      setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
      setSettings(normalizeSettings(data.settings));
      setSyncMessage('Import completed.');
    } catch (error) {
      setSyncMessage(error.message || 'Import failed.');
    } finally {
      event.target.value = '';
    }
  };

  const handleDeleteAllData = async () => {
    const confirmed = window.confirm('Delete all data from the database? This cannot be undone.');
    if (!confirmed) return;

    const response = await fetch('/api/data', { method: 'DELETE' });
    if (!response.ok) {
      setSyncMessage('Delete all failed.');
      return;
    }

    setShipments([]);
    setConsignees({});
    setAgentsData([]);
    setDocuments([]);
    setNotifications([]);
    setSyncMessage('All data deleted.');
  };

  const handleResetSeedData = async () => {
    const response = await fetch('/api/reset', { method: 'POST' });
    if (!response.ok) {
      setSyncMessage('Reset failed.');
      return;
    }

    const { data } = await response.json();
    setShipments(Array.isArray(data.shipments) ? data.shipments : initialShipmentData);
    setConsignees(data.consignees && typeof data.consignees === 'object' ? data.consignees : initialConsigneeData);
    setAgentsData(Array.isArray(data.agentsData) ? data.agentsData : initialAgentsData);
    setDocuments(Array.isArray(data.documents) ? data.documents : initialDocuments);
    setNotifications(Array.isArray(data.notifications) ? data.notifications : initialNotifications);
    setSettings(normalizeSettings(data.settings));
    setSyncMessage('Seed data restored.');
  };

  const menuItems = [
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: notifications.filter(n => !n.read).length },
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'shipments', icon: Ship, label: 'Shipments' },
    { id: 'agents', icon: Briefcase, label: 'Agents' },
    { id: 'consignees', icon: Users, label: 'Consignees' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'documents', icon: FileBox, label: 'Documents' },
  ];

  const bottomMenuItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  const agentColors = useMemo(() => {
    const colors = {};
    agentsData.forEach(agent => {
      colors[agent.name] = getAgentColors(agent.colorKey);
      colors[agent.code] = getAgentColors(agent.colorKey);
    });
    return colors;
  }, [agentsData]);

  const resolveAgentColors = (agentName) => agentColors[agentName] || getStableAgentColors(agentName);

  const agents = useMemo(() => {
    const agentMap = {};
    shipments.forEach(shipment => {
      if (!agentMap[shipment.agent]) {
        agentMap[shipment.agent] = { name: shipment.agent, shipments: [], countries: new Set() };
      }
      agentMap[shipment.agent].shipments.push(shipment);
      if (shipment.pol.includes('CHINA') || shipment.pol.includes('SHANGHAI') || shipment.pol.includes('SHENZHEN')) agentMap[shipment.agent].countries.add('China');
      if (shipment.pol.includes('KOREA') || shipment.pol.includes('BUSAN') || shipment.pol.includes('INCHEON') || shipment.pol.includes('PYEONGTAEK')) agentMap[shipment.agent].countries.add('Korea');
    });
    return Object.values(agentMap).map(a => ({ ...a, countries: Array.from(a.countries) }));
  }, [shipments]);

  const filteredShipments = useMemo(() => {
    let result = selectedAgent ? shipments.filter(s => s.agent === selectedAgent.name) : shipments;
    if (selectedYear !== 'all') result = result.filter(s => s.year === parseInt(selectedYear));
    const term = toSearchText(searchTerm);
    if (term) {
      result = result.filter(s => {
        const searchableFields = [s.hbl, s.mbl, s.shipper, s.cnee, s.agent, s.pol, s.pod, s.term, s.status, s.type, s.etd, s.eta, s.year];
        return searchableFields.some(field => toSearchText(field).includes(term));
      });
    }
    return result;
  }, [shipments, selectedAgent, searchTerm, selectedYear]);

  const filteredConsignees = useMemo(() => {
    let result = Object.values(consignees);
    const term = toSearchText(consigneeSearch);
    if (term) {
      result = result.filter(c => {
        const searchableFields = [c.name, c.contact, c.phone, c.email, c.address, c.taxId, c.notes, c.status, c.lastShipment];
        return searchableFields.some(field => toSearchText(field).includes(term));
      });
    }
    return result;
  }, [consignees, consigneeSearch]);

  const filteredAgents = useMemo(() => {
    let result = agentsData;
    const term = toSearchText(agentSearch);
    if (term) {
      result = result.filter(a => {
        const searchableFields = [a.name, a.code, a.country, a.city, a.contact, a.phone, a.email, a.address, a.status, ...(a.services || [])];
        return searchableFields.some(field => toSearchText(field).includes(term));
      });
    }
    return result;
  }, [agentsData, agentSearch]);

  const pendingShipments = useMemo(() => filteredShipments.filter(s => !isCompleted(s.status)), [filteredShipments]);
  const completedShipments = useMemo(() => filteredShipments.filter(s => isCompleted(s.status)), [filteredShipments]);

  const getShipmentSortValue = (shipment, key) => {
    if (key === 'status') return shipment.status;
    if (key === 'eta') return Date.parse(shipment.eta) || shipment.eta;
    if (key === 'days') {
      // Sort by actual numeric days remaining
      const etaDate = new Date(shipment.eta + 'T00:00:00Z');
      const now = new Date();
      const currentUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
      const diffMs = etaDate - currentUTC;
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }
    if (key === 'hblmbl') return `${shipment.hbl || ''} ${shipment.mbl || ''}`;
    if (key === 'shipper') return shipment.shipper;
    if (key === 'consignee') return shipment.cnee;
    if (key === 'pol') return shipment.pol;
    if (key === 'pod') return shipment.pod;
    if (key === 'agent') return shipment.agent;
    if (key === 'type') return shipment.type;
    return shipment[key];
  };

  const getAgentSortValue = (agent, key) => {
    if (key === 'status') return agent.status;
    if (key === 'agent') return agent.name;
    if (key === 'createdAt') return Date.parse(agent.createdAt) || agent.createdAt || '';
    if (key === 'updatedAt') return Date.parse(agent.updatedAt) || agent.updatedAt || '';
    if (key === 'country') return agent.country;
    if (key === 'city') return agent.city;
    if (key === 'services') return Array.isArray(agent.services) ? agent.services.join(', ') : '';
    if (key === 'contact') return agent.contact;
    if (key === 'email') return agent.email;
    return agent[key];
  };

  const getConsigneeSortValue = (consignee, key) => {
    if (key === 'status') return consignee.status;
    if (key === 'consignee') return consignee.name;
    if (key === 'createdAt') return Date.parse(consignee.createdAt) || consignee.createdAt || '';
    if (key === 'updatedAt') return Date.parse(consignee.updatedAt) || consignee.updatedAt || '';
    if (key === 'contact') return consignee.contact;
    if (key === 'phone') return consignee.phone;
    if (key === 'email') return consignee.email;
    if (key === 'address') return consignee.address;
    if (key === 'shipments') return Number(consignee.totalShipments || 0);
    return consignee[key];
  };

  const pendingShipmentsForTable = useMemo(
    () => sortItems(pendingShipments, tableSorts.shipments, getShipmentSortValue),
    [pendingShipments, tableSorts]
  );

  const completedShipmentsForTable = useMemo(
    () => sortItems(completedShipments, tableSorts.shipments, getShipmentSortValue),
    [completedShipments, tableSorts]
  );

  const pendingShipmentsForCard = useMemo(
    () => [...pendingShipments].sort((a, b) => new Date(a.eta) - new Date(b.eta)),
    [pendingShipments]
  );

  const completedShipmentsForCard = useMemo(
    () => [...completedShipments].sort((a, b) => new Date(b.eta) - new Date(a.eta)),
    [completedShipments]
  );

  const agentsForTable = useMemo(
    () => sortItems(filteredAgents, tableSorts.agents, getAgentSortValue),
    [filteredAgents, tableSorts]
  );

  const consigneesForTable = useMemo(
    () => sortItems(filteredConsignees, tableSorts.consignees, getConsigneeSortValue),
    [filteredConsignees, tableSorts]
  );

  const stats = useMemo(() => {
    const target = selectedAgent ? shipments.filter(s => s.agent === selectedAgent.name) : shipments;
    const done = target.filter(s => isCompleted(s.status)).length;
    const inProgress = target.filter(s => { const status = s.status.toLowerCase(); return status.includes('progress') || status.includes('delivering') || status.includes('transit'); }).length;
    return { total: target.length, done, inProgress, pending: target.length - done - inProgress };
  }, [shipments, selectedAgent]);

  const agentChartData = useMemo(() => agents.map(agent => ({ name: agent.name, shipments: agent.shipments.length, completed: agent.shipments.filter(s => isCompleted(s.status)).length, active: agent.shipments.filter(s => !isCompleted(s.status)).length })), [agents]);
  const monthlyData = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => { const monthShipments = shipments.filter(s => new Date(s.eta).getMonth() === idx); return { name: month, total: monthShipments.length, completed: monthShipments.filter(s => isCompleted(s.status)).length }; }), [shipments]);
  const pieData = useMemo(() => [{ name: 'Completed', value: stats.done, color: '#10B981' }, { name: 'In Progress', value: stats.inProgress, color: '#F59E0B' }, { name: 'Pending', value: stats.pending, color: '#6B7280' }], [stats]);

  const handleConsigneeClick = (cneeName, e) => {
    if (e) e.stopPropagation();
    setSelectedConsignee(cneeName);
    setEditingConsignee(consignees[cneeName] || null);
    const existing = consignees[cneeName];
    if (existing) setConsigneeForm(existing);
    else setConsigneeForm({ name: cneeName, contact: '', phone: '', email: '', address: '', taxId: '', notes: '', status: 'active' });
    setShowConsigneeModal(true);
  };

  const handleAddConsignee = () => {
    setEditingConsignee(null);
    setSelectedConsignee(null);
    setConsigneeForm({ name: '', contact: '', phone: '', email: '', address: '', taxId: '', notes: '', status: 'active' });
    setShowConsigneeModal(true);
  };

  const handleSaveConsignee = () => {
    if (editingConsignee && !hasConsigneeChanges(consigneeForm, editingConsignee)) {
      setSyncMessage('No changes to save.');
      setShowConsigneeModal(false);
      return;
    }

    setConfirmDialog({
      isOpen: true, title: editingConsignee ? 'Save Changes' : 'Add Consignee', message: editingConsignee ? 'Save these consignee details?' : 'Add this new consignee?',
      confirmText: 'Save', confirmColor: 'bg-blue-600 hover:bg-blue-700',
      onConfirm: () => {
        const today = new Date().toISOString().slice(0, 10);
        const createdAt = editingConsignee ? (editingConsignee.createdAt || '') : today;
        const updatedAt = editingConsignee ? today : (editingConsignee?.updatedAt || today);
        const newConsignee = { ...consigneeForm, id: editingConsignee?.id || Date.now(), totalShipments: editingConsignee?.totalShipments || 0, lastShipment: editingConsignee?.lastShipment || 'N/A', createdAt, updatedAt };
        if (editingConsignee) {
          const changes = [];
          Object.keys(consigneeForm).forEach(key => {
            if (consigneeForm[key] !== editingConsignee[key]) {
              changes.push(`${key}: ${editingConsignee[key]} → ${consigneeForm[key]}`);
            }
          });
          addActivityLog('consignee', 'Consignee', consigneeForm.name, 'UPDATED', changes.join(', '));
        } else {
          addActivityLog('consignee', 'Consignee', consigneeForm.name, 'CREATED', 'New consignee added');
        }
        setConsignees(prev => ({ ...prev, [consigneeForm.name]: newConsignee }));
        highlightConsignee(consigneeForm.name);
        setShowConsigneeModal(false);
        setConfirmDialog({ isOpen: false });
      }
    });
  };

  const handleDeleteConsignee = () => {
    setConfirmDialog({
      isOpen: true, title: 'Delete Consignee', message: 'This action cannot be undone. Delete this consignee?',
      confirmText: 'Delete', confirmColor: 'bg-red-600 hover:bg-red-700',
      onConfirm: () => {
        addActivityLog('consignee', 'Consignee', editingConsignee.name, 'DELETED', 'Consignee deleted', { ...editingConsignee });
        const newConsignees = { ...consignees };
        delete newConsignees[editingConsignee.name];
        setConsignees(newConsignees);
        setShowConsigneeModal(false);
        setConfirmDialog({ isOpen: false });
      }
    });
  };

  const handleAddShipment = () => {
    setEditingShipment(null);
    setShipmentForm({ mbl: '', hbl: '', type: 'LCL', pol: '', pod: '', shipper: '', cnee: '', etd: '', eta: '', term: 'FOB', status: 'PENDING', agent: selectedAgent?.name || '', year: 2026 });
    setShowShipmentModal(true);
  };

  const addActivityLog = (type, entityType, entityName, action, changes, snapshot = null) => {
    const timestamp = new Date().toLocaleString();
    const log = {
      id: Date.now(),
      timestamp,
      type,
      entityType,
      entityName,
      action,
      changes,
      ...(snapshot ? { snapshot } : {})
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  const handleActivityLogClick = (log) => {
    if (log.action === 'DELETED' && log.snapshot) {
      setConfirmDialog({
        isOpen: true,
        title: 'Undo Deletion',
        message: `Restore ${log.entityType} "${log.entityName}"?`,
        confirmText: 'Restore',
        confirmColor: 'bg-emerald-600 hover:bg-emerald-700',
        onConfirm: () => {
          setConfirmDialog({ isOpen: false });
          if (log.type === 'shipment') {
            setShipments(prev => [log.snapshot, ...prev]);
            setActivityLogs(prev => prev.filter(l => l.id !== log.id));
            highlightShipment(log.snapshot.id);
          } else if (log.type === 'agent') {
            setAgentsData(prev => [log.snapshot, ...prev]);
            setActivityLogs(prev => prev.filter(l => l.id !== log.id));
            highlightAgent(log.snapshot.id);
          } else if (log.type === 'consignee') {
            setConsignees(prev => ({ ...prev, [log.snapshot.name]: log.snapshot }));
            setActivityLogs(prev => prev.filter(l => l.id !== log.id));
            highlightConsignee(log.snapshot.name);
          }
        },
      });
      return;
    }
    if (log.type === 'shipment') {
      const shipment = shipments.find(s => s.hbl === log.entityName || s.mbl === log.entityName);
      if (shipment) {
        setActiveMenu('shipments');
        setEditingShipment(shipment);
        setShipmentForm({ ...shipment });
        setShowShipmentModal(true);
        highlightShipment(shipment.id);
      }
    } else if (log.type === 'agent') {
      const agent = agentsData.find(a => a.name === log.entityName);
      if (agent) {
        setActiveMenu('agents');
        setEditingAgent(agent);
        setAgentForm({ ...agent });
        setShowAgentModal(true);
        highlightAgent(agent.id);
      }
    } else if (log.type === 'consignee') {
      const consignee = Object.values(consignees).find(c => c.name === log.entityName);
      if (consignee) {
        setActiveMenu('consignees');
        setEditingConsignee(consignee);
        setConsigneeForm({ ...consignee });
        setShowConsigneeModal(true);
        highlightConsignee(consignee.name);
      }
    }
  };

  const handleEditShipment = (shipment, e) => {
    if (e) e.stopPropagation();
    setEditingShipment(shipment);
    setShipmentForm({ ...shipment });
    setShowShipmentModal(true);
  };

  const handleSaveShipment = () => {
    if (editingShipment && !hasShipmentChanges(shipmentForm, editingShipment)) {
      setSyncMessage('No changes to save.');
      setShowShipmentModal(false);
      return;
    }

    setConfirmDialog({
      isOpen: true, title: editingShipment ? 'Save Changes' : 'Add Shipment', message: editingShipment ? 'Save these changes?' : 'Add this new shipment?',
      confirmText: editingShipment ? 'Save' : 'Add', confirmColor: 'bg-blue-600 hover:bg-blue-700',
      onConfirm: () => {
        if (editingShipment) {
          const changes = [];
          Object.keys(shipmentForm).forEach(key => {
            if (shipmentForm[key] !== editingShipment[key]) {
              changes.push(`${key}: ${editingShipment[key]} → ${shipmentForm[key]}`);
            }
          });
          setShipments(prev => prev.map(s => s.id === editingShipment.id ? { ...shipmentForm, id: editingShipment.id } : s));
          addActivityLog('shipment', 'Shipment', shipmentForm.hbl, 'UPDATED', changes.join(', '));
          highlightShipment(editingShipment.id);
        } else {
          setShipments(prev => [...prev, { ...shipmentForm }]);
          addActivityLog('shipment', 'Shipment', shipmentForm.hbl, 'CREATED', `New shipment added`);
          highlightShipment(Date.now());
        }
        setShowShipmentModal(false);
        setConfirmDialog({ isOpen: false });
      }
    });
  };

  const handleMarkComplete = () => {
    setConfirmDialog({
      isOpen: true, title: 'Mark as Complete', message: 'Mark this shipment as DONE?',
      confirmText: 'Mark Complete', confirmColor: 'bg-green-600 hover:bg-green-700',
      onConfirm: () => { 
        setShipments(prev => prev.map(s => s.id === editingShipment.id ? { ...s, status: 'DONE!' } : s)); 
        addActivityLog('shipment', 'Shipment', editingShipment.hbl, 'MARKED COMPLETE', `Status: ${editingShipment.status} → DONE!`);
        setShowShipmentModal(false); 
        setConfirmDialog({ isOpen: false }); 
      }
    });
  };

  const handleDeleteShipment = () => {
    setConfirmDialog({
      isOpen: true, title: 'Delete Shipment', message: 'This action cannot be undone. Delete this shipment?',
      confirmText: 'Delete', confirmColor: 'bg-red-600 hover:bg-red-700',
      onConfirm: () => { 
        addActivityLog('shipment', 'Shipment', editingShipment.hbl, 'DELETED', `Shipment deleted`, { ...editingShipment });
        setShipments(prev => prev.filter(s => s.id !== editingShipment.id)); 
        setShowShipmentModal(false); 
        setConfirmDialog({ isOpen: false }); 
      }
    });
  };

  const handleAddAgent = () => {
    setEditingAgent(null);
    setAgentForm({ name: '', code: '', country: '', city: '', contact: '', phone: '', email: '', address: '', services: [], status: 'active', colorKey: 'blue' });
    setShowAgentModal(true);
  };

  const handleEditAgent = (agent, e) => {
    if (e) e.stopPropagation();
    setEditingAgent(agent);
    setAgentForm({ ...agent });
    setShowAgentModal(true);
  };

  const handleSaveAgent = () => {
    if (editingAgent && !hasAgentChanges(agentForm, editingAgent)) {
      setSyncMessage('No changes to save.');
      setShowAgentModal(false);
      return;
    }

    setConfirmDialog({
      isOpen: true, title: editingAgent ? 'Save Changes' : 'Add Agent', message: editingAgent ? 'Save these agent details?' : 'Add this new agent?',
      confirmText: 'Save', confirmColor: 'bg-blue-600 hover:bg-blue-700',
      onConfirm: () => {
        const today = new Date().toISOString().slice(0, 10);
        if (editingAgent) {
          const changes = [];
          Object.keys(agentForm).forEach(key => {
            if (key !== 'id' && JSON.stringify(agentForm[key]) !== JSON.stringify(editingAgent[key])) {
              changes.push(`${key}: ${editingAgent[key]} → ${agentForm[key]}`);
            }
          });
          setAgentsData(prev => prev.map(a => a.id === editingAgent.id ? { ...agentForm, id: editingAgent.id, createdAt: editingAgent.createdAt || a.createdAt || '', updatedAt: today } : a));
          addActivityLog('agent', 'Agent', agentForm.name, 'UPDATED', changes.join(', '));
          highlightAgent(editingAgent.id);
        } else {
          const newId = Date.now();
          setAgentsData(prev => [...prev, { ...agentForm, id: newId, createdAt: today, updatedAt: today }]);
          addActivityLog('agent', 'Agent', agentForm.name, 'CREATED', 'New agent added');
          highlightAgent(newId);
        }
        setShowAgentModal(false);
        setConfirmDialog({ isOpen: false });
      }
    });
  };

  const handleDeleteAgent = () => {
    setConfirmDialog({
      isOpen: true, title: 'Delete Agent', message: 'This will remove the agent. Existing shipments will not be affected. Continue?',
      confirmText: 'Delete', confirmColor: 'bg-red-600 hover:bg-red-700',
      onConfirm: () => { 
        addActivityLog('agent', 'Agent', editingAgent.name, 'DELETED', 'Agent deleted', { ...editingAgent });
        setAgentsData(prev => prev.filter(a => a.id !== editingAgent.id)); 
        setShowAgentModal(false); 
        setConfirmDialog({ isOpen: false }); 
      }
    });
  };

  const toggleService = (service) => {
    setAgentForm(prev => ({
      ...prev,
      services: prev.services.includes(service) ? prev.services.filter(s => s !== service) : [...prev.services, service]
    }));
  };

  const markNotificationRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllNotificationsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const hasShipmentChanges = (current, original) => {
    if (!current || !original) return true;
    const normalize = ({ id, ...rest }) => rest;
    return JSON.stringify(normalize(current)) !== JSON.stringify(normalize(original));
  };

  const hasAgentChanges = (current, original) => {
    if (!current || !original) return true;
    const normalize = (value) => ({
      name: value.name || '',
      code: value.code || '',
      country: value.country || '',
      city: value.city || '',
      contact: value.contact || '',
      phone: value.phone || '',
      email: value.email || '',
      address: value.address || '',
      status: value.status || 'active',
      colorKey: value.colorKey || 'blue',
      services: Array.isArray(value.services) ? [...value.services] : []
    });
    return JSON.stringify(normalize(current)) !== JSON.stringify(normalize(original));
  };

  const hasConsigneeChanges = (current, original) => {
    if (!current || !original) return true;
    const normalize = (value) => ({
      name: value.name || '',
      contact: value.contact || '',
      phone: value.phone || '',
      email: value.email || '',
      address: value.address || '',
      taxId: value.taxId || '',
      notes: value.notes || '',
      status: value.status || 'active'
    });
    return JSON.stringify(normalize(current)) !== JSON.stringify(normalize(original));
  };

  const highlightShipment = (id) => {
    setHighlightedShipmentId(id);
    setTimeout(() => setHighlightedShipmentId(current => (current === id ? null : current)), 2500);
  };

  const highlightAgent = (id) => {
    setHighlightedAgentId(id);
    setTimeout(() => setHighlightedAgentId(current => (current === id ? null : current)), 2500);
  };

  const highlightConsignee = (name) => {
    setHighlightedConsigneeName(name);
    setTimeout(() => setHighlightedConsigneeName(current => (current === name ? null : current)), 2500);
  };
  
  const handleNotificationClick = (notification) => {
    markNotificationRead(notification.id);
    if (notification.shipmentId) {
      setActiveMenu('shipments');
      highlightShipment(notification.shipmentId);
    }
  };

  const ShipmentCard = ({ shipment }) => {
    const colors = resolveAgentColors(shipment.agent);
    const isHighlighted = highlightedShipmentId === shipment.id;
    return (
      <div onClick={(e) => handleEditShipment(shipment, e)} className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-700 cursor-pointer ${isHighlighted ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${colors.light} rounded-lg`}>{getShipmentIcon(shipment.type)}</div>
            <div><div className="font-bold text-gray-900">{shipment.hbl}</div><div className="text-xs text-gray-500">{shipment.type}</div></div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>{shipment.status.split(' ')[0]}</span>
        </div>
        <div className={`inline-block ${colors.bg} text-white px-2 py-0.5 rounded text-xs font-medium mb-3`}>{shipment.agent}</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600"><Building className="w-3 h-3" /><span className="truncate">{shipment.shipper}</span></div>
          <button onClick={(e) => handleConsigneeClick(shipment.cnee, e)} className="flex items-center gap-2 text-blue-600 hover:underline"><User className="w-3 h-3" /><span className="truncate">{shipment.cnee}</span></button>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500"><span>ETA: {formatDate(shipment.eta, settings.dateFormat)}</span><span className="font-semibold text-gray-700">{getTimeRemaining(shipment.eta, shipment.status)}</span><span>{shipment.term}</span></div>
      </div>
    );
  };

  const ShipmentTableRow = ({ shipment }) => {
    const colors = resolveAgentColors(shipment.agent);
    const isHighlighted = highlightedShipmentId === shipment.id;

    if (isUrgencyFacing) {
      return (
        <tr onClick={(e) => handleEditShipment(shipment, e)} className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-700 ${isHighlighted ? 'bg-yellow-100' : ''}`}>
          <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>{shipment.status.split(' ')[0]}</span></td>
          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(shipment.eta, settings.dateFormat)}</td>
          <td className="px-4 py-3 text-sm font-semibold text-orange-600">{getTimeRemaining(shipment.eta, shipment.status)}</td>
          <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`p-1.5 ${colors.light} rounded`}>{getShipmentIcon(shipment.type)}</div><div><div className="font-medium text-gray-900">{shipment.hbl}</div><div className="text-xs text-gray-500">{shipment.mbl}</div></div></div></td>
          <td className="px-4 py-3 text-sm text-gray-900">{shipment.shipper}</td>
          <td className="px-4 py-3"><button onClick={(e) => handleConsigneeClick(shipment.cnee, e)} className="text-sm text-blue-600 hover:underline">{shipment.cnee}</button></td>
          <td className="px-4 py-3 text-sm text-gray-600">{shipment.pol}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{shipment.pod}</td>
          <td className="px-4 py-3"><span className={`inline-block ${colors.bg} text-white px-2 py-0.5 rounded text-xs font-medium`}>{shipment.agent}</span></td>
          <td className="px-4 py-3 text-sm text-gray-600">{shipment.type}</td>
        </tr>
      );
    }

    return (
      <tr onClick={(e) => handleEditShipment(shipment, e)} className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-700 ${isHighlighted ? 'bg-yellow-100' : ''}`}>
        <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`p-1.5 ${colors.light} rounded`}>{getShipmentIcon(shipment.type)}</div><div><div className="font-medium text-gray-900">{shipment.hbl}</div><div className="text-xs text-gray-500">{shipment.mbl}</div></div></div></td>
        <td className="px-4 py-3"><span className={`inline-block ${colors.bg} text-white px-2 py-0.5 rounded text-xs font-medium`}>{shipment.agent}</span></td>
        <td className="px-4 py-3 text-sm text-gray-600">{shipment.type}</td>
        <td className="px-4 py-3 text-sm text-gray-900">{shipment.shipper}</td>
        <td className="px-4 py-3"><button onClick={(e) => handleConsigneeClick(shipment.cnee, e)} className="text-sm text-blue-600 hover:underline">{shipment.cnee}</button></td>
        <td className="px-4 py-3 text-sm text-gray-600">{shipment.pol}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{shipment.pod}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{formatDate(shipment.eta, settings.dateFormat)}</td>
        <td className="px-4 py-3 text-sm font-semibold text-orange-600">{getTimeRemaining(shipment.eta, shipment.status)}</td>
        <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>{shipment.status.split(' ')[0]}</span></td>
      </tr>
    );
  };

  const ShipmentTable = ({ shipments: tableShipments }) => {
    const headers = isUrgencyFacing
      ? [
          { key: 'status', label: 'Status' },
          { key: 'eta', label: 'ETA' },
          { key: 'days', label: 'Days' },
          { key: 'hblmbl', label: 'HBL/MBL' },
          { key: 'shipper', label: 'Shipper' },
          { key: 'consignee', label: 'Consignee' },
          { key: 'pol', label: 'POL' },
          { key: 'pod', label: 'POD' },
          { key: 'agent', label: 'Agent' },
          { key: 'type', label: 'Type' }
        ]
      : [
          { key: 'hblmbl', label: 'HBL/MBL' },
          { key: 'agent', label: 'Agent' },
          { key: 'type', label: 'Type' },
          { key: 'shipper', label: 'Shipper' },
          { key: 'consignee', label: 'Consignee' },
          { key: 'pol', label: 'POL' },
          { key: 'pod', label: 'POD' },
          { key: 'eta', label: 'ETA' },
          { key: 'days', label: 'Days' },
          { key: 'status', label: 'Status' }
        ];

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {headers.map(header => (
                  <th key={header.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    <button onClick={() => updateTableSort('shipments', header.key)} className="inline-flex items-center gap-1 hover:text-gray-900">
                      {header.label}
                      {renderSortArrow('shipments', header.key)}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{tableShipments.map(s => <ShipmentTableRow key={s.id} shipment={s} />)}</tbody>
          </table>
        </div>
      </div>
    );
  };

  const ConsigneeCard = ({ consignee }) => (
    <div onClick={() => handleConsigneeClick(consignee.name)} className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-700 cursor-pointer ${highlightedConsigneeName === consignee.name ? 'ring-2 ring-blue-300 bg-blue-50' : ''}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg"><Building className="w-6 h-6 text-blue-600" /></div>
        <div className="flex-1">
          <div className="flex items-center gap-2"><h3 className="font-semibold text-gray-900">{consignee.name}</h3>{consignee.status === 'inactive' && <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">Inactive</span>}</div>
          <p className="text-sm text-gray-500">{consignee.contact || 'No contact'}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{consignee.phone || 'N/A'}</div>
        <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{consignee.email || 'N/A'}</div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
        <span>{consignee.totalShipments || 0} shipments</span><span>Last: {consignee.lastShipment || 'N/A'}</span>
      </div>
    </div>
  );

  const ConsigneeTableRow = ({ consignee }) => {
    if (isUrgencyFacing) {
      return (
        <tr onClick={() => handleConsigneeClick(consignee.name)} className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-700 ${highlightedConsigneeName === consignee.name ? 'bg-blue-100' : ''}`}>
          <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${consignee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{consignee.status || 'active'}</span></td>
          <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="p-1.5 bg-blue-50 rounded"><Building className="w-4 h-4 text-blue-600" /></div><div className="font-medium text-gray-900">{consignee.name}</div></div></td>
          <td className="px-4 py-3 text-sm text-gray-600">{consignee.createdAt ? formatDate(consignee.createdAt, settings.dateFormat) : ''}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{consignee.updatedAt ? formatDate(consignee.updatedAt, settings.dateFormat) : ''}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{consignee.contact || 'N/A'}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{consignee.phone || 'N/A'}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{consignee.email || 'N/A'}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{consignee.address || 'N/A'}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{consignee.totalShipments || 0}</td>
        </tr>
      );
    }

    return (
      <tr onClick={() => handleConsigneeClick(consignee.name)} className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-700 ${highlightedConsigneeName === consignee.name ? 'bg-blue-100' : ''}`}>
        <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="p-1.5 bg-blue-50 rounded"><Building className="w-4 h-4 text-blue-600" /></div><div className="font-medium text-gray-900">{consignee.name}</div></div></td>
        <td className="px-4 py-3 text-sm text-gray-600">{consignee.createdAt ? formatDate(consignee.createdAt, settings.dateFormat) : ''}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{consignee.updatedAt ? formatDate(consignee.updatedAt, settings.dateFormat) : ''}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{consignee.contact || 'N/A'}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{consignee.phone || 'N/A'}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{consignee.email || 'N/A'}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{consignee.address || 'N/A'}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{consignee.totalShipments || 0}</td>
        <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${consignee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{consignee.status || 'active'}</span></td>
      </tr>
    );
  };

  const AgentCard = ({ agent }) => {
    const colors = resolveAgentColors(agent.name);
    const agentShipments = shipments.filter(s => s.name === agent.name);
    return (
      <div onClick={(e) => handleEditAgent(agent, e)} className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-700 cursor-pointer ${highlightedAgentId === agent.id ? 'ring-2 ring-emerald-300 bg-emerald-50' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${colors.light} rounded-lg`}><Briefcase className={`w-6 h-6 ${colors.text}`} /></div>
            <div><div className="font-bold text-gray-900">{agent.name}</div><div className="text-xs text-gray-500">{agent.code}</div></div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{agent.status}</span>
        </div>
        <div className="flex items-center gap-2 mb-3"><Flag className="w-3 h-3 text-gray-400" /><span className="text-sm text-gray-600">{agent.city}, {agent.country}</span></div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2"><User className="w-3 h-3" />{agent.contact}</div>
          <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{agent.email}</div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">{agent.services.map(s => <span key={s} className={`px-2 py-0.5 ${colors.light} ${colors.text} text-xs rounded`}>{s}</span>)}</div>
        </div>
      </div>
    );
  };

  const AgentTableRow = ({ agent }) => {
    const colors = resolveAgentColors(agent.name);

    if (isUrgencyFacing) {
      return (
        <tr onClick={(e) => handleEditAgent(agent, e)} className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-700 ${highlightedAgentId === agent.id ? 'bg-emerald-100' : ''}`}>
          <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{agent.status}</span></td>
          <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`p-1.5 ${colors.light} rounded`}><Briefcase className={`w-4 h-4 ${colors.text}`} /></div><div><div className="font-medium text-gray-900">{agent.name}</div><div className="text-xs text-gray-500">{agent.code}</div></div></div></td>
          <td className="px-4 py-3 text-sm text-gray-600">{agent.createdAt ? formatDate(agent.createdAt, settings.dateFormat) : ''}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{agent.updatedAt ? formatDate(agent.updatedAt, settings.dateFormat) : ''}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{agent.country}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{agent.city}</td>
          <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{agent.services.map(s => <span key={s} className={`px-1.5 py-0.5 ${colors.light} ${colors.text} text-xs rounded`}>{s}</span>)}</div></td>
          <td className="px-4 py-3 text-sm text-gray-600">{agent.contact}</td>
          <td className="px-4 py-3 text-sm text-gray-600">{agent.email}</td>
        </tr>
      );
    }

    return (
      <tr onClick={(e) => handleEditAgent(agent, e)} className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors duration-700 ${highlightedAgentId === agent.id ? 'bg-emerald-100' : ''}`}>
        <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`p-1.5 ${colors.light} rounded`}><Briefcase className={`w-4 h-4 ${colors.text}`} /></div><div><div className="font-medium text-gray-900">{agent.name}</div><div className="text-xs text-gray-500">{agent.code}</div></div></div></td>
        <td className="px-4 py-3 text-sm text-gray-600">{agent.createdAt ? formatDate(agent.createdAt, settings.dateFormat) : ''}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{agent.updatedAt ? formatDate(agent.updatedAt, settings.dateFormat) : ''}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{agent.country}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{agent.city}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{agent.contact}</td>
        <td className="px-4 py-3 text-sm text-gray-600">{agent.email}</td>
        <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{agent.services.map(s => <span key={s} className={`px-1.5 py-0.5 ${colors.light} ${colors.text} text-xs rounded`}>{s}</span>)}</div></td>
        <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{agent.status}</span></td>
      </tr>
    );
  };

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center justify-between"><div><div className="text-3xl font-bold text-blue-600">{stats.total}</div><div className="text-sm text-gray-500">Total Shipments</div></div><Ship className="w-10 h-10 text-blue-200" /></div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center justify-between"><div><div className="text-3xl font-bold text-green-600">{stats.done}</div><div className="text-sm text-gray-500">Completed</div></div><CheckCircle className="w-10 h-10 text-green-200" /></div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center justify-between"><div><div className="text-3xl font-bold text-yellow-600">{stats.inProgress}</div><div className="text-sm text-gray-500">In Progress</div></div><Clock className="w-10 h-10 text-yellow-200" /></div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center justify-between"><div><div className="text-3xl font-bold text-gray-600">{stats.pending}</div><div className="text-sm text-gray-500">Pending</div></div><AlertCircle className="w-10 h-10 text-gray-200" /></div></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><h3 className="font-semibold text-gray-900 mb-4">Shipments by Agent</h3><ResponsiveContainer width="100%" height={250}><BarChart data={agentChartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} /><YAxis /><Tooltip /><Legend /><Bar dataKey="completed" fill="#10B981" name="Completed" /><Bar dataKey="active" fill="#F59E0B" name="Active" /></BarChart></ResponsiveContainer></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><h3 className="font-semibold text-gray-900 mb-4">Status Distribution</h3><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>{pieData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><h3 className="font-semibold text-gray-900 mb-4">Monthly Shipment Trends</h3><ResponsiveContainer width="100%" height={250}><AreaChart data={monthlyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Area type="monotone" dataKey="total" stroke="#3B82F6" fill="#93C5FD" name="Total" /><Area type="monotone" dataKey="completed" stroke="#10B981" fill="#6EE7B7" name="Completed" /></AreaChart></ResponsiveContainer></div>
    </div>
  );

  const AgentsTable = ({ agents: tableAgents }) => {
    const headers = isUrgencyFacing
      ? [
          { key: 'status', label: 'Status' },
          { key: 'agent', label: 'Agent' },
          { key: 'createdAt', label: 'Date Created' },
          { key: 'updatedAt', label: 'Date Edited' },
          { key: 'country', label: 'Country' },
          { key: 'city', label: 'City' },
          { key: 'services', label: 'Services' },
          { key: 'contact', label: 'Contact' },
          { key: 'email', label: 'Email' }
        ]
      : [
          { key: 'agent', label: 'Agent' },
          { key: 'createdAt', label: 'Date Created' },
          { key: 'updatedAt', label: 'Date Edited' },
          { key: 'country', label: 'Country' },
          { key: 'city', label: 'City' },
          { key: 'contact', label: 'Contact' },
          { key: 'email', label: 'Email' },
          { key: 'services', label: 'Services' },
          { key: 'status', label: 'Status' }
        ];

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {headers.map(header => (
                  <th key={header.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    <button onClick={() => updateTableSort('agents', header.key)} className="inline-flex items-center gap-1 hover:text-gray-900">
                      {header.label}
                      {renderSortArrow('agents', header.key)}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{tableAgents.map(a => <AgentTableRow key={a.id} agent={a} />)}</tbody>
          </table>
        </div>
      </div>
    );
  };

  const ConsigneesTable = ({ consignees: tableConsignees }) => {
    const headers = isUrgencyFacing
      ? [
          { key: 'status', label: 'Status' },
          { key: 'consignee', label: 'Consignee' },
          { key: 'createdAt', label: 'Date Created' },
          { key: 'updatedAt', label: 'Date Edited' },
          { key: 'contact', label: 'Contact Person' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
          { key: 'address', label: 'Address' },
          { key: 'shipments', label: 'Shipments' }
        ]
      : [
          { key: 'consignee', label: 'Consignee' },
          { key: 'createdAt', label: 'Date Created' },
          { key: 'updatedAt', label: 'Date Edited' },
          { key: 'contact', label: 'Contact' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
          { key: 'address', label: 'Address' },
          { key: 'shipments', label: 'Shipments' },
          { key: 'status', label: 'Status' }
        ];

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {headers.map(header => (
                  <th key={header.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    <button onClick={() => updateTableSort('consignees', header.key)} className="inline-flex items-center gap-1 hover:text-gray-900">
                      {header.label}
                      {renderSortArrow('consignees', header.key)}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{tableConsignees.map(c => <ConsigneeTableRow key={c.name} consignee={c} />)}</tbody>
          </table>
        </div>
      </div>
    );
  };

  const ShipmentsContent = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setSelectedAgent(null)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!selectedAgent ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}>All Agents</button>
        {agents.map(agent => { const colors = resolveAgentColors(agent.name); const isSelected = selectedAgent?.name === agent.name; return (<button key={agent.name} onClick={() => setSelectedAgent(agent)} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${isSelected ? `${colors.bg} text-white` : `${colors.light} ${colors.text} border ${colors.border} hover:opacity-90`}`}>{agent.name}<span className={`px-1.5 py-0.5 rounded-sm text-xs ${isSelected ? 'bg-white/20 text-white' : 'bg-white/70 text-slate-600'}`}>{agent.shipments.length}</span></button>); })}
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex flex-col md:flex-row gap-4"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search shipments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" /></div><select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg"><option value="all">All Years</option><option value="2025">2025</option><option value="2026">2026</option></select></div></div>
      <div>
        <button onClick={() => setShowActive(prev => !prev)} className="w-full text-left text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2"><Package className="w-5 h-5 text-yellow-600" />Active Shipments ({pendingShipments.length})</span>
          {showActive ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {showActive && (pendingShipments.length === 0 ? (<div className="text-center py-12 bg-white rounded-xl border border-gray-200"><Package className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No active shipments</p></div>) : viewMode === 'card' ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{pendingShipmentsForCard.map(s => <ShipmentCard key={s.id} shipment={s} />)}</div>) : <ShipmentTable shipments={pendingShipmentsForTable} />)}
      </div>
      <div>
        <button onClick={() => setShowCompleted(prev => !prev)} className="w-full text-left text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2"><Package className="w-5 h-5 text-green-600" />Completed ({completedShipments.length})</span>
          {showCompleted ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {showCompleted && (viewMode === 'card' ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{completedShipmentsForCard.map(s => <ShipmentCard key={s.id} shipment={s} />)}</div>) : <ShipmentTable shipments={completedShipmentsForTable} />)}
      </div>
    </div>
  );

  const AgentsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center gap-4"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search agents..." value={agentSearch} onChange={(e) => setAgentSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" /></div></div></div>
      {agentViewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{filteredAgents.map(a => <AgentCard key={a.id} agent={a} />)}</div>
      ) : (
        <AgentsTable agents={agentsForTable} />
      )}
    </div>
  );

  const ConsigneesContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center gap-4"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search consignees..." value={consigneeSearch} onChange={(e) => setConsigneeSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" /></div></div></div>
      {consigneeViewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{filteredConsignees.map(c => <ConsigneeCard key={c.name} consignee={c} />)}</div>
      ) : (
        <ConsigneesTable consignees={consigneesForTable} />
      )}
    </div>
  );

  const ReportsContent = () => (<div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-blue-50 rounded-lg"><FileSpreadsheet className="w-6 h-6 text-blue-600" /></div><div><h3 className="font-semibold text-gray-900">Shipment Report</h3><p className="text-sm text-gray-500">Export all shipment data</p></div></div><button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Download className="w-4 h-4" />Generate</button></div><div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-green-50 rounded-lg"><TrendingUp className="w-6 h-6 text-green-600" /></div><div><h3 className="font-semibold text-gray-900">Performance Report</h3><p className="text-sm text-gray-500">Agent performance metrics</p></div></div><button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><Download className="w-4 h-4" />Generate</button></div><div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-purple-50 rounded-lg"><Users className="w-6 h-6 text-purple-600" /></div><div><h3 className="font-semibold text-gray-900">Consignee Report</h3><p className="text-sm text-gray-500">Customer analytics</p></div></div><button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"><Download className="w-4 h-4" />Generate</button></div></div><div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><h3 className="font-semibold text-gray-900 mb-4">Agent Performance</h3><ResponsiveContainer width="100%" height={300}><BarChart data={agentChartData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} /><Tooltip /><Legend /><Bar dataKey="completed" fill="#10B981" name="Completed" /><Bar dataKey="active" fill="#F59E0B" name="Active" /></BarChart></ResponsiveContainer></div></div>);

  const DocumentsContent = () => (<div className="space-y-6"><div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"><div className="flex items-center gap-4"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Search documents..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" /></div><button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Upload className="w-4 h-4" />Upload</button></div></div><div className="bg-white rounded-xl border border-gray-200 overflow-hidden"><table className="w-full"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Document</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Shipment</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Size</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th></tr></thead><tbody>{documents.map(doc => (<tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50"><td className="px-4 py-3"><div className="flex items-center gap-2"><FileText className="w-4 h-4 text-gray-400" /><span className="text-sm font-medium text-gray-900">{doc.name}</span></div></td><td className="px-4 py-3 text-sm text-gray-600">{doc.type}</td><td className="px-4 py-3 text-sm text-blue-600">{doc.shipmentHbl}</td><td className="px-4 py-3 text-sm text-gray-600">{formatDate(doc.uploadDate, settings.dateFormat)}</td><td className="px-4 py-3 text-sm text-gray-600">{doc.size}</td><td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{doc.status}</span></td><td className="px-4 py-3"><div className="flex items-center gap-2"><button className="p-1 hover:bg-gray-100 rounded"><Download className="w-4 h-4 text-gray-600" /></button><button className="p-1 hover:bg-gray-100 rounded"><Printer className="w-4 h-4 text-gray-600" /></button><button className="p-1 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4 text-red-600" /></button></div></td></tr>))}</tbody></table></div></div>);

  const NotificationCard = ({ notification }) => (
    <div onClick={() => handleNotificationClick(notification)} className={`bg-white rounded-xl border p-4 cursor-pointer hover:shadow-md transition-all ${notification.read ? 'border-gray-200' : 'border-blue-300 bg-blue-50'} ${highlightedShipmentId === notification.shipmentId ? 'ring-2 ring-blue-400' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${notification.type === 'completed' ? 'bg-green-100' : notification.type === 'delay' ? 'bg-red-100' : notification.type === 'alert' ? 'bg-orange-100' : 'bg-blue-100'}`}>
          {notification.type === 'completed' ? <CheckCircle className="w-5 h-5 text-green-600" /> : notification.type === 'delay' ? <AlertCircle className="w-5 h-5 text-red-600" /> : notification.type === 'alert' ? <AlertCircle className="w-5 h-5 text-orange-600" /> : <Bell className="w-5 h-5 text-blue-600" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
            {!notification.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
          </div>
          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
          <p className="text-gray-400 text-xs mt-2">{formatDate(notification.time, settings.dateFormat)}</p>
        </div>
      </div>
    </div>
  );

  const NotificationTableRow = ({ notification }) => (
    <tr onClick={() => handleNotificationClick(notification)} className={`hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${highlightedShipmentId === notification.shipmentId ? 'bg-blue-100' : ''}`}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-full ${notification.type === 'completed' ? 'bg-green-100' : notification.type === 'delay' ? 'bg-red-100' : notification.type === 'alert' ? 'bg-orange-100' : 'bg-blue-100'}`}>
            {notification.type === 'completed' ? <CheckCircle className="w-4 h-4 text-green-600" /> : notification.type === 'delay' ? <AlertCircle className="w-4 h-4 text-red-600" /> : notification.type === 'alert' ? <AlertCircle className="w-4 h-4 text-orange-600" /> : <Bell className="w-4 h-4 text-blue-600" />}
          </div>
          <span className="text-sm font-medium text-gray-900">{notification.title}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{notification.message}</td>
      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${notification.read ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}>{notification.read ? 'Read' : 'Unread'}</span></td>
      <td className="px-4 py-3 text-xs text-gray-500">{formatDate(notification.time, settings.dateFormat)}</td>
    </tr>
  );

  const NotificationsContent = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <button onClick={markAllNotificationsRead} className="text-blue-600 text-sm hover:underline">Mark all as read</button>
        </div>
        {notificationViewMode === 'card' ? (
          <div className="space-y-3">
            {notifications.map(n => <NotificationCard key={n.id} notification={n} />)}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map(n => <NotificationTableRow key={n.id} notification={n} />)}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Logs</h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Entity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Changes</th>
                </tr>
              </thead>
              <tbody>
                {activityLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">No activity logs yet</td>
                  </tr>
                ) : (
                  activityLogs.map(log => (
                    <tr key={log.id} onClick={() => handleActivityLogClick(log)} className={`border-b border-gray-100 cursor-pointer transition-colors duration-200 ${log.action === 'DELETED' && log.snapshot ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-blue-50'}`}>
                      <td className="px-4 py-3 text-sm text-gray-600">{log.timestamp}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${log.type === 'shipment' ? 'bg-blue-100 text-blue-800' : log.type === 'agent' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>{log.entityType}</span></td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{log.entityName}</td>
                      <td className="px-4 py-3 flex items-center gap-1.5"><span className={`px-2 py-1 rounded text-xs font-medium ${log.action === 'CREATED' ? 'bg-green-100 text-green-700' : log.action === 'DELETED' ? 'bg-red-100 text-red-700' : log.action === 'MARKED COMPLETE' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>{log.action}</span>{log.action === 'DELETED' && log.snapshot && <span className="text-xs text-red-500 font-medium">↩ Undo</span>}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-sm truncate">{log.changes}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsContent = () => {
    const updateSettings = (patch) => setSettings(prev => ({ ...prev, ...patch }));

    const layoutItems = [
      { key: 'shipmentViewMode', label: 'Shipments', desc: 'Default layout for the shipments page' },
      { key: 'consigneeViewMode', label: 'Consignees', desc: 'Default layout for the consignees page' },
      { key: 'agentViewMode', label: 'Agents', desc: 'Default layout for the agents page' },
      { key: 'notificationViewMode', label: 'Notifications', desc: 'Default layout for the notifications page' }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><LayoutGrid className="w-5 h-5" />Layout Preferences</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {layoutItems.map(item => (
              <div key={item.key} className="rounded-xl border border-gray-200 bg-gray-50/70 p-4">
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500 mt-1 mb-3">{item.desc}</div>
                <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                  <button
                    onClick={() => updateSettings({ [item.key]: 'card' })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${settings[item.key] === 'card' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Cards
                  </button>
                  <button
                    onClick={() => updateSettings({ [item.key]: 'table' })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${settings[item.key] === 'table' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Table className="w-4 h-4" />
                    Table
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><Filter className="w-5 h-5" />Table Audience</h3>
          <p className="text-sm text-gray-500 mb-4">Switch table ordering between customer-facing and urgency/admin views.</p>
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => updateSettings({ tableFacingMode: 'customer' })}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${tableFacingMode === 'customer' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Customer Facing
            </button>
            <button
              onClick={() => updateSettings({ tableFacingMode: 'urgency' })}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${tableFacingMode === 'urgency' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Urgency/Admin
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Bell className="w-5 h-5" />Notification Settings</h3>
          <div className="space-y-4">
            {[{ key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' }, { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' }, { key: 'soundAlerts', label: 'Sound Alerts', desc: 'Play sound for notifications' }].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
                <button onClick={() => updateSettings({ [item.key]: !settings[item.key] })} className={`w-12 h-6 rounded-full transition-colors ${settings[item.key] ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Globe className="w-5 h-5" />Regional Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Language</label><select value={settings.language} onChange={(e) => updateSettings({ language: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="en">English</option><option value="vi">Vietnamese</option><option value="zh">Chinese</option><option value="ko">Korean</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label><select value={settings.timezone} onChange={(e) => updateSettings({ timezone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="Asia/Ho_Chi_Minh">Vietnam (GMT+7)</option><option value="Asia/Shanghai">China (GMT+8)</option><option value="Asia/Seoul">Korea (GMT+9)</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label><select value={settings.dateFormat} onChange={(e) => updateSettings({ dateFormat: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="YYYY-MM-DD">YYYY-MM-DD</option><option value="DD-MM-YYYY">DD-MM-YYYY</option><option value="DD/MM/YYYY">DD/MM/YYYY</option><option value="MM/DD/YYYY">MM/DD/YYYY</option></select></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6"><h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Database className="w-5 h-5" />Data Management</h3><div className="flex flex-wrap gap-3"><button onClick={handleExportData} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Download className="w-4 h-4" />Export Data</button><button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"><Upload className="w-4 h-4" />Import Data</button><button onClick={handleDeleteAllData} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"><Trash2 className="w-4 h-4" />Delete All</button><button onClick={handleResetSeedData} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"><Database className="w-4 h-4" />Reset Seed</button></div></div>
      </div>
    );
  };

  const HelpContent = () => (<div className="space-y-6"><div className="bg-white rounded-xl border border-gray-200 p-6"><h3 className="font-semibold text-gray-900 mb-4">Quick Start Guide</h3><div className="space-y-4">{[{ title: 'Adding a Shipment', desc: 'Click "Add Shipment" to create a new shipment record.' }, { title: 'Managing Agents', desc: 'Go to Agents page to add, edit, or remove shipping agents.' }, { title: 'Managing Consignees', desc: 'Click on any consignee name to view or edit their information.' }, { title: 'Generating Reports', desc: 'Go to Reports section to export data in various formats.' }].map((item, idx) => (<div key={idx} className="flex gap-3"><div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">{idx + 1}</div><div><div className="font-medium text-gray-900">{item.title}</div><div className="text-sm text-gray-500">{item.desc}</div></div></div>))}</div></div><div className="bg-white rounded-xl border border-gray-200 p-6"><h3 className="font-semibold text-gray-900 mb-4">Contact Support</h3><p className="text-gray-600 mb-4">Need help? Contact our support team.</p><div className="flex flex-wrap gap-3"><button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Mail className="w-4 h-4" />Email Support</button><button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"><Phone className="w-4 h-4" />Call Support</button></div></div></div>);

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return DashboardContent();
      case 'shipments': return ShipmentsContent();
      case 'agents': return AgentsContent();
      case 'consignees': return ConsigneesContent();
      case 'reports': return ReportsContent();
      case 'documents': return DocumentsContent();
      case 'notifications': return NotificationsContent();
      case 'settings': return SettingsContent();
      case 'help': return HelpContent();
      default: return DashboardContent();
    }
  };

  const getPageTitle = () => {
    const titles = { dashboard: { title: 'Dashboard', subtitle: 'Overview of your shipment operations' }, shipments: { title: 'Shipments', subtitle: 'Manage and track all shipments' }, agents: { title: 'Agents', subtitle: 'Manage shipping agents and partners' }, consignees: { title: 'Consignees', subtitle: 'Manage customer information' }, reports: { title: 'Reports', subtitle: 'Generate and export reports' }, documents: { title: 'Documents', subtitle: 'Manage shipment documents' }, notifications: { title: 'Notifications', subtitle: 'Stay updated on shipment activities' }, settings: { title: 'Settings', subtitle: 'Configure your preferences' }, help: { title: 'Help & Support', subtitle: 'Get assistance and learn more' } };
    return titles[activeMenu] || titles.dashboard;
  };

  const getHeaderActions = () => {
    if (activeMenu === 'shipments') {
      return <button onClick={handleAddShipment} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Shipment</span></button>;
    }
    if (activeMenu === 'consignees') {
      return <button onClick={handleAddConsignee} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Consignee</span></button>;
    }
    if (activeMenu === 'agents') {
      return <button onClick={handleAddAgent} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Agent</span></button>;
    }
    if (activeMenu === 'dashboard') {
      return <button onClick={handleAddShipment} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Shipment</span></button>;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-50 flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">{!sidebarCollapsed && <div className="flex items-center gap-2"><Ship className="w-8 h-8 text-blue-400" /><span className="font-bold text-lg">MEE Tracker</span></div>}<button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 hover:bg-gray-800 rounded-lg">{sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}</button></div>
        <nav className="flex-1 p-2 space-y-1">{menuItems.map(item => (<button key={item.id} onClick={() => setActiveMenu(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${activeMenu === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`} title={sidebarCollapsed ? item.label : undefined}><item.icon className="w-5 h-5 flex-shrink-0" />{!sidebarCollapsed && <span>{item.label}</span>}{item.badge > 0 && <span className={`${sidebarCollapsed ? 'absolute -top-1 -right-1' : 'ml-auto'} bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full`}>{item.badge}</span>}</button>))}</nav>
        <div className="p-2 border-t border-gray-700 space-y-1">{bottomMenuItems.map(item => (<button key={item.id} onClick={() => setActiveMenu(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeMenu === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`} title={sidebarCollapsed ? item.label : undefined}><item.icon className="w-5 h-5 flex-shrink-0" />{!sidebarCollapsed && <span>{item.label}</span>}</button>))}</div>
      </aside>

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"><div className="px-6 py-4"><div className="flex items-center justify-between"><div><h1 className="text-xl font-bold text-gray-900">{getPageTitle().title}</h1><p className="text-sm text-gray-500">{getPageTitle().subtitle}</p></div><div className="flex items-center gap-3">{getHeaderActions()}</div></div></div></header>
        {syncMessage && <div className="mx-6 mt-4 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">{syncMessage}</div>}
        <main className="p-6">{renderContent()}</main>
      </div>

      <Modal isOpen={showConsigneeModal} onClose={() => setShowConsigneeModal(false)} title={editingConsignee ? `Edit: ${editingConsignee.name}` : 'Add New Consignee'}>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"><Building className="w-8 h-8 text-blue-600" /><div><div className="font-semibold text-gray-900">{consigneeForm.name || 'New Consignee'}</div><div className="text-sm text-gray-500">{editingConsignee ? 'Edit consignee details' : 'Add new consignee'}</div></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label><input type="text" value={consigneeForm.name} onChange={(e) => setConsigneeForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Company name" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label><input type="text" value={consigneeForm.contact} onChange={(e) => setConsigneeForm(prev => ({ ...prev, contact: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Mr. Nguyen" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="text" value={consigneeForm.phone} onChange={(e) => setConsigneeForm(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="+84 xxx xxx xxxx" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={consigneeForm.email} onChange={(e) => setConsigneeForm(prev => ({ ...prev, email: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="contact@company.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label><input type="text" value={consigneeForm.taxId} onChange={(e) => setConsigneeForm(prev => ({ ...prev, taxId: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0123456789" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={consigneeForm.status} onChange={(e) => setConsigneeForm(prev => ({ ...prev, status: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input type="text" value={consigneeForm.address} onChange={(e) => setConsigneeForm(prev => ({ ...prev, address: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Full address" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes</label><textarea value={consigneeForm.notes} onChange={(e) => setConsigneeForm(prev => ({ ...prev, notes: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} placeholder="Special instructions..." /></div>
          <div className="flex justify-between gap-3 pt-4 border-t border-gray-200"><div>{editingConsignee && <button onClick={handleDeleteConsignee} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" />Delete</button>}</div><div className="flex gap-3"><button onClick={() => setShowConsigneeModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button onClick={handleSaveConsignee} disabled={!consigneeForm.name} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"><Save className="w-4 h-4" />Save</button></div></div>
        </div>
      </Modal>

      <Modal isOpen={showShipmentModal} onClose={() => setShowShipmentModal(false)} title={editingShipment ? `Edit: ${editingShipment.hbl}` : 'Add New Shipment'}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Agent *</label><select value={shipmentForm.agent} onChange={(e) => setShipmentForm(prev => ({ ...prev, agent: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="">Select Agent</option>{agentsData.filter(a => a.status === 'active').map(agent => <option key={agent.id} value={agent.name}>{agent.name}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Year *</label><select value={shipmentForm.year} onChange={(e) => setShipmentForm(prev => ({ ...prev, year: parseInt(e.target.value) }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value={2025}>2025</option><option value={2026}>2026</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">HBL *</label><input type="text" value={shipmentForm.hbl} onChange={(e) => setShipmentForm(prev => ({ ...prev, hbl: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., NEOSHA26050001" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">MBL</label><input type="text" value={shipmentForm.mbl} onChange={(e) => setShipmentForm(prev => ({ ...prev, mbl: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Master Bill of Lading" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Type *</label><select value={shipmentForm.type} onChange={(e) => setShipmentForm(prev => ({ ...prev, type: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="LCL">LCL</option><option value="AIR">AIR</option><option value="1x20GP">1x20GP</option><option value="1X40'H">1X40'H</option><option value="40'HQ">40'HQ</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Term *</label><select value={shipmentForm.term} onChange={(e) => setShipmentForm(prev => ({ ...prev, term: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="FOB">FOB</option><option value="CIF">CIF</option><option value="CNF">CNF</option><option value="DAP">DAP</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">POL *</label><input type="text" value={shipmentForm.pol} onChange={(e) => setShipmentForm(prev => ({ ...prev, pol: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., SHANGHAI, CHINA" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">POD *</label><input type="text" value={shipmentForm.pod} onChange={(e) => setShipmentForm(prev => ({ ...prev, pod: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., CATLAI, HCM" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Shipper *</label><input type="text" value={shipmentForm.shipper} onChange={(e) => setShipmentForm(prev => ({ ...prev, shipper: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Shipper name" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Consignee *</label><input type="text" value={shipmentForm.cnee} onChange={(e) => setShipmentForm(prev => ({ ...prev, cnee: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Consignee name" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">ETD</label><input type="date" value={shipmentForm.etd} onChange={(e) => setShipmentForm(prev => ({ ...prev, etd: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">ETA</label><input type="date" value={shipmentForm.eta} onChange={(e) => setShipmentForm(prev => ({ ...prev, eta: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={shipmentForm.status} onChange={(e) => setShipmentForm(prev => ({ ...prev, status: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="PENDING">PENDING</option><option value="IN PROGRESS">IN PROGRESS</option><option value="IN TRANSIT">IN TRANSIT</option><option value="DELIVERING">DELIVERING</option><option value="DONE!">DONE!</option></select></div>
          <div className="flex justify-between gap-3 pt-4 border-t border-gray-200"><div>{editingShipment && <button onClick={handleDeleteShipment} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" />Delete</button>}</div><div className="flex gap-3"><button onClick={() => setShowShipmentModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>{editingShipment && !isCompleted(editingShipment.status) && <button onClick={handleMarkComplete} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Mark Complete</button>}<button onClick={handleSaveShipment} disabled={!shipmentForm.agent || !shipmentForm.hbl || !shipmentForm.cnee} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"><Save className="w-4 h-4" />{editingShipment ? 'Save' : 'Add'}</button></div></div>
        </div>
      </Modal>

      <Modal isOpen={showAgentModal} onClose={() => setShowAgentModal(false)} title={editingAgent ? `Edit: ${editingAgent.name}` : 'Add New Agent'}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Agent Name *</label><input type="text" value={agentForm.name} onChange={(e) => setAgentForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., NEO SHA" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Code *</label><input type="text" value={agentForm.code} onChange={(e) => setAgentForm(prev => ({ ...prev, code: e.target.value.toUpperCase() }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., NEOSHA" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Country *</label><input type="text" value={agentForm.country} onChange={(e) => setAgentForm(prev => ({ ...prev, country: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., China" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">City *</label><input type="text" value={agentForm.city} onChange={(e) => setAgentForm(prev => ({ ...prev, city: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Shanghai" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label><input type="text" value={agentForm.contact} onChange={(e) => setAgentForm(prev => ({ ...prev, contact: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Mr. Wang" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="text" value={agentForm.phone} onChange={(e) => setAgentForm(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="+86 xxx xxxx xxxx" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={agentForm.email} onChange={(e) => setAgentForm(prev => ({ ...prev, email: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="contact@agent.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={agentForm.status} onChange={(e) => setAgentForm(prev => ({ ...prev, status: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input type="text" value={agentForm.address} onChange={(e) => setAgentForm(prev => ({ ...prev, address: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Full address" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Services</label><div className="flex flex-wrap gap-2">{['LCL', 'FCL', 'AIR', 'RAIL', 'EXPRESS'].map(service => (<button key={service} type="button" onClick={() => toggleService(service)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${agentForm.services.includes(service) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>{service}</button>))}</div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label><div className="flex flex-wrap gap-2">{colorOptions.map(color => (<button key={color.key} type="button" onClick={() => setAgentForm(prev => ({ ...prev, colorKey: color.key }))} className={`w-8 h-8 rounded-full ${color.bg} ${agentForm.colorKey === color.key ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`} title={color.key} />))}</div></div>
          <div className="flex justify-between gap-3 pt-4 border-t border-gray-200"><div>{editingAgent && <button onClick={handleDeleteAgent} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" />Delete</button>}</div><div className="flex gap-3"><button onClick={() => setShowAgentModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button onClick={handleSaveAgent} disabled={!agentForm.name || !agentForm.code || !agentForm.country || !agentForm.city} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"><Save className="w-4 h-4" />{editingAgent ? 'Save' : 'Add'}</button></div></div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={confirmDialog.isOpen} onClose={() => setConfirmDialog({ isOpen: false })} onConfirm={confirmDialog.onConfirm} title={confirmDialog.title} message={confirmDialog.message} confirmText={confirmDialog.confirmText} confirmColor={confirmDialog.confirmColor} />
      <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportData} />
    </div>
  );
}
