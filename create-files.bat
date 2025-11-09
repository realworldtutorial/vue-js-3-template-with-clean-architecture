@echo off
echo Copying all template files to vue-clean-architecture project...

cd vue-clean-architecture

echo Copying root files...
copy ..\package.json.template package.json
copy ..\vite.config.js.template vite.config.js
copy ..\index.html.template index.html
copy ..\.gitignore.template .gitignore

echo Creating src structure...
mkdir src\assets 2>nul
mkdir src\core\entities 2>nul
mkdir src\core\usecases 2>nul
mkdir src\core\repositories 2>nul
mkdir src\data\models 2>nul
mkdir src\data\datasources 2>nul
mkdir src\data\repositories 2>nul
mkdir src\presentation\views 2>nul
mkdir src\presentation\components 2>nul
mkdir src\presentation\stores 2>nul
mkdir src\presentation\router 2>nul

echo Copying source files...
copy ..\src-main.js.template src\main.js
copy ..\src-App.vue.template src\App.vue
copy ..\src-assets-style.css.template src\assets\style.css

echo Copying core layer...
copy ..\src-core-entities-User.js.template src\core\entities\User.js
copy ..\src-core-repositories-UserRepository.js.template src\core\repositories\UserRepository.js
copy ..\src-core-usecases-GetUsersUseCase.js.template src\core\usecases\GetUsersUseCase.js
copy ..\src-core-usecases-CreateUserUseCase.js.template src\core\usecases\CreateUserUseCase.js

echo Copying data layer...
copy ..\src-data-models-UserModel.js.template src\data\models\UserModel.js
copy ..\src-data-datasources-ApiDataSource.js.template src\data\datasources\ApiDataSource.js
copy ..\src-data-repositories-UserRepositoryImpl.js.template src\data\repositories\UserRepositoryImpl.js

echo Copying presentation layer...
copy ..\src-presentation-stores-userStore.js.template src\presentation\stores\userStore.js
copy ..\src-presentation-router-index.js.template src\presentation\router\index.js
copy ..\src-presentation-views-HomeView.vue.template src\presentation\views\HomeView.vue
copy ..\src-presentation-views-UsersView.vue.template src\presentation\views\UsersView.vue
copy ..\src-presentation-components-UserCard.vue.template src\presentation\components\UserCard.vue

echo Copying README...
copy ..\PROJECT-README.md README.md

echo.
echo ========================================
echo All files copied successfully!
echo ========================================
echo.
echo Next steps:
echo 1. npm install
echo 2. npm run dev
echo.
echo The app will run at http://localhost:5173
echo ========================================

cd ..
