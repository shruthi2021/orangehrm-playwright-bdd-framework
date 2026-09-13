import dotenv from "dotenv"

dotenv.config({
    path : ".env.qa",
    override: true
})

export class ConfigManager
{
    static get baseURL()
    {
return process.env.BASE_URL!;

    }
    static get username()
    {
return process.env.USERNAME!;
    }
    static get password()
    {
return process.env.PASSWORD;
    }
}
