import { init, register } from 'svelte-i18n';
import { browser } from '$app/environment'

register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));
register('ja', () => import('./locales/ja.json'));
register('ko', () => import('./locales/ko.json'));
register('ru', () => import('./locales/ru.json'));
register('vi', () => import('./locales/vi.json'));
register('hi', () => import('./locales/hi.json'));
register('id', () => import('./locales/id.json'));
register('tr', () => import('./locales/tr.json'));
register('th', () => import('./locales/th.json'));
register('zh-CN', () => import('./locales/zh-CN.json'));
register('pt-BR', () => import('./locales/pt-BR.json'));
register('zh-TW', () => import('./locales/zh-TW.json'));


const defaultLocale = 'en'


init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale,
})