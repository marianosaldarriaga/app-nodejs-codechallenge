import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom} from "rxjs";
import {AxiosError} from "axios";
import {ConfigService} from "@nestjs/config";
import {TransactionDto} from "../../dto/response/transaction.dto/transaction.dto";
import {ErrorServerDto} from "../error.server.dto/error.server.dto";
import {AddTransactionDto} from "../../dto/request/add.transaction.dto/add.transaction.dto";
import {ErrorRequestDto} from "../error.request.dto/error.request.dto";

@Injectable()
export class DataApiClient {

    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) { }

    async find(externalId: string): Promise<TransactionDto> {
        const { data } = await firstValueFrom(
            this.httpService
                .get<TransactionDto>(`${this.configService.get('DATA_API_URL')}/transactions/${externalId}`)
                .pipe(
                    catchError((error: AxiosError<ErrorServerDto>) => {
                        var dto =  error.response.data;
                        throw new HttpException(dto.message, dto.statusCode);
                    }),
                ),
        );
        return data;
    }

    async create(dtoRequest: AddTransactionDto): Promise<TransactionDto> {
        const { data } = await firstValueFrom(
            this.httpService
                .post<TransactionDto>(`${this.configService.get('DATA_API_URL')}/transactions`, dtoRequest)
                .pipe(
                    catchError((error: AxiosError<ErrorRequestDto>) => {
                        var dto = error.response.data as any;
                        throw new HttpException(dto.message.toString(), dto.statusCode);
                    }),
                ),
        );
        return data;
    }

}
