### Installation Instruction
---
To run the project, please follow the instruction

1. First, run this command for to install the required package

```bash
npm install -g sequelize
npm install -g mysql2
npm install 
```

2. Run migration using this command, please make sure that *Mysql* or *Mariadb* daemon is active/run

```bash
export NODE_ENV=production
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```

3. After Migration is done, than you can start the application using this command

```bash
npm run start
```

### Miscellaneous
1. To run the tests,
```bash
npm run prepare-test
npm run test
```

2. To run in development mode
```bash
npm run prepare-dev
npm run dev
```
