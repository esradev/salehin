import React from 'react';
import { Check, Shield, UserCheck, X } from 'lucide-react';
import { MOCK_USERS_BY_ROLE, ROLES_CONFIG } from '../data/mockData';
import { RoleInfo, UserProfile, UserRole } from '../types';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  const rolesList = Object.values(ROLES_CONFIG);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#243E34] text-[#E5C365] flex items-center justify-center shadow-xs">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">تغییر نقش کاربری سامانه صالحین</h2>
              <p className="text-xs text-stone-500">
                مشاهده و بررسی سامانه از دیدگاه سلسله‌مراتب مختلف تربیتی بسیج
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

        {/* Roles List */}
        <div className="p-6 overflow-y-auto space-y-3">
          <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-xs text-amber-900 leading-relaxed">
            💡 با انتخاب هر نقش، سطح دسترسی‌ها، قابلیت انتشار محتوا برای زیرمجموعه، کارتابل گزارشات و ویجت‌های داشبورد متناسب با همان رده بلافاصله تغییر می‌یابد.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {rolesList.map((role: RoleInfo) => {
              const isSelected = currentUser.role === role.id;
              const sampleUser = MOCK_USERS_BY_ROLE[role.id];

              return (
                <button
                  key={role.id}
                  onClick={() => {
                    onSelectRole(role.id);
                    onClose();
                  }}
                  className={`text-right p-3.5 rounded-xl border transition-all text-sm relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2D4A3E] bg-[#F4F8F6] ring-2 ring-[#2D4A3E]/10 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: role.color }}
                      >
                        {role.level.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-stone-900 text-xs sm:text-sm">{role.title}</div>
                        <span className="text-[11px] text-stone-500">{sampleUser.name}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center shrink-0">
                        <Check size={12} />
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-stone-600 leading-normal mb-2.5 line-clamp-2">
                    {role.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>سطح: {role.level}</span>
                    <span className="text-[#845E1B] font-medium truncate max-w-[140px]">
                      {role.canApproveReports ? 'تایید گزارشات' : role.canSubmitReports ? 'ثبت گزارش' : 'مشاهده و یادگیری'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <div className="text-xs text-stone-600 flex items-center gap-1.5">
            <UserCheck size={15} className="text-[#2D4A3E]" />
            <span>کاربر فعال فعلی: <strong>{currentUser.name}</strong> ({ROLES_CONFIG[currentUser.role].title})</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
