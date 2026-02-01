export const optimisticUILesson = {
  id: 'optimistic-ui',
  title: 'Optimistic UI with useOptimistic',
  titleFa: 'رابط کاربری خوش‌بینانه با useOptimistic',
  difficulty: 'medium',
  estimatedTime: '60 min',

  content: `
# Optimistic UI with useOptimistic

## Definition
**Optimistic UI** is a design pattern where the interface immediately shows the expected result of a user action, before the server confirms the operation. React 19's \`useOptimistic\` hook makes this pattern simple and reliable, providing instant feedback while handling rollbacks automatically if the operation fails.

## Key Features
- **Instant Feedback**: UI updates immediately when user performs an action
- **Automatic Rollback**: Reverts changes if the server operation fails
- **Better UX**: Users don't wait for server responses for common actions
- **Error Handling**: Graceful handling of failed optimistic updates
- **Seamless Integration**: Works perfectly with Actions and Server Components

---

## 1. Understanding Optimistic UI

### The Problem with Traditional UI
Traditional UI patterns wait for server confirmation before updating:

\`\`\`jsx
// Traditional approach - user waits for server response
function TraditionalLikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const response = await api.likePost(postId);
      setLikes(response.likes); // Only updates after server responds
    } catch (error) {
      console.error('Failed to like post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={isLoading}>
      {isLoading ? 'Liking...' : \`❤️ \${likes}\`}
    </button>
  );
}
\`\`\`

### The Optimistic Approach
With optimistic UI, the interface updates immediately:

\`\`\`jsx
import { useOptimistic } from 'react';

function OptimisticLikeButton({ postId, initialLikes }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (currentLikes, increment) => currentLikes + increment
  );

  const handleLike = async () => {
    // Immediately update UI
    addOptimisticLike(1);
    
    try {
      // Send request to server
      await api.likePost(postId);
      // If successful, the optimistic update becomes permanent
    } catch (error) {
      // If failed, useOptimistic automatically reverts the change
      console.error('Failed to like post');
    }
  };

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}
\`\`\`

---

## 2. useOptimistic Hook Deep Dive

### Basic Syntax
\`\`\`jsx
const [optimisticState, addOptimistic] = useOptimistic(
  actualState,
  updateFunction
);
\`\`\`

- **optimisticState**: The current state (actual + optimistic changes)
- **addOptimistic**: Function to add an optimistic update
- **actualState**: The real state from server/props
- **updateFunction**: How to apply optimistic updates

### Simple Counter Example
\`\`\`jsx
import { useOptimistic, useState } from 'react';

function OptimisticCounter() {
  const [count, setCount] = useState(0);
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (currentCount, increment) => currentCount + increment
  );

  const handleIncrement = async () => {
    // Immediately show the increment
    addOptimisticCount(1);
    
    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update actual state (this makes the optimistic update permanent)
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {optimisticCount}</p>
      <button onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

---

## 3. Real-World Examples

### Social Media Like System
\`\`\`jsx
import { useOptimistic } from 'react';

function SocialPost({ post, onLike, onUnlike }) {
  const [optimisticPost, addOptimisticUpdate] = useOptimistic(
    post,
    (currentPost, update) => {
      switch (update.type) {
        case 'LIKE':
          return {
            ...currentPost,
            likes: currentPost.likes + 1,
            isLiked: true
          };
        case 'UNLIKE':
          return {
            ...currentPost,
            likes: currentPost.likes - 1,
            isLiked: false
          };
        default:
          return currentPost;
      }
    }
  );

  const handleLikeToggle = async () => {
    const isCurrentlyLiked = optimisticPost.isLiked;
    
    // Optimistically update UI
    addOptimisticUpdate({
      type: isCurrentlyLiked ? 'UNLIKE' : 'LIKE'
    });

    try {
      if (isCurrentlyLiked) {
        await onUnlike(post.id);
      } else {
        await onLike(post.id);
      }
    } catch (error) {
      // useOptimistic automatically reverts on error
      console.error('Failed to update like status');
      // Optionally show error message to user
    }
  };

  return (
    <div className="social-post">
      <h3>{optimisticPost.title}</h3>
      <p>{optimisticPost.content}</p>
      
      <div className="post-actions">
        <button 
          onClick={handleLikeToggle}
          className={\`like-button \${optimisticPost.isLiked ? 'liked' : ''}\`}
        >
          {optimisticPost.isLiked ? '❤️' : '🤍'} {optimisticPost.likes}
        </button>
        
        <button className="share-button">
          🔗 Share
        </button>
      </div>
    </div>
  );
}
\`\`\`

### Todo List with Optimistic Updates
\`\`\`jsx
import { useOptimistic } from 'react';

function OptimisticTodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, update) => {
      switch (update.type) {
        case 'ADD':
          return [...currentTodos, update.todo];
        
        case 'TOGGLE':
          return currentTodos.map(todo =>
            todo.id === update.id
              ? { ...todo, completed: !todo.completed }
              : todo
          );
        
        case 'DELETE':
          return currentTodos.filter(todo => todo.id !== update.id);
        
        default:
          return currentTodos;
      }
    }
  );

  const handleAddTodo = async (text) => {
    const newTodo = {
      id: Date.now(), // Temporary ID
      text,
      completed: false,
      isOptimistic: true
    };

    // Immediately add to UI
    addOptimisticTodo({ type: 'ADD', todo: newTodo });

    try {
      const serverTodo = await onAddTodo(text);
      // Server returns the real todo with proper ID
      // The optimistic update is replaced by the real data
    } catch (error) {
      console.error('Failed to add todo');
      // Optimistic update is automatically reverted
    }
  };

  const handleToggleTodo = async (id) => {
    // Immediately toggle in UI
    addOptimisticTodo({ type: 'TOGGLE', id });

    try {
      await onToggleTodo(id);
    } catch (error) {
      console.error('Failed to toggle todo');
      // Automatically reverted
    }
  };

  const handleDeleteTodo = async (id) => {
    // Immediately remove from UI
    addOptimisticTodo({ type: 'DELETE', id });

    try {
      await onDeleteTodo(id);
    } catch (error) {
      console.error('Failed to delete todo');
      // Automatically restored
    }
  };

  return (
    <div className="todo-list">
      <TodoInput onAdd={handleAddTodo} />
      
      <div className="todos">
        {optimisticTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggleTodo(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={\`todo-item \${todo.completed ? 'completed' : ''} \${todo.isOptimistic ? 'optimistic' : ''}\`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={onDelete} className="delete-button">
        🗑️
      </button>
    </div>
  );
}

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
\`\`\`

---

## 4. Integration with Actions

### Combining useOptimistic with useActionState
\`\`\`jsx
import { useOptimistic, useActionState } from 'react';

async function updatePostAction(prevState, formData) {
  const postId = formData.get('postId');
  const content = formData.get('content');
  
  try {
    const updatedPost = await api.updatePost(postId, { content });
    return { success: true, post: updatedPost };
  } catch (error) {
    return { error: error.message };
  }
}

function EditablePost({ initialPost }) {
  const [actionState, formAction, isPending] = useActionState(updatePostAction, {});
  
  const [optimisticPost, addOptimisticUpdate] = useOptimistic(
    initialPost,
    (currentPost, newContent) => ({
      ...currentPost,
      content: newContent,
      lastModified: new Date().toISOString()
    })
  );

  const handleContentChange = (newContent) => {
    // Immediately update UI
    addOptimisticUpdate(newContent);
  };

  return (
    <div className="editable-post">
      <div className="post-content">
        {optimisticPost.content}
        {isPending && <span className="saving-indicator">Saving...</span>}
      </div>
      
      <form action={formAction}>
        <input type="hidden" name="postId" value={optimisticPost.id} />
        <textarea
          name="content"
          defaultValue={optimisticPost.content}
          onChange={(e) => handleContentChange(e.target.value)}
        />
        <button type="submit" disabled={isPending}>
          Save Changes
        </button>
      </form>
      
      {actionState.error && (
        <div className="error">
          Failed to save: {actionState.error}
        </div>
      )}
    </div>
  );
}
\`\`\`

### Shopping Cart with Optimistic Updates
\`\`\`jsx
import { useOptimistic, useActionState } from 'react';

async function updateCartAction(prevState, formData) {
  const action = formData.get('action');
  const productId = formData.get('productId');
  const quantity = parseInt(formData.get('quantity') || '1');

  try {
    let updatedCart;
    switch (action) {
      case 'add':
        updatedCart = await api.addToCart(productId, quantity);
        break;
      case 'remove':
        updatedCart = await api.removeFromCart(productId);
        break;
      case 'update':
        updatedCart = await api.updateCartItem(productId, quantity);
        break;
    }
    
    return { success: true, cart: updatedCart };
  } catch (error) {
    return { error: error.message };
  }
}

function ShoppingCart({ initialCart }) {
  const [actionState, formAction, isPending] = useActionState(updateCartAction, {});
  
  const [optimisticCart, addOptimisticUpdate] = useOptimistic(
    initialCart,
    (currentCart, update) => {
      switch (update.type) {
        case 'ADD_ITEM':
          const existingItem = currentCart.items.find(item => item.id === update.product.id);
          if (existingItem) {
            return {
              ...currentCart,
              items: currentCart.items.map(item =>
                item.id === update.product.id
                  ? { ...item, quantity: item.quantity + update.quantity }
                  : item
              )
            };
          } else {
            return {
              ...currentCart,
              items: [...currentCart.items, { ...update.product, quantity: update.quantity }]
            };
          }
        
        case 'REMOVE_ITEM':
          return {
            ...currentCart,
            items: currentCart.items.filter(item => item.id !== update.productId)
          };
        
        case 'UPDATE_QUANTITY':
          return {
            ...currentCart,
            items: currentCart.items.map(item =>
              item.id === update.productId
                ? { ...item, quantity: update.quantity }
                : item
            )
          };
        
        default:
          return currentCart;
      }
    }
  );

  const addToCart = (product, quantity = 1) => {
    addOptimisticUpdate({ type: 'ADD_ITEM', product, quantity });
  };

  const removeFromCart = (productId) => {
    addOptimisticUpdate({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      addOptimisticUpdate({ type: 'UPDATE_QUANTITY', productId, quantity });
    }
  };

  const totalPrice = optimisticCart.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      
      {actionState.error && (
        <div className="error">
          Error: {actionState.error}
        </div>
      )}
      
      <div className="cart-items">
        {optimisticCart.items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>\${item.price}</p>
            </div>
            
            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={isPending}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={isPending}
              >
                +
              </button>
            </div>
            
            <button 
              onClick={() => removeFromCart(item.id)}
              className="remove-button"
              disabled={isPending}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-total">
        <strong>Total: \${totalPrice.toFixed(2)}</strong>
        {isPending && <span className="updating">Updating...</span>}
      </div>
      
      {/* Hidden form for server actions */}
      <form action={formAction} style={{ display: 'none' }}>
        <input type="hidden" name="action" />
        <input type="hidden" name="productId" />
        <input type="hidden" name="quantity" />
      </form>
    </div>
  );
}
\`\`\`

---

## 5. Error Handling and Recovery

### Handling Failed Optimistic Updates
\`\`\`jsx
import { useOptimistic, useState } from 'react';

function RobustOptimisticComponent({ data, onUpdate }) {
  const [error, setError] = useState(null);
  const [optimisticData, addOptimisticUpdate] = useOptimistic(
    data,
    (current, update) => ({ ...current, ...update })
  );

  const handleUpdate = async (updates) => {
    // Clear previous errors
    setError(null);
    
    // Apply optimistic update
    addOptimisticUpdate(updates);

    try {
      await onUpdate(updates);
      // Success - optimistic update becomes permanent
    } catch (err) {
      // Error - optimistic update is automatically reverted
      setError({
        message: err.message,
        timestamp: new Date(),
        failedUpdate: updates
      });
      
      // Optionally, provide retry functionality
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    }
  };

  const retryFailedUpdate = () => {
    if (error?.failedUpdate) {
      handleUpdate(error.failedUpdate);
    }
  };

  return (
    <div className="robust-component">
      <div className="data-display">
        {JSON.stringify(optimisticData, null, 2)}
      </div>
      
      {error && (
        <div className="error-banner">
          <p>Update failed: {error.message}</p>
          <button onClick={retryFailedUpdate}>
            Retry
          </button>
          <button onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}
      
      <button onClick={() => handleUpdate({ value: Math.random() })}>
        Update Data
      </button>
    </div>
  );
}
\`\`\`

### Optimistic Updates with Validation
\`\`\`jsx
function ValidatedOptimisticForm({ initialData, onSubmit, validate }) {
  const [validationErrors, setValidationErrors] = useState({});
  const [optimisticData, addOptimisticUpdate] = useOptimistic(
    initialData,
    (current, update) => ({ ...current, ...update })
  );

  const handleFieldChange = async (field, value) => {
    // Client-side validation
    const fieldErrors = validate ? validate({ [field]: value }) : {};
    setValidationErrors(prev => ({
      ...prev,
      [field]: fieldErrors[field]
    }));

    // Only apply optimistic update if validation passes
    if (!fieldErrors[field]) {
      addOptimisticUpdate({ [field]: value });
    }
  };

  const handleSubmit = async (formData) => {
    const updates = Object.fromEntries(formData);
    const errors = validate ? validate(updates) : {};
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Apply optimistic update for the entire form
    addOptimisticUpdate(updates);

    try {
      await onSubmit(updates);
      setValidationErrors({});
    } catch (error) {
      // Handle server validation errors
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(new FormData(e.target));
    }}>
      <div className="form-field">
        <input
          name="name"
          defaultValue={optimisticData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
        />
        {validationErrors.name && (
          <span className="error">{validationErrors.name}</span>
        )}
      </div>
      
      <div className="form-field">
        <input
          name="email"
          type="email"
          defaultValue={optimisticData.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />
        {validationErrors.email && (
          <span className="error">{validationErrors.email}</span>
        )}
      </div>
      
      <button type="submit">
        Save Changes
      </button>
    </form>
  );
}
\`\`\`

---

## 6. Best Practices

### Do's ✅
- **Use for frequent user actions** like likes, votes, simple edits
- **Provide visual feedback** to indicate optimistic state
- **Handle errors gracefully** with clear error messages
- **Keep optimistic updates simple** - complex logic can cause issues
- **Test error scenarios** to ensure proper rollback behavior
- **Use with Actions** for seamless server integration
- **Validate before optimistic updates** when possible

### Don'ts ❌
- **Don't use for critical operations** like payments or irreversible actions
- **Don't ignore error handling** - always plan for failures
- **Don't make complex state transformations** in optimistic updates
- **Don't forget about race conditions** with multiple rapid updates
- **Don't use without proper loading states** for longer operations
- **Don't assume optimistic updates always succeed**

### Performance Considerations
- **Debounce rapid updates** to avoid excessive optimistic changes
- **Use React.memo** for components that render optimistic data
- **Consider the size of optimistic state** - large objects can impact performance
- **Implement proper cleanup** for cancelled operations

---

## 7. Advanced Patterns

### Optimistic Updates with Undo
\`\`\`jsx
function UndoableOptimisticList({ items, onUpdate }) {
  const [undoStack, setUndoStack] = useState([]);
  const [optimisticItems, addOptimisticUpdate] = useOptimistic(
    items,
    (currentItems, update) => {
      switch (update.type) {
        case 'DELETE':
          return currentItems.filter(item => item.id !== update.id);
        case 'RESTORE':
          return [...currentItems, update.item];
        default:
          return currentItems;
      }
    }
  );

  const deleteItem = async (id) => {
    const itemToDelete = optimisticItems.find(item => item.id === id);
    
    // Add to undo stack
    setUndoStack(prev => [...prev, { type: 'DELETE', item: itemToDelete }]);
    
    // Optimistically remove
    addOptimisticUpdate({ type: 'DELETE', id });

    try {
      await onUpdate({ type: 'DELETE', id });
      
      // Clear undo after successful operation
      setTimeout(() => {
        setUndoStack(prev => prev.filter(action => action.item.id !== id));
      }, 5000);
    } catch (error) {
      // Remove from undo stack on error (automatic rollback handles the rest)
      setUndoStack(prev => prev.filter(action => action.item.id !== id));
    }
  };

  const undoLastAction = () => {
    const lastAction = undoStack[undoStack.length - 1];
    if (lastAction && lastAction.type === 'DELETE') {
      addOptimisticUpdate({ type: 'RESTORE', item: lastAction.item });
      setUndoStack(prev => prev.slice(0, -1));
    }
  };

  return (
    <div>
      {undoStack.length > 0 && (
        <div className="undo-banner">
          <span>Item deleted</span>
          <button onClick={undoLastAction}>Undo</button>
        </div>
      )}
      
      <div className="items-list">
        {optimisticItems.map(item => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

---

## Summary

The \`useOptimistic\` hook revolutionizes user experience by:

1. **Providing Instant Feedback**: Users see immediate results of their actions
2. **Handling Failures Gracefully**: Automatic rollback when operations fail
3. **Reducing Perceived Latency**: UI feels faster and more responsive
4. **Simplifying State Management**: No manual pending/error state handling
5. **Integrating Seamlessly**: Works perfectly with Actions and Server Components

Optimistic UI with \`useOptimistic\` makes React applications feel more responsive and provides a superior user experience, especially for interactive features like social media, collaborative tools, and real-time applications.
`,

  contentFa: `
# رابط کاربری خوش‌بینانه با useOptimistic

## تعریف
**رابط کاربری خوش‌بینانه (Optimistic UI)** الگویی در طراحی است که رابط کاربری بلافاصله نتیجه مورد انتظار از عمل کاربر را نشان می‌دهد، قبل از اینکه سرور عملیات را تأیید کند. هوک \`useOptimistic\` ری‌اکت ۱۹ این الگو را ساده و قابل اعتماد می‌کند و بازخورد فوری ارائه می‌دهد و در صورت شکست عملیات، به صورت خودکار تغییرات را برمی‌گرداند.

## ویژگی‌های اصلی
- **بازخورد فوری**: UI بلافاصله هنگام انجام عمل توسط کاربر بروزرسانی می‌شود
- **برگشت خودکار**: در صورت شکست عملیات سرور، تغییرات را برمی‌گرداند
- **UX بهتر**: کاربران منتظر پاسخ سرور برای اعمال رایج نمی‌مانند
- **مدیریت خطا**: مدیریت مناسب بروزرسانی‌های خوش‌بینانه ناموفق
- **یکپارچگی یکپارچه**: با Actions و Server Components به خوبی کار می‌کند

---

## ۱. درک رابط کاربری خوش‌بینانه

### مشکل الگوهای سنتی UI
الگوهای سنتی UI منتظر تأیید سرور قبل از بروزرسانی می‌مانند:

\`\`\`jsx
// رویکرد سنتی - کاربر منتظر پاسخ سرور می‌ماند
function TraditionalLikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const response = await api.likePost(postId);
      setLikes(response.likes); // فقط بعد از پاسخ سرور بروزرسانی می‌شود
    } catch (error) {
      console.error('لایک کردن پست ناموفق بود');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={isLoading}>
      {isLoading ? 'در حال لایک...' : \`❤️ \${likes}\`}
    </button>
  );
}
\`\`\`

### رویکرد خوش‌بینانه
با UI خوش‌بینانه، رابط بلافاصله بروزرسانی می‌شود:

\`\`\`jsx
import { useOptimistic } from 'react';

function OptimisticLikeButton({ postId, initialLikes }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (currentLikes, increment) => currentLikes + increment
  );

  const handleLike = async () => {
    // بلافاصله UI را بروزرسانی کن
    addOptimisticLike(1);
    
    try {
      // درخواست به سرور ارسال کن
      await api.likePost(postId);
      // اگر موفق باشد، بروزرسانی خوش‌بینانه دائمی می‌شود
    } catch (error) {
      // اگر ناموفق باشد، useOptimistic به صورت خودکار تغییر را برمی‌گرداند
      console.error('لایک کردن پست ناموفق بود');
    }
  };

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}
\`\`\`

---

## ۲. بررسی عمیق هوک useOptimistic

### نحو پایه
\`\`\`jsx
const [optimisticState, addOptimistic] = useOptimistic(
  actualState,
  updateFunction
);
\`\`\`

- **optimisticState**: استیت فعلی (واقعی + تغییرات خوش‌بینانه)
- **addOptimistic**: تابع برای اضافه کردن بروزرسانی خوش‌بینانه
- **actualState**: استیت واقعی از سرور/props
- **updateFunction**: نحوه اعمال بروزرسانی‌های خوش‌بینانه

### مثال ساده شمارنده
\`\`\`jsx
import { useOptimistic, useState } from 'react';

function OptimisticCounter() {
  const [count, setCount] = useState(0);
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (currentCount, increment) => currentCount + increment
  );

  const handleIncrement = async () => {
    // بلافاصله افزایش را نشان بده
    addOptimisticCount(1);
    
    // شبیه‌سازی تأخیر سرور
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // بروزرسانی استیت واقعی (این کار بروزرسانی خوش‌بینانه را دائمی می‌کند)
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>شمارش: {optimisticCount}</p>
      <button onClick={handleIncrement}>
        افزایش
      </button>
    </div>
  );
}
\`\`\`

---

## ۳. مثال‌های دنیای واقعی

### سیستم لایک شبکه‌های اجتماعی
\`\`\`jsx
import { useOptimistic } from 'react';

function SocialPost({ post, onLike, onUnlike }) {
  const [optimisticPost, addOptimisticUpdate] = useOptimistic(
    post,
    (currentPost, update) => {
      switch (update.type) {
        case 'LIKE':
          return {
            ...currentPost,
            likes: currentPost.likes + 1,
            isLiked: true
          };
        case 'UNLIKE':
          return {
            ...currentPost,
            likes: currentPost.likes - 1,
            isLiked: false
          };
        default:
          return currentPost;
      }
    }
  );

  const handleLikeToggle = async () => {
    const isCurrentlyLiked = optimisticPost.isLiked;
    
    // بروزرسانی خوش‌بینانه UI
    addOptimisticUpdate({
      type: isCurrentlyLiked ? 'UNLIKE' : 'LIKE'
    });

    try {
      if (isCurrentlyLiked) {
        await onUnlike(post.id);
      } else {
        await onLike(post.id);
      }
    } catch (error) {
      // useOptimistic به صورت خودکار در صورت خطا برمی‌گردد
      console.error('بروزرسانی وضعیت لایک ناموفق بود');
      // اختیاری: پیام خطا به کاربر نشان دهید
    }
  };

  return (
    <div className="social-post">
      <h3>{optimisticPost.title}</h3>
      <p>{optimisticPost.content}</p>
      
      <div className="post-actions">
        <button 
          onClick={handleLikeToggle}
          className={\`like-button \${optimisticPost.isLiked ? 'liked' : ''}\`}
        >
          {optimisticPost.isLiked ? '❤️' : '🤍'} {optimisticPost.likes}
        </button>
        
        <button className="share-button">
          🔗 اشتراک‌گذاری
        </button>
      </div>
    </div>
  );
}
\`\`\`

### لیست کارها با بروزرسانی‌های خوش‌بینانه
\`\`\`jsx
import { useOptimistic } from 'react';

function OptimisticTodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, update) => {
      switch (update.type) {
        case 'ADD':
          return [...currentTodos, update.todo];
        
        case 'TOGGLE':
          return currentTodos.map(todo =>
            todo.id === update.id
              ? { ...todo, completed: !todo.completed }
              : todo
          );
        
        case 'DELETE':
          return currentTodos.filter(todo => todo.id !== update.id);
        
        default:
          return currentTodos;
      }
    }
  );

  const handleAddTodo = async (text) => {
    const newTodo = {
      id: Date.now(), // شناسه موقت
      text,
      completed: false,
      isOptimistic: true
    };

    // بلافاصله به UI اضافه کن
    addOptimisticTodo({ type: 'ADD', todo: newTodo });

    try {
      const serverTodo = await onAddTodo(text);
      // سرور کار واقعی با شناسه مناسب برمی‌گرداند
      // بروزرسانی خوش‌بینانه با داده واقعی جایگزین می‌شود
    } catch (error) {
      console.error('اضافه کردن کار ناموفق بود');
      // بروزرسانی خوش‌بینانه به صورت خودکار برگردانده می‌شود
    }
  };

  const handleToggleTodo = async (id) => {
    // بلافاصله در UI تغییر وضعیت بده
    addOptimisticTodo({ type: 'TOGGLE', id });

    try {
      await onToggleTodo(id);
    } catch (error) {
      console.error('تغییر وضعیت کار ناموفق بود');
      // به صورت خودکار برگردانده می‌شود
    }
  };

  const handleDeleteTodo = async (id) => {
    // بلافاصله از UI حذف کن
    addOptimisticTodo({ type: 'DELETE', id });

    try {
      await onDeleteTodo(id);
    } catch (error) {
      console.error('حذف کار ناموفق بود');
      // به صورت خودکار بازیابی می‌شود
    }
  };

  return (
    <div className="todo-list">
      <TodoInput onAdd={handleAddTodo} />
      
      <div className="todos">
        {optimisticTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggleTodo(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={\`todo-item \${todo.completed ? 'completed' : ''} \${todo.isOptimistic ? 'optimistic' : ''}\`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={onDelete} className="delete-button">
        🗑️
      </button>
    </div>
  );
}

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="کار جدید اضافه کنید..."
      />
      <button type="submit">اضافه کردن</button>
    </form>
  );
}
\`\`\`

---

## ۴. یکپارچگی با Actions

### ترکیب useOptimistic با useActionState
\`\`\`jsx
import { useOptimistic, useActionState } from 'react';

async function updatePostAction(prevState, formData) {
  const postId = formData.get('postId');
  const content = formData.get('content');
  
  try {
    const updatedPost = await api.updatePost(postId, { content });
    return { success: true, post: updatedPost };
  } catch (error) {
    return { error: error.message };
  }
}

function EditablePost({ initialPost }) {
  const [actionState, formAction, isPending] = useActionState(updatePostAction, {});
  
  const [optimisticPost, addOptimisticUpdate] = useOptimistic(
    initialPost,
    (currentPost, newContent) => ({
      ...currentPost,
      content: newContent,
      lastModified: new Date().toISOString()
    })
  );

  const handleContentChange = (newContent) => {
    // بلافاصله UI را بروزرسانی کن
    addOptimisticUpdate(newContent);
  };

  return (
    <div className="editable-post">
      <div className="post-content">
        {optimisticPost.content}
        {isPending && <span className="saving-indicator">در حال ذخیره...</span>}
      </div>
      
      <form action={formAction}>
        <input type="hidden" name="postId" value={optimisticPost.id} />
        <textarea
          name="content"
          defaultValue={optimisticPost.content}
          onChange={(e) => handleContentChange(e.target.value)}
        />
        <button type="submit" disabled={isPending}>
          ذخیره تغییرات
        </button>
      </form>
      
      {actionState.error && (
        <div className="error">
          ذخیره ناموفق بود: {actionState.error}
        </div>
      )}
    </div>
  );
}
\`\`\`

### سبد خرید با بروزرسانی‌های خوش‌بینانه
\`\`\`jsx
import { useOptimistic, useActionState } from 'react';

async function updateCartAction(prevState, formData) {
  const action = formData.get('action');
  const productId = formData.get('productId');
  const quantity = parseInt(formData.get('quantity') || '1');

  try {
    let updatedCart;
    switch (action) {
      case 'add':
        updatedCart = await api.addToCart(productId, quantity);
        break;
      case 'remove':
        updatedCart = await api.removeFromCart(productId);
        break;
      case 'update':
        updatedCart = await api.updateCartItem(productId, quantity);
        break;
    }
    
    return { success: true, cart: updatedCart };
  } catch (error) {
    return { error: error.message };
  }
}

function ShoppingCart({ initialCart }) {
  const [actionState, formAction, isPending] = useActionState(updateCartAction, {});
  
  const [optimisticCart, addOptimisticUpdate] = useOptimistic(
    initialCart,
    (currentCart, update) => {
      switch (update.type) {
        case 'ADD_ITEM':
          const existingItem = currentCart.items.find(item => item.id === update.product.id);
          if (existingItem) {
            return {
              ...currentCart,
              items: currentCart.items.map(item =>
                item.id === update.product.id
                  ? { ...item, quantity: item.quantity + update.quantity }
                  : item
              )
            };
          } else {
            return {
              ...currentCart,
              items: [...currentCart.items, { ...update.product, quantity: update.quantity }]
            };
          }
        
        case 'REMOVE_ITEM':
          return {
            ...currentCart,
            items: currentCart.items.filter(item => item.id !== update.productId)
          };
        
        case 'UPDATE_QUANTITY':
          return {
            ...currentCart,
            items: currentCart.items.map(item =>
              item.id === update.productId
                ? { ...item, quantity: update.quantity }
                : item
            )
          };
        
        default:
          return currentCart;
      }
    }
  );

  const addToCart = (product, quantity = 1) => {
    addOptimisticUpdate({ type: 'ADD_ITEM', product, quantity });
  };

  const removeFromCart = (productId) => {
    addOptimisticUpdate({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      addOptimisticUpdate({ type: 'UPDATE_QUANTITY', productId, quantity });
    }
  };

  const totalPrice = optimisticCart.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return (
    <div className="shopping-cart">
      <h2>سبد خرید</h2>
      
      {actionState.error && (
        <div className="error">
          خطا: {actionState.error}
        </div>
      )}
      
      <div className="cart-items">
        {optimisticCart.items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.price} تومان</p>
            </div>
            
            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={isPending}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={isPending}
              >
                +
              </button>
            </div>
            
            <button 
              onClick={() => removeFromCart(item.id)}
              className="remove-button"
              disabled={isPending}
            >
              حذف
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-total">
        <strong>مجموع: {totalPrice.toLocaleString('fa-IR')} تومان</strong>
        {isPending && <span className="updating">در حال بروزرسانی...</span>}
      </div>
      
      {/* فرم مخفی برای server actions */}
      <form action={formAction} style={{ display: 'none' }}>
        <input type="hidden" name="action" />
        <input type="hidden" name="productId" />
        <input type="hidden" name="quantity" />
      </form>
    </div>
  );
}
\`\`\`

---

## ۵. مدیریت خطا و بازیابی

### مدیریت بروزرسانی‌های خوش‌بینانه ناموفق
\`\`\`jsx
import { useOptimistic, useState } from 'react';

function RobustOptimisticComponent({ data, onUpdate }) {
  const [error, setError] = useState(null);
  const [optimisticData, addOptimisticUpdate] = useOptimistic(
    data,
    (current, update) => ({ ...current, ...update })
  );

  const handleUpdate = async (updates) => {
    // پاک کردن خطاهای قبلی
    setError(null);
    
    // اعمال بروزرسانی خوش‌بینانه
    addOptimisticUpdate(updates);

    try {
      await onUpdate(updates);
      // موفقیت - بروزرسانی خوش‌بینانه دائمی می‌شود
    } catch (err) {
      // خطا - بروزرسانی خوش‌بینانه به صورت خودکار برگردانده می‌شود
      setError({
        message: err.message,
        timestamp: new Date(),
        failedUpdate: updates
      });
      
      // اختیاری، قابلیت تلاش مجدد فراهم کنید
      setTimeout(() => setError(null), 5000); // پاک کردن خطا بعد از ۵ ثانیه
    }
  };

  const retryFailedUpdate = () => {
    if (error?.failedUpdate) {
      handleUpdate(error.failedUpdate);
    }
  };

  return (
    <div className="robust-component">
      <div className="data-display">
        {JSON.stringify(optimisticData, null, 2)}
      </div>
      
      {error && (
        <div className="error-banner">
          <p>بروزرسانی ناموفق بود: {error.message}</p>
          <button onClick={retryFailedUpdate}>
            تلاش مجدد
          </button>
          <button onClick={() => setError(null)}>
            نادیده گرفتن
          </button>
        </div>
      )}
      
      <button onClick={() => handleUpdate({ value: Math.random() })}>
        بروزرسانی داده
      </button>
    </div>
  );
}
\`\`\`

### بروزرسانی‌های خوش‌بینانه با اعتبارسنجی
\`\`\`jsx
function ValidatedOptimisticForm({ initialData, onSubmit, validate }) {
  const [validationErrors, setValidationErrors] = useState({});
  const [optimisticData, addOptimisticUpdate] = useOptimistic(
    initialData,
    (current, update) => ({ ...current, ...update })
  );

  const handleFieldChange = async (field, value) => {
    // اعتبارسنجی سمت کلاینت
    const fieldErrors = validate ? validate({ [field]: value }) : {};
    setValidationErrors(prev => ({
      ...prev,
      [field]: fieldErrors[field]
    }));

    // فقط در صورت عبور از اعتبارسنجی، بروزرسانی خوش‌بینانه اعمال کن
    if (!fieldErrors[field]) {
      addOptimisticUpdate({ [field]: value });
    }
  };

  const handleSubmit = async (formData) => {
    const updates = Object.fromEntries(formData);
    const errors = validate ? validate(updates) : {};
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // اعمال بروزرسانی خوش‌بینانه برای کل فرم
    addOptimisticUpdate(updates);

    try {
      await onSubmit(updates);
      setValidationErrors({});
    } catch (error) {
      // مدیریت خطاهای اعتبارسنجی سرور
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      }
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(new FormData(e.target));
    }}>
      <div className="form-field">
        <input
          name="name"
          defaultValue={optimisticData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
        />
        {validationErrors.name && (
          <span className="error">{validationErrors.name}</span>
        )}
      </div>
      
      <div className="form-field">
        <input
          name="email"
          type="email"
          defaultValue={optimisticData.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />
        {validationErrors.email && (
          <span className="error">{validationErrors.email}</span>
        )}
      </div>
      
      <button type="submit">
        ذخیره تغییرات
      </button>
    </form>
  );
}
\`\`\`

---

## ۶. بهترین شیوه‌ها

### کارهای درست ✅
- **برای اعمال مکرر کاربر استفاده کنید** مثل لایک، رأی، ویرایش‌های ساده
- **بازخورد بصری ارائه دهید** برای نشان دادن وضعیت خوش‌بینانه
- **خطاها را به خوبی مدیریت کنید** با پیام‌های خطای واضح
- **بروزرسانی‌های خوش‌بینانه را ساده نگه دارید** - منطق پیچیده می‌تواند مشکل ایجاد کند
- **سناریوهای خطا را تست کنید** تا رفتار برگشت مناسب اطمینان حاصل شود
- **با Actions استفاده کنید** برای یکپارچگی یکپارچه سرور
- **قبل از بروزرسانی‌های خوش‌بینانه اعتبارسنجی کنید** در صورت امکان

### کارهای غلط ❌
- **برای عملیات حیاتی استفاده نکنید** مثل پرداخت یا اعمال غیرقابل برگشت
- **مدیریت خطا را نادیده نگیرید** - همیشه برای شکست‌ها برنامه‌ریزی کنید
- **تبدیل‌های پیچیده استیت** در بروزرسانی‌های خوش‌بینانه انجام ندهید
- **شرایط مسابقه را فراموش نکنید** با چندین بروزرسانی سریع
- **بدون وضعیت‌های لودینگ مناسب استفاده نکنید** برای عملیات طولانی‌تر
- **فرض نکنید بروزرسانی‌های خوش‌بینانه همیشه موفق هستند**

### ملاحظات عملکرد
- **بروزرسانی‌های سریع را debounce کنید** تا از تغییرات خوش‌بینانه بیش از حد جلوگیری کنید
- **از React.memo استفاده کنید** برای کامپوننت‌هایی که داده خوش‌بینانه رندر می‌کنند
- **اندازه استیت خوش‌بینانه را در نظر بگیرید** - اشیاء بزرگ می‌توانند بر عملکرد تأثیر بگذارند
- **پاکسازی مناسب پیاده‌سازی کنید** برای عملیات لغو شده

---

## ۷. الگوهای پیشرفته

### بروزرسانی‌های خوش‌بینانه با قابلیت برگشت
\`\`\`jsx
function UndoableOptimisticList({ items, onUpdate }) {
  const [undoStack, setUndoStack] = useState([]);
  const [optimisticItems, addOptimisticUpdate] = useOptimistic(
    items,
    (currentItems, update) => {
      switch (update.type) {
        case 'DELETE':
          return currentItems.filter(item => item.id !== update.id);
        case 'RESTORE':
          return [...currentItems, update.item];
        default:
          return currentItems;
      }
    }
  );

  const deleteItem = async (id) => {
    const itemToDelete = optimisticItems.find(item => item.id === id);
    
    // به پشته برگشت اضافه کن
    setUndoStack(prev => [...prev, { type: 'DELETE', item: itemToDelete }]);
    
    // به صورت خوش‌بینانه حذف کن
    addOptimisticUpdate({ type: 'DELETE', id });

    try {
      await onUpdate({ type: 'DELETE', id });
      
      // پاک کردن برگشت بعد از عملیات موفق
      setTimeout(() => {
        setUndoStack(prev => prev.filter(action => action.item.id !== id));
      }, 5000);
    } catch (error) {
      // حذف از پشته برگشت در صورت خطا (برگشت خودکار بقیه را مدیریت می‌کند)
      setUndoStack(prev => prev.filter(action => action.item.id !== id));
    }
  };

  const undoLastAction = () => {
    const lastAction = undoStack[undoStack.length - 1];
    if (lastAction && lastAction.type === 'DELETE') {
      addOptimisticUpdate({ type: 'RESTORE', item: lastAction.item });
      setUndoStack(prev => prev.slice(0, -1));
    }
  };

  return (
    <div>
      {undoStack.length > 0 && (
        <div className="undo-banner">
          <span>آیتم حذف شد</span>
          <button onClick={undoLastAction}>برگشت</button>
        </div>
      )}
      
      <div className="items-list">
        {optimisticItems.map(item => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <button onClick={() => deleteItem(item.id)}>
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

---

## خلاصه

هوک \`useOptimistic\` تجربه کاربری را با موارد زیر متحول می‌کند:

۱. **ارائه بازخورد فوری**: کاربران نتایج فوری اعمال خود را می‌بینند
۲. **مدیریت مناسب شکست‌ها**: برگشت خودکار هنگام شکست عملیات
۳. **کاهش تأخیر درک شده**: UI سریع‌تر و پاسخگوتر احساس می‌شود
۴. **ساده‌سازی مدیریت استیت**: بدون مدیریت دستی وضعیت pending/error
۵. **یکپارچگی یکپارچه**: با Actions و Server Components به خوبی کار می‌کند

UI خوش‌بینانه با \`useOptimistic\` اپلیکیشن‌های ری‌اکت را پاسخگوتر می‌کند و تجربه کاربری برتری ارائه می‌دهد، به ویژه برای ویژگی‌های تعاملی مثل شبکه‌های اجتماعی، ابزارهای مشارکتی و اپلیکیشن‌های بلادرنگ.
`,

  visualizationId: 'optimistic-ui',
  exerciseId: 'optimistic-ui',
};

export default optimisticUILesson;