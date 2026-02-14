export const databaseDesignExercises = {
  id: 'database-design-exercises',
  title: 'Database Design Exercises',
  titleFa: 'تمرین‌های طراحی پایگاه داده',
  difficulty: 'medium',
  
  description: `
# Database Design Exercises

Practice your database design skills with these hands-on exercises. Each exercise requires you to design tables, define relationships, and implement constraints.

## Exercise Types

1. **Table Creation** - Design and create tables with appropriate data types and constraints
2. **Relationship Design** - Define one-to-one, one-to-many, and many-to-many relationships
3. **Normalization** - Normalize unnormalized schemas to 3NF
4. **Schema Optimization** - Add indexes and optimize for performance

## Requirements for All Exercises

- Use appropriate data types for each column
- Define primary keys and auto-increment where needed
- Add NOT NULL constraints for required fields
- Use UNIQUE constraints for unique values
- Add FOREIGN KEY constraints for relationships
- Create indexes on frequently queried columns
- Include timestamps (created_at, updated_at) where appropriate
- Write bilingual comments (English and Persian)
`,

  descriptionFa: `
# تمرین‌های طراحی پایگاه داده

مهارت‌های طراحی پایگاه داده خود را با این تمرین‌های عملی تمرین کنید. هر تمرین نیاز به طراحی جداول، تعریف روابط و پیاده‌سازی محدودیت‌ها دارد.

## انواع تمرین

1. **ایجاد جدول** - طراحی و ایجاد جداول با انواع داده و محدودیت‌های مناسب
2. **طراحی رابطه** - تعریف روابط یک‌به‌یک، یک‌به‌بسیاری و بسیاری‌به‌بسیاری
3. **نرمال‌سازی** - نرمال‌سازی طرح‌های غیرنرمال‌شده به 3NF
4. **بهینه‌سازی طرح** - اضافه کردن indexها و بهینه‌سازی برای عملکرد

## الزامات برای تمام تمرین‌ها

- استفاده از انواع داده مناسب برای هر ستون
- تعریف کلیدهای اولیه و auto-increment در جایی که لازم است
- اضافه کردن محدودیت NOT NULL برای فیلدهای ضروری
- استفاده از محدودیت UNIQUE برای مقادیر منحصر به فرد
- اضافه کردن محدودیت FOREIGN KEY برای روابط
- ایجاد indexها برای ستون‌های جستجو شده اغلب
- شامل کردن timestamps (created_at, updated_at) در جایی که مناسب است
- نوشتن نظرات دوزبانه (انگلیسی و فارسی)
`,

  starterCode: `
-- Exercise 1: Library Management System
-- Design a database for a library with books, authors, members, and borrowing records
-- Requirements:
-- - Books can have multiple authors (many-to-many)
-- - Members can borrow multiple books
-- - Track borrowing dates and return dates
-- - Prevent duplicate book-author combinations

-- YOUR CODE HERE


-- Exercise 2: Social Media Platform
-- Design a database for a social media platform with users, posts, comments, and likes
-- Requirements:
-- - Users can have many posts
-- - Posts can have many comments
-- - Users can like posts and comments
-- - Track creation and update timestamps
-- - Prevent duplicate likes

-- YOUR CODE HERE


-- Exercise 3: E-Commerce Platform
-- Design a database for an e-commerce platform with products, categories, orders, and reviews
-- Requirements:
-- - Products belong to categories
-- - Products can have multiple reviews
-- - Orders contain multiple products (order items)
-- - Track inventory and pricing
-- - Prevent negative quantities and prices

-- YOUR CODE HERE


-- Exercise 4: Normalize This Schema
-- The following schema is unnormalized. Normalize it to 3NF
-- Current (UNNORMALIZED):
-- CREATE TABLE student_courses (
--   id INT PRIMARY KEY,
--   student_name VARCHAR(100),
--   student_email VARCHAR(100),
--   course_name VARCHAR(100),
--   course_code VARCHAR(10),
--   instructor_name VARCHAR(100),
--   instructor_email VARCHAR(100),
--   grade VARCHAR(2)
-- );

-- YOUR NORMALIZED CODE HERE


-- Exercise 5: University Management System
-- Design a complete database for a university with departments, courses, students, and grades
-- Requirements:
-- - Departments have many courses
-- - Courses have many students (many-to-many via enrollments)
-- - Track grades for each enrollment
-- - Departments have a department head (a professor)
-- - Professors teach multiple courses
-- - Prevent circular department head assignments

-- YOUR CODE HERE
`,

  solution: `
-- Exercise 1: Library Management System
CREATE TABLE authors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_name (name)
);

CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  isbn VARCHAR(20) NOT NULL UNIQUE,
  publication_year INT,
  total_copies INT NOT NULL DEFAULT 1 CHECK (total_copies > 0),
  available_copies INT NOT NULL DEFAULT 1 CHECK (available_copies >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_isbn (isbn),
  INDEX idx_title (title)
);

CREATE TABLE book_authors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  book_id INT NOT NULL,
  author_id INT NOT NULL,
  
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
  UNIQUE KEY unique_book_author (book_id, author_id)
);

CREATE TABLE members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  membership_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email)
);

CREATE TABLE borrowing_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  member_id INT NOT NULL,
  book_id INT NOT NULL,
  borrow_date DATE NOT NULL,
  due_date DATE NOT NULL,
  return_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  INDEX idx_member_id (member_id),
  INDEX idx_book_id (book_id),
  INDEX idx_return_date (return_date)
);


-- Exercise 2: Social Media Platform
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE INDEX idx_username (username),
  UNIQUE INDEX idx_email (email)
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_post_id (post_id),
  INDEX idx_user_id (user_id)
);

CREATE TABLE post_likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_post_like (post_id, user_id)
);

CREATE TABLE comment_likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  comment_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_comment_like (comment_id, user_id)
);


-- Exercise 3: E-Commerce Platform
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_name (name)
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (category_id) REFERENCES categories(id),
  INDEX idx_category_id (category_id),
  INDEX idx_name (name),
  INDEX idx_price (price)
);

CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_customer_id (customer_id),
  INDEX idx_order_date (order_date),
  INDEX idx_status (status)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE KEY unique_order_product (order_id, product_id)
);

CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  customer_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  INDEX idx_product_id (product_id),
  INDEX idx_rating (rating)
);


-- Exercise 4: Normalized Schema
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email)
);

CREATE TABLE instructors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email)
);

CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  instructor_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (instructor_id) REFERENCES instructors(id),
  INDEX idx_code (code)
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  grade VARCHAR(2),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_enrollment (student_id, course_id)
);


-- Exercise 5: University Management System
CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(10) NOT NULL UNIQUE,
  head_professor_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_name (name),
  INDEX idx_code (code)
);

CREATE TABLE professors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  department_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (department_id) REFERENCES departments(id),
  INDEX idx_email (email),
  INDEX idx_department_id (department_id)
);

-- Add foreign key for department head after professors table exists
ALTER TABLE departments 
ADD FOREIGN KEY (head_professor_id) REFERENCES professors(id) ON DELETE SET NULL;

CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  department_id INT NOT NULL,
  credits INT NOT NULL CHECK (credits > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (department_id) REFERENCES departments(id),
  INDEX idx_code (code),
  INDEX idx_department_id (department_id)
);

CREATE TABLE course_professors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  professor_id INT NOT NULL,
  semester VARCHAR(20) NOT NULL,
  
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (professor_id) REFERENCES professors(id) ON DELETE CASCADE,
  UNIQUE KEY unique_course_professor (course_id, professor_id, semester)
);

CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_student_id (student_id),
  INDEX idx_email (email)
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  grade VARCHAR(2),
  semester VARCHAR(20) NOT NULL,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_enrollment (student_id, course_id, semester)
);
`,

  hints: [
    'Exercise 1: Use a junction table for book-author many-to-many relationship. Track available copies separately from total copies.',
    'Exercise 2: Create separate tables for post_likes and comment_likes to prevent duplicate likes. Use UNIQUE constraints.',
    'Exercise 3: Use order_items junction table for many-to-many relationship between orders and products. Add CHECK constraints for prices and quantities.',
    'Exercise 4: Create separate tables for students, instructors, and courses. Use enrollments table to link students and courses.',
    'Exercise 5: Create department_head foreign key after professors table. Use course_professors junction table for many-to-many relationship.'
  ],

  hintsFa: [
    'تمرین 1: از جدول junction برای رابطه بسیاری‌به‌بسیاری کتاب-نویسنده استفاده کنید. کپی‌های موجود را جداگانه از کل کپی‌ها ردیابی کنید.',
    'تمرین 2: جداول جداگانه برای post_likes و comment_likes ایجاد کنید تا از لایک‌های تکراری جلوگیری شود. از محدودیت‌های UNIQUE استفاده کنید.',
    'تمرین 3: از جدول order_items junction برای رابطه بسیاری‌به‌بسیاری بین سفارشات و محصولات استفاده کنید. محدودیت‌های CHECK برای قیمت‌ها و مقادیر اضافه کنید.',
    'تمرین 4: جداول جداگانه برای دانشجویان، مربیان و دوره‌ها ایجاد کنید. از جدول enrollments برای پیوند دانشجویان و دوره‌ها استفاده کنید.',
    'تمرین 5: کلید خارجی department_head را بعد از جدول professors ایجاد کنید. از جدول course_professors junction برای رابطه بسیاری‌به‌بسیاری استفاده کنید.'
  ],

  testCases: [
    {
      input: 'Exercise 1',
      expected: 'Schema includes authors, books, book_authors, members, and borrowing_records tables with proper relationships',
      description: 'Library system should support many-to-many book-author relationships'
    },
    {
      input: 'Exercise 2',
      expected: 'Schema includes users, posts, comments, post_likes, and comment_likes tables with UNIQUE constraints on likes',
      description: 'Social media system should prevent duplicate likes'
    },
    {
      input: 'Exercise 3',
      expected: 'Schema includes categories, products, customers, orders, order_items, and reviews with CHECK constraints',
      description: 'E-commerce system should enforce data integrity with constraints'
    },
    {
      input: 'Exercise 4',
      expected: 'Schema is normalized to 3NF with separate tables for students, instructors, courses, and enrollments',
      description: 'Normalized schema should eliminate redundancy'
    },
    {
      input: 'Exercise 5',
      expected: 'Schema includes departments, professors, courses, course_professors, students, and enrollments with proper relationships',
      description: 'University system should support complex relationships'
    }
  ]
};

export default databaseDesignExercises;
