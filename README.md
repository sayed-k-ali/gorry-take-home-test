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
but first, make sure that we run this command in *production* mode, to check or set the environment
run this command 
```bash
echo $NODE_ENV                  #this command is to check the environment
export NODE_ENV=production      #this command is to set the environment into production mode
```

```bash
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
