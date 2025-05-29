import { Injectable } from '@nestjs/common';
import DBClass from './db/db.class';

@Injectable()
export class DBService extends DBClass {}
