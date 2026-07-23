// LocalStorage Data Management Service for CVForge AI

const REGISTERED_USERS_KEY = 'cvforge_registered_users';
const ACTIVE_USER_KEY = 'cvforge_active_user';

// Helper to sanitize key
const getUserKey = (prefix, userId) => {
  if (!userId) {
    const active = getActiveUser();
    userId = active ? active.id : 'guest';
  }
  return `${prefix}_${userId}`;
};

// --- USER AUTHENTICATION MANAGEMENT ---

export const getRegisteredUsersLocal = () => {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading registered users:', err);
    return [];
  }
};

export const registerUserLocal = ({ name, email, password }) => {
  const users = getRegisteredUsersLocal();
  const normalizedEmail = email.trim().toLowerCase();
  
  const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return { success: false, message: 'User with this email already exists.' };
  }

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: name.trim(),
    email: normalizedEmail,
    password: password // stored locally for client mode
  };

  users.push(newUser);
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));

  const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
  setActiveUser(sessionUser);
  return { success: true, user: sessionUser };
};

export const loginUserLocal = ({ email, password }) => {
  const users = getRegisteredUsersLocal();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (user) {
    if (user.password && user.password !== password) {
      return { success: false, message: 'Invalid email or password.' };
    }
    const sessionUser = { id: user.id, name: user.name, email: user.email };
    setActiveUser(sessionUser);
    return { success: true, user: sessionUser };
  }

  // If user doesn't exist yet in local store, auto-create account for seamless demo testing
  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: email.split('@')[0] || 'Candidate User',
    email: normalizedEmail,
    password: password
  };

  users.push(newUser);
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));

  const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
  setActiveUser(sessionUser);
  return { success: true, user: sessionUser };
};

export const getActiveUser = () => {
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY) || localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

export const setActiveUser = (user) => {
  if (user) {
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem(ACTIVE_USER_KEY);
    localStorage.removeItem('user');
  }
};

export const logoutUser = () => {
  localStorage.removeItem(ACTIVE_USER_KEY);
  localStorage.removeItem('user');
};

// --- USER-SCOPED CV DATA MANAGEMENT ---

// Retrieve all CVs for specific user (defaults to empty array for new users)
export const getSavedCVs = (userId) => {
  try {
    const key = getUserKey('cvforge_user_cvs', userId);
    const raw = localStorage.getItem(key);
    if (!raw) {
      return []; // Clean empty state for new users
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading CVs from localStorage:', err);
    return [];
  }
};

// Retrieve single CV by ID for specific user
export const getCVById = (id, userId) => {
  const cvs = getSavedCVs(userId);
  return cvs.find(cv => String(cv.id) === String(id)) || null;
};

// Save or update CV for specific user
export const saveCV = (cvData, userId) => {
  const activeUser = getActiveUser();
  const targetUserId = userId || (activeUser ? activeUser.id : 'guest');
  const cvs = getSavedCVs(targetUserId);
  const existingIndex = cvs.findIndex(c => String(c.id) === String(cvData.id));

  const updatedCV = {
    ...cvData,
    userId: targetUserId,
    updatedAt: new Date().toISOString()
  };

  let newList;
  if (existingIndex >= 0) {
    newList = [...cvs];
    newList[existingIndex] = updatedCV;
  } else {
    newList = [updatedCV, ...cvs];
  }

  const key = getUserKey('cvforge_user_cvs', targetUserId);
  localStorage.setItem(key, JSON.stringify(newList));
  localStorage.setItem(`cvforge_active_cv_id_${targetUserId}`, updatedCV.id);
  return updatedCV;
};

// Delete CV by ID for specific user
export const deleteCV = (id, userId) => {
  const activeUser = getActiveUser();
  const targetUserId = userId || (activeUser ? activeUser.id : 'guest');
  const cvs = getSavedCVs(targetUserId);
  const filtered = cvs.filter(c => String(c.id) !== String(id));
  
  const key = getUserKey('cvforge_user_cvs', targetUserId);
  localStorage.setItem(key, JSON.stringify(filtered));
  return filtered;
};

// Usage tracking per user: Free CV creations (Max 3)
export const getFreeCVUsage = (userId) => {
  const activeUser = getActiveUser();
  const targetUserId = userId || (activeUser ? activeUser.id : 'guest');

  const usageKey = getUserKey('cvforge_usage_counter', targetUserId);
  const paidKey = getUserKey('cvforge_paid_slots', targetUserId);

  const count = parseInt(localStorage.getItem(usageKey) || '0', 10);
  const paidSlots = parseInt(localStorage.getItem(paidKey) || '0', 10);
  const maxFree = 3;
  const remainingTotal = Math.max(0, maxFree - count) + paidSlots;

  return {
    usedFree: count,
    maxFree,
    paidSlots,
    totalAvailable: remainingTotal,
    hasAvailableSlot: remainingTotal > 0
  };
};

export const incrementCVUsage = (userId) => {
  const activeUser = getActiveUser();
  const targetUserId = userId || (activeUser ? activeUser.id : 'guest');

  const usageKey = getUserKey('cvforge_usage_counter', targetUserId);
  const paidKey = getUserKey('cvforge_paid_slots', targetUserId);

  const usage = getFreeCVUsage(targetUserId);
  if (usage.usedFree < usage.maxFree) {
    localStorage.setItem(usageKey, String(usage.usedFree + 1));
  } else if (usage.paidSlots > 0) {
    localStorage.setItem(paidKey, String(usage.paidSlots - 1));
  }
};

export const addPaidSlot = (userId) => {
  const activeUser = getActiveUser();
  const targetUserId = userId || (activeUser ? activeUser.id : 'guest');
  const paidKey = getUserKey('cvforge_paid_slots', targetUserId);

  const currentPaid = parseInt(localStorage.getItem(paidKey) || '0', 10);
  localStorage.setItem(paidKey, String(currentPaid + 1));
};

