export class AppResponse<T = any> {
  public readonly _isAppResponse = true;

  constructor(
    public readonly data: T | null = null,
    public readonly message: string = 'Operação realizada com sucesso',
    public readonly statusCode: number = 200,
  ) {}
}
