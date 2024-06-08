import {Observable} from "rxjs";
import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ApiAuthGuard implements CanActivate {

    private username: string;
    private password: string;

    constructor(private readonly configService: ConfigService) {
        this.username = this.configService.get('TRANSACTIONS_API_USERNAME')
        this.password = this.configService.get('TRANSACTIONS_API_PASSWORD')
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        var token = request.headers.authorization;

        var isValid = false;

        // Validate authentication
        if(token) {
            token = token.replace('Basic ', '')

            const decoded = Buffer.from(token, 'base64').toString('utf-8')
            const [username, password] = decoded.split(':')
            isValid = username === this.username && password === this.password
        }

        // Also, we can validate scopes... (validate authorization)

        return isValid;
    }
}