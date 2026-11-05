/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementsView } from './components/AnnouncementsView';
import { CircleMembersView } from './components/CircleMembersView';
import { DashboardView } from './components/DashboardView';
import { EducationView } from './components/EducationView';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PersonnelManagementView } from './components/PersonnelManagementView';
import { RankingView } from './components/RankingView';
import { ReportsManagementView } from './components/ReportsManagementView';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';
import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_PERSONNEL,
  INITIAL_REPORTS,
  MOCK_PAMPHLETS,
  MOCK_QUIZZES,
  MOCK_RANKINGS,
  MOCK_USERS_BY_ROLE,
  MOCK_VIDEOS,
  ROLES_CONFIG,
} from './data/mockData';
import { PamphletReaderPage } from './pages/PamphletReaderPage';
import { PublishContentPage } from './pages/PublishContentPage';
import { QuizTakingPage } from './pages/QuizTakingPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { SubmitReportPage } from './pages/SubmitReportPage';
import { VideoLecturePage } from './pages/VideoLecturePage';
import { ROLE_THEMES } from './theme/roleThemes';
import {
  Announcement,
  CircleRankingItem,
  CircleReport,
  Pamphlet,
  PersonnelUser,
  QuizItem,
  UserProfile,
  UserRole,
  VideoLesson,
} from './types';

export type AppPage =
  | 'dashboard'
  | 'personnel'
  | 'reports'
  | 'rankings'
  | 'education'
  | 'members'
  | 'announcements'
  | 'publish-content'
  | 'submit-report'
  | 'report-detail'
  | 'quiz-taking'
  | 'video-lecture'
  | 'pamphlet-reader';

export default function App() {
  // Current active role and user profile
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('nahieh_officer');
  const [usersMap, setUsersMap] = useState<Record<UserRole, UserProfile>>(MOCK_USERS_BY_ROLE);

  // App core state
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [reports, setReports] = useState<CircleReport[]>(INITIAL_REPORTS);
  const [rankings, setRankings] = useState<CircleRankingItem[]>(MOCK_RANKINGS);
  const [personnelList, setPersonnelList] = useState<PersonnelUser[]>(INITIAL_PERSONNEL);

  // Dedicated Page Routing (No modals for content/reports/forms!)
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [previousPage, setPreviousPage] = useState<AppPage>('dashboard');

  // Selected entities for dedicated full-page views
  const [selectedReport, setSelectedReport] = useState<CircleReport | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [selectedPamphlet, setSelectedPamphlet] = useState<Pamphlet | null>(null);

  // Fast Role Switcher modal
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const currentUser = usersMap[currentUserRole];
  const currentTheme = ROLE_THEMES[currentUserRole];

  // Role change handler
  const handleSelectRole = (newRole: UserRole) => {
    setCurrentUserRole(newRole);
    if (newRole === 'basiji') {
      setCurrentPage('education');
    } else {
      setCurrentPage('dashboard');
    }
    showToast(`رنگ‌بندی، دسترسی‌ها و داشبورد به «${ROLES_CONFIG[newRole].title}» (${ROLE_THEMES[newRole].nameFa}) تغییر یافت.`);
  };

  // Page navigation helpers
  const navigateTo = (page: AppPage) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPublishPage = () => {
    navigateTo('publish-content');
  };

  const handleOpenSubmitReportPage = () => {
    navigateTo('submit-report');
  };

  const handleOpenReportDetailPage = (report: CircleReport) => {
    setSelectedReport(report);
    navigateTo('report-detail');
  };

  const handleOpenQuizPage = (quiz: QuizItem) => {
    setSelectedQuiz(quiz);
    navigateTo('quiz-taking');
  };

  const handleOpenQuizById = (quizId: string) => {
    const q = MOCK_QUIZZES.find((item) => item.id === quizId) || MOCK_QUIZZES[0];
    handleOpenQuizPage(q);
  };

  const handleOpenVideoPage = (video: VideoLesson) => {
    setSelectedVideo(video);
    navigateTo('video-lecture');
  };

  const handleOpenPamphletPage = (pamphlet: Pamphlet) => {
    setSelectedPamphlet(pamphlet);
    navigateTo('pamphlet-reader');
  };

  const handleOpenPamphletById = (pamphletId: string) => {
    const p = MOCK_PAMPHLETS.find((item) => item.id === pamphletId) || MOCK_PAMPHLETS[0];
    handleOpenPamphletPage(p);
  };

  // Add personnel to subordinate echelons
  const handleAddPersonnel = (
    newUserData: Omit<PersonnelUser, 'id' | 'assignedAt' | 'createdByRole'>
  ) => {
    const newPersonnel: PersonnelUser = {
      ...newUserData,
      id: `p-${Date.now()}`,
      assignedAt: '۱۴۰۵/۰۸/۱۶',
      createdByRole: currentUserRole,
    };
    setPersonnelList([newPersonnel, ...personnelList]);
    showToast(
      `حکم سازمانی برای «${newUserData.name}» با عنوان «${ROLES_CONFIG[newUserData.role].title}» صادر و ثبت گردید.`
    );
  };

  // Publish content handler
  const handlePublishAnnouncement = (
    newAnnData: Omit<Announcement, 'id' | 'likes' | 'commentsCount'>
  ) => {
    const newAnn: Announcement = {
      ...newAnnData,
      id: `ann-${Date.now()}`,
      likes: 0,
      commentsCount: 0,
    };
    setAnnouncements([newAnn, ...announcements]);
    showToast('محتوای جدید با موفقیت برای رده مخاطب در سامانه منتشر گردید.');
    setCurrentPage('announcements');
  };

  // Submit report handler
  const handleSubmitReport = (
    newReportData: Omit<CircleReport, 'id' | 'createdAt' | 'status'>
  ) => {
    const newReport: CircleReport = {
      ...newReportData,
      id: `rep-${Date.now()}`,
      status: 'pending',
      createdAt: 'امروز، چند لحظه پیش',
    };
    setReports([newReport, ...reports]);
    showToast('گزارش فعالیت جلسه با موفقیت ثبت و به کارتابل مربی ارسال گردید.');
    setCurrentPage('reports');
  };

  // Update report evaluation status
  const handleUpdateReportStatus = (
    reportId: string,
    status: 'approved' | 'revision',
    score: number,
    feedback: string
  ) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            status,
            score,
            evaluatorFeedback: feedback,
            evaluatedBy: `${currentUser.name} (${ROLES_CONFIG[currentUser.role].title})`,
          };
        }
        return r;
      })
    );

    if (status === 'approved') {
      showToast(`گزارش جلسه تایید شد و نمره کیفی ${score} برای حلقه ثبت گردید.`);
    } else {
      showToast('گزارش جهت اصلاح و بازبینی به سرگروه ارجاع داده شد.');
    }
  };

  // Like announcement
  const handleLikeAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );
  };

  // Award points to user profile
  const handleAwardPoints = (points: number) => {
    setUsersMap((prev) => ({
      ...prev,
      [currentUserRole]: {
        ...prev[currentUserRole],
        points: prev[currentUserRole].points + points,
        completedQuizzesCount: prev[currentUserRole].completedQuizzesCount + 1,
      },
    }));
    showToast(`تبریک! ${points} امتیاز شایستگی به پرونده شما اضافه شد.`);
  };

  const pendingCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 flex flex-col font-['Vazirmatn',sans-serif]">
      {/* Top Header Bar tailored to current role and theme */}
      <Header
        currentUser={currentUser}
        currentTab={currentPage}
        onTabChange={(tab) => navigateTo(tab as AppPage)}
        onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
        onOpenPublishModal={handleOpenPublishPage}
        onOpenReportModal={handleOpenSubmitReportPage}
        announcements={announcements}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#162720] text-white px-5 py-2.5 rounded-full shadow-lg border border-[#C59B27]/40 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Main Full-Page Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-12">
        {/* 1. Dashboard View */}
        {currentPage === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            announcements={announcements}
            reports={reports}
            rankings={rankings}
            personnelList={personnelList}
            onNavigateTab={(tab) => navigateTo(tab as AppPage)}
            onOpenPublishModal={handleOpenPublishPage}
            onOpenReportModal={handleOpenSubmitReportPage}
            onOpenQuiz={handleOpenQuizById}
            onOpenPamphlet={handleOpenPamphletById}
            onLikeAnnouncement={handleLikeAnnouncement}
          />
        )}

        {/* 2. Dedicated Full Page for Publishing Content */}
        {currentPage === 'publish-content' && (
          <PublishContentPage
            currentUser={currentUser}
            onBack={() => navigateTo(previousPage === 'publish-content' ? 'dashboard' : previousPage)}
            onPublish={handlePublishAnnouncement}
          />
        )}

        {/* 3. Dedicated Full Page for Submitting Activity Report */}
        {currentPage === 'submit-report' && (
          <SubmitReportPage
            currentUser={currentUser}
            onBack={() => navigateTo(previousPage === 'submit-report' ? 'reports' : previousPage)}
            onSubmitReport={handleSubmitReport}
          />
        )}

        {/* 4. Dedicated Full Page for Report Details & Evaluation */}
        {currentPage === 'report-detail' && selectedReport && (
          <ReportDetailPage
            report={selectedReport}
            currentUser={currentUser}
            onBack={() => navigateTo('reports')}
            onUpdateStatus={handleUpdateReportStatus}
          />
        )}

        {/* 5. Dedicated Full Page for Interactive Quiz Exam */}
        {currentPage === 'quiz-taking' && selectedQuiz && (
          <QuizTakingPage
            quiz={selectedQuiz}
            currentUser={currentUser}
            onBack={() => navigateTo('education')}
            onAwardPoints={handleAwardPoints}
          />
        )}

        {/* 6. Dedicated Full Page for Video Lecture Theater */}
        {currentPage === 'video-lecture' && selectedVideo && (
          <VideoLecturePage
            video={selectedVideo}
            currentUser={currentUser}
            onBack={() => navigateTo('education')}
            onOpenQuiz={handleOpenQuizById}
          />
        )}

        {/* 7. Dedicated Full Page for Reading Pamphlets */}
        {currentPage === 'pamphlet-reader' && selectedPamphlet && (
          <PamphletReaderPage
            pamphlet={selectedPamphlet}
            currentUser={currentUser}
            onBack={() => navigateTo('education')}
          />
        )}

        {/* 8. Personnel Management View */}
        {currentPage === 'personnel' && (
          <PersonnelManagementView
            currentUser={currentUser}
            personnelList={personnelList}
            onAddPersonnel={handleAddPersonnel}
          />
        )}

        {/* 9. Reports Management View */}
        {currentPage === 'reports' && (
          <ReportsManagementView
            currentUser={currentUser}
            reports={reports}
            onOpenSubmitReportPage={handleOpenSubmitReportPage}
            onOpenReportDetailPage={handleOpenReportDetailPage}
          />
        )}

        {/* 10. Rankings View */}
        {currentPage === 'rankings' && (
          <RankingView currentUser={currentUser} rankings={rankings} />
        )}

        {/* 11. Education Center View */}
        {currentPage === 'education' && (
          <EducationView
            currentUser={currentUser}
            onOpenQuizPage={handleOpenQuizPage}
            onOpenVideoPage={handleOpenVideoPage}
            onOpenPamphletPage={handleOpenPamphletPage}
          />
        )}

        {/* 12. Circle Members View */}
        {currentPage === 'members' && (
          <CircleMembersView currentUser={currentUser} />
        )}

        {/* 13. Announcements View */}
        {currentPage === 'announcements' && (
          <AnnouncementsView
            currentUser={currentUser}
            announcements={announcements}
            onOpenPublishModal={handleOpenPublishPage}
            onOpenPamphlet={handleOpenPamphletById}
            onLikeAnnouncement={handleLikeAnnouncement}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation (Native App Feel, Role & Theme Aware) */}
      <MobileBottomNav
        currentUser={currentUser}
        currentTab={currentPage}
        onTabChange={(tab) => navigateTo(tab as AppPage)}
        onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
        pendingReportsCount={pendingCount}
      />

      {/* Role Switcher Modal (Allows testing all 8 roles & watching theme shift) */}
      <RoleSwitcherModal
        isOpen={isRoleSwitcherOpen}
        onClose={() => setIsRoleSwitcherOpen(false)}
        currentUser={currentUser}
        onSelectRole={handleSelectRole}
      />
    </div>
  );
}
