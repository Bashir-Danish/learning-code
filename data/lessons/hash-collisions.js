export const hashCollisionsLesson = {
  id: 'hash-collisions',
  title: 'Collision Handling',
  titleFa: 'مدیریت برخورد',
  difficulty: 'medium',
  estimatedTime: '40 min',
  
  content: `
# Hash Collisions - When Keys Crash

## What is a Collision?

Imagine two people showing up to a party with the same address written on their invitation. That's a collision - two different keys hash to the same index!

\`\`\`
hash("apple") → 42
hash("grape") → 42  ← Collision! Same index
\`\`\`

**Why does this happen?**
- Infinite possible keys, finite array size
- Pigeonhole principle: if you have more items than slots, some must share

---

## Why Should You Care?

- Collisions are **inevitable** in hash tables
- Bad collision handling → O(n) instead of O(1)
- Understanding this helps you choose the right hash table implementation
- Common interview topic: "How do hash tables handle collisions?"

---

## Method 1: Chaining (Linked Lists)

Each bucket holds a list of all items that hash to that index.

\`\`\`
Index 0: → ["apple", 5] → ["grape", 3] → null
Index 1: → ["banana", 7] → null
Index 2: → null
\`\`\`

### Implementation
\`\`\`javascript
class HashTableChaining {
    constructor(size = 53) {
        this.buckets = new Array(size).fill(null).map(() => []);
    }
    
    hash(key) {
        let total = 0;
        const PRIME = 31;
        for (let char of key) {
            total = (total * PRIME + char.charCodeAt(0)) % this.buckets.length;
        }
        return total;
    }
    
    set(key, value) {
        const idx = this.hash(key);
        const bucket = this.buckets[idx];
        
        // Check if key exists, update it
        const existing = bucket.find(([k]) => k === key);
        if (existing) {
            existing[1] = value;
        } else {
            bucket.push([key, value]);
        }
    }
    
    get(key) {
        const idx = this.hash(key);
        const pair = this.buckets[idx].find(([k]) => k === key);
        return pair ? pair[1] : undefined;
    }
    
    delete(key) {
        const idx = this.hash(key);
        const bucket = this.buckets[idx];
        const pairIdx = bucket.findIndex(([k]) => k === key);
        if (pairIdx !== -1) {
            bucket.splice(pairIdx, 1);
            return true;
        }
        return false;
    }
}
\`\`\`

### Pros & Cons
| Pros | Cons |
|------|------|
| Simple to implement | Extra memory for pointers |
| Never "full" | Cache unfriendly |
| Deletion is easy | Worst case O(n) per bucket |

---

## Method 2: Open Addressing

Instead of lists, find another empty slot in the array itself.

### Linear Probing
If slot is taken, try the next one, then the next...

\`\`\`
hash("apple") → 42 (taken)
Try 43 (taken)
Try 44 (empty!) ← Store here
\`\`\`

\`\`\`javascript
class HashTableLinearProbing {
    constructor(size = 53) {
        this.keys = new Array(size);
        this.values = new Array(size);
        this.size = 0;
    }
    
    hash(key) {
        let total = 0;
        for (let char of key) {
            total = (total * 31 + char.charCodeAt(0)) % this.keys.length;
        }
        return total;
    }
    
    set(key, value) {
        if (this.size >= this.keys.length * 0.7) {
            this.resize();  // Resize when 70% full
        }
        
        let idx = this.hash(key);
        
        // Linear probe until empty slot or same key
        while (this.keys[idx] !== undefined) {
            if (this.keys[idx] === key) {
                this.values[idx] = value;  // Update existing
                return;
            }
            idx = (idx + 1) % this.keys.length;  // Wrap around
        }
        
        this.keys[idx] = key;
        this.values[idx] = value;
        this.size++;
    }
    
    get(key) {
        let idx = this.hash(key);
        
        while (this.keys[idx] !== undefined) {
            if (this.keys[idx] === key) {
                return this.values[idx];
            }
            idx = (idx + 1) % this.keys.length;
        }
        return undefined;
    }
}
\`\`\`

### Quadratic Probing
Instead of +1, +2, +3... use +1², +2², +3²...

\`\`\`javascript
// Linear: idx + 1, idx + 2, idx + 3...
// Quadratic: idx + 1, idx + 4, idx + 9...
idx = (originalIdx + i * i) % this.keys.length;
\`\`\`

### Double Hashing
Use a second hash function to determine step size.

\`\`\`javascript
const step = hash2(key);  // Second hash function
idx = (originalIdx + i * step) % this.keys.length;
\`\`\`

---

## Load Factor - The Key Metric

**Load Factor = n / k** (items / buckets)

| Load Factor | Performance | Action |
|-------------|-------------|--------|
| < 0.5 | Excellent | - |
| 0.5 - 0.7 | Good | - |
| > 0.7 | Degrading | Resize! |
| > 0.9 | Poor | Definitely resize |

\`\`\`javascript
// Check and resize
if (this.size / this.buckets.length > 0.7) {
    this.resize(this.buckets.length * 2);
}
\`\`\`

---

## Chaining vs Open Addressing

| Feature | Chaining | Open Addressing |
|---------|----------|-----------------|
| Memory | Extra for pointers | Compact |
| Cache | Poor | Better |
| Load factor | Can exceed 1.0 | Must stay < 1.0 |
| Deletion | Easy | Tricky (tombstones) |
| Clustering | No | Yes (problem) |

---

## Common Mistakes

### 1. Not Resizing
\`\`\`javascript
// ❌ WRONG - performance degrades
set(key, value) {
    // Just insert, never resize
}

// ✅ CORRECT - resize at threshold
set(key, value) {
    if (this.loadFactor() > 0.7) this.resize();
    // Then insert
}
\`\`\`

### 2. Wrong Deletion in Open Addressing
\`\`\`javascript
// ❌ WRONG - breaks probe chain
delete(key) {
    this.keys[idx] = undefined;  // Now get() can't find items after this!
}

// ✅ CORRECT - use tombstone
delete(key) {
    this.keys[idx] = 'DELETED';  // Marker to continue probing
}
\`\`\`

### 3. Bad Hash Function
\`\`\`javascript
// ❌ WRONG - poor distribution
hash(key) {
    return key.length;  // Many keys have same length!
}

// ✅ CORRECT - use all characters
hash(key) {
    let total = 0;
    for (let char of key) {
        total = (total * 31 + char.charCodeAt(0)) % this.size;
    }
    return total;
}
\`\`\`

---

## Interview Tips

- Know both chaining and open addressing
- Explain load factor and why we resize at 0.7
- Mention clustering problem in linear probing
- "Chaining is simpler, open addressing is more cache-friendly"
- Deletion in open addressing needs tombstones

---

## Quick Summary

| Method | How it works | Best for |
|--------|--------------|----------|
| Chaining | List at each bucket | Simple, many collisions |
| Linear Probing | Next slot | Cache-friendly |
| Quadratic | +1², +4², +9²... | Reduce clustering |
| Double Hashing | Second hash for step | Best distribution |

> **One-liner:** Collisions are inevitable. Chaining uses lists, open addressing finds empty slots. Keep load factor < 0.7!
`,

  contentFa: `
# برخورد هش - وقتی کلیدها تصادف می‌کنن

## برخورد چیست؟

تصور کن دو نفر با یه آدرس یکسان روی دعوتنامه‌شون به یه مهمونی میان. این برخورده - دو کلید مختلف به یه اندیس هش می‌شن!

\`\`\`
hash("apple") → 42
hash("grape") → 42  ← برخورد! اندیس یکسان
\`\`\`

**چرا این اتفاق می‌افته؟**
- کلیدهای بی‌نهایت ممکن، اندازه آرایه محدود
- اصل لانه کبوتر: اگه آیتم‌ها بیشتر از جاها باشن، بعضی‌ها باید شریک بشن

---

## چرا باید اهمیت بدی؟

- برخوردها **اجتناب‌ناپذیرن** در جدول هش
- مدیریت بد برخورد → O(n) به جای O(1)
- سوال رایج مصاحبه: "جدول هش چطور برخوردها رو مدیریت می‌کنه؟"

---

## روش ۱: زنجیره‌سازی (لیست پیوندی)

هر باکت یه لیست از همه آیتم‌هایی که به اون اندیس هش شدن نگه می‌داره.

\`\`\`
اندیس 0: → ["apple", 5] → ["grape", 3] → null
اندیس 1: → ["banana", 7] → null
اندیس 2: → null
\`\`\`

### پیاده‌سازی
\`\`\`javascript
class HashTableChaining {
    constructor(size = 53) {
        this.buckets = new Array(size).fill(null).map(() => []);
    }
    
    hash(key) {
        let total = 0;
        const PRIME = 31;
        for (let char of key) {
            total = (total * PRIME + char.charCodeAt(0)) % this.buckets.length;
        }
        return total;
    }
    
    set(key, value) {
        const idx = this.hash(key);
        const bucket = this.buckets[idx];
        
        const existing = bucket.find(([k]) => k === key);
        if (existing) {
            existing[1] = value;
        } else {
            bucket.push([key, value]);
        }
    }
    
    get(key) {
        const idx = this.hash(key);
        const pair = this.buckets[idx].find(([k]) => k === key);
        return pair ? pair[1] : undefined;
    }
}
\`\`\`

---

## روش ۲: آدرس‌دهی باز

به جای لیست، یه جای خالی دیگه توی خود آرایه پیدا کن.

### کاوش خطی
اگه جا گرفته شده، بعدی رو امتحان کن، بعد بعدی...

\`\`\`javascript
set(key, value) {
    let idx = this.hash(key);
    
    // کاوش خطی تا جای خالی
    while (this.keys[idx] !== undefined) {
        if (this.keys[idx] === key) {
            this.values[idx] = value;
            return;
        }
        idx = (idx + 1) % this.keys.length;  // دور بزن
    }
    
    this.keys[idx] = key;
    this.values[idx] = value;
}
\`\`\`

---

## ضریب بار - معیار کلیدی

**ضریب بار = n / k** (آیتم‌ها / باکت‌ها)

| ضریب بار | عملکرد | اقدام |
|----------|--------|-------|
| < 0.5 | عالی | - |
| 0.5 - 0.7 | خوب | - |
| > 0.7 | در حال افت | تغییر اندازه! |

---

## زنجیره‌سازی در مقابل آدرس‌دهی باز

| ویژگی | زنجیره‌سازی | آدرس‌دهی باز |
|-------|-------------|--------------|
| حافظه | اضافی برای اشاره‌گرها | فشرده |
| کش | ضعیف | بهتر |
| ضریب بار | می‌تونه از 1.0 بیشتر بشه | باید < 1.0 بمونه |
| حذف | آسان | سخت (سنگ قبر) |

---

## اشتباهات رایج

### ۱. تغییر اندازه ندادن
\`\`\`javascript
// ❌ اشتباه - عملکرد افت می‌کنه
// فقط درج، هیچوقت تغییر اندازه نده

// ✅ درست - در آستانه تغییر اندازه بده
if (this.loadFactor() > 0.7) this.resize();
\`\`\`

### ۲. حذف اشتباه در آدرس‌دهی باز
\`\`\`javascript
// ❌ اشتباه - زنجیره کاوش رو می‌شکنه
this.keys[idx] = undefined;

// ✅ درست - از سنگ قبر استفاده کن
this.keys[idx] = 'DELETED';  // نشانگر برای ادامه کاوش
\`\`\`

---

---

## خلاصه سریع

| روش | چطور کار می‌کنه | بهترین برای |
|-----|-----------------|-------------|
| زنجیره‌سازی | لیست در هر باکت | ساده، برخوردهای زیاد |
| کاوش خطی | جای بعدی | کش‌دوست |
| کاوش درجه دوم | +1², +4², +9²... | کاهش خوشه‌بندی |

> **یک خطی:** برخوردها اجتناب‌ناپذیرن. زنجیره‌سازی از لیست استفاده می‌کنه، آدرس‌دهی باز جای خالی پیدا می‌کنه. ضریب بار < 0.7 نگه دار!
`,

  visualizationId: 'hash-collision',
  exerciseId: 'hash-collisions',
};

export default hashCollisionsLesson;
