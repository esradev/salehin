import React, { useState } from 'react';
import { FileUp, Pin, Send, Sparkles, Tag, Users, X } from 'lucide-react';
import { ROLES_CONFIG } from '../data/mockData';
import { Announcement, TargetScope, UserProfile } from '../types';

interface ContentPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onPublish: (announcement: Omit<Announcement, 'id' | 'likes' | 'commentsCount'>) => void;
}

export const ContentPublishModal: React.FC<ContentPublishModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onPublish,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('ابلاغیه رسمی');
  const [targetScope, setTargetScope] = useState<TargetScope>('all');
  const [isImportant, setIsImportant] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');

  if (!isOpen) return null;

  const roleConfig = ROLES_CONFIG[currentUser.role];

  // Tailor available scopes based on user hierarchy
  const availableScopes: { id: TargetScope; label: string; desc: string }[] = [];

  if (currentUser.role === 'admin') {
    availableScopes.push(
      { id: 'all', label: 'کل سامانه (کشوری / استانی)', desc: 'انتشار برای کلیه اعضا و رده‌ها' },
      { id: 'nahieh_all', label: 'تمامی نواحی و حوزه‌ها', desc: 'مسئولین و رده‌های مدیریتی' },
      { id: 'morabbian', label: 'مربیان و سرگروه‌ها', desc: 'کادر تربیتی' },
      { id: 'youth_group', label: 'رده سنی نوجوانان و جوانان', desc: 'متربیان نسل نو' }
    );
  } else if (currentUser.role === 'nahieh_officer' || currentUser.role === 'nahieh_ostadyar') {
    availableScopes.push(
      { id: 'nahieh_all', label: `تمامی زیرمجموعه‌های ${currentUser.nahieh}`, desc: 'کل حوزه‌ها و پایگاه‌های تابعه' },
      { id: 'hozeh_all', label: 'فرماندهان و مسئولین حوزه‌ها', desc: 'رده میانی' },
      { id: 'morabbian', label: 'سرمربیان، مربیان و سرگروه‌ها', desc: 'کادر علمی و تربیتی' },
      { id: 'youth_group', label: 'متربیان نوجوان و جوان ناحیه', desc: 'جامعه هدف' }
    );
  } else if (currentUser.role === 'hozeh_officer' || currentUser.role === 'hozeh_sarmarbi') {
    availableScopes.push(
      { id: 'hozeh_all', label: `کلیه پایگاه‌ها و حلقات ${currentUser.hozeh}`, desc: 'زیرمجموعه کامل حوزه' },
      { id: 'base_all', label: 'شورای پایگاه‌های تابعه', desc: 'مدیران پایگاه‌ها' },
      { id: 'morabbian', label: 'مربیان و سرگروه‌های حوزه', desc: 'شبکه مربیان' }
    );
  } else if (currentUser.role === 'morabbi') {
    availableScopes.push(
      { id: 'base_all', label: `پایگاه ${currentUser.base}`, desc: 'کل حلقات پایگاه' },
      { id: 'morabbian', label: 'سرگروه‌های تحت هدایت', desc: 'جلسات ارتقای سرگروهی' },
      { id: 'circle_members', label: 'متربیان حلقات پایگاه', desc: 'عموم اعضا' }
    );
  } else {
    // Sargorouh
    availableScopes.push(
      { id: 'circle_members', label: `اعضای ${currentUser.circleName || 'حلقه صالحین'}`, desc: 'متربیان حلقه شما' },
      { id: 'youth_group', label: 'والدین و متربیان نوجوان حلقه', desc: 'ارتباط چهره‌به‌چهره' }
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const selectedScopeObj = availableScopes.find((s) => s.id === targetScope) || availableScopes[0];

    onPublish({
      title,
      content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorRoleTitle: roleConfig.title,
      targetScope,
      targetScopeTitle: selectedScopeObj.label,
      category,
      publishedAt: 'هم‌اکنون',
      isImportant,
      isPinned,
      attachmentName: attachmentName ? attachmentName : undefined,
      attachmentSize: attachmentName ? '۲.۱ مگابایت' : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#243E34] text-[#E5C365] flex items-center justify-center shadow-xs">
              <Send size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                انتشار محتوا، ابلاغیه یا طرح درس
              </h2>
              <p className="text-xs text-stone-500">
                انتشار مستقیم از جانب <strong>{roleConfig.title}</strong> ({currentUser.name})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              عنوان اطلاعیه یا درسنامه <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: دستورالعمل برگزاری جلسات هفته آینده / سرفصل مبحث اخلاقی"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#2D4A3E]/10 transition-colors"
            />
          </div>

          {/* Subordinate Scope & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                جامعه هدف و زیرمجموعه مخاطب <span className="text-red-500">*</span>
              </label>
              <select
                value={targetScope}
                onChange={(e) => setTargetScope(e.target.value as TargetScope)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
              >
                {availableScopes.map((scope) => (
                  <option key={scope.id} value={scope.id}>
                    {scope.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-stone-400 mt-1">
                {availableScopes.find((s) => s.id === targetScope)?.desc}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                موضوع و دسته‌بندی <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Announcement['category'])}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
              >
                <option value="ابلاغیه رسمی">ابلاغیه رسمی و اداری</option>
                <option value="طرح درس تربیتی">طرح درس و محتوای جلسه حلقه</option>
                <option value="محتوای بصیرتی">محتوای بصیرتی و سیاسی</option>
                <option value="فراخوان و مسابقه">فراخوان، مسابقه و اردو</option>
                <option value="آموزش مهارتی">آموزش مهارتی و توانمندسازی</option>
              </select>
            </div>
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              متن کامل پیام و نکات اجرایی <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="شرح دقیق ابلاغیه، نکات تربیتی، سوالات مباحثه برای سرگروه‌ها و اقدامات مورد انتظار..."
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#2D4A3E]/10 leading-relaxed transition-colors"
            />
          </div>

          {/* Attachment Simulation */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              پیوست فایل دستورالعمل یا جزوه (PDF)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                placeholder="نام فایل پیوست (مثال: Dastoorolamal_Salehin_Doreh2.pdf)"
                className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
              />
              <button
                type="button"
                onClick={() => setAttachmentName('Jozeh_Amoozeshi_Salehin.pdf')}
                className="px-3 py-2 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <FileUp size={14} />
                <span>پیوست خودکار</span>
              </button>
            </div>
          </div>

          {/* Flags: Important & Pin */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
              <input
                type="checkbox"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="w-4 h-4 text-[#2D4A3E] rounded border-stone-300 focus:ring-[#2D4A3E]"
              />
              <span>علامت‌گذاری به عنوان ابلاغیه فوری و مهم</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 text-[#2D4A3E] rounded border-stone-300 focus:ring-[#2D4A3E]"
              />
              <span className="flex items-center gap-1">
                <Pin size={13} className="text-amber-600" />
                <span>سنجاق در بالای تابلوی اعلانات</span>
              </span>
            </label>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Send size={14} />
              <span>انتشار در رده مخاطب</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
