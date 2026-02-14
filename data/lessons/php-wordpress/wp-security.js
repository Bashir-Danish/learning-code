export const wpSecurityLesson = {
  id: 'wp-security',
  title: 'WordPress Security: Nonces, Capabilities, Sanitization, Escaping',
  titleFa: 'امنیت وردپرس: nonce، دسترسی‌ها، sanitize و escape',
  difficulty: 'hard',
  estimatedTime: '120 min',

  content: `
# WordPress Security: Nonces, Capabilities, Sanitization, Escaping

WordPress security is mostly about:
- permissions (capabilities)
- CSRF protection (nonces)
- sanitizing input
- escaping output

---

## 1) Capabilities: who can do what?

Never check roles directly. Check capabilities:

\`\`\`php
if (!current_user_can('manage_options')) {
  wp_die('Forbidden');
}
\`\`\`

---

## 2) Nonces (CSRF protection)

### Output nonce field
\`\`\`php
wp_nonce_field('my_action', 'my_nonce');
\`\`\`

### Verify nonce on POST
\`\`\`php
if (!isset($_POST['my_nonce']) || !wp_verify_nonce($_POST['my_nonce'], 'my_action')) {
  wp_die('CSRF failed');
}
\`\`\`

---

## 3) Sanitization (input)

\`\`\`php
$email = sanitize_email($_POST['email'] ?? '');
$title = sanitize_text_field($_POST['title'] ?? '');
\`\`\`

---

## 4) Escaping (output)

\`\`\`php
echo esc_html($title);
echo esc_url($url);
\`\`\`

---

## 5) SQL safety

Use $wpdb prepare:

\`\`\`php
global $wpdb;
$sql = $wpdb->prepare('SELECT * FROM wp_users WHERE user_email = %s', $email);
$rows = $wpdb->get_results($sql);
\`\`\`

---

## Checklist

- Check capabilities
- Use nonces on forms
- Sanitize input
- Escape output
- Use prepared queries
` ,

  contentFa: `
# امنیت وردپرس: nonce، دسترسی‌ها، sanitize و escape

امنیت وردپرس بیشتر حول این موارد است:
- دسترسی‌ها (capabilities)
- جلوگیری از CSRF (nonce)
- sanitize ورودی
- escape خروجی

---

## ۱) Capabilities

\`\`\`php
if (!current_user_can('manage_options')) {
  wp_die('Forbidden');
}
\`\`\`

---

## ۲) Nonce (CSRF)

\`\`\`php
wp_nonce_field('my_action', 'my_nonce');
\`\`\`

\`\`\`php
if (!isset($_POST['my_nonce']) || !wp_verify_nonce($_POST['my_nonce'], 'my_action')) {
  wp_die('CSRF failed');
}
\`\`\`

---

## ۳) Sanitization

\`\`\`php
$email = sanitize_email($_POST['email'] ?? '');
$title = sanitize_text_field($_POST['title'] ?? '');
\`\`\`

---

## ۴) Escaping

\`\`\`php
echo esc_html($title);
echo esc_url($url);
\`\`\`

---

## ۵) SQL امن

\`\`\`php
global $wpdb;
$sql = $wpdb->prepare('SELECT * FROM wp_users WHERE user_email = %s', $email);
$rows = $wpdb->get_results($sql);
\`\`\`

---

## چک‌لیست

- capability را چک کن
- nonce روی فرم
- sanitize ورودی
- escape خروجی
- query آماده
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default wpSecurityLesson;
