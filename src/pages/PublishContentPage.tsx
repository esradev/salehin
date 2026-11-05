import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  FileUp,
  Pin,
  Send,
  Shield,
  Sparkles,
} from 'lucide-react';
import { ROLES_CONFIG } from '../data/mockData';
import { ROLE_THEMES } from '../theme/roleThemes';
import { Announcement, TargetScope, UserProfile } from '../types';

interface PublishContentPageProps {
  currentUser: UserProfile;
  onBack: () => void;
  onPublish: (announcement: Omit<Announcement, 'id' | 'likes' | 'commentsCount'>) => void;
}

export const PublishContentPage: React.FC<PublishContentPageProps> = ({
  currentUser,
  onBack,
  onPublish,
}) => {
  const roleConfig = ROLES_CONFIG[currentUser.role];
  const theme = ROLE_THEMES[currentUser.role];

  // Role-specific defaults
  const getDefaultCategory = (): Announcement['category'] => {
    switch (currentUser.role) {
      case 'admin':
      case 'nahieh_officer':
      case 'hozeh_officer':
        return 'ابلاغیه رسمی';
      case 'nahieh_ostadyar':
      case 'hozeh_sarmarbi':
      case 'morabbi':
      case 'sargorouh':
        return 'طرح درس تربیتی';
      default:
        return 'ابلاغیه رسمی';
    }
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Announcement['category']>(getDefaultCategory());
  const [directiveNumber, setDirectiveNumber] = useState(
    currentUser.role === 'admin'
      ? '۱۰/۱۴۰۵/ص'
      : currentUser.role.startsWith('nahieh')
      ? '۴۰۵/ن/۱۱۸'
      : '۲۱۵/ح/۷۲'
  );
  const [targetScope, setTargetScope] = useState<TargetScope>('all');
  const [isImportant, setIsImportant] = useState(currentUser.role === 'admin' || currentUser.role === 'nahieh_officer');
  const [isPinned, setIsPinned] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');

  // Tailored Scopes & Subordinates list based on role
  const getScopesForRole = (): { id: TargetScope; label: string; desc: string }[] => {
    switch (currentUser.role) {
      case 'admin':
        return [
          { id: 'all', label: 'سراسری: کلیه نواحی و حوزه‌های مقاومت سراسر کشور', desc: 'انتشار عمومی و ابلاغ ستادی به تمام سطوح' },
          { id: 'nahieh_all', label: 'فرماندهان و معاونین تعلیم و تربیت نواحی', desc: 'خط‌مشی ستادی ویژه مدیران ارشد استانی' },
          { id: 'morabbian', label: 'کل شبکه مربیان، استادیاران و سرمربیان', desc: 'ابلاغیه‌های آموزشی و توانمندسازی' },
          { id: 'youth_group', label: 'عموم متربیان و نسل نوجوان و جوان کشور', desc: 'پویش‌های ملی و مسابقات سراسری' },
        ];
      case 'nahieh_officer':
        return [
          { id: 'nahieh_all', label: `تمامی حوزه‌ها و پایگاه‌های تابعه ${currentUser.nahieh}`, desc: 'دستورالعمل اجرایی ناحیه' },
          { id: 'hozeh_all', label: 'شورای فرماندهی حوزه‌های ۲۱۵، ۲۱۷ و ۲۱۹', desc: 'مسئولین حوزه‌های تابعه' },
          { id: 'morabbian', label: 'سرمربیان، مربیان و سرگروه‌های ناحیه', desc: 'کادر تربیتی' },
        ];
      case 'nahieh_ostadyar':
        return [
          { id: 'morabbian', label: 'شورای سرمربیان و مربیان صالحین ناحیه', desc: 'سیر مطالعاتی و بسته‌های رفع شبهه' },
          { id: 'nahieh_all', label: `عموم حلقات معرفتی در سطح ${currentUser.nahieh}`, desc: 'درسنامه‌های تاییدشده عقیدتی' },
          { id: 'youth_group', label: 'حلقات جوانان و دانشجویی ناحیه', desc: 'مباحث معرفت‌شناسی و سواد رسانه' },
        ];
      case 'hozeh_officer':
        return [
          { id: 'hozeh_all', label: `کلیه پایگاه‌ها و حلقات تابعه ${currentUser.hozeh}`, desc: 'ابلاغیه عملیاتی حوزه' },
          { id: 'base_all', label: 'فرماندهان و مسئولین پایگاه‌های حوزه', desc: 'هماهنگی برنامه‌ها و اردوها' },
          { id: 'morabbian', label: 'مربیان و سرگروه‌های پایگاه‌های حوزه ۲۱۵', desc: 'شبکه سرگروهی' },
        ];
      case 'hozeh_sarmarbi':
        return [
          { id: 'morabbian', label: 'مربیان و سرگروه‌های تحت هدایت سرمربی', desc: 'شیوه‌های جذاب‌سازی و روش تدریس حلقه' },
          { id: 'circle_members', label: 'متربیان حلقات نمونه حوزه', desc: 'پرسش و پاسخ و آزمون‌های دوره‌ای' },
        ];
      case 'morabbi':
        return [
          { id: 'base_all', label: `کلیه حلقات صالحین ${currentUser.base}`, desc: 'برنامه هفتگی مسجد' },
          { id: 'morabbian', label: 'سرگروه‌های پایگاه مسجد', desc: 'نکات کارگروه هفتگی مربیگری' },
        ];
      case 'sargorouh':
      default:
        return [
          { id: 'circle_members', label: `اعضای محترم ${currentUser.circleName}`, desc: 'پیام اختصاصی به متربیان حلقه شما' },
          { id: 'youth_group', label: 'والدین و متربیان نوجوان حلقه', desc: 'اطلاع‌رسانی زمان جلسه در مسجد و تکالیف' },
        ];
    }
  };

  const availableScopes = getScopesForRole();

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

    onBack();
  };

  return (
    <div className="space-y-6 pb-16 text-right max-w-4xl mx-auto">
      {/* Top Breadcrumb & Page Title */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white px-3 py-1.5 rounded-lg border border-stone-200 transition-colors shadow-xs"
        >
          <ArrowRight size={15} />
          <span>بازگشت به پیشخوان</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>نقش ناشر:</span>
          <span className="font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md">
            {roleConfig.title}
          </span>
        </div>
      </div>

      {/* Hero Header Tailored to Role */}
      <div className={`p-6 sm:p-7 rounded-2xl text-white bg-gradient-to-br ${theme.bannerGradient} border ${theme.bannerBorder} shadow-lg relative overflow-hidden`}>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-black/30 border border-white/20 text-xs font-semibold">
            <Shield size={14} className={theme.accentText} />
            <span>سامانه رسمی انتشار و ابلاغ محتوای تربیتی</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            {currentUser.role === 'admin'
              ? 'صدور بخشنامه و ابلاغیه سراسری کشوری'
              : currentUser.role.startsWith('nahieh')
              ? `صدور ابلاغیه ستادی قرارگاه ${currentUser.nahieh}`
              : currentUser.role === 'hozeh_sarmarbi'
              ? 'تدوین و نشر طرح درس تربیتی مربیان'
              : currentUser.role === 'sargorouh'
              ? `انتشار پیام و برنامه جلسه برای ${currentUser.circleName}`
              : 'انتشار محتوا برای زیرمجموعه سازمانی'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300">
            محتوای ثبت‌شده در این صفحه مستقیماً در کارتابل رده‌های مخاطب درج شده و بازخوردها و تاییدات آن پایش می‌گردد.
          </p>
        </div>
      </div>

      {/* Main Publishing Form (Full Page) */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Row 1: Title and Directive Number */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              عنوان رسمی ابلاغیه یا درسنامه <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: دستورالعمل برگزاری جلسات هفته آینده / سرفصل مبحث اخلاقی"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#2D4A3E]/10"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              شماره نامه / کد ابلاغیه
            </label>
            <input
              type="text"
              value={directiveNumber}
              onChange={(e) => setDirectiveNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] font-mono tabular-nums text-center font-bold"
            />
          </div>
        </div>

        {/* Row 2: Target Subordinates & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              رده مخاطب و جامعه هدف <span className="text-red-500">*</span>
            </label>
            <select
              value={targetScope}
              onChange={(e) => setTargetScope(e.target.value as TargetScope)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
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
              موضوع و ماهیت محتوا <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Announcement['category'])}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
            >
              <option value="ابلاغیه رسمی">ابلاغیه رسمی و اداری</option>
              <option value="طرح درس تربیتی">طرح درس و محتوای جلسه حلقه</option>
              <option value="محتوای بصیرتی">محتوای بصیرتی و سیاسی</option>
              <option value="فراخوان و مسابقه">فراخوان، مسابقه و اردوی تربیتی</option>
              <option value="آموزش مهارتی">آموزش مهارتی و توانمندسازی</option>
            </select>
          </div>
        </div>

        {/* Row 3: Full Rich Textarea */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5">
            متن مشروح، دستورالعمل یا سوالات مباحثه <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={7}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="شرح کامل ابلاغیه، نکات تربیتی، سوالات مباحثه برای سرگروه‌ها و اقدامات مورد انتظار از رده‌های مخاطب..."
            className="w-full px-3.5 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] focus:ring-2 focus:ring-[#2D4A3E]/10 leading-relaxed"
          />
        </div>

        {/* Row 4: File Attachment Simulation */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5">
            پیوست فایل درسنامه، بخشنامه یا کاربرگ (PDF)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={attachmentName}
              onChange={(e) => setAttachmentName(e.target.value)}
              placeholder="نام فایل پیوست (مثال: Dastoorolamal_Salehin_Doreh2.pdf)"
              className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
            />
            <button
              type="button"
              onClick={() => setAttachmentName('Dastoorolamal_Salehin_HaftehBasij.pdf')}
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <FileUp size={14} />
              <span>پیوست نمونه بخشنامه</span>
            </button>
          </div>
        </div>

        {/* Row 5: Flags (Important & Pin) */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
            <input
              type="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
              className="w-4 h-4 text-[#2D4A3E] rounded border-stone-300 focus:ring-[#2D4A3E]"
            />
            <span>نشان‌گذاری به عنوان ابلاغیه فوری و با اولویت بالا</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 text-[#2D4A3E] rounded border-stone-300 focus:ring-[#2D4A3E]"
            />
            <span className="flex items-center gap-1">
              <Pin size={13} className="text-amber-600" />
              <span>سنجاق دائمی در صدر تابلوی اعلانات</span>
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
          >
            انصراف و بازگشت
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            <Send size={15} />
            <span>ثبت رسمی و انتشار در رده مخاطب</span>
          </button>
        </div>
      </form>
    </div>
  );
};
