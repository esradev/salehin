import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  GraduationCap,
  Plus,
  Search,
  Shield,
  UserCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { MOCK_CIRCLE_MEMBERS } from '../data/mockData';
import { CircleMember, UserProfile } from '../types';

interface CircleMembersViewProps {
  currentUser: UserProfile;
}

export const CircleMembersView: React.FC<CircleMembersViewProps> = ({ currentUser }) => {
  const [members, setMembers] = useState<CircleMember[]>(MOCK_CIRCLE_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New member form
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<CircleMember['roleInCircle']>('عضو عادی');

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMember: CircleMember = {
      id: `m-${Date.now()}`,
      name: newName.trim(),
      roleInCircle: newRole,
      joinDate: '۱۴۰۵/۰۸/۱۵',
      attendanceRate: 100,
      quizzesTaken: 1,
      lastPresence: 'جلسه اخیر (عضو جدید)',
      avatarSeed: 'new',
    };

    setMembers([newMember, ...members]);
    setNewName('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 text-right">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <Users size={22} className="text-[#2D4A3E]" />
            <span>فهرست و کارنامه اعضای {currentUser.circleName || 'حلقه نوجوانان شهید ابراهیم هادی'}</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            پایگاه {currentUser.base} · رصد حضور و غیاب، پیشرفت تربیتی و مشارکت در آزمون‌ها
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <UserPlus size={16} />
          <span>ثبت عضو جدید در حلقه</span>
        </button>
      </div>

      {/* Search and Summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search size={16} className="absolute right-3 top-2.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی نام یا نقش متربی..."
            className="w-full pr-9 pl-4 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-[#2D4A3E]"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-stone-500 font-mono tabular-nums">
          <span>تعداد کل متربیان: <strong>{members.length} نفر</strong></span>
          <span aria-hidden="true">·</span>
          <span>میانگین حضور: <strong className="text-emerald-700">۹۲٪</strong></span>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#243E34] text-[#E5C365] font-bold text-sm flex items-center justify-center shadow-xs">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">{member.name}</h3>
                  <span className="text-[11px] text-[#8C6B13] font-medium bg-[#FAF0D4] px-2 py-0.5 rounded-md inline-block mt-0.5">
                    {member.roleInCircle}
                  </span>
                </div>
              </div>

              <span className="text-[10px] text-stone-400 font-mono tabular-nums">
                عضویت: {member.joinDate}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs bg-stone-50 p-2.5 rounded-lg border border-stone-100">
              <div>
                <span className="text-[10px] text-stone-400 block">درصد حضور</span>
                <span className="font-bold text-emerald-700 font-mono tabular-nums">
                  {member.attendanceRate}٪
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">کوییزهای گذرانده</span>
                <span className="font-bold text-[#2D4A3E] font-mono tabular-nums">
                  {member.quizzesTaken} آزمون
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 size={13} />
                <span>{member.lastPresence}</span>
              </span>

              <span className="text-stone-400">شناسه: {member.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden text-right animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-[#FAF8F5]">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <UserPlus size={18} className="text-[#2D4A3E]" />
                <span>ثبت متربی جدید در حلقه صالحین</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  نام و نام خانوادگی متربی <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: محمدمهدی کریمی"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-[#2D4A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  مسئولیت و نقش تشکیلاتی در حلقه
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as CircleMember['roleInCircle'])}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-[#2D4A3E]"
                >
                  <option value="عضو عادی">عضو عادی حلقه</option>
                  <option value="کمک‌سرگروه">کمک‌سرگروه (یار سرگروه)</option>
                  <option value="مسئول فرهنگی">مسئول فرهنگی و تلاوت قرآن</option>
                  <option value="مسئول پشتیبانی و ورزش">مسئول پشتیبانی، تدارکات و ورزش</option>
                </select>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-lg shadow-xs"
                >
                  ثبت مشخصات عضو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
