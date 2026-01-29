export const reactNativeLesson = {
  id: 'react-native',
  title: 'React Native Basics',
  titleFa: 'ری‌اکت نیتیو (موبایل)',
  difficulty: 'expert',
  estimatedTime: '55 min',
  content: `
# React Native Basics

## Definition
React Native is a framework for building native mobile applications using React. It allows you to use standard React hooks and components to build real iOS and Android apps that render using platform-specific UI primitives instead of browser DOM.

## Key Features
- **Cross-Platform**: Write once, run on both iOS and Android.
- **Native Performance**: Uses native UI components for smooth interaction.
- **Fast Refresh**: See your changes on a mobile simulator instantly.
- **Large Ecosystem**: Access to thousands of libraries for camera, GPS, and more.

---

## 1. Core Components
Instead of \`<div>\` and \`<span>\`, you use \`<View>\`, \`<Text>\`, and \`<Image>\`.

\`\`\`jsx
import { View, Text, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text>Hello Mobile!</Text>
  </View>
);
\`\`\`

---

## 2. Styling (StyleSheet)
Styles are written in JavaScript, similar to CSS but with specific limitations (Flexbox is the default).

\`\`\`javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
\`\`\`

---

## 3. Expo vs CLI
- **Expo**: Fastest way to start. Handles complex native builds for you.
- **CLI**: Full control. Necessary for custom native modules.
`,
  contentFa: `
# ری‌اکت نیتیو (موبایل)

## تعریف
ری‌اکت نیتیو (React Native) فریمورکی برای ساخت اپلیکیشن‌های بومی موبایل با استفاده از ری‌اکت است. این ابزار به شما اجازه می‌دهد با همان دانش ری‌اکت، برنامه‌های واقعی برای iOS و اندروید بسازید که به جای مرورگر، از اجزای گرافیکی خود سیستم‌عامل استفاده می‌کنند.

## ویژگی‌های اصلی
- **چندسکویی (Cross-Platform)**: یک‌بار کدنویسی برای هر دو سیستم‌عامل iOS و اندروید.
- **عملکرد بومی (Native)**: استفاده از کامپوننت‌های واقعی موبایل برای روانی برنامه.
- **Fast Refresh**: مشاهده لحظه‌ای تغییرات روی شبیه‌ساز موبایل.
- **اکوسیستم بزرگ**: دسترسی به هزاران کتابخانه برای دوربین، GPS و غیره.

---

## ۱. کامپوننت‌های اصلی
به جای \`<div>\` و \`<span>\` از \`<View>\` و \`<Text>\` استفاده می‌کنیم.

\`\`\`jsx
import { View, Text, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text>سلام موبایل!</Text>
  </View>
);
\`\`\`

---

## ۲. استایل‌دهی (StyleSheet)
استایل‌ها در جاوااسکریپت نوشته می‌شوند (شبیه CSS) و سیستم Flexbox حالت پیش‌فرض است.

\`\`\`javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
\`\`\`

---

## ۳. انتخاب راه: Expo یا CLI
- **Expo**: سریع‌ترین راه شروع. کارهای پیچیده بیلد بومی را برای شما انجام می‌دهد.
- **CLI**: کنترل کامل. ضروری برای زمانی که نیاز به کدهای اختصاصی جاوا/سوییفت دارید.
`
};

export default reactNativeLesson;
