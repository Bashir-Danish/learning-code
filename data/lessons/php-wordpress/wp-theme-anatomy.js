export const wpThemeAnatomyLesson = {
  id: 'wp-theme-anatomy',
  title: 'WordPress Themes: Anatomy, Templates, and Best Practices',
  titleFa: 'قالب وردپرس: ساختار، قالب‌ها و بهترین روش‌ها',
  difficulty: 'hard',
  estimatedTime: '110 min',

  content: `
# WordPress Themes: Anatomy, Templates, and Best Practices

Themes control **presentation** (UI). Business logic should usually go into plugins.

---

## 1) Where themes live

\`wp-content/themes/your-theme/\`

---

## 2) Minimum theme files

### style.css
Contains theme header metadata.

### index.php
Fallback template.

---

## 3) functions.php (theme bootstrap)

Used to:
- enqueue scripts/styles
- register menus
- add theme support

\`\`\`php
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_style('theme', get_stylesheet_uri());
});
\`\`\`

---

## 4) Template hierarchy (must-know)

Examples:
- single post: \`single.php\`
- page: \`page.php\`
- blog home: \`home.php\`
- archive: \`archive.php\`

WordPress picks the *most specific* file.

---

## 5) The Loop

\`\`\`php
if (have_posts()) {
  while (have_posts()) {
    the_post();
    the_title();
    the_content();
  }
}
\`\`\`

---

## 6) Escaping output (security)

Even in themes, escape:

\`\`\`php
echo esc_html(get_the_title());
\`\`\`

---

## 7) Best practices

- keep logic small in themes
- use child themes for customization
- don’t edit core themes
- enqueue assets properly (don’t hardcode script tags)
` ,

  contentFa: `
# قالب وردپرس: ساختار، قالب‌ها و بهترین روش‌ها

قالب‌ها مسئول **ظاهر** هستند. منطق جدی معمولاً باید در افزونه باشد.

---

## ۱) مسیر قالب

\`wp-content/themes/your-theme/\`

---

## ۲) فایل‌های حداقلی

- \`style.css\`
- \`index.php\`

---

## ۳) functions.php

برای:
- enqueue کردن CSS/JS
- ثبت منو
- theme support

\`\`\`php
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_style('theme', get_stylesheet_uri());
});
\`\`\`

---

## ۴) Template Hierarchy

- \`single.php\`
- \`page.php\`
- \`home.php\`
- \`archive.php\`

---

## ۵) Loop

\`\`\`php
if (have_posts()) {
  while (have_posts()) {
    the_post();
    the_title();
    the_content();
  }
}
\`\`\`

---

## ۶) Escape خروجی

\`\`\`php
echo esc_html(get_the_title());
\`\`\`

---

## ۷) بهترین روش‌ها

- منطق را در قالب کم نگه دار
- برای سفارشی‌سازی از child theme استفاده کن
- core را تغییر نده
- assetها را درست enqueue کن
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default wpThemeAnatomyLesson;
