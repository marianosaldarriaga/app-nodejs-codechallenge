import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {UpdateDto} from "../../dto/update.dto/update.dto";
import {catchError, firstValueFrom} from "rxjs";
import { AxiosError } from "axios";

@Injectable()
export class DataService {

    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) { }

    async update(externalId: string, dtoRequest: UpdateDto) {
        const { data } = await firstValueFrom(
            this.httpService
                .put(`${this.configService.get('DATA_API_URL')}/transactions/${externalId}`, dtoRequest)
                .pipe(
                    catchError((error: AxiosError) => {
                        throw `Error during send PUT transaction: ${error.response.data}`;
                    })
                )
        );
        return data;
    }

}
