# Todo App

- [中文](#中文)
  - [已完成的功能](#已完成的功能)
  - [改进方向](#改进方向)
  - [待添加的功能](#待添加的功能)
- [English](#english)
  - [Completed Features](#completed-features)
  - [Areas for Improvement](#areas-for-improvement)
  - [Planned Enhancements](#planned-enhancements)

## 中文

### 已完成的功能

- 基本操作：新增、编辑、删除、完成状态切换
- 过滤：全部、进行中、已完成
- 国际化：中英切换，并在 `localStorage` 记住语言偏好
- UI 体验：响应式布局、语言切换时无布局抖动
- 状态与存储：使用 Zustand 管理待办列表，数据暂时保存在 `localStorage` 中

### 改进方向

- 数据持久化仅在浏览器本地，后续需要通过后端 API 保存到数据库
- 当前样式纯手写 CSS，没有使用 UI 组件库或 CSS 框架
- 移动端适配目前依赖弹性布局，若界面变复杂需要根据媒体查询，针对不同的端渲染不同的组件
- Store 和组件未做性能优化（批处理、虚拟列表等）

### 待添加的功能

- 日期/时间字段：计划提醒、截止时间等
- 点击删除添加二次确认，或者添加 Undo / 回收站机制，支持恢复误删任务
- 拖拽排序（原生实现或引入拖拽库）
- 单元测试与端到端测试，覆盖核心业务流程
- 与后端 API 的同步逻辑

---

## English

### Completed Features

- Core CRUD actions: create, edit, delete, toggle completion state
- Filtering views: All, Active, Completed
- I18n: zh/en switching with preference stored in `localStorage`
- UI experience: responsive layout with no noticeable shift when switching languages
- State & persistence: Zustand manages todos; data is currently stored in `localStorage`

### Areas for Improvement

- Persistence is still client-side; next step is persisting via backend APIs and a real database
- Styling is hand-written CSS; no UI component or CSS utility library is used yet
- Mobile adaptation relies on flexible layout only; complex screens may need media-query-driven, device-specific components
- Store/components haven’t been tuned for performance (batching, virtualization, etc.)

### Planned Enhancements

- Date/time metadata: reminders, due dates, scheduling
- Secondary confirmation for deletion or undo / recycle bin for recovering deleted tasks
- Drag-and-drop ordering (native implementation or third-party library)
- Unit and end-to-end test coverage for critical flows
- Synchronization with backend APIs
