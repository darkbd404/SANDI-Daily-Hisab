import React, { useState } from 'react';
import { 
  User, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  X, 
  Camera, 
  ShieldCheck, 
  Battery, 
  Zap,
  Calendar
} from 'lucide-react';
import { OwnerProfile, VehicleProfile } from '../types';
import { translations, Language, formatCurrency } from '../utils/translations';

interface ProfileModalProps {
  owner: OwnerProfile;
  vehicle: VehicleProfile;
  lang: Language;
  onSaveProfiles: (owner: OwnerProfile, vehicle: VehicleProfile) => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  owner,
  vehicle,
  lang,
  onSaveProfiles,
  onClose,
}) => {
  const t = translations[lang];
  const [activeSubTab, setActiveSubTab] = useState<'OWNER' | 'VEHICLE'>('OWNER');

  // Owner Form
  const [ownerName, setOwnerName] = useState(owner.name);
  const [village, setVillage] = useState(owner.village);
  const [postOffice, setPostOffice] = useState(owner.postOffice);
  const [policeStation, setPoliceStation] = useState(owner.policeStation);
  const [district, setDistrict] = useState(owner.district);
  const [mobile1, setMobile1] = useState(owner.mobile1);
  const [mobile2, setMobile2] = useState(owner.mobile2);
  const [email, setEmail] = useState(owner.email);

  // Vehicle Form
  const [vehicleName, setVehicleName] = useState(vehicle.name);
  const [manufacturer, setManufacturer] = useState(vehicle.manufacturer);
  const [model, setModel] = useState(vehicle.model);
  const [regNo, setRegNo] = useState(vehicle.registrationNumber);
  const [purchaseDate, setPurchaseDate] = useState(vehicle.purchaseDate);
  const [batteryType, setBatteryType] = useState(vehicle.batteryType);
  const [batteryVoltage, setBatteryVoltage] = useState(vehicle.batteryVoltage);
  const [motorSpecs, setMotorSpecs] = useState(vehicle.motorSpecs);
  const [notes, setNotes] = useState(vehicle.notes);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedOwner: OwnerProfile = {
      ...owner,
      name: ownerName,
      village,
      postOffice,
      policeStation,
      district,
      mobile1,
      mobile2,
      email,
    };

    const updatedVehicle: VehicleProfile = {
      ...vehicle,
      name: vehicleName,
      manufacturer,
      model,
      registrationNumber: regNo,
      purchaseDate,
      batteryType,
      batteryVoltage,
      motorSpecs,
      notes,
    };

    onSaveProfiles(updatedOwner, updatedVehicle);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-5 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveSubTab('OWNER')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              activeSubTab === 'OWNER'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.ownerTitle}</span>
          </button>
          <button
            onClick={() => setActiveSubTab('VEHICLE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              activeSubTab === 'VEHICLE'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>{t.vehicleTitle}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
          {activeSubTab === 'OWNER' ? (
            /* OWNER PROFILE FIELDS */
            <>
              {/* Photo & Signature Preview */}
              <div className="flex items-center gap-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="relative">
                  <img
                    src={owner.photoUrl}
                    alt={owner.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border-2 border-amber-500/50 shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-900 border border-slate-700 text-amber-400">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-slate-400 font-medium">আসল মালিকের ছবি ও স্বাক্ষর</span>
                  <div className="h-10 w-28 bg-white/95 rounded px-2 py-1 flex items-center justify-center mt-1 border border-slate-300">
                    <img
                      src={owner.signatureUrl}
                      alt="স্বাক্ষর"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter contrast-125"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">মালিকের নাম *</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">গ্রাম *</label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">ডাকঘর *</label>
                  <input
                    type="text"
                    required
                    value={postOffice}
                    onChange={(e) => setPostOffice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">থানা *</label>
                  <input
                    type="text"
                    required
                    value={policeStation}
                    onChange={(e) => setPoliceStation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">জেলা *</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">মোবাইল ১ *</label>
                  <input
                    type="text"
                    required
                    value={mobile1}
                    onChange={(e) => setMobile1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">মোবাইল ২</label>
                  <input
                    type="text"
                    value={mobile2}
                    onChange={(e) => setMobile2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">ইমেইল *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </>
          ) : (
            /* VEHICLE PROFILE FIELDS */
            <>
              {/* Vehicle Photo Preview */}
              <div className="flex items-center gap-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <img
                  src={vehicle.photoUrl}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover border-2 border-amber-500/50 shadow-sm"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-white text-sm">
                    {vehicle.name} · {vehicle.manufacturer}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {vehicle.model}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-mono">
                    {vehicle.registrationNumber}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">গাড়ির নাম *</label>
                  <input
                    type="text"
                    required
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">কোম্পানি / প্রস্তুতকারক *</label>
                  <input
                    type="text"
                    required
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">মডেল *</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">রেজিস্ট্রেশন নং *</label>
                  <input
                    type="text"
                    required
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">ব্যাটারি ভোল্টেজ *</label>
                  <input
                    type="text"
                    required
                    value={batteryVoltage}
                    onChange={(e) => setBatteryVoltage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">মোটর স্পেসিফিকেশন *</label>
                  <input
                    type="text"
                    required
                    value={motorSpecs}
                    onChange={(e) => setMotorSpecs(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">ব্যাটারি বিবরণ *</label>
                <input
                  type="text"
                  required
                  value={batteryType}
                  onChange={(e) => setBatteryType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">গাড়ি সংক্রান্ত নোট</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </>
          )}

          {/* Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {savedSuccess ? (
              <span className="text-emerald-400 text-xs font-semibold">
                ✓ সফলভাবে প্রোফাইল আপডেট হয়েছে
              </span>
            ) : (
              <span></span>
            )}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md"
              >
                {t.save}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
