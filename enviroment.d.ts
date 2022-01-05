declare global {
    namespace NodeJS {
    interface ProcessEnv {
        SECRETS: string | any;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        DB_USER: string;
        DB_DATABASE: string;
        DB_HOST: string;
        DB_PASS:string;
        DATABASE_URL:string;


    }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}

