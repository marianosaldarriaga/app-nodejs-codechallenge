export class ErrorRequestDto {
    statusCode: number;
    message: string[];
    error: string;

    public toString(): string {
        return `${this.message.join(', ')}`;
    }
}
