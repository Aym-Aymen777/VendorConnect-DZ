const bannedKeywords = [
  // 🎥 أدوات المراقبة والتجسس (عربية)
  "كاميرا", "كاميرا خفية", "كاميرا تجسس", "تصوير سري", "تسجيل خفي",
  "ميكروفون سري", "صوت خفي", "جهاز تتبع", "تتبع خفي", "محدد موقع",
  "مراقبة سرية", "جهاز مراقبة", "مراقبة خفية", "تنصت", "تسجيل مكالمات",
  "طائرة بدون طيار", "درون", "طائرة درون", "كاميرا طائرة", "تصوير جوي",
  "تنصت سري", "تسجيل صوتي مخفي", "كاميرا صغيرة", "كاميرا مخفية", "جهاز تنصت صغير",
  "تجسس", "جهاز تسجيل", "كاميرا USB", "ميني كاميرا", "كاميرا قلم",
  "جهاز اعتراض", "اعتراض المكالمات", "أجهزة تحليل الحزم", "أجهزة فك التشفير",
  "برامج اختراق", "برامج كشف كلمات السر", "أدوات فك تشفير", "IMSI catcher", "man-in-the-middle",

  // 🎥 أدوات المراقبة والتجسس (إنجليزي/فرنسي)
  "spy", "spy camera", "hidden camera", "covert camera", "gps tracker",
  "wiretap", "voice recorder", "bug", "audio bug", "micro spy", "drone",
  "hidden mic", "spy microphone", "covert recording", "call recorder",
  "location tracker", "surveillance", "surveillance equipment", "spy pen",
  "caméra cachée", "caméra espion", "traceur gps", "dispositif d’écoute",
  "surveillance discrète", "caméra mini", "caméra stylo", "micro caché",
  "IMSI catcher", "packet sniffer", "deep packet inspection", "cell-site simulator",
  "StingRay device", "encryption breaker", "intrusion software", "keylogger",

  // 💣 متفجرات ومواد محظورة (عربية)
  "ديناميت", "متفجرات", "حمض النيتريك", "حمض الكبريتيك", "صواعق",
  "صواعق كهربائية", "مواد كيميائية", "مواد كيميائية خطيرة", "أسمنت مهرب", "مواد مسروقة",
  "قنبلة", "عبوة ناسفة", "غاز الأعصاب", "أسلحة كيميائية", "غاز حارق", "بودرة سوداء",
  "شظايا", "عبوة محلية الصنع", "متفجرات محلية", "قنبلة منزلية", "سلاح بيولوجي", "سموم بيولوجية",

  // 💣 Explosives / Dangerous Substances (EN/FR)
  "explosives", "dynamite", "nitric acid", "sulfuric acid",
  "electric detonator", "stolen materials", "dangerous chemicals",
  "produits chimiques dangereux", "explosifs", "matériaux volés",
  "homemade bomb", "improvised explosive device", "nerve gas",
  "biological weapon", "black powder", "toxic bacteria", "biological toxins",

  // 🪑 ديكور – سياسي أو ديني أو غير لائق
  "رموز دينية", "رمز ديني حساس", "علم دولة غير معترف بها",
  "مجسم سياسي", "تمثال سياسي", "رسومات مخلة", "تماثيل عارية",
  "صور فاضحة", "ديكور ديني غير مرخص",

  // 🪑 Décor – EN/FR
  "religious symbols", "obscene artwork", "nude statues", "controversial flag",
  "controversial political figure", "unrecognized flag", "symboles religieux",
  "art obscène", "statues dénudées", "figures politiques controversées",

  // 📺 أجهزة إلكترونية مشبوهة
  "wifi jammer", "brouilleur wifi", "call monitoring", "spy software",
  "جهاز اختراق الشبكة", "جهاز تحكم عن بعد", "فتح الباب عن بعد",
  "remote hack device", "remote control override", "جهاز تشويش واي فاي",
  "جهاز تسجيل مخفي", "أداة اختراق", "مخترق شبكات", "شبكة مراقبة رقمية",
  "أجهزة تصنت", "أجهزة تنصت GSM", "تطبيقات مراقبة مخفية",

  // 📡 Other globally banned tech
  "jammer", "gps blocker", "signal blocker", "surveillance drone",
  "spyware", "sniffer", "radio frequency disruptor", "military grade device",
  "surveillance AI", "covert surveillance", "internet filter tool",
  "interception tool", "network intrusion tool", "wifi jammer",
  "wifi signal blocker", "wifi blocker", "wifi blocker app", "wifi blocker software", 
];




function isSuspiciousProduct({ title, description, imageUrl }) {
  const text = `${title} ${description}`.toLowerCase();

  // تحقّق من وجود كلمات مشبوهة في العنوان أو الوصف
  const textFlagged = bannedKeywords.some((keyword) => text.includes(keyword.toLowerCase()));

  // تحقّق من وجود كلمات مشبوهة في رابط Cloudinary
  const urlFlagged = imageUrl && bannedKeywords.some((keyword) => imageUrl.toLowerCase().includes(keyword.toLowerCase()));

  return textFlagged || urlFlagged;
}

export default isSuspiciousProduct;