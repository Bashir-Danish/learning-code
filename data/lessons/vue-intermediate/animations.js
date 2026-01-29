export const animationsLesson = {
  id: 'animations-gsap',
  title: 'Animations & GSAP',
  titleFa: 'انیمیشن‌ها و GSAP',
  difficulty: 'medium',
  estimatedTime: '55 min',
  content: `
# Animations & GSAP in Vue 3

## Definition
**Vue Animations** extend the basic Transition component by using JavaScript hooks to control the animation process. By integrating **GSAP** (GreenSock Animation Platform), you can create complex, high-performance, and timeline-based animations that go far beyond standard CSS capabilities.

## Key Features
- **JavaScript Hooks**: Control every stage of an animation (\`beforeEnter\`, \`enter\`, \`leave\`) via code.
- **GSAP Power**: Access advanced easing, staggers, and timeline control for professional UI effects.
- **Smooth Interruptions**: GSAP handles interrupted animations gracefully without "jumping".
- **Dynamic Values**: Animate elements based on real-time reactive data (e.g., following the mouse precisely).

---

## 1. Using JavaScript Hooks
When using JavaScript for animations, you should disable CSS detection using \`:css="false"\` for better performance.

\`\`\`html
<Transition
  @enter="onEnter"
  @leave="onLeave"
  :css="false"
>
  <div v-if="show" class="box">Animate Me</div>
</Transition>
\`\`\`

---

## 2. GSAP Integration
GSAP is the industry standard for web animations. It works perfectly with Vue's transition hooks.

\`\`\`javascript
import gsap from 'gsap';

const onEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.8,
    scale: 0,
    opacity: 0,
    ease: 'back.out(1.7)',
    onComplete: done // Notify Vue that animation is finished
  });
};
\`\`\`

---

## 3. Stagger Animations
Easily animate lists of items one after another using GSAP staggers within a \`TransitionGroup\`.

---

## Summary
- Use **Transition JS hooks** for programmatic control.
- **GSAP** is best for complex sequences and physics-based animations.
- Always call the **done** callback in hooks so Vue knows when to cleanup.
`,
  contentFa: `
# انیمیشن‌ها و GSAP در Vue 3

## تعریف
**انیمیشن‌ها در Vue** سیستم پایه‌ی Transition را با استفاده از هوک‌های جاوااسکریپتی برای کنترل دقیق فرآیند انیمیشن گسترش می‌دهند. با یکپارچه‌سازی **GSAP** (مخفف GreenSock Animation Platform)، می‌توانید انیمیشن‌های پیچیده، با کارایی بالا و مبتنی بر تایم‌لاین بسازید که بسیار فراتر از توانایی‌های استاندارد CSS هستند.

## ویژگی‌های اصلی
- **هوک‌های جاوااسکریپتی**: کنترل تمام مراحل یک انیمیشن (مثل شروع، اجرا و پایان) از طریق کد.
- **قدرت GSAP**: دسترسی به ویژگی‌های پیشرفته مثل Easing، Staggers و کنترل تایم‌لاین برای جلوه‌های حرفه‌ای.
- **وقفه نرم**: GSAP انیمیشن‌هایی که در میانه راه قطع می‌شوند را بدون "پرش" و به نرمی مدیریت می‌کند.
- **مقادیر پویا**: متحرک‌سازی المان‌ها بر اساس داده‌های واکنش‌گرای لحظه‌ای (مثلاً تعقیب دقیق مکان موس).

---

## ۱. استفاده از هوک‌های جاوااسکریپتی
هنگام استفاده از جاوااسکریپت برای انیمیشن، بهتر است تشخیص CSS را با \`:css="false"\` غیرفعال کنید تا عملکرد بهتری داشته باشید.

\`\`\`html
<Transition
  @enter="onEnter"
  @leave="onLeave"
  :css="false"
>
  <div v-if="show">جعبه متحرک</div>
</Transition>
\`\`\`

---

## ۲. یکپارچه‌سازی با GSAP
GSAP استاندارد صنعت برای انیمیشن‌های وب است و به خوبی با هوک‌های Transition در Vue کار می‌کند.

\`\`\`javascript
import gsap from 'gsap';

const onEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: 'bounce.out',
    onComplete: done // به وی اعلام می‌کند که انیمیشن تمام شده است
  });
};
\`\`\`

---

## ۳. انیمیشن‌های لیست (Stagger)
با استفاده از GSAP به راحتی می‌توانید آیتم‌های یک لیست را یکی پس از دیگری و با تأخیر (Stagger) متحرک کنید.

---

## خلاصه
- از **هوک‌های Transition** برای کنترل برنامه‌نویسی شده استفاده کنید.
- **GSAP** بهترین گزینه برای سکانس‌های پیچیده و انیمیشن‌های مبتنی بر فیزیک است.
- همیشه تابع **done** را در هوک‌ها صدا بزنید تا Vue از پایان انیمیشن مطلع شود.
`
};
