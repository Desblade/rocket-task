

# Задача для Rocket

Приложение представляет из себя простейший CRM сервис с интеграцией AmoCRM.

## Инструкция по запуску приложения:

1. **Клонировать исходный репозиторий:**
   ```bash
   git clone https://github.com/Desblade/rocket-task.git
   ```
2. **Скачать необходимые npm модули:**
   ```bash 
   cd /frontend
   npm i
   cd ../backend
   npm i
   ```
3. **Запустить докер контейнер с базой данных (необходимо иметь Docker Engine):**
   ```bash
   docker build -t rocket-db-image .
   docker run -v dbdata:/var/lib/postgresql/data -d -p 5432:5432 --name rocket-db-container rocket-db-image
   ```
4. **Запустить миграции в бд**:
   ```bash
   npm run migrate
   ```
5. **Заинсертить необходимые начальные данные**:
   ```bash
   npm run seed
   ```
6. **Запустить бэкэнд**:
   ```bash
   npm run dev
   ```
7. **Запустить фронтэнд в режиме разработки**
   ```bash
   cd ../frontend
   npm run dev
   ```
8. **Поздравляю. Вы успешно запустили проект**  