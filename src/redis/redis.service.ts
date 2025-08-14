import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis.Redis;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    this.client = new Redis.Redis(process.env.REDIS_URL! );
    // console.log('Connected to remote Redis');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async set(key: string, value: string, ttlInSeconds: number): Promise<void> {
    await this.client.set(key, value, 'EX', ttlInSeconds); 
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }
}