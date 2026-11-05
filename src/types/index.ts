export type UserRole =
  | 'admin'            // ادمین کل سامانه (فرماندهی و معاونت تعلیم و تربیت)
  | 'nahieh_officer'   // مسئول تعلیم و تربیت ناحیه
  | 'nahieh_ostadyar'  // استادیار ناحیه
  | 'hozeh_officer'    // مسئول تعلیم و تربیت حوزه
  | 'hozeh_sarmarbi'   // سرمربی حوزه
  | 'morabbi'          // مربی پایگاه
  | 'sargorouh'        // سرگروه حلقه پایگاه
  | 'basiji';          // کاربر بسیجی عادی / متربی حلقه

export interface RoleInfo {
  id: UserRole;
  title: string;
  rankTitle: string;
  level: 'کشوری/استانی' | 'ناحیه' | 'حوزه' | 'پایگاه' | 'حلقه';
  description: string;
  canPublishTo: string[];
  canApproveReports: boolean;
  canSubmitReports: boolean;
  color: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  nahieh: string;
  hozeh: string;
  base: string;
  circleName?: string;
  nationalCode: string;
  phone: string;
  rankBadge: string;
  points: number;
  completedQuizzesCount: number;
}

export type TargetScope =
  | 'all'              // کل سامانه (سراسری)
  | 'nahieh_all'       // کلیه زیرمجموعه‌های ناحیه
  | 'hozeh_all'        // کلیه پایگاه‌ها و حلقات حوزه
  | 'base_all'         // کلیه حلقات پایگاه
  | 'circle_members'   // فقط اعضای حلقه صالحین
  | 'morabbian'        // فقط مربیان و سرگروه‌ها
  | 'youth_group';     // رده سنی خاص (نوجوانان / جوانان)

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorRoleTitle: string;
  targetScope: TargetScope;
  targetScopeTitle: string;
  category: 'ابلاغیه رسمی' | 'طرح درس تربیتی' | 'محتوای بصیرتی' | 'فراخوان و مسابقه' | 'آموزش مهارتی';
  publishedAt: string;
  isImportant?: boolean;
  isPinned?: boolean;
  likes: number;
  commentsCount: number;
  attachmentName?: string;
  attachmentSize?: string;
}

export interface CircleReport {
  id: string;
  circleId: string;
  circleName: string;
  leaderId: string;
  leaderName: string;
  morabbiName: string;
  baseName: string;
  hozehName: string;
  nahiehName: string;
  ageGroup: 'نونهالان' | 'نوجوانان' | 'جوانان' | 'میانسالان و پیشکسوتان';
  meetingDate: string;
  sessionNumber: number;
  totalMembers: number;
  presentCount: number;
  absentCount: number;
  topicType: 'معرفتی و احکام' | 'بصیرتی و سیاسی' | 'تربیتی و اخلاقی' | 'مهارتی و ورزشی';
  mainTopic: string;
  summary: string;
  decisions: string[];
  challenges?: string;
  photoUrl?: string;
  status: 'pending' | 'approved' | 'revision';
  score?: number; // 0 to 100
  evaluatedBy?: string;
  evaluatorFeedback?: string;
  createdAt: string;
}

export interface CircleRankingItem {
  id: string;
  circleName: string;
  leaderName: string;
  baseName: string;
  hozehName: string;
  nahiehName: string;
  ageGroup: string;
  rank: number;
  previousRank: number;
  totalScore: number;
  attendanceRate: number;
  reportCount: number;
  quizAverage: number;
  badgeLevel: 'زرین' | 'سیمین' | 'برنزی';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizItem {
  id: string;
  title: string;
  category:
    | 'احکام و معارف'
    | 'بصیرت و سواد رسانه'
    | 'اخلاق تشکیلاتی'
    | 'روش تدریس حلقه'
    | 'سیره شهدا و ولایت'
    | 'مهارت‌های کاربردی و امداد'
    | 'مدیریت جهادی و نهج‌البلاغه';
  targetAudience: string;
  durationMinutes: number;
  questionsCount: number;
  rewardPoints: number;
  passedScore: number;
  questions: QuizQuestion[];
  participantsCount: number;
}

export interface VideoLesson {
  id: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  duration: string;
  category:
    | 'روش اداره حلقه'
    | 'معرفت‌شناسی'
    | 'اخلاق و تربیت'
    | 'دشمن‌شناسی و بصیرت'
    | 'روانشناسی و ارتباط با نسل نو'
    | 'مهارت‌های مربیگری'
    | 'مدیریت اردو و امنیت';
  summary: string;
  thumbnailUrl: string;
  videoDurationSeconds: number;
  views: number;
  chapters: { title: string; time: string }[];
  keyPoints: string[];
}

export interface Pamphlet {
  id: string;
  title: string;
  author: string;
  pages: number;
  category:
    | 'درسنامه‌های صالحین'
    | 'طرح کلی اندیشه اسلامی'
    | 'روانشناسی نوجوان'
    | 'سیره شهدا'
    | 'احکام و فقه کاربردی'
    | 'سواد رسانه و جنگ نرم'
    | 'مدیریت جهادی'
    | 'روش‌های تدریس و حلقه‌داری'
    | 'دستورالعمل اردوهای تربیتی'
    | 'تبیین بیانیه گام دوم';
  coverUrl: string;
  downloadsCount: number;
  description: string;
  publishedDate: string;
  fileSize: string;
  chapters: { title: string; excerpt: string }[];
}

export interface CircleMember {
  id: string;
  name: string;
  roleInCircle: 'عضو عادی' | 'کمک‌سرگروه' | 'مسئول فرهنگی' | 'مسئول پشتیبانی و ورزش';
  joinDate: string;
  attendanceRate: number;
  quizzesTaken: number;
  lastPresence: string;
  avatarSeed: string;
}

export interface PersonnelUser {
  id: string;
  name: string;
  role: UserRole;
  nationalCode: string;
  phone: string;
  nahieh: string;
  hozeh: string;
  base: string;
  circleName?: string;
  assignedAt: string;
  status: 'active' | 'in_training' | 'pending';
  createdByRole: UserRole;
  rankBadge: string;
}
