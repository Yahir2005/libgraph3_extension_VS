// src/application/ProjectGenerator.js
export class ProjectGenerator {
    static generate(projectName, useDatabase, dbType) {
        const files = {};

        // Estructura de carpetas
        const basePath = `${projectName}/src/`;

        // 1. Entidad User (ejemplo)
        files[`${basePath}entities/user.h`] = this._userHeader();
        files[`${basePath}entities/user.c`] = this._userSource();

        // 2. Caso de uso: register_user
        files[`${basePath}usecases/register_user.h`] = this._registerUserHeader();
        files[`${basePath}usecases/register_user.c`] = this._registerUserSource();

        // 3. Interfaz del repositorio
        files[`${basePath}interfaces/user_repository.h`] = this._repositoryInterface();

        // 4. Infraestructura (según BD)
        if (useDatabase) {
            if (dbType === 'mariadb') {
                files[`${basePath}infrastructure/mariadb_user_repository.h`] = this._mariadbRepoHeader();
                files[`${basePath}infrastructure/mariadb_user_repository.c`] = this._mariadbRepoSource();
            } else if (dbType === 'sqlite') {
                files[`${basePath}infrastructure/sqlite_user_repository.h`] = this._sqliteRepoHeader();
                files[`${basePath}infrastructure/sqlite_user_repository.c`] = this._sqliteRepoSource();
            }
        } else {
            // Sin BD: repositorio en memoria (archivo)
            files[`${basePath}infrastructure/file_user_repository.h`] = this._fileRepoHeader();
            files[`${basePath}infrastructure/file_user_repository.c`] = this._fileRepoSource();
        }

        // 5. main.c
        files[`${basePath}main.c`] = this._mainSource(useDatabase, dbType);

        // 6. CMakeLists.txt (básico)
        files[`${projectName}/CMakeLists.txt`] = this._cmakeLists(projectName, useDatabase, dbType);

        // 7. README.md y .gitignore
        files[`${projectName}/README.md`] = this._readme(projectName);
        files[`${projectName}/.gitignore`] = this._gitignore();

        return files; // Objeto { ruta: contenido }
    }

    // ... métodos estáticos para cada plantilla (ver ejemplos abajo)
}