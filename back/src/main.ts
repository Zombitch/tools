import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { access, appendFile, constants, mkdir, writeFile } from 'node:fs/promises';
import { SystemService } from './core/system/system.service';
import { open, close } from 'node:fs';

const logger = new Logger("main.ts");

async function bootstrap() {
  // First of all , init data
  await initData(); 

  const port = 4000;
  //const allowlist = ['*'];
  const allowlist = ['https://dev.front.vinais.ovh', 'https://dev.back.vinais.ovh'];
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors((req, callback) => {
    let corsOptions = {};
    
    if (allowlist.indexOf(req.header('Origin')) !== -1 || allowlist[0] === '*') corsOptions = { origin: true };
    else corsOptions = {origin: false};

    callback(null, corsOptions);
  });

  await app.listen(port);
  logger.log("Application started and listen to " + port) 
}
bootstrap();

async function initData(){
  const dbEntities: string[] = ["users.json"];
  const dataDir: string = SystemService.getAppPath() + '/data/';
  
  try{
    await mkdir(dataDir, { recursive: true });
  } catch{
    logger.log("Error occured while creating data directory");
  }

  // For each entity, check if the database file exists, if not then create it
  dbEntities.forEach(async entity => {
    const fullpath = dataDir + entity;

    await open(fullpath, 'wx', async (err, fd) => {
      if (err && err.code === 'EEXIST') {
        return;
      }
    
      try {
        logger.log("Data " + entity + " does not exist and is being created");
        await appendFile(fullpath, "[]");
      } finally {
        close(fd, (err) => { if (err) throw err; });
      }
    });
  })
}