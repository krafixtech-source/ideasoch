'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Idea,
  IdeaStatus,
  InvestorProfile,
  IdeaApplication,
  ApplicationStatus,
  Opportunity,
  OpportunityStatus,
  Conversation,
  Message,
  MessageAttachment,
  Meeting,
  MeetingStatus,
  Notification,
  Report,
  AuditLog,
  SubscriptionPlan,
  DeckAssistanceRequest,
} from '@/types';
import {
  INITIAL_USERS,
  INITIAL_IDEAS,
  INITIAL_INVESTORS,
  INITIAL_OPPORTUNITIES,
  INITIAL_APPLICATIONS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_MEETINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_REPORTS,
  INITIAL_AUDIT_LOGS,
  SUBSCRIPTION_PLANS,
} from '@/lib/initialData';

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  users: User[];
  
  // Ideas
  ideas: Idea[];
  addIdea: (newIdea: Partial<Idea>) => Idea;
  deleteIdeaFree: (id: string) => void;
  canFounderCreateIdea: () => { allowed: boolean; activeCount: number; maxFreeSlots: number };
  updateIdeaStatus: (id: string, status: IdeaStatus) => void;
  savedIdeaIds: string[];
  toggleSaveIdea: (id: string) => void;
  isIdeaSaved: (id: string) => boolean;

  // Deck Preparation & Assistance Service
  deckAssistanceRequests: DeckAssistanceRequest[];
  requestDeckAssistance: (req: Omit<DeckAssistanceRequest, 'id' | 'status' | 'requestedAt'>) => void;

  // Investor Discovery & Direct Chat (5 Chats Included)
  investorProfile: InvestorProfile;
  unlockedIdeaIds: string[];
  canAccessIdeaDetails: (ideaId: string) => boolean;
  unlockIdea: (ideaId: string) => { success: boolean; message: string };
  startInvestorChat: (ideaId: string) => {
    success: boolean;
    conversationId?: string;
    message?: string;
    isNew?: boolean;
    remainingChats: number;
  };
  purchaseChatCredits: (additionalChats: number) => void;
  upgradeInvestorPlan: (planId: 'pro' | 'fund') => void;
  investorBillingCycle: 'monthly' | 'yearly';
  toggleInvestorBillingCycle: () => void;

  // Applications
  applications: IdeaApplication[];
  applyToInvestors: (ideaId: string, investorIds: string[], pitchNote: string) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;

  // Opportunities
  opportunities: Opportunity[];
  addOpportunity: (opp: Partial<Opportunity>) => Opportunity;
  updateOpportunityStatus: (id: string, status: OpportunityStatus) => void;
  applyToOpportunity: (oppId: string, note: string) => void;

  // Messaging & Chat
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  messages: Record<string, Message[]>;
  sendMessage: (convId: string, content: string, attachments?: MessageAttachment[]) => void;
  startOrGetConversationWith: (targetUser: { id: string; name: string; role: UserRole; avatar: string; title: string; verified: boolean }) => string;

  // Meetings
  meetings: Meeting[];
  scheduleMeeting: (meetingData: Omit<Meeting, 'id' | 'createdAt' | 'status'>) => void;
  updateMeetingStatus: (meetingId: string, status: MeetingStatus) => void;

  // Notifications
  notifications: Notification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Moderation & Admin
  reports: Report[];
  submitReport: (reportData: Omit<Report, 'id' | 'createdAt' | 'status'>) => void;
  updateReportStatus: (reportId: string, status: Report['status']) => void;
  auditLogs: AuditLog[];
  toggleUserVerification: (userId: string) => void;

  // Plans
  plans: SubscriptionPlan[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('IDEA_MAKER');
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // Rahul Sharma by default

  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);
  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>(['idea-1']);
  const [investorProfile, setInvestorProfile] = useState<InvestorProfile>(INITIAL_INVESTORS[0]);
  const [unlockedIdeaIds, setUnlockedIdeaIds] = useState<string[]>(['idea-1']);
  const [deckAssistanceRequests, setDeckAssistanceRequests] = useState<DeckAssistanceRequest[]>([]);
  const [investorBillingCycle, setInvestorBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const [applications, setApplications] = useState<IdeaApplication[]>(INITIAL_APPLICATIONS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);

  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);

  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Hydrate from localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const storedRole = localStorage.getItem('ideasoch_role');
      if (storedRole) {
        switchRole(storedRole as UserRole);
      }
      const storedIdeas = localStorage.getItem('ideasoch_ideas');
      if (storedIdeas) setIdeas(JSON.parse(storedIdeas));

      const storedUnlocked = localStorage.getItem('ideasoch_unlocked_ideas');
      if (storedUnlocked) setUnlockedIdeaIds(JSON.parse(storedUnlocked));

      const storedCredits = localStorage.getItem('ideasoch_investor_profile');
      if (storedCredits) setInvestorProfile(JSON.parse(storedCredits));

      const storedCycle = localStorage.getItem('ideasoch_investor_cycle');
      if (storedCycle === 'monthly' || storedCycle === 'yearly') setInvestorBillingCycle(storedCycle);

      const storedDeckReqs = localStorage.getItem('ideasoch_deck_reqs');
      if (storedDeckReqs) setDeckAssistanceRequests(JSON.parse(storedDeckReqs));

      const storedApplications = localStorage.getItem('ideasoch_applications');
      if (storedApplications) setApplications(JSON.parse(storedApplications));

      const storedMeetings = localStorage.getItem('ideasoch_meetings');
      if (storedMeetings) setMeetings(JSON.parse(storedMeetings));

      const storedNotifications = localStorage.getItem('ideasoch_notifications');
      if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
    } catch {
      // ignore storage error
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem('ideasoch_role', currentRole);
      localStorage.setItem('ideasoch_ideas', JSON.stringify(ideas));
      localStorage.setItem('ideasoch_unlocked_ideas', JSON.stringify(unlockedIdeaIds));
      localStorage.setItem('ideasoch_investor_profile', JSON.stringify(investorProfile));
      localStorage.setItem('ideasoch_investor_cycle', investorBillingCycle);
      localStorage.setItem('ideasoch_deck_reqs', JSON.stringify(deckAssistanceRequests));
      localStorage.setItem('ideasoch_applications', JSON.stringify(applications));
      localStorage.setItem('ideasoch_meetings', JSON.stringify(meetings));
      localStorage.setItem('ideasoch_notifications', JSON.stringify(notifications));
    } catch {
      // ignore storage errors
    }
  }, [isClient, currentRole, ideas, unlockedIdeaIds, investorProfile, investorBillingCycle, deckAssistanceRequests, applications, meetings, notifications]);

  // Role Switcher
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'IDEA_MAKER') {
      setCurrentUser(users.find((u) => u.id === 'user-founder-1') || users[0]);
    } else if (role === 'INVESTOR') {
      setCurrentUser(users.find((u) => u.id === 'user-investor-1') || users[2]);
    } else if (role === 'ADMIN') {
      setCurrentUser(users.find((u) => u.id === 'user-admin-1') || users[4]);
    } else {
      // GUEST
      setCurrentUser({
        id: 'guest-user',
        name: 'Guest Visitor',
        email: 'guest@ideasoch.com',
        role: 'GUEST',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
        title: 'Exploring Ideasoch',
        location: 'Global',
        verified: false,
        bio: 'Exploring curated business opportunities and investments.',
        createdAt: new Date().toISOString(),
      });
    }
  };

  // Idea Management
  const addIdea = (newIdeaData: Partial<Idea>): Idea => {
    const newId = `idea-${Date.now()}`;
    const idea: Idea = {
      id: newId,
      title: newIdeaData.title || 'Untitled Innovation',
      headline: newIdeaData.headline || (newIdeaData.title ? `${newIdeaData.title} · Disruptive Innovation` : 'High-impact market solution'),
      quote: newIdeaData.quote || (newIdeaData.summary ? `"${newIdeaData.summary.slice(0, 120)}..."` : '"Pioneering unit economics with scalable domain execution."'),
      tagline: newIdeaData.tagline || 'Business concept submitted on Ideasoch.',
      category: newIdeaData.category || 'B2B SaaS & AI',
      stage: newIdeaData.stage || 'MVP',
      fundingRequired: newIdeaData.fundingRequired || '₹50,00,000',
      fundingCurrency: 'INR',
      location: newIdeaData.location || currentUser.location || 'Bengaluru, India',
      summary: newIdeaData.summary || '',
      problem: newIdeaData.problem || '',
      solution: newIdeaData.solution || '',
      targetMarket: newIdeaData.targetMarket || '',
      tamSamSom: newIdeaData.tamSamSom || '',
      businessModel: newIdeaData.businessModel || '',
      currentTraction: newIdeaData.currentTraction || 'Pilot deployments undergoing customer verification.',
      unitEconomics: newIdeaData.unitEconomics || 'Gross margin: 68%, CAC Payback: 4 months',
      useOfFunds: newIdeaData.useOfFunds || '40% Product engineering, 35% GTM sales, 25% working capital.',
      founderId: currentUser.id,
      founderName: currentUser.name,
      founderAvatar: currentUser.avatar,
      founderBio: currentUser.bio,
      founderLinkedIn: currentUser.linkedIn,
      documents: newIdeaData.documents || [
        {
          title: 'Executive Pitch Deck',
          fileName: `${newIdeaData.title || 'Idea'}_Pitch_Deck.pdf`,
          fileSize: '3.4 MB',
          fileType: 'pdf',
          isConfidential: true,
          url: '#',
        },
      ],
      status: 'Approved', // instant approval for demo responsiveness
      viewsCount: 1,
      savesCount: 0,
      applicationsCount: 0,
      featured: false,
      needsDeckAssistance: newIdeaData.needsDeckAssistance ?? false,
      deckAssistanceStatus: newIdeaData.needsDeckAssistance ? 'Requested' : 'None',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setIdeas((prev) => [idea, ...prev]);

    // Audit log
    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'IDEA_CREATED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'IDEA',
      targetId: idea.id,
      details: `Created and published idea "${idea.title}" under ${idea.category}. Active free slots used: ${ideas.filter(i => i.founderId === currentUser.id).length + 1}/2.`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);

    // Notification
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Idea Successfully Published',
      message: `"${idea.title}" is now active in the directory. You can dispatch it to unlimited accredited investors for free.`,
      link: `/ideas/${idea.id}`,
      type: 'SYSTEM',
      isRead: false,
      createdAt: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);

    return idea;
  };

  const deleteIdeaFree = (id: string) => {
    const target = ideas.find((i) => i.id === id);
    setIdeas((prev) => prev.filter((i) => i.id !== id));

    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Idea Deleted (Slot Freed Up)',
      message: `"${target?.title || 'Idea'}" was deleted at zero cost. You now have a free idea slot available to submit a new concept.`,
      link: '/submit-idea',
      type: 'SYSTEM',
      isRead: false,
      createdAt: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);

    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'IDEA_STATUS_UPDATED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'IDEA',
      targetId: id,
      details: `Deleted idea "${target?.title}" for free under Ideasoch 2-idea allowance policy.`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const canFounderCreateIdea = () => {
    const myIdeas = ideas.filter((i) => i.founderId === currentUser.id);
    const activeCount = myIdeas.length;
    const maxFreeSlots = 2;
    return {
      allowed: activeCount < maxFreeSlots,
      activeCount,
      maxFreeSlots,
    };
  };

  const requestDeckAssistance = (reqData: Omit<DeckAssistanceRequest, 'id' | 'status' | 'requestedAt'>) => {
    const newReq: DeckAssistanceRequest = {
      id: `deck-req-${Date.now()}`,
      ...reqData,
      status: 'Received',
      requestedAt: new Date().toISOString().split('T')[0],
    };
    setDeckAssistanceRequests((prev) => [newReq, ...prev]);

    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Deck Assistance Request Received',
      message: `Ideasoch Venture Studio has received your brief for "${reqData.businessTitle}". Our deck design & financial modeling specialist will coordinate your assets within 24 hours.`,
      link: '/dashboard/founder',
      type: 'SYSTEM',
      isRead: false,
      createdAt: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);

    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'APPLICATION_SUBMITTED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'APPLICATION',
      targetId: newReq.id,
      details: `Requested assisted pitch deck & financial model preparation service for "${reqData.businessTitle}".`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const updateIdeaStatus = (id: string, status: IdeaStatus) => {
    setIdeas((prev) =>
      prev.map((idea) => (idea.id === id ? { ...idea, status } : idea))
    );

    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'IDEA_STATUS_UPDATED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'IDEA',
      targetId: id,
      details: `Updated idea status to "${status}".`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const toggleSaveIdea = (id: string) => {
    setSavedIdeaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isIdeaSaved = (id: string) => savedIdeaIds.includes(id);

  // Limited Investor Discovery Credits Logic
  const canAccessIdeaDetails = (ideaId: string): boolean => {
    if (currentRole === 'ADMIN') return true;
    const idea = ideas.find((i) => i.id === ideaId);
    if (idea && idea.founderId === currentUser.id) return true;
    return unlockedIdeaIds.includes(ideaId);
  };

  const unlockIdea = (ideaId: string): { success: boolean; message: string } => {
    if (unlockedIdeaIds.includes(ideaId)) {
      return { success: true, message: 'Idea already unlocked.' };
    }

    if (investorProfile.discoveryCreditsRemaining <= 0) {
      return {
        success: false,
        message: 'Monthly discovery credit limit reached. Please upgrade to Pro or Venture plan.',
      };
    }

    // Deduct 1 credit
    const updatedProfile: InvestorProfile = {
      ...investorProfile,
      discoveryCreditsRemaining: investorProfile.discoveryCreditsRemaining - 1,
    };
    setInvestorProfile(updatedProfile);
    setUnlockedIdeaIds((prev) => [...prev, ideaId]);

    const targetIdea = ideas.find((i) => i.id === ideaId);

    // Audit log
    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'DISCOVERY_CREDIT_USED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'IDEA',
      targetId: ideaId,
      details: `Consumed 1 discovery credit to unlock confidential business plan & financials for "${targetIdea?.title || ideaId}". Remaining: ${updatedProfile.discoveryCreditsRemaining}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);

    // Founder notification
    if (targetIdea) {
      const notif: Notification = {
        id: `notif-${Date.now()}`,
        userId: targetIdea.founderId,
        title: 'Investor Unlocked Full Idea',
        message: `${currentUser.name} (${investorProfile.organization || 'Angel Investor'}) accessed confidential details of ${targetIdea.title}.`,
        link: `/ideas/${targetIdea.id}`,
        type: 'VIEW',
        isRead: false,
        createdAt: 'Just now',
      };
      setNotifications((prev) => [notif, ...prev]);
    }

    return {
      success: true,
      message: `Successfully unlocked idea. 1 discovery credit used. Remaining credits: ${updatedProfile.discoveryCreditsRemaining}`,
    };
  };

  const toggleInvestorBillingCycle = () => {
    setInvestorBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'));
  };

  const purchaseChatCredits = (additionalChats: number) => {
    const newTotal = (investorProfile.chatCreditsTotal || 5) + additionalChats;
    const updated: InvestorProfile = {
      ...investorProfile,
      chatCreditsTotal: newTotal,
    };
    setInvestorProfile(updated);

    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Chat Quota Expanded',
      message: `Successfully added ${additionalChats} direct bilateral chats. New total quota: ${newTotal} chats.`,
      link: '/messages',
      type: 'SYSTEM',
      isRead: false,
      createdAt: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);

    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'PLAN_UPGRADED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'SUBSCRIPTION',
      targetId: 'chat_expansion',
      details: `Purchased +${additionalChats} chat credits. New total quota: ${newTotal}.`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const startInvestorChat = (ideaId: string): {
    success: boolean;
    conversationId?: string;
    message?: string;
    isNew?: boolean;
    remainingChats: number;
  } => {
    const idea = ideas.find((i) => i.id === ideaId);
    const total = investorProfile.chatCreditsTotal || 5;
    const used = investorProfile.chatCreditsUsed || 0;
    const currentRemaining = Math.max(0, total - used);

    if (!idea) {
      return { success: false, message: 'Idea not found in directory.', remainingChats: currentRemaining };
    }

    const activeChats = investorProfile.activeChatIds || [];
    const isAlreadyActive = activeChats.includes(ideaId);

    const founderUser = users.find((u) => u.id === idea.founderId) || {
      id: idea.founderId,
      name: idea.founderName,
      email: `${idea.founderName.toLowerCase().replace(/\s+/g, '.')}@startup.com`,
      role: 'IDEA_MAKER' as UserRole,
      avatar: idea.founderAvatar,
      title: `Founder, ${idea.title}`,
      location: idea.location,
      verified: true,
      bio: idea.founderBio,
      createdAt: idea.createdAt,
    };

    if (isAlreadyActive) {
      const convId = startOrGetConversationWith(founderUser);
      return {
        success: true,
        conversationId: convId,
        isNew: false,
        remainingChats: currentRemaining,
      };
    }

    if (used >= total) {
      return {
        success: false,
        message: `You have exhausted all ${total} direct bilateral chats included in your subscription. Upgrade or purchase an extra chat pack (₹999 for 3 chats) to initiate new founder dialogues.`,
        remainingChats: 0,
      };
    }

    // Deduct 1 chat credit
    const updatedProfile: InvestorProfile = {
      ...investorProfile,
      chatCreditsUsed: used + 1,
      activeChatIds: [...activeChats, ideaId],
    };
    setInvestorProfile(updatedProfile);

    // Ensure idea is unlocked in investor's view
    if (!unlockedIdeaIds.includes(ideaId)) {
      setUnlockedIdeaIds((prev) => [...prev, ideaId]);
    }

    // Start conversation
    const convId = startOrGetConversationWith(founderUser);

    // Notification to founder
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: idea.founderId,
      title: 'Investor Initiated Direct Chat',
      message: `${currentUser.name} (${investorProfile.organization || 'Verified Investor'}) started a direct bilateral chat regarding "${idea.title}".`,
      link: '/messages',
      type: 'MESSAGE',
      isRead: false,
      createdAt: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);

    // Audit log
    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'DISCOVERY_CREDIT_USED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'IDEA',
      targetId: ideaId,
      details: `Initiated direct bilateral chat for "${idea.title}". Consumed 1 of ${total} included chats. Remaining: ${total - (used + 1)}.`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);

    return {
      success: true,
      conversationId: convId,
      isNew: true,
      remainingChats: total - (used + 1),
    };
  };

  const upgradeInvestorPlan = (planId: 'pro' | 'fund') => {
    const creditsGranted = planId === 'pro' ? 25 : 100;
    const updated: InvestorProfile = {
      ...investorProfile,
      planId,
      discoveryCreditsRemaining: investorProfile.discoveryCreditsRemaining + creditsGranted,
      totalCreditsGranted: investorProfile.totalCreditsGranted + creditsGranted,
      chatCreditsTotal: (investorProfile.chatCreditsTotal || 5) + (planId === 'pro' ? 10 : 25),
    };
    setInvestorProfile(updated);

    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'PLAN_UPGRADED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'SUBSCRIPTION',
      targetId: planId,
      details: `Upgraded subscription to ${planId.toUpperCase()} with +${creditsGranted} discovery credits and +${planId === 'pro' ? 10 : 25} bilateral chats.`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  // Apply to Multiple Investors
  const applyToInvestors = (ideaId: string, investorIds: string[], pitchNote: string) => {
    const idea = ideas.find((i) => i.id === ideaId);
    if (!idea) return;

    const newApps: IdeaApplication[] = [];
    investorIds.forEach((invId) => {
      const investor = INITIAL_INVESTORS.find((inv) => inv.userId === invId);
      const app: IdeaApplication = {
        id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        ideaId: idea.id,
        ideaTitle: idea.title,
        ideaCategory: idea.category,
        founderId: currentUser.id,
        founderName: currentUser.name,
        investorId: invId,
        investorName: investor?.name || 'Accredited Investor',
        investorAvatar: investor?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
        status: 'Applied',
        pitchNote,
        appliedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      newApps.push(app);

      // Notification to investor
      const notif: Notification = {
        id: `notif-${Date.now()}-${invId}`,
        userId: invId,
        title: 'New Idea Pitch Received',
        message: `${currentUser.name} applied with "${idea.title}" matching your investment thesis.`,
        link: '/dashboard/investor',
        type: 'APPLICATION',
        isRead: false,
        createdAt: 'Just now',
      };
      setNotifications((prev) => [notif, ...prev]);
    });

    setApplications((prev) => [...newApps, ...prev]);

    // Update idea applications count
    setIdeas((prev) =>
      prev.map((item) =>
        item.id === ideaId
          ? { ...item, applicationsCount: item.applicationsCount + investorIds.length }
          : item
      )
    );

    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'BATCH_APPLICATION_SUBMITTED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'APPLICATIONS',
      targetId: ideaId,
      details: `Submitted applications for "${idea.title}" to ${investorIds.length} investors.`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status, updatedAt: new Date().toISOString().split('T')[0] } : app))
    );

    const targetApp = applications.find((a) => a.id === appId);
    if (targetApp) {
      const notif: Notification = {
        id: `notif-${Date.now()}`,
        userId: targetApp.founderId,
        title: `Application ${status}`,
        message: `${targetApp.investorName} updated your application for "${targetApp.ideaTitle}" to "${status}".`,
        link: '/dashboard/founder',
        type: 'APPLICATION',
        isRead: false,
        createdAt: 'Just now',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  // Opportunities
  const addOpportunity = (oppData: Partial<Opportunity>): Opportunity => {
    const opp: Opportunity = {
      id: `opp-${Date.now()}`,
      title: oppData.title || 'New Business Opportunity',
      type: oppData.type || 'Co-founder',
      postedById: currentUser.id,
      postedByName: currentUser.name,
      postedByRole: currentUser.title,
      postedByAvatar: currentUser.avatar,
      verified: currentUser.verified,
      location: oppData.location || currentUser.location,
      isRemote: oppData.isRemote ?? true,
      summary: oppData.summary || '',
      description: oppData.description || '',
      requirements: oppData.requirements || ['Demonstrated expertise', 'Strong alignment with mission'],
      skills: oppData.skills || ['Leadership', 'Problem Solving'],
      compensationOrEquity: oppData.compensationOrEquity || 'Competitive package / Equity stake',
      deadline: oppData.deadline || '2026-12-31',
      applicationMethod: oppData.applicationMethod || 'INTERNAL',
      externalUrl: oppData.externalUrl,
      status: 'Published',
      viewsCount: 1,
      applicationsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setOpportunities((prev) => [opp, ...prev]);

    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'OPPORTUNITY_CREATED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: 'OPPORTUNITY',
      targetId: opp.id,
      details: `Posted opportunity "${opp.title}" (${opp.type}).`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);

    return opp;
  };

  const updateOpportunityStatus = (id: string, status: OpportunityStatus) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, status } : opp))
    );
  };

  const applyToOpportunity = (oppId: string, note: string) => {
    const opp = opportunities.find((o) => o.id === oppId);
    if (!opp) return;

    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, applicationsCount: o.applicationsCount + 1 } : o))
    );

    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: opp.postedById,
      title: 'New Opportunity Application',
      message: `${currentUser.name} applied for "${opp.title}".`,
      link: `/opportunities/${opp.id}`,
      type: 'APPLICATION',
      isRead: false,
      createdAt: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Messaging & Chat
  const sendMessage = (convId: string, content: string, attachments?: MessageAttachment[]) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      content,
      attachments,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              lastMessage: content || 'Sent an attachment',
              lastMessageTimestamp: 'Just now',
            }
          : c
      )
    );
  };

  const startOrGetConversationWith = (targetUser: {
    id: string;
    name: string;
    role: UserRole;
    avatar: string;
    title: string;
    verified: boolean;
  }): string => {
    const existing = conversations.find((c) =>
      c.participantIds.includes(currentUser.id) && c.participantIds.includes(targetUser.id)
    );
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      participantIds: [currentUser.id, targetUser.id],
      otherParticipant: {
        id: targetUser.id,
        name: targetUser.name,
        role: targetUser.role,
        avatar: targetUser.avatar,
        title: targetUser.title,
        verified: targetUser.verified,
        online: true,
      },
      lastMessage: 'Conversation started on Ideasoch.',
      lastMessageTimestamp: 'Just now',
      unreadCount: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    setMessages((prev) => ({
      ...prev,
      [newConvId]: [
        {
          id: `msg-${Date.now()}`,
          conversationId: newConvId,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderAvatar: currentUser.avatar,
          content: `Hi ${targetUser.name}, I reached out via Ideasoch to discuss potential collaboration.`,
          createdAt: new Date().toISOString(),
        },
      ],
    }));
    setActiveConversationId(newConvId);
    return newConvId;
  };

  // Meetings
  const scheduleMeeting = (meetingData: Omit<Meeting, 'id' | 'createdAt' | 'status'>) => {
    const meet: Meeting = {
      id: `meet-${Date.now()}`,
      ...meetingData,
      status: 'Requested',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setMeetings((prev) => [meet, ...prev]);

    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: meet.participantId,
      title: 'Meeting Invitation Received',
      message: `${currentUser.name} proposed a ${meet.durationMinutes}-min sync on ${meet.date}.`,
      link: '/meetings',
      type: 'MEETING',
      isRead: false,
      createdAt: 'Just now',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateMeetingStatus = (meetingId: string, status: MeetingStatus) => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === meetingId ? { ...m, status } : m))
    );
  };

  // Notifications
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Moderation & Admin
  const submitReport = (reportData: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
    const rep: Report = {
      id: `rep-${Date.now()}`,
      ...reportData,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setReports((prev) => [rep, ...prev]);

    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      action: 'REPORT_SUBMITTED',
      userId: currentUser.id,
      userName: currentUser.name,
      targetType: rep.targetType,
      targetId: rep.targetId,
      details: `Report submitted for ${rep.reason}: "${rep.targetTitle}".`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const updateReportStatus = (reportId: string, status: Report['status']) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status } : r))
    );
  };

  const toggleUserVerification = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, verified: !u.verified } : u))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        users,
        ideas,
        addIdea,
        deleteIdeaFree,
        canFounderCreateIdea,
        updateIdeaStatus,
        savedIdeaIds,
        toggleSaveIdea,
        isIdeaSaved,
        deckAssistanceRequests,
        requestDeckAssistance,
        investorProfile,
        unlockedIdeaIds,
        canAccessIdeaDetails,
        unlockIdea,
        startInvestorChat,
        purchaseChatCredits,
        upgradeInvestorPlan,
        investorBillingCycle,
        toggleInvestorBillingCycle,
        applications,
        applyToInvestors,
        updateApplicationStatus,
        opportunities,
        addOpportunity,
        updateOpportunityStatus,
        applyToOpportunity,
        conversations,
        activeConversationId,
        setActiveConversationId,
        messages,
        sendMessage,
        startOrGetConversationWith,
        meetings,
        scheduleMeeting,
        updateMeetingStatus,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        reports,
        submitReport,
        updateReportStatus,
        auditLogs,
        toggleUserVerification,
        plans: SUBSCRIPTION_PLANS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
