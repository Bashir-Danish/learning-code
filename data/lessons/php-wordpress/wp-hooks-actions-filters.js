export const wpHooksActionsFiltersLesson = {
  id: 'wp-hooks-actions-filters',
  title: 'WordPress Hooks: Actions vs Filters (Deep Dive)',
  titleFa: 'هوک‌های وردپرس: Action و Filter (پیشرفته)',
  difficulty: 'hard',
  estimatedTime: '120 min',

  content: `
# WordPress Hooks: Actions vs Filters (Deep Dive)

Hooks are *the* mechanism for extending WordPress.

---

## 1) Actions vs Filters

- **Action**: run code at a moment in time (no return value needed)
- **Filter**: transform a value and return it

---

## 2) add_action example

\`\`\`php
add_action('init', function () {
  // runs on every request after WP is loaded
});
\`\`\`

---

## 3) add_filter example

\`\`\`php
add_filter('the_content', function ($content) {
  return $content . '<p>Thanks for reading!</p>';
});
\`\`\`

---

## 4) Priority and arguments

\`\`\`php
add_filter('the_title', 'my_title_filter', 20, 2);

function my_title_filter($title, $post_id) {
  return $title;
}
\`\`\`

- priority lower runs first
- last number is accepted args

---

## 5) Common pitfalls

- forgetting to return value in filters
- outputting HTML in the wrong hook
- running heavy queries on every request

---

## 6) Debugging hooks

Strategy:
- temporarily add logs
- use \`doing_action\` and \`has_filter\`

\`\`\`php
if (doing_action('init')) {
  error_log('init running');
}
\`\`\`
` ,

  contentFa: `
# هوک‌های وردپرس: Action و Filter (پیشرفته)

هوک‌ها مهم‌ترین راه توسعه وردپرس هستند.

---

## ۱) Action در برابر Filter

- **Action**: اجرای کد در یک زمان مشخص
- **Filter**: تغییر یک مقدار و برگرداندن آن

---

## ۲) مثال add_action

\`\`\`php
add_action('init', function () {
  // بعد از لود وردپرس اجرا می‌شود
});
\`\`\`

---

## ۳) مثال add_filter

\`\`\`php
add_filter('the_content', function ($content) {
  return $content . '<p>Thanks for reading!</p>';
});
\`\`\`

---

## ۴) Priority و تعداد آرگومان

\`\`\`php
add_filter('the_title', 'my_title_filter', 20, 2);

function my_title_filter($title, $post_id) {
  return $title;
}
\`\`\`

---

## ۵) اشتباهات رایج

- فراموش کردن return در filter
- اجرای query سنگین در هر درخواست

---

## ۶) دیباگ کردن هوک‌ها

\`\`\`php
if (doing_action('init')) {
  error_log('init running');
}
\`\`\`
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default wpHooksActionsFiltersLesson;
