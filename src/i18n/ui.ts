/**
 * Bilingual (English / Simplified-Chinese) copy for the whole site.
 * Isomorphic + framework-free so the client detect script can import it too.
 */

export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'meta.title': 'Fuck Claude | Are You a Claude "China User"?',
    'meta.description':
      'Scan your browser environment — timezone, language, fonts, emoji — and see whether Claude would flag you as a China user. Runs 100% locally, no data uploaded.',

    'nav.title': 'Fuck Claude',
    'credit': 'Built with Claude Fable 5',

    'hero.title': 'Are you a Claude "China user"?',
    'hero.subtitle':
      'One click scans the locale signals in your browser and tells you whether Claude Code would flag — and ban — you as a China user.',
    'hero.tagline': '100% local in your browser · zero data uploaded',
    'hero.scoreOutOf': '/ 100',

    'band.low.title': 'Low risk',
    'band.low.desc': '🐶You are not a "Claude China user"🐶',
    'band.medium.title': 'Medium risk',
    'band.medium.desc': '🐶You are probably a "Claude China user"🐶',
    'band.high.title': 'High risk',
    'band.high.desc': '🐶You are definitely a "Claude China user"🐶',

    'signal.timezone.name': 'System timezone',
    'signal.language.name': 'Browser language',
    'signal.fonts.name': 'Installed Chinese fonts',
    'signal.intlLocale.name': 'Intl locale',
    'signal.timezoneOffset.name': 'Timezone offset',
    'signal.emoji.name': 'Emoji rendering style',

    'scan.detecting': 'Checking',
    'result.hitsTitle': 'Matched signals',
    'result.noHits': 'No strong China signals matched. Low risk.',

    'privacy.title': 'Privacy',
    'privacy.body':
      'All checks run locally in your browser. No network requests are made and no data is uploaded.',

    'footer.disclaimer':
      'For reference only, based on public reverse-engineering reports. Not an official statement or advice.',

    'ui.claudeBadge': 'Claude Same',
    'ui.retest': 'Scan again',
    'ui.start': 'Start scan',
  },

  zh: {
    'meta.title': 'Fuck Claude ｜ 你是「Claude 中国用户」吗',
    'meta.description':
      '一键扫描你浏览器环境中的时区、语言、字体、emoji 等信号,判断是否会被 Claude 判定为中国用户。纯本地运行,不上传任何数据。',

    'nav.title': 'Fuck Claude',
    'credit': '此网站使用 Claude Fable 5 开发',

    'hero.title': '你是「Claude 中国用户」吗',
    'hero.subtitle':
      '一键扫描浏览器环境中的地域信号,告诉你是否会被 Claude Code 标记并封号为中国用户。',
    'hero.tagline': '纯浏览器本地检测 · 零数据上传',
    'hero.scoreOutOf': '/ 100',

    'band.low.title': '低风险',
    'band.low.desc': '🐶你不是「Claude 中国用户」🐶',
    'band.medium.title': '中等风险',
    'band.medium.desc': '🐶你可能是「Claude 中国用户」🐶',
    'band.high.title': '高风险',
    'band.high.desc': '🐶你绝对是「Claude 中国用户」🐶',

    'signal.timezone.name': '系统时区',
    'signal.language.name': '浏览器语言',
    'signal.fonts.name': '已安装中文字体',
    'signal.intlLocale.name': 'Intl 区域设置',
    'signal.timezoneOffset.name': '时区偏移',
    'signal.emoji.name': 'Emoji 渲染风格',

    'scan.detecting': '检测中',
    'result.hitsTitle': '命中的信号',
    'result.noHits': '没有命中明显的中国信号,风险较低。',

    'privacy.title': '隐私说明',
    'privacy.body': '所有检测都在你的浏览器本地完成,不发起任何网络请求,也不上传任何数据。',

    'footer.disclaimer': '本工具仅供参考,基于公开逆向分析,不构成任何官方结论或建议。',

    'ui.claudeBadge': 'Claude 同款',
    'ui.retest': '重新扫描',
    'ui.start': '开始检测',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

/** Returns a translator that falls back to English, then to the raw key. */
export function useTranslations(lang: Lang) {
  const table = ui[lang] ?? ui[defaultLang];
  return function t(key: string): string {
    return (
      (table as Record<string, string>)[key] ??
      (ui[defaultLang] as Record<string, string>)[key] ??
      key
    );
  };
}

/** `/` for English (default), `/zh/` for Chinese. */
export function localePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

/** Detect the current language from an Astro request URL. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg && seg in languages) return seg as Lang;
  return defaultLang;
}
