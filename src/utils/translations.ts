export type Language = 'bn' | 'en';

export const toBengaliDigits = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (w) => bnDigits[parseInt(w, 10)]);
};

export const formatCurrency = (poisha: number, lang: Language = 'bn'): string => {
  const taka = poisha / 100;
  const formattedTaka = taka.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return lang === 'bn' ? `৳ ${toBengaliDigits(formattedTaka)}` : `৳ ${formattedTaka}`;
};

export const formatNumber = (num: number | string, lang: Language = 'bn'): string => {
  return lang === 'bn' ? toBengaliDigits(num) : num.toString();
};

export const numberToWordsBn = (num: number): string => {
  const ones = [
    '', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ',
    'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোলো', 'সতেরো', 'আঠারো', 'উনিশ', 'বিশ',
    'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ', 'ছাব্বিশ', 'সাতাশ', 'আটাশ', 'ঊনত্রিশ', 'ত্রিশ',
    'একত্রিশ', 'বত্রিশ', 'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ', 'সাঁইত্রিশ', 'আটত্রিশ', 'ঊনচল্লিশ', 'চল্লিশ',
    'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ', 'চুয়াল্লিশ', 'পঁয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'ঊনপঞ্চাশ', 'পঞ্চাশ',
    'একান্ন', 'বায়ান্ন', 'তিপ্পান্ন', 'চুয়ান্ন', 'পঞ্চান্ন', 'ছাপ্পান্ন', 'সাতান্ন', 'আটান্ন', 'ঊনষাট', 'ষাট',
    'একষট্টি', 'বাষট্টি', 'তেষট্টি', 'চৌষট্টি', 'পঁয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি', 'আটষট্টি', 'ঊনসত্তর', 'সত্তর',
    'একাত্তর', 'বাহাত্তর', 'তিয়াত্তর', 'চুয়াত্তর', 'পঁচাত্তর', 'ছিয়াত্তর', 'সাতাত্তর', 'আটাত্তর', 'ঊনআশি', 'আশি',
    'একাশি', 'বিরাশি', 'তিরাশি', 'চুরাশি', 'পঁচাশি', 'ছিয়াশি', 'সাতাশি', 'অষ্টআশি', 'ঊননব্বই', 'নব্বই',
    'একানব্বই', 'বিরানব্বই', 'তিরানব্বই', 'চুরানব্বই', 'পঁচানব্বই', 'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'
  ];

  const taka = Math.floor(num);
  if (taka === 0) return 'শূন্য টাকা মাত্র';

  function convertSection(n: number): string {
    let result = '';
    const crore = Math.floor(n / 10000000);
    n %= 10000000;
    const lakh = Math.floor(n / 100000);
    n %= 100000;
    const thousand = Math.floor(n / 1000);
    n %= 1000;
    const hundred = Math.floor(n / 100);
    n %= 100;
    const rest = n;

    if (crore > 0) result += `${convertSection(crore)} কোটি `;
    if (lakh > 0) result += `${ones[lakh]} লাখ `;
    if (thousand > 0) result += `${ones[thousand]} হাজার `;
    if (hundred > 0) result += `${ones[hundred]} শত `;
    if (rest > 0) result += `${ones[rest]} `;

    return result.trim();
  }

  return `${convertSection(taka)} টাকা মাত্র`;
};

export const numberToWordsEn = (num: number): string => {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const taka = Math.floor(num);
  if (taka === 0) return 'Zero Taka Only';

  function numToWords(n: number): string {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + numToWords(n % 100) : '');
    if (n < 1000000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + numToWords(n % 1000) : '');
    return numToWords(Math.floor(n / 1000000)) + ' Million' + (n % 1000000 !== 0 ? ' ' + numToWords(n % 1000000) : '');
  }

  return `${numToWords(taka)} Taka Only`;
};

export const translations = {
  bn: {
    appName: 'SANDI ডেইলি হিসাব',
    appSubtitle: 'পার্সোনাল অটো ইজি বাইক ম্যানেজার',
    ownerTitle: 'মালিক প্রোফাইল',
    vehicleTitle: 'যানবাহন বিবরণ',
    dashboard: 'ড্যাশবোর্ড',
    income: 'আয়',
    expense: 'ব্যয়',
    voucher: 'ভাউচার',
    more: 'অন্যান্য',
    todayIncome: "আজকের আয়",
    todayExpense: "আজকের ব্যয়",
    todayProfit: "আজকের নিট লাভ",
    monthlyIncome: "চলতি মাসের আয়",
    monthlyExpense: "চলতি মাসের ব্যয়",
    monthlyProfit: "চলতি মাসের লাভ",
    totalIncome: "সর্বমোট মোট আয়",
    totalExpense: "সর্বমোট মোট ব্যয়",
    totalNetProfit: "সর্বমোট নিট লাভ",
    totalTrips: "মোট ট্রিপ সংখ্যা",
    recentTransactions: "সাম্প্রতিক লেনদেন",
    viewAll: "সব দেখুন",
    addIncome: "নতুন আয় যোগ করুন",
    addExpense: "নতুন ব্যয় যোগ করুন",
    editIncome: "আয় সম্পাদনা",
    editExpense: "ব্যয় সম্পাদনা",
    deleteConfirm: "আপনি কি নিশ্চিত এই রেকর্ডটি মুছে ফেলতে চান?",
    amount: "টাকার পরিমাণ",
    date: "তারিখ",
    time: "সময়",
    category: "ক্যাটাগরি",
    description: "বিবরণ",
    customerName: "যাত্রী / কাস্টমারের নাম",
    startLocation: "শুরুর স্থান",
    destination: "গন্তব্য স্থান",
    distance: "দূরত্ব (কি.মি.)",
    paymentMethod: "পেমেন্ট মাধ্যম",
    notes: "বিশেষ মন্তব্য",
    vendorName: "দোকান / কারিগরের নাম",
    save: "সংরক্ষণ করুন",
    cancel: "বাতিল",
    delete: "মুছে ফেলুন",
    filter: "ফিল্টার",
    search: "অনুসন্ধান...",
    all: "সকল",
    noData: "কোন তথ্য পাওয়া যায়নি",
    
    // Categories
    PASSENGER_FARE: 'সাধারণ যাত্রী ভাড়া',
    SPECIAL_TRIP: 'স্পেশাল ট্রিপ',
    RESERVED_TRIP: 'রিজার্ভ ভাড়া',
    DELIVERY_INCOME: 'পণ্য ডেলিভারি',
    OTHER_INCOME: 'অন্যান্য আয়',
    
    BATTERY_CHARGING: 'ব্যাটারি চার্জিং বিল',
    ELECTRICITY: 'বিদ্যুৎ বিল',
    VEHICLE_REPAIR: 'গাড়ি মেরামত',
    BATTERY_REPLACEMENT: 'ব্যাটারি পরিবর্তন',
    MOTOR_REPAIR: 'মোটর মেরামত',
    SPARE_PARTS: 'যন্ত্রাংশ ক্রয়',
    TIRE_TUBE: 'টায়ার / টিউব',
    MAINTENANCE: 'সার্ভিসিং ও যত্ন',
    PARKING: 'গ্যারেজ / পার্কিং',
    PERSONAL_EXPENSE: 'ব্যক্তিগত খরচ',
    OTHER_EXPENSE: 'অন্যান্য খরচ',

    // Payment methods
    CASH: 'নগদ ক্যাশ',
    BKASH: 'বিকাশ (bKash)',
    NAGAD: 'নগদ (Nagad)',
    BANK: 'ব্যাংক একাউন্ট',
    OTHER: 'অন্যান্য',

    // Voucher
    voucherTitle: 'সুপারমার্কেট স্টাইল ভাউচার ইঞ্জিন',
    voucherNo: 'ভাউচার নং',
    voucherDate: 'ভাউচারের তারিখ',
    voucherTime: 'ইস্যুর সময়',
    inWords: 'কথায়',
    ownerSignature: 'মালিকের স্বাক্ষর',
    ownerNameLabel: 'স্বত্বাধিকারী',
    thankYou: 'SANDI অটো ইজি বাইক সেবা ব্যবহারের জন্য ধন্যবাদ!',
    printVoucher: 'প্রিন্ট / PDF ভাউচার',
    receiptStyle: 'পিওএস স্লিপ স্টাইল',
    a4Style: 'A4 ইনভয়েস স্টাইল',
    shareVoucher: 'ভাউচার শেয়ার করুন',
    voucherHistory: 'পূর্ববর্তী ভাউচার সমূহ',
    generateVoucher: 'ভাউচার তৈরি করুন',
    uniqueVoucherInfo: 'অটো জেনারেটেড ইউনিক ভাউচার নম্বর',

    // Battery
    batteryTitle: 'ব্যাটারি ও চার্জিং ট্র্যাকার',
    addChargingRecord: 'চার্জিং এন্ট্রি যোগ করুন',
    chargingUnits: 'বিদ্যুৎ ইউনিট (kWh)',
    chargingCost: 'চার্জিং খরচ',
    chargingHours: 'চার্জিং সময় (ঘণ্টা)',
    batteryHealth: 'ব্যাটারির কন্ডিশন / হেলথ (%)',
    monthlyChargingTotal: 'চলতি মাসের চার্জিং খরচ',
    batterySpecs: 'ব্যাটারি স্পেসিফিকেশন',

    // Maintenance
    maintenanceTitle: 'রক্ষণাবেক্ষণ ও সার্ভিসিং',
    addMaintenance: 'নতুন সার্ভিসিং রেকর্ড',
    workshop: 'ওয়ার্কশপের নাম',
    partsReplaced: 'পরিবর্তিত যন্ত্রাংশ',
    serviceCost: 'সার্ভিসিং খরচ',
    nextReminder: 'পরবর্তী সার্ভিসের তারিখ',

    // Reports
    reportsTitle: 'আর্থিক হিসাব ও রিপোর্ট',
    dailyReport: 'দৈনিক রিপোর্ট',
    weeklyReport: 'সাপ্তাহিক রিপোর্ট',
    monthlyReport: 'মাসিক রিপোর্ট',
    yearlyReport: 'বাৎসরিক রিপোর্ট',
    customRange: 'কাস্টম তারিখ',
    exportCsv: 'CSV এক্সেল ফাইল ডাউনলোড',
    printReport: 'রিপোর্ট প্রিন্ট করুন',
    netProfit: 'নিট মুনাফা',

    // Security & Backup
    securityTitle: 'ব্যক্তিগত নিরাপত্তা ও পিন লক',
    pinLocked: 'অ্যাপটি লক করা হয়েছে',
    enterPin: '৪ ডিজিটের পিন নম্বর দিন',
    setPin: 'নতুন পিন সেট করুন',
    changePin: 'পিন পরিবর্তন করুন',
    wrongPin: 'ভুল পিন নম্বর! আবার চেষ্টা করুন',
    pinSuccess: 'পিন সফলভাবে আপডেট হয়েছে',
    autoLock: 'অটো লক চালু',
    offlineNotice: '১০০% অফলাইন ব্যক্তিগত অ্যাপ - কোন ক্লাউড বা ইন্টারনেট ডাটা নেই',
    backupTitle: 'লোকাল ব্যাকআপ ও রিস্টোর',
    exportBackup: 'ফুল ব্যাকআপ ফাইল ডাউনলোড (JSON)',
    importBackup: 'ব্যাকআপ ফাইল রিস্টোর করুন',
    backupNote: 'আপনার সকল আয়, ব্যয়, ভাউচার ও সেটিংস সুরক্ষিতভাবে আপনার ফোনে ফাইল আকারে সেভ থাকবে।',

    // Android build
    androidHubTitle: 'অ্যান্ড্রয়েড প্রজেক্ট ও APK বিল্ড নির্দেশিকা',
    downloadAndroidZip: 'সম্পূর্ণ অ্যান্ড্রয়েড সোর্স কোড ডাউনলোড (.ZIP)',
    githubActionsGuide: 'গিটহাব অ্যাকশনস দিয়ে মোবাইল থেকেই APK তৈরি করার নিয়ম',
    buildSteps: 'সহজ ৪টি ধাপে মোবাইল থেকেই নিজের জন্য আসল Android APK ইনস্টল করুন',
  },
  en: {
    appName: 'SANDI Daily Hisab',
    appSubtitle: 'Personal Auto Easy Bike Manager',
    ownerTitle: 'Owner Profile',
    vehicleTitle: 'Vehicle Specifications',
    dashboard: 'Dashboard',
    income: 'Income',
    expense: 'Expense',
    voucher: 'Voucher',
    more: 'More',
    todayIncome: "Today's Income",
    todayExpense: "Today's Expense",
    todayProfit: "Today's Net Profit",
    monthlyIncome: "This Month Income",
    monthlyExpense: "This Month Expense",
    monthlyProfit: "This Month Profit",
    totalIncome: "Total All-time Income",
    totalExpense: "Total All-time Expense",
    totalNetProfit: "Total All-time Net Profit",
    totalTrips: "Total Completed Trips",
    recentTransactions: "Recent Transactions",
    viewAll: "View All",
    addIncome: "Add Income Entry",
    addExpense: "Add Expense Entry",
    editIncome: "Edit Income",
    editExpense: "Edit Expense",
    deleteConfirm: "Are you sure you want to delete this record?",
    amount: "Amount (BDT)",
    date: "Date",
    time: "Time",
    category: "Category",
    description: "Description",
    customerName: "Passenger / Customer Name",
    startLocation: "Start Location",
    destination: "Destination",
    distance: "Distance (km)",
    paymentMethod: "Payment Method",
    notes: "Special Notes",
    vendorName: "Shop / Mechanic Name",
    save: "Save Entry",
    cancel: "Cancel",
    delete: "Delete",
    filter: "Filter",
    search: "Search...",
    all: "All",
    noData: "No records found",

    PASSENGER_FARE: 'Passenger Fare',
    SPECIAL_TRIP: 'Special Trip',
    RESERVED_TRIP: 'Reserved Trip',
    DELIVERY_INCOME: 'Delivery Income',
    OTHER_INCOME: 'Other Income',

    BATTERY_CHARGING: 'Battery Charging',
    ELECTRICITY: 'Electricity Bill',
    VEHICLE_REPAIR: 'Vehicle Repair',
    BATTERY_REPLACEMENT: 'Battery Replacement',
    MOTOR_REPAIR: 'Motor Repair',
    SPARE_PARTS: 'Spare Parts',
    TIRE_TUBE: 'Tire / Tube',
    MAINTENANCE: 'Maintenance',
    PARKING: 'Garage / Parking',
    PERSONAL_EXPENSE: 'Personal Expense',
    OTHER_EXPENSE: 'Other Expense',

    CASH: 'Cash',
    BKASH: 'bKash',
    NAGAD: 'Nagad',
    BANK: 'Bank Account',
    OTHER: 'Other',

    voucherTitle: 'Supermarket Style Voucher Engine',
    voucherNo: 'Voucher No',
    voucherDate: 'Voucher Date',
    voucherTime: 'Issue Time',
    inWords: 'Amount in Words',
    ownerSignature: 'Owner Signature',
    ownerNameLabel: 'Proprietor',
    thankYou: 'Thank you for choosing SANDI Auto Easy Bike Service!',
    printVoucher: 'Print / Save PDF',
    receiptStyle: 'POS Receipt Style',
    a4Style: 'A4 Invoice Style',
    shareVoucher: 'Share Voucher',
    voucherHistory: 'Voucher History',
    generateVoucher: 'Generate Voucher',
    uniqueVoucherInfo: 'Auto-generated Unique Voucher Number',

    batteryTitle: 'Battery & Charging Tracker',
    addChargingRecord: 'Log Charging Record',
    chargingUnits: 'Power Units (kWh)',
    chargingCost: 'Charging Cost',
    chargingHours: 'Charging Duration (Hours)',
    batteryHealth: 'Battery Condition / Health (%)',
    monthlyChargingTotal: 'Monthly Charging Expenses',
    batterySpecs: 'Battery Specifications',

    maintenanceTitle: 'Vehicle Maintenance',
    addMaintenance: 'Add Service Record',
    workshop: 'Workshop Name',
    partsReplaced: 'Parts Replaced',
    serviceCost: 'Service Cost',
    nextReminder: 'Next Service Reminder',

    reportsTitle: 'Financial Reports & Statements',
    dailyReport: 'Daily Report',
    weeklyReport: 'Weekly Report',
    monthlyReport: 'Monthly Report',
    yearlyReport: 'Yearly Report',
    customRange: 'Custom Date Range',
    exportCsv: 'Export CSV Excel File',
    printReport: 'Print Report',
    netProfit: 'Net Profit',

    securityTitle: 'Personal Security & PIN Lock',
    pinLocked: 'App is Locked',
    enterPin: 'Enter 4-Digit Security PIN',
    setPin: 'Set New PIN',
    changePin: 'Change PIN',
    wrongPin: 'Incorrect PIN! Please try again',
    pinSuccess: 'PIN successfully updated',
    autoLock: 'Auto-lock Enabled',
    offlineNotice: '100% Offline Personal Application - Zero Cloud / Zero Remote Server',
    backupTitle: 'Local Backup & Restore',
    exportBackup: 'Download Full Local Backup (JSON)',
    importBackup: 'Restore Backup File',
    backupNote: 'All your income, expense, voucher, and settings data are stored safely on your phone.',

    androidHubTitle: 'Native Android Project & APK Build',
    downloadAndroidZip: 'Download Complete Android Source Code (.ZIP)',
    githubActionsGuide: 'Build APK from Mobile via GitHub Actions',
    buildSteps: '4 Easy Steps to build your official native Android APK directly on GitHub',
  }
};
