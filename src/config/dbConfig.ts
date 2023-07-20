// DB configurations
export const dbUsername = "api";
export const dbPort = 26257;
export const dbHost = "globant-tryout-4601.g8z.cockroachlabs.cloud";
export const dbPassword = "4lq0o2_fvbsAzjaAagahHw"; // Meant for production, deployed for example
export const dbName = "globant_intro";
export const dbConnectionString = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?sslmode=verify-full`;