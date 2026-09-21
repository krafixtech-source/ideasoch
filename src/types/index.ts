export type UserRole = 'IDEA_MAKER' | 'INVESTOR' | 'ADMIN' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  location: string;
  verified: boolean;
  bio: string;
  createdAt: string;
  linkedIn?: string;
  website?: string;
  skills?: string[];
  experienceYears?: number;
}

export type IdeaCategory =
  | 'Healthcare & Life Sciences'
  | 'CleanTech & Energy'
  | 'FinTech & Capital'
  | 'AgriTech & Food'
  | 'B2B SaaS & AI'
  | 'Logistics & Supply Chain'
  | 'EdTech & Learning'
  | 'Consumer & D2C';

export type IdeaStage =
  | 'Concept'
  | 'Research & Validation'
  | 'Prototype'
  | 'MVP'
  | 'Early Traction'
  | 'Scaling';

export type IdeaStatus =
  | 'Draft'
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Featured'
  | 'Suspended';

export interface IdeaDocument {
  title: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'spreadsheet' | 'doc';
  isConfidential: boolean;
  url: string;
}

export interface Idea {
  id: string;
  title: string;
  headline?: string; // High-impact short idea headline
  quote?: string; // Compelling quote / teaser phrase
  tagline: string;
  category: IdeaCategory;
  stage: IdeaStage;
  fundingRequired: string; // e.g. "₹30,00,000" or "₹2.5 Cr"
  fundingCurrency: string;
  location: string;
  summary: string;
  problem: string;
  solution: string;
  targetMarket: string;
  tamSamSom?: string;
  businessModel: string;
  currentTraction?: string;
  unitEconomics?: string;
  useOfFunds?: string;
  founderId: string;
  founderName: string;
  founderAvatar: string;
  founderBio: string;
  founderLinkedIn?: string;
  documents: IdeaDocument[]; // Up to 2 files free (PPT, PDF), 3+ requires paid plan
  status: IdeaStatus;
  viewsCount: number;
  savesCount: number;
  applicationsCount: number;
  featured: boolean;
  needsDeckAssistance?: boolean;
  deckAssistanceStatus?: 'None' | 'Requested' | 'In Progress' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

export interface InvestorProfile {
  userId: string;
  name: string;
  title: string;
  organization: string;
  location: string;
  avatar: string;
  verified: boolean;
  verificationStatus: 'pending_background_check' | 'verified' | 'rejected';
  bio: string;
  investmentThesis: string;
  minTicket: string; // e.g. "₹10 Lakhs"
  maxTicket: string; // e.g. "₹2 Crores"
  preferredIndustries: IdeaCategory[];
  preferredStages: IdeaStage[];
  preferredLocations: string[];
  areasOfExpertise: string[];
  portfolio: {
    name: string;
    stage: string;
    sector: string;
    year: string;
  }[];
  discoveryCreditsRemaining: number;
  totalCreditsGranted: number;
  planId: 'free' | 'pro' | 'fund';
  subscriptionPlan: 'monthly' | 'yearly' | 'none';
  subscriptionBillingCycle: 'monthly' | 'yearly';
  chatCreditsTotal: number; // Default 5 chats included in investor plan
  chatCreditsUsed: number;
  activeChatIds: string[]; // IDs of founders or conversations unlocked
  linkedIn?: string;
  website?: string;
}

export interface DeckAssistanceRequest {
  id: string;
  founderId: string;
  founderName: string;
  founderEmail: string;
  founderPhone: string;
  businessTitle: string;
  businessModelSummary: string;
  targetCapital: string;
  status: 'Received' | 'Reviewing' | 'In Preparation' | 'Delivered';
  requestedAt: string;
}

export type ApplicationStatus =
  | 'Applied'
  | 'Viewed'
  | 'Shortlisted'
  | 'Connected'
  | 'In Discussion'
  | 'Meeting'
  | 'Closed'
  | 'Rejected';

export interface IdeaApplication {
  id: string;
  ideaId: string;
  ideaTitle: string;
  ideaCategory: IdeaCategory;
  founderId: string;
  founderName: string;
  investorId: string;
  investorName: string;
  investorAvatar: string;
  status: ApplicationStatus;
  pitchNote: string;
  appliedAt: string;
  updatedAt: string;
}

export interface IdeaAccess {
  id: string;
  ideaId: string;
  investorId: string;
  accessedAt: string;
  plan: string;
  remainingCredits: number;
}

export interface Connection {
  id: string;
  userOneId: string;
  userTwoId: string;
  otherUser: {
    id: string;
    name: string;
    role: UserRole;
    avatar: string;
    title: string;
    location: string;
    verified: boolean;
  };
  connectedAt: string;
}

export interface MessageAttachment {
  name: string;
  size: string;
  type: 'pdf' | 'doc' | 'image';
  url: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  attachments?: MessageAttachment[];
  meetingInviteId?: string;
  createdAt: string;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  title: string;
  verified: boolean;
  online: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  otherParticipant: ConversationParticipant;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

export type OpportunityType =
  | 'Co-founder'
  | 'Job'
  | 'Partnership'
  | 'Investment'
  | 'Consulting'
  | 'Internship'
  | 'Acquisition';

export type OpportunityStatus =
  | 'Draft'
  | 'Pending Review'
  | 'Published'
  | 'Paused'
  | 'Closed';

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  postedById: string;
  postedByName: string;
  postedByRole: string; // e.g. "Angel Investor & Partner at Apex"
  postedByAvatar: string;
  verified: boolean;
  location: string;
  isRemote: boolean;
  summary: string;
  description: string;
  requirements: string[];
  skills: string[];
  compensationOrEquity: string;
  deadline: string;
  applicationMethod: 'INTERNAL' | 'EXTERNAL';
  externalUrl?: string;
  status: OpportunityStatus;
  viewsCount: number;
  applicationsCount: number;
  createdAt: string;
}

export interface OpportunityApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantNote: string;
  resumeOrDeckUrl?: string;
  status: 'Submitted' | 'Reviewed' | 'Shortlisted' | 'Rejected';
  appliedAt: string;
}

export type MeetingStatus =
  | 'Requested'
  | 'Accepted'
  | 'Declined'
  | 'Completed'
  | 'Cancelled';

export interface Meeting {
  id: string;
  title: string;
  organizerId: string;
  organizerName: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  date: string; // e.g. "2026-10-04"
  time: string; // e.g. "15:30 IST"
  durationMinutes: number;
  meetingLink: string;
  notes: string;
  status: MeetingStatus;
  createdAt: string;
}

export type NotificationType =
  | 'VIEW'
  | 'APPLICATION'
  | 'CONNECTION'
  | 'MESSAGE'
  | 'MEETING'
  | 'MATCH'
  | 'SYSTEM';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  link: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export type ReportReason =
  | 'Fake profile'
  | 'Fake investment opportunity'
  | 'Spam'
  | 'Misleading information'
  | 'Copyright issue'
  | 'Harassment'
  | 'Other';

export interface Report {
  id: string;
  reporterId: string;
  targetType: 'PROFILE' | 'IDEA' | 'OPPORTUNITY' | 'MESSAGE';
  targetId: string;
  targetTitle: string;
  reason: ReportReason;
  details: string;
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  targetType: string;
  targetId: string;
  details: string;
  timestamp: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'pro' | 'fund' | 'monthly' | 'yearly';
  name: string;
  badge: string;
  priceMonthly: number;
  currency: string;
  discoveryCreditsPerMonth: number;
  description: string;
  features: string[];
  ctaLabel: string;
  popular?: boolean;
}
