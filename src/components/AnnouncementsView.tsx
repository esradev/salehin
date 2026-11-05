import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  Calendar,
  Download,
  Filter,
  Heart,
  MessageSquare,
  Pin,
  PlusCircle,
  Search,
  Share2,
} from 'lucide-react';
import { ROLES_CONFIG } from '../data/mockData';
import { Announcement, UserProfile } from '../types';

interface AnnouncementsViewProps {
  currentUser: UserProfile;
  announcements: Announcement[];
  onOpenPublishModal: () => void;
  onOpenPamphlet: (pamphletId: string) => void;
  onLikeAnnouncement: (id: string) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  currentUser,
  announcements,
  onOpenPublishModal,
  onOpenPamphlet,
  onLikeAnnouncement,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');

  const canPublish = currentUser.role !== 'basiji';

  const filteredAnnouncements = announcements.filter((item) => {
    if (selectedCategory !== 'همه' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.authorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 text-right">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <Bell size={22} className="text-[#2D4A3E]" />
            <span>تابلوی اعلانات، ابلاغیه‌ها و درسنامه‌های صالحین</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            مشاهده دستورالعمل‌های رسمی، طرح درس‌های هفتگی و اطلاعیه‌های قرارگاه تعلیم و تربیت
          </p>
        </div>

        {canPublish && (
          <button
            onClick={onOpenPublishModal}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <PlusCircle size={16} />
            <span>انتشار ابلاغیه / طرح درس جدید</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search size={16} className="absolute right-3 top-2.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در عنوان یا متن اطلاعیه‌ها..."
            className="w-full pr-9 pl-4 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-[#2D4A3E]"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto shrink-0">
          {['همه', 'ابلاغیه رسمی', 'طرح درس تربیتی', 'محتوای بصیرتی', 'فراخوان و مسابقه'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-4">
        {filteredAnnouncements.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-all space-y-3"
          >
            {/* Meta Header - unboxed text with dot separators */}
            <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[#2D4A3E]">{item.authorName}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-600">{item.authorRoleTitle}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-400">{item.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-800 font-medium">{item.category}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.isPinned && (
                  <span className="text-amber-600 flex items-center gap-1 font-medium text-[11px]">
                    <Pin size={12} />
                    <span>مهم</span>
                  </span>
                )}
                <span className="text-[11px] text-stone-500 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                  مخاطب: {item.targetScopeTitle}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
              {item.title}
            </h3>

            {/* Content Body */}
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
              {item.content}
            </p>

            {/* Attachment preview if present */}
            {item.attachmentName && (
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <BookOpen size={16} className="text-[#2D4A3E] shrink-0" />
                  <span className="font-medium text-stone-800 truncate">{item.attachmentName}</span>
                  <span className="text-stone-400 text-[11px]">({item.attachmentSize})</span>
                </div>
                <button
                  onClick={() => onOpenPamphlet('pam-1')}
                  className="px-3 py-1.5 text-xs font-bold text-[#2D4A3E] bg-white border border-stone-200 rounded-lg hover:bg-[#2D4A3E] hover:text-white transition-colors shrink-0 flex items-center gap-1 shadow-xs"
                >
                  <Download size={13} />
                  <span>دانلود و مطالعه</span>
                </button>
              </div>
            )}

            {/* Footer with Like & Actions */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onLikeAnnouncement(item.id)}
                  className="flex items-center gap-1.5 hover:text-red-600 transition-colors"
                >
                  <Heart size={15} className={item.likes > 40 ? 'fill-red-500 text-red-500' : ''} />
                  <span className="font-mono tabular-nums">{item.likes}</span>
                </button>
                <span className="flex items-center gap-1.5">
                  <MessageSquare size={15} />
                  <span className="font-mono tabular-nums">{item.commentsCount} نظر</span>
                </span>
              </div>

              <span className="text-[11px] text-stone-400">
                شجره طیبه صالحین · {currentUser.nahieh}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
