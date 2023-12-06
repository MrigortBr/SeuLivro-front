import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Authorization } from "./type";

export default class ApiClient {
  private instance: AxiosInstance;

  private config: AxiosRequestConfig;

  constructor(url = "http://localhost:8080/") {
    this.instance = axios.create({
      baseURL: url,
    });

    this.config = {};
  }

  setUrl(url: string): this {
    this.instance.defaults.baseURL = url;
    return this;
  }

  addUrl(url: string) {
    return new ApiClient(`${this.instance.defaults.baseURL}${url}`);
  }

  public setBody(data: any): ApiClient {
    this.config.data = data;
    return this;
  }

  public setHeaders(headers: Authorization): ApiClient {
    this.config.headers = headers;
    return this;
  }

  public async get(config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.get(this.config.url || "", this.config);
  }

  public async post(config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.post(this.config.url || "", this.config.data, this.config);
  }

  public async put(config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.put(this.config.url || "", this.config.data, this.config);
  }

  public async delete(config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.delete(this.config.url || "", this.config);
  }
}
