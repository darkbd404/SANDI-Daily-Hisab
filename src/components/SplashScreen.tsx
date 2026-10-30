import React, { useEffect, useState } from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import { OwnerProfile, VehicleProfile } from '../types';

interface SplashScreenProps {
  owner: OwnerProfile;
  vehicle: VehicleProfile;
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  owner,
  vehicle,
  onFinish,
}) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onFinish, 600);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{ opacity, transition: 'opacity 0.6s ease-in-out' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white"
    >
      <div></div>

      {/* Center Vehicle Image & Branding */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-sm">
        {/* Real SANDI Vehicle Image */}
        <div className="relative">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl shadow-amber-500/20 bg-slate-900">
            <img
              src={vehicle.photoUrl}
              alt="SANDI Easy Bike"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-900">
            <img
              src={owner.photoUrl}
              alt={owner.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
              SANDI DAILY HISAB
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-amber-400 mt-1">
            পার্সোনাল অটো ইজি বাইক ম্যানেজার
          </p>
          <p className="text-xs text-slate-400 mt-1">
            স্বত্বাধিকারী: {owner.name} · {owner.district}
          </p>
        </div>

        {/* Vehicle spec badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[11px] text-slate-300 font-mono">
          <span>{vehicle.manufacturer}</span>
          <span>·</span>
          <span>{vehicle.registrationNumber}</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col items-center text-center space-y-1 text-slate-500 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>১০০% অফলাইন ব্যক্তিগত অ্যাপ্লিকেশন</span>
        </div>
        <p className="text-[10px] text-slate-500 font-mono">
          Native Android Kotlin Room Engine
        </p>
      </div>
    </div>
  );
};
