@echo off
echo Creating Vue 3 Clean Architecture Project...

mkdir vue-clean-architecture
cd vue-clean-architecture

echo Initializing npm...
call npm init -y

echo Installing dependencies...
call npm install vue@^3.4.0 vue-router@^4.2.5 pinia@^2.1.7 axios@^1.6.0

echo Installing dev dependencies...
call npm install -D @vitejs/plugin-vue@^5.0.0 vite@^5.0.0 eslint@^8.55.0 eslint-plugin-vue@^9.19.0

echo Creating project structure...
mkdir src
mkdir src\core
mkdir src\core\entities
mkdir src\core\usecases
mkdir src\core\repositories
mkdir src\data
mkdir src\data\repositories
mkdir src\data\datasources
mkdir src\data\models
mkdir src\presentation
mkdir src\presentation\views
mkdir src\presentation\components
mkdir src\presentation\stores
mkdir src\presentation\router
mkdir public

echo Project created successfully!
echo.
echo Next steps:
echo 1. cd vue-clean-architecture
echo 2. Run the create-files.bat to create all source files
echo 3. npm run dev
